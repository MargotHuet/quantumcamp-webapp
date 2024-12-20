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
// GET all answers table content 
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: answers, error } = yield supabase
            .from('answers')
            .select('*');
        if (error) {
            return res.status(500).send(error.message);
        }
        res.send(answers);
    });
});
// GET possibles answers user can select 
router.get('/responses/:chapterId', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chapterId } = req.params;
        const { data: responses, error } = yield supabase
            .from('answers')
            .select('*')
            .eq('chapter_id', chapterId);
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (!responses || responses.length === 0) {
            return res.status(404).json({ error: "No answers found for this chapter" });
        }
        res.status(200).json(responses);
    });
});
export default router;
