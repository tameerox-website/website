-- Migration to add new dynamic fields to the projects table

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS status text DEFAULT 'Ongoing';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS client text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS year text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS duration text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS tags text[];
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS case_study_link text;

-- Optional: Update existing records to have default status if needed (though DEFAULT handles new inserts)
-- UPDATE public.projects SET status = 'Completed' WHERE status IS NULL;
