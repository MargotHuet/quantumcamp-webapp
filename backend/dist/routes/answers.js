var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "../clientSupabase.js";
import express from 'express';
const router = express.Router();
// GET quiz question 
router.get('/quiz/:chapterId', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chapterId } = req.params;
        const { data: question, error } = yield supabase
            .from('chapters')
            .select('question')
            .eq('id', chapterId);
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (!question || question.length === 0) {
            return res.status(404).json({ error: "No question found for this chapter" });
        }
        // Renvoyer directement l'objet question au lieu d'un tableau
        res.status(200).json(question[0]);
    });
});
// GET possibles answers and correct answer by chapterId
router.get('/answers/:chapterId', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chapterId } = req.params;
        const { data, error } = yield supabase
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
});
export default router;
