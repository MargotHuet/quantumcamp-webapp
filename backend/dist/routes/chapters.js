import { supabase } from "../clientSupabase.js";
import express from "express";
const router = express.Router();
// GET courses title
const coursesQuery = supabase
    .from("courses")
    .select("*");
router.get('/courses', async function (req, res) {
    const { data, error } = await coursesQuery;
    if (error) {
        res.status(500).send(error.message);
        return;
    }
    res.json(data);
});
// GET full chapter
const chaptersQuery = supabase
    .from("chapters")
    .select("id, title");
router.get('/', async function (req, res) {
    const { data, error } = await chaptersQuery;
    if (error) {
        res.status(500).send(error.message);
        return;
    }
    res.json(data);
});
// GET chapter by Id
router.get('/:chapterId', async function (req, res) {
    const { chapterId } = req.params;
    const { data: allChapters, error: allChaptersError } = await supabase
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
    res.json({
        ...currentChapter,
        next_chapter_id: nextChapter ? nextChapter.id : null,
    });
});
export default router;
