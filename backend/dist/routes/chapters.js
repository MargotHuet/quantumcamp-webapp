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
import express from "express";
const router = express.Router();
// GET courses title
const coursesQuery = supabase
    .from("courses")
    .select("*");
router.get('/courses', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield coursesQuery;
        if (error) {
            res.status(500).send(error.message);
            return;
        }
        res.json(data);
    });
});
// GET full chapter
const chaptersQuery = supabase
    .from("chapters")
    .select("id, title");
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield chaptersQuery;
        if (error) {
            res.status(500).send(error.message);
            return;
        }
        res.json(data);
    });
});
// GET chapter by Id
router.get('/:chapterId', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chapterId } = req.params;
        const { data: allChapters, error: allChaptersError } = yield supabase
            .from("chapters")
            .select("id, title, content")
            .order("id", { ascending: true });
        if (allChaptersError) {
            res.status(500).json({ error: allChaptersError.message });
            return;
        }
        if (!allChapters || allChapters.length === 0) {
            res.status(404).json({ error: "Aucun chapitre trouvé." });
            return;
        }
        const currentChapterIndex = allChapters.findIndex((chapter) => chapter.id === chapterId);
        if (currentChapterIndex === -1) {
            res.status(404).json({ error: "Chapitre non trouvé." });
            return;
        }
        const currentChapter = allChapters[currentChapterIndex];
        const nextChapter = allChapters[currentChapterIndex + 1] || null;
        res.json(Object.assign(Object.assign({}, currentChapter), { next_chapter_id: nextChapter ? nextChapter.id : null }));
    });
});
export default router;
