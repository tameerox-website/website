-- Migration to add new dynamic fields to the services table

ALTER TABLE public.services ADD COLUMN IF NOT EXISTS project_types text[];
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS unique_selling_points text[];
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS full_description text;

-- Note: To populate these fields with the new local data, you may need to re-seed or run a specific update script.
-- Since they currently fallback to local 'data.js' in the code, the app will work immediately.
