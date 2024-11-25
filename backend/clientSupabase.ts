// Utilisé pour le code client
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;


export const supabase = createClient(supabaseUrl, supabaseKey);
