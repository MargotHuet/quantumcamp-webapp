var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { supabase } from '../clientSupabase.js';
const router = express.Router();
router.post('/save-progress', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { data: { user }, error: userError } = yield supabase.auth.getUser(token);
        if (userError || !user) {
            return res.status(401).json({ error: "Invalid token or user not authenticated" });
        }
        if (user.id !== userId) {
            return res.status(403).json({ error: "User ID mismatch" });
        }
        const { data: answer, error: answerError } = yield supabase
            .from('answers')
            .select('is_correct, chapter_id')
            .eq('id', answerId)
            .single();
        if (answerError || !answer) {
            return res.status(400).json({ error: "Invalid answer ID" });
        }
        // Vérifiez si une progression existe déjà pour cet utilisateur et ce chapitre
        const { data: existingProgress, error: progressError } = yield supabase
            .from('completed_chapters')
            .select('id')
            .eq('user_id', userId)
            .eq('chapter_id', answer.chapter_id)
            .single();
        if (progressError && progressError.code !== 'PGRST116') {
            return res.status(500).json({ error: "Error checking existing progress" });
        }
        if (existingProgress) {
            const { error: updateError } = yield supabase
                .from('completed_chapters')
                .update({ is_finished: answer.is_correct })
                .eq('id', existingProgress.id);
            if (updateError) {
                return res.status(500).json({ error: "Error updating progress" });
            }
            return res.status(200).json({ message: "Progress updated successfully." });
        }
        else {
            const { error: insertError } = yield supabase
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
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}));
router.get('/completed-chapters/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ error: 'Missing userId parameter.' });
    }
    try {
        // Query pour récupérer les chapitres complétés avec leur titre
        const { data, error } = yield supabase
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
        // Transformation des données pour inclure uniquement les titres et l'état de complétion
        const completedChapters = data.map((item) => {
            var _a;
            return ({
                chapterTitle: ((_a = item.chapter_id) === null || _a === void 0 ? void 0 : _a.title) || 'Unknown Chapter', // Vérifie que `chapters` existe avant d'accéder à `title`
                isFinished: item.is_finished,
            });
        });
        return res.status(200).json(completedChapters);
    }
    catch (err) {
        console.error('Error fetching completed chapters:', err);
        return res.status(500).json({ error: 'Internal Server Error.' });
    }
}));
export default router;
