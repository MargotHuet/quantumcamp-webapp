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

router.get('/courses/:chapterId', async function(req, res, next) {
  const { chapterId } = req.params;  // Vérifier que `chapterId` est bien reçu
  let { data: chapter, error } = await supabase
    .from('chapters')
    .select('id', 'title', 'content', 'is_complete')
    .eq('id', chapterId);  // Filtrer par l'ID

  if (error) {
    return res.status(500).send(error.message);
  }
  
  if (chapter.length === 0) {
    return res.status(404).send("Chapter not found");
  }

  res.send(chapter[0]);  // Assurez-vous de renvoyer un seul objet si c'est le cas
});



export default router;
