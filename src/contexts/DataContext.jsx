import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabaseClient';
import { services as initialServices, projects as initialProjects } from '../data/data';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // Initial state (starts empty or with minimal loading state)
    const [services, setServices] = useState(initialServices);
    const [projects, setProjects] = useState(initialProjects);
    const [siteContent, setSiteContent] = useState({}); // Key-value store for section content
    const [loading, setLoading] = useState(true);

    // Fetch Initial Data
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Services
            const { data: servicesData, error: servicesError } = await supabase
                .from('services')
                .select('*')
                .order('id', { ascending: true });

            // 2. Fetch Projects
            const { data: projectsData, error: projectsError } = await supabase
                .from('projects')
                .select('*')
                .order('id', { ascending: true });

            // 3. Fetch Site Content
            const { data: contentData, error: contentError } = await supabase
                .from('site_content')
                .select('*');

            if (servicesError) throw servicesError;
            if (projectsError) throw projectsError;
            // Note: contentError might happen if table doesn't exist yet, we can ignore or log it.

            // Handle Site Content
            if (contentData) {
                const contentMap = {};
                contentData.forEach(item => {
                    contentMap[item.section_name] = item.content;
                });
                setSiteContent(contentMap);
            }

            // 4. Handle Empty DB (Auto-Seed logic for first run)
            if (servicesData && servicesData.length > 0) {
                // Map snake_case to camelCase for services
                const mappedServices = servicesData.map(s => ({
                    ...s,
                    iconName: s.icon_name, // Map back
                    fullDescription: s.full_description // Map back
                }));
                setServices(mappedServices);
            } else {
                console.log("No services found in DB. Seeding...");
                await seedServices();
            }

            if (projectsData && projectsData.length > 0) {
                setProjects(projectsData);
            } else {
                console.log("No projects found in DB. Seeding...");
                await seedProjects();
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            // Fallback to local data is already set by default state
        } finally {
            setLoading(false);
        }
    };

    const seedServices = async () => {
        const payload = initialServices.map(s => ({
            title: s.title,
            slug: s.slug || s.title.toLowerCase().replace(/ /g, '-'),
            icon_name: s.iconName,
            description: s.description,
            full_description: s.fullDescription,
            scope: s.scope,
            image: s.image
        }));
        const { data, error } = await supabase.from('services').insert(payload).select();
        if (!error && data) {
            const mapped = data.map(s => ({ ...s, iconName: s.icon_name, fullDescription: s.full_description }));
            setServices(mapped);
        }
    };

    const seedProjects = async () => {
        const payload = initialProjects.map(p => ({
            title: p.title,
            category: p.category,
            image: p.image,
            description: p.description
        }));
        const { data, error } = await supabase.from('projects').insert(payload).select();
        if (!error && data) setProjects(data);
    };

    // --- CRUD OPERATIONS ---

    const addProject = async (project) => {
        const cleanProject = {
            title: project.title,
            category: project.category,
            image: project.image,
            description: project.description
        };
        const { data, error } = await supabase.from('projects').insert([cleanProject]).select();
        if (!error && data) {
            setProjects(prev => [...prev, data[0]]);
        } else {
            alert("Error adding project: " + error?.message);
        }
    };

    const updateProject = async (id, updatedProject) => {
        const cleanProject = {
            title: updatedProject.title,
            category: updatedProject.category,
            image: updatedProject.image,
            description: updatedProject.description
        };
        const { error } = await supabase.from('projects').update(cleanProject).eq('id', id);
        if (!error) {
            setProjects(prev => prev.map(p => p.id === id ? { ...p, ...cleanProject } : p));
        } else {
            alert("Error updating: " + error?.message);
        }
    };

    const deleteProject = async (id) => {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (!error) {
            setProjects(prev => prev.filter(p => p.id !== id));
        }
    };

    const addService = async (service) => {
        const cleanService = {
            title: service.title,
            slug: service.slug,
            icon_name: service.iconName || 'Hammer',
            description: service.description,
            full_description: service.fullDescription,
            scope: service.scope || [],
            image: service.image
        };
        const { data, error } = await supabase.from('services').insert([cleanService]).select();
        if (!error && data) {
            const mapped = { ...data[0], iconName: data[0].icon_name, fullDescription: data[0].full_description };
            setServices(prev => [...prev, mapped]);
        }
    };

    const updateService = async (id, updatedService) => {
        const cleanService = {
            title: updatedService.title,
            slug: updatedService.slug,
            icon_name: updatedService.iconName,
            description: updatedService.description,
            full_description: updatedService.fullDescription,
            scope: updatedService.scope,
            image: updatedService.image
        };
        const { error } = await supabase.from('services').update(cleanService).eq('id', id);
        if (!error) {
            setServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedService } : s));
        }
    };

    const deleteService = async (id) => {
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (!error) {
            setServices(prev => prev.filter(s => s.id !== id));
        }
    };

    const updateSiteContent = async (sectionName, content) => {
        const { data, error } = await supabase
            .from('site_content')
            .upsert({ section_name: sectionName, content: content }, { onConflict: 'section_name' })
            .select();

        if (!error && data) {
            setSiteContent(prev => ({
                ...prev,
                [sectionName]: content
            }));
            alert('Content updated successfully!');
        } else {
            console.error(error);
            alert('Error updating content: ' + error?.message);
        }
    };

    return (
        <DataContext.Provider value={{
            services,
            projects,
            siteContent,
            loading,
            addProject,
            updateProject,
            deleteProject,
            addService,
            updateService,
            deleteService,
            updateSiteContent
        }}>
            {children}
        </DataContext.Provider>
    );
};
