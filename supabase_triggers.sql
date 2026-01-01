-- 1. Standard "updated_at" Trigger Function
-- This function automatically refeshes the updated_at timestamp when a row is modified.
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 2. Add 'updated_at' columns to your tables
alter table public.projects add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now());
alter table public.services add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now());
alter table public.contacts add column if not exists status text default 'new'; -- (New, Read, Replied)

-- 3. Attach the Triggers
create trigger set_updated_at_projects
before update on public.projects
for each row execute procedure public.handle_updated_at();

create trigger set_updated_at_services
before update on public.services
for each row execute procedure public.handle_updated_at();

-- 4. Admin Stats Function (RPC)
-- Call this from frontend via: supabase.rpc('get_admin_stats')
create or replace function get_admin_stats()
returns json as $$
declare
  project_count int;
  service_count int;
  contact_count int;
begin
  select count(*) into project_count from public.projects;
  select count(*) into service_count from public.services;
  select count(*) into contact_count from public.contacts;
  
  return json_build_object(
    'projects', project_count,
    'services', service_count,
    'contacts', contact_count
  );
end;
$$ language plpgsql;
