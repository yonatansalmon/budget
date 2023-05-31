import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qklihvhvtajbvyjwwlie.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrbGlodmh2dGFqYnZ5and3bGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU1MTc5NjEsImV4cCI6MjAwMTA5Mzk2MX0.46jNrj4YS5_nkkOxdVuj2HO7J89q3IKOHDdLHiiYHF8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)