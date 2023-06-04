import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qklihvhvtajbvyjwwlie.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)