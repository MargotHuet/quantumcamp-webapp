import { supabase } from "../clientSupabase.js";
import express from 'express';
const router = express.Router();
// GET courses title 
router.get('/courses', async function(req, res) {
  const { data: course, error } = await supabase
    .from('course')
    .select('*');
  if (error) {
    return res.status(500).send(error.message);
  }
  res.send(course);
});


// GET full chapter
router.get('/', async function(req, res) {
    const { data: chapter, error } = await supabase
      .from('chapters')
      .select('id, title');
    if (error) {
      return res.status(500).send(error.message);
    }
    res.send(chapter);
  });
  
// GET chapter by Id
router.get('/:chapterId', async function(req, res) {
    const { chapterId } = req.params;
  
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('id', chapterId);
  
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: "Chapter not found" });
      }
      return res.status(500).json({ error: error.message });
    }
  
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Chapter not found" });
    }
  
    res.json(data[0]);  // retourne le premier (et unique) chapitre correspondant
  });

export default router;