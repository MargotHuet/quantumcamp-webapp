import { supabase } from "../clientSupabase.js";
import express from 'express';
const router = express.Router();

// GET full chapter
router.get('/', async function(req, res, next) {
    let { data: chapter, error } = await supabase
      .from('chapters')
      .select('id, title');
    if (error) {
      return res.status(500).send(error.message);
    }
    res.send(chapter);
  });
  
  // GET chapter by Id
  router.get('/:chapterId', async function(req, res, next) {
    const { chapterId } = req.params;
  
    let { data, error } = await supabase
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