import { createClient } from '@supabase/supabase-js';

// Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured
const isConfigured = supabaseUrl && supabaseAnonKey && 
                     supabaseUrl !== 'https://placeholder.supabase.co' &&
                     supabaseAnonKey !== 'placeholder-key';

if (!isConfigured) {
    console.error('⚠️ Supabase is not configured!');
    console.error('Please create a .env file in the project root with:');
    console.error('VITE_SUPABASE_URL=your-supabase-url');
    console.error('VITE_SUPABASE_ANON_KEY=your-supabase-anon-key');
}

// Create client - will fail gracefully if not configured
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);

// Export a helper to check if Supabase is configured
export const isSupabaseConfigured = () => isConfigured;
