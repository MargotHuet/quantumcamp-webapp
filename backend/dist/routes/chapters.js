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
// GET full chapter
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: chapter, error } = yield supabase
            .from('chapters')
            .select('id, title');
        if (error) {
            return res.status(500).send(error.message);
        }
        res.send(chapter);
    });
});
// GET chapter by Id
router.get('/:chapterId', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chapterId } = req.params;
        const { data, error } = yield supabase
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
        res.json(data[0]); // retourne le premier (et unique) chapitre correspondant
    });
});
export default router;
