import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/layout/ScrollToTop';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BackToTop from './components/layout/BackToTop';
import ScrollProgress from './components/layout/ScrollProgress';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <DataProvider>
      <HelmetProvider>
        <Router>
          <ScrollToTop />
          <ScrollProgress />
          <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1, paddingTop: '90px' }}>
              <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <BackToTop />
          </div>
        </Router>
      </HelmetProvider>
    </DataProvider>
  );
}

export default App;
