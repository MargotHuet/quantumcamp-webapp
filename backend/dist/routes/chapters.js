import { supabase } from "../clientSupabase.js";
import express from "express";
/*
  Ce fichier "chapters.ts" gère les routes du backend pour récupérer les cours et les chapitres à partir de Supabase.
  
  Routes disponibles :
  - GET /:chapterId : Récupère un chapitre spécifique par son identifiant. La réponse inclut le contenu du chapitre
                      ainsi que l'identifiant du chapitre suivant, si disponible.
  
  En cas d'erreur lors des requêtes à Supabase, une réponse HTTP 500 est renvoyée avec le message d'erreur approprié.
*/
const router = express.Router();
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
