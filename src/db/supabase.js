import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qklihvhvtajbvyjwwlie.supabase.co'
const supabaseAnonKey = 'ldCd2jXgB0CtCTQg0UFlx6feZ7CgxJE8Ydrz2Uyw+5EOdhJquuBIpv9Qb6y3qImCYP00bw3KRre4TQWTgYlWTw=='

export const supabase = createClient(supabaseUrl, supabaseAnonKey)