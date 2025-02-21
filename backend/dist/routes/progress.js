import express from 'express';
import { supabase } from '../clientSupabase.js';
const router = express.Router();
router.post('/save-progress', async (req, res) => {
    const { userId, answerId } = req.body;
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "JWT token is missing" });
        }
        const { data: { user }, error: userError } = await supabase.auth.getUser(token);
        if (userError || !user) {
            return res.status(401).json({ error: "Invalid token or user not authenticated" });
        }
        if (user.id !== userId) {
            return res.status(403).json({ error: "User ID mismatch" });
        }
        const { data: answer, error: answerError } = await supabase
            .from('answers')
            .select('is_correct, chapter_id')
            .eq('id', answerId)
            .single();
        if (answerError || !answer) {
            return res.status(400).json({ error: "Invalid answer ID" });
        }
        // check if existing progression 
        const { data: existingProgress, error: progressError } = await supabase
            .from('completed_chapters')
            .select('id')
            .eq('user_id', userId)
            .eq('chapter_id', answer.chapter_id)
            .single();
        if (progressError && progressError.code !== 'PGRST116') {
            return res.status(500).json({ error: "Error checking existing progress" });
        }
        if (existingProgress) {
            const { error: updateError } = await supabase
                .from('completed_chapters')
                .update({ is_finished: answer.is_correct })
                .eq('id', existingProgress.id);
            if (updateError) {
                return res.status(500).json({ error: "Error updating progress" });
            }
            return res.status(200).json({ message: "Progress updated successfully." });
        }
        else {
            const { error: insertError } = await supabase
                .from('completed_chapters')
                .insert({
                user_id: userId,
                chapter_id: answer.chapter_id,
                is_finished: answer.is_correct,
            });
            if (insertError) {
                return res.status(500).json({ error: insertError.message || "Error inserting progress" });
            }
            return res.status(200).json({ message: "Progress saved successfully." });
        }
    }
    catch {
        return res.status(500).json({ error: "Internal server error" });
    }
});
router.get('/completed-chapters/:userId', async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ error: 'Missing userId parameter.' });
    }
    try {
        // Query fetch completed chapters and their title
        const { data, error } = await supabase
            .from('completed_chapters')
            .select('chapter_id, is_finished, chapter_id(title)')
            .eq('user_id', userId)
            .eq('is_finished', true);
        if (error) {
            console.error('Supabase error:', error);
            return res.status(500).json({ error: 'Error fetching completed chapters.' });
        }
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No completed chapters found.' });
        }
        // Transform data to only iclude title and state
        const completedChapters = data.map((item) => ({
            chapterTitle: item.chapter_id?.title || 'Unknown Chapter',
            isFinished: item.is_finished,
        }));
        return res.status(200).json(completedChapters);
    }
    catch (err) {
        console.error('Error fetching completed chapters:', err);
        return res.status(500).json({ error: 'Internal Server Error.' });
    }
});
export default router;
