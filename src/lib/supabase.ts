import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rmbpvvuxwuvxxqxkpazr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtYnB2dnV4d3V2eHhxeGtwYXpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NDQ4NDAsImV4cCI6MjA1MDEyMDg0MH0.--Hg3Cf8JJa39W-_ZL7NAOzAkJ09OHm8anITi00ua00';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anonymous Key');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    redirectTo: 'https://preview--hello-project-reviver.lovable.app/login'
  }
});