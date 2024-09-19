import { supabase } from "../clientSupabase.js";
import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ key: 'value' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.send({ key: 'value' });
});

/* GET courses title. */
router.get('/courses', async function(req, res, next) {
  let { data: course, error } = await supabase
    .from('course')
    .select('title', 'is_finished', 'chapter_id');
  if (error) {
    return res.status(500).send(error.message);
  }
  res.send(course);
});

router.get('/:chapterId', async function(req, res, next) {
  const { chapterId } = req.params;
  let { data: chapter, error } = await supabase
    .from('chapters')
    .select('id, title, content, is_complete')
    .eq('id', chapterId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return res.status(404).json({ error: "Chapter not found" });
    }
    return res.status(500).json({ error: error.message });
  }

  if (!chapter) {
    return res.status(404).json({ error: "Chapter not found" });
  }

  res.json(chapter);
});



export default router;
