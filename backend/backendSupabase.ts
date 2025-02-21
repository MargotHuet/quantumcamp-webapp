// Utilisé pour le code serveur
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Charger les bonnes variables d'environnement
dotenv.config({ 
  path: process.env.NODE_ENV === 'production' 
    ? '.env.production' 
    : process.env.NODE_ENV === 'test'
    ? '.env.test' 
    : '.env.local'
});


const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
