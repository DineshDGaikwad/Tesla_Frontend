import { createClient } from '@supabase/supabase-js';

// Wrap the URLs and keys in quotes
const supabaseUrl = "https://npzpksqcqnzacfruyezx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wenBrc3FjcW56YWNmcnV5ZXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NDQyODAsImV4cCI6MjA1MTMyMDI4MH0.VpqL3KrhiDAlAIoxL8WU2tuZOfGZv6L5DElAxUjpNlU";

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Export the client
export default supabase;
