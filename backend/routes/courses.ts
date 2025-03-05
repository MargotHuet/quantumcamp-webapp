import { supabase } from "../clientSupabase.js";
import express, { Request, Response } from "express";
import { QueryData } from "@supabase/supabase-js";

/*
  Ce fichier "courses.ts" gère les routes du backend pour récupérer les cours à partir de Supabase.
  
  Routes disponibles :
  - GET /courses : Récupère tous les cours (sélectionne toutes les colonnes de la table "courses")
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

export default router;