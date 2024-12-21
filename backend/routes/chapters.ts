import { supabase } from "../clientSupabase.js";
import express, { Request, Response } from "express";
import { QueryData } from "@supabase/supabase-js";

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

  const chapterByIdQuery = supabase
    .from("chapters")
    .select("*")
    .eq("id", chapterId);
  type ChapterById = QueryData<typeof chapterByIdQuery>;

  const { data, error } = await chapterByIdQuery;

  if (error) {
    if (error.code === 'PGRST116') {
      res.status(404).json({ error: "Chapter not found" });
      return;
    }
    res.status(500).json({ error: error.message });
    return;
  }

  if (!data || data.length === 0) {
    res.status(404).json({ error: "Chapter not found" });
    return;
  }

  res.json(data[0] as ChapterById);
});

export default router;
