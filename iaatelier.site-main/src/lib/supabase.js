import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://flkgnuywynftkwztbkwn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsa2dudXl3eW5mdGt3enRia3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjcxMDksImV4cCI6MjA5NzQwMzEwOX0.6tVRs39QgLDrlM2xKIGhzYz8X4s1WFQqJ7HpZx5eJy8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

