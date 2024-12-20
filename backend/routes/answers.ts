import { supabase } from "../clientSupabase.js";
import express from 'express';
const router = express.Router();

// GET all answers table content 
router.get('/', async function(req, res) {
  const { data: answers, error } = await supabase
    .from('answers')
    .select('*');
  if (error) {
    return res.status(500).send(error.message);
  }
  res.send(answers);
});


// GET possibles answers user can select 
router.get('/responses/:chapterId', async function(req, res) {
    const { chapterId } = req.params;
    
    const { data: responses, error } = await supabase
        .from('answers')
        .select('*')
        .eq('chapter_id', chapterId)

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!responses || responses.length === 0) {
      return res.status(404).json({ error: "No answers found for this chapter" });
    }

    res.status(200).json(responses);
});


export default router;