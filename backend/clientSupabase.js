import dotenv from 'dotenv';
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local' });
import { createClient } from '@supabase/supabase-js'


console.log('Supabase URL:', process.env.SUPABASE_URL);
console.log('Supabase Key:', process.env.SUPABASE_ANON_KEY);

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY


export const supabase = createClient(supabaseUrl, supabaseKey);
