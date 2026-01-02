ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS progress integer DEFAULT 0;
