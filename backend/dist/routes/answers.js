import { supabase } from "../clientSupabase.js";
import express from 'express';
const router = express.Router();
// GET quiz question 
router.get('/quiz/:chapterId', async function (req, res) {
    const { chapterId } = req.params;
    const { data: question, error } = await supabase
        .from('chapters')
        .select('question')
        .eq('id', chapterId);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    if (!question || question.length === 0) {
        return res.status(404).json({ error: "No question found for this chapter" });
    }
    res.status(200).json(question[0]);
});
// GET possibles answers and correct answer by chapterId
router.get('/answers/:chapterId', async function (req, res) {
    const { chapterId } = req.params;
    const { data, error } = await supabase
        .from('answers')
        .select('id, possible_answer, is_correct')
        .eq('chapter_id', chapterId);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    if (!data || data.length === 0) {
        return res.status(404).json({ error: "No answers found for this chapter" });
    }
    res.json(data);
});
export default router;
