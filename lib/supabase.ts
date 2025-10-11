import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.SUPABASE_URL ?? "https://modomzbbzxwgujsbzxoy.supabase.co"
const supabaseKey = process.env.SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZG9temJienh3Z3Vqc2J6eG95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNzk5ODYsImV4cCI6MjA3NTY1NTk4Nn0.tJnBMsCk_4uqG1o04w888KrFhKxB3Wm9Y8T2Ola5ep0"
export const supabase = createClient(supabaseUrl, supabaseKey);