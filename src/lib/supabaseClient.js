import { createClient } from '@supabase/supabase-js';

// Detect environment variables - Support both Vite and Next.js patterns
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase credentials not found. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
