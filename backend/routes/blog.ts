import { supabase } from "../clientSupabase.js";
import express, { Request, Response } from 'express';
const router = express.Router();

// GET /blog — liste des articles
router.get('/', async function (req: Request, res: Response) {
  const { data: articlesList, error } = await supabase
    .from('blog_articles')
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!articlesList || articlesList.length === 0) {
    return res.status(404).json({ error: 'No articles found' });
  }

  res.status(200).json(articlesList);
});

// GET /blog/:id — un article par ID
router.get('/:slug', async function (req: Request, res: Response): Promise<void> {
  const { slug } = req.params;

  const { data: blog, error } = await supabase
    .from('blog_articles')
    .select('id, name, content, image_url')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    res.status(500).json({ error: error.message });
    return 
  }

  if (!blog) {
    res.status(404).json({ error: "No article found." });
    return 
  }

  res.status(200).json(blog);
});

export default router;
