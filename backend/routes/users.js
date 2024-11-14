import express from 'express';
const router = express.Router();
import deleteUser from './deleteUser.js';

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/delete-user', deleteUser);


export default router;
