// Utilisé pour le code client
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Charger les bonnes variables d'environnement en fonction du contexte
dotenv.config({ 
  path: process.env.NODE_ENV === 'production' 
    ? '.env.production' 
    : process.env.NODE_ENV === 'test'
    ? '.env.test' 
    : '.env.local'
});

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
