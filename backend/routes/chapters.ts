import { supabase } from "../clientSupabase.js";
import express, { Request, Response } from "express";
import { QueryData } from "@supabase/supabase-js";

/*
  Ce fichier "chapters.ts" gère les routes du backend pour récupérer les cours et les chapitres à partir de Supabase.
  
  Routes disponibles :
  - GET /courses : Récupère tous les cours (sélectionne toutes les colonnes de la table "courses").
  - GET /       : Récupère l'ensemble des chapitres en sélectionnant uniquement l'identifiant et le titre.
  - GET /:chapterId : Récupère un chapitre spécifique par son identifiant. La réponse inclut le contenu du chapitre
                      ainsi que l'identifiant du chapitre suivant, si disponible.
  
  En cas d'erreur lors des requêtes à Supabase, une réponse HTTP 500 est renvoyée avec le message d'erreur approprié.
*/

const router = express.Router();

// GET courses title
const coursesQuery = supabase
  .from("courses")
  .select("*");
type Courses = QueryData<typeof coursesQuery>;

router.get('/courses', async function (req: Request, res: Response): Promise<void> {
  const { data, error } = await coursesQuery;

  if (error) {
    res.status(500).send(error.message);
    return;
  }

  res.json(data as Courses);
});

// GET full chapter
const chaptersQuery = supabase
  .from("chapters")
  .select("id, title");
type Chapters = QueryData<typeof chaptersQuery>;

router.get('/', async function (req: Request, res: Response): Promise<void> {
  const { data, error } = await chaptersQuery;

  if (error) {
    res.status(500).send(error.message);
    return;
  }

  res.json(data as Chapters);
});

// GET chapter by Id
router.get('/:chapterId', async function (req: Request, res: Response): Promise<void> {
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
