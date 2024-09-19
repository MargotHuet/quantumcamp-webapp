import { supabase } from "../clientSupabase";

// get course data
interface Course {
  id: string;
  title: string;
  is_finished: boolean;
  chapter_id: number;
  created_at: number;
}

export const getCourses = async(): Promise<Course [] | null> => {
  const { data, error } = await supabase
  .from('course')
  .select('id, title, is_finished, chapter_id, created_at');

  if(error) throw(error)
  return data;
};