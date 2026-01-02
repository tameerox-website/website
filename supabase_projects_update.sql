-- Add new columns to projects table for enhanced details
alter table public.projects 
add column if not exists status text default 'Completed',
add column if not exists client text,
add column if not exists year text,
add column if not exists tags text[];

-- Update RLS policies if needed (existing ones cover 'all' columns so it should be fine)
