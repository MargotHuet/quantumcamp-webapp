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
const chapterQuestionQuery = supabase
    .from("chapters")
    .select("question");
router.get('/quiz/:chapterId', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chapterId } = req.params;
        const { data: questions, error } = yield chapterQuestionQuery
            .eq('id', chapterId);
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        if (!questions || questions.length === 0) {
            res.status(404).json({ error: "No question found for this chapter" });
            return;
        }
        const question = questions[0]; // Accéder au premier élément du tableau
        res.status(200).json(question);
    });
});
// GET possible answers and correct answer by chapterId
const answersQuery = supabase
    .from("answers")
    .select("id, possible_answer, is_correct");
router.get('/answers/:chapterId', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chapterId } = req.params;
        const { data, error } = yield answersQuery
            .eq('chapter_id', chapterId);
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        if (!data || data.length === 0) {
            res.status(404).json({ error: "No answers found for this chapter" });
            return;
        }
        res.status(200).json(data);
    });
});
export default router;
