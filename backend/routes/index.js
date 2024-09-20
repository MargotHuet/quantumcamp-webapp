import { supabase } from "../clientSupabase.js";
import express from 'express';
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ key: 'value' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.send({ key: 'value' });
});

/* GET courses title. */
router.get('/courses', async function(req, res, next) {
  let { data: course, error } = await supabase
    .from('course')
    .select('*');
  if (error) {
    return res.status(500).send(error.message);
  }
  res.send(course);
});


export default router;
