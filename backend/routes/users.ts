import express, { Request, Response } from 'express';
import { supabase } from '../clientSupabase.js';
import { supabaseAdmin } from '../backendSupabase.js';
const router = express.Router();

interface SupabaseUser {
  id: string;
  email?: string;
}

// Route GET pour récupérer les informations d'un utilisateur connecté
router.get('/', async (req: Request, res: Response): Promise<Response> => {
  try {
    const uid="0669b347-6cbf-43c6-960e-1ee6b68e1869"
    // Récupération de l'utilisateur
    const {
      data: { user },
      error,
    } = await supabase.auth.admin.getUserById(uid);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (user) {
      console.log(user);
      return res.status(200).json(user);
    }

    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route pour envoyer un mail en cas de mot de passe oublié
router.post('/forgot-password', async (req: Request, res: Response) => {
  const { email } = req.body;
  if(!email) {
    return res.status(400).json({error: 'Email is required.'})
  }
  try {
    let { error } = await supabase.auth.resetPasswordForEmail(email)

    if(error) {
      res.status(400).json({error: error.message});
    }

    res.status(200).json({ message: 'Password reset email send.'})
  } catch(err) {
    console.log(err)
    res.status(500).json({error: 'An error occured during your request.'})
  }
})

// Route pour mettre à jour le mot de passe
router.post('/request-password-reset', async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://188.165.238.74:3020/updatePassword',
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Password reset email sent successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while sending the reset email.' });
  }
});


// Route DELETE pour supprimer l'utilisateur connecté
router.delete('/delete', async (req: Request, res: Response): Promise<Response> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    // Obtenir l'utilisateur connecté via son token
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({ error: 'Unauthorized or user not found' });
    }

    const userId = (user as SupabaseUser).id;

    // Supprimer l'utilisateur via Supabase Admin API
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteError) {
      return res.status(500).json({ error: deleteError.message });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;
