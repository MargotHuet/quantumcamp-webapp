import express, { Request, Response } from 'express';
import { supabase } from '../clientSupabase.js';
import { supabaseAdmin } from '../backendSupabase.js';

const router = express.Router();

// Route GET pour récupérer les informations d'un utilisateur connecté
router.get('/', async (req: Request, res: Response): Promise<Response> => {
  try {
    const uid = "0669b347-6cbf-43c6-960e-1ee6b68e1869";
    const {
      data: { user },
      error,
    } = await supabase.auth.admin.getUserById(uid);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (user) {
      return res.status(200).json(user);
    }

    return res.status(404).json({ message: 'Utilisateur introuvable' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route pour créer un compte utilisateur
router.post('/signup', async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword }: { name: string; email: string; password: string; confirmPassword: string } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Les mots de passe ne correspondent pas.' });
  }
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      if (error.message === "Utilisateur déjà existant") {
        return res.status(400).json({ error: "Email déjà utilisé." });
      }
      return res.status(400).json({ error: `Une erreur est survenue: ${error.message}` });
    }

    return res.status(200).json({ message: "Compte crée. Connectez-vous." });
  } catch (err: unknown) {
    console.error("Error creating user:", (err as Error).message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

// Route pour qu'un utilisateur se connecte à son compte
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('Authentication error:', error.message);
      return res.status(401).json({ error: 'Incorrect credentials.' });
    }

    // Définir le cookie avec le token d'accès
    res.cookie('supabase-auth-token', data.session?.access_token, {
      httpOnly: true,     // Sécurise le cookie pour ne pas être accessible en JS
      secure: true,      // Passez à `true` en production (HTTPS)
      sameSite: 'lax',    // Empêche les attaques CSRF tout en autorisant les requêtes cross-origin nécessaires
      maxAge: 60 * 60 * 24 * 7, // Expiration dans 7 jours
    });

    return res.status(200).json({
      message: 'Connexion réussie.',
      user: data.user,
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Error logging in:', error.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Route pour qu'un utilisateur se déconnecte
router.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('supabase-auth-token', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
  return res.status(200).json({ message: "Logout successful." });
});

// Route pour envoyer un mail en cas de mot de passe oublié
router.post('/forgot-password', async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email requis.' });
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://quantumcamp.adaschool.fr/updatePassword',
    });

    if (error) {
      console.error('Erreur lors de l\'envoi de l\'email de réinitialisation :', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Email de réinitialisation envoyé avec succès.' });
  } catch (err) {
    console.error('Erreur interne lors de l\'envoi de l\'email :', err);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

router.post('/verify-token', async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = req.body;

  console.log('Access Token:', accessToken);
  console.log('Refresh Token:', refreshToken);

  if (!accessToken || !refreshToken) {
    return res.status(400).json({ error: 'Les tokens d\'accès et de rafraîchissement sont requis.' });
  }

  try {
    const { error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) {
      console.error('Erreur Supabase:', error);
      return res.status(401).json({ error: 'Le lien est invalide ou expiré.' });
    }

    return res.status(200).json({ message: 'Token vérifié avec succès.' });
  } catch (err) {
    console.error('Erreur lors de la vérification du token :', err);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

// POST reset user password 
router.post('/reset-password', async (req: Request, res: Response) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Le mot de passe est requis pour réinitialiser celui-ci.'});
  }

  try {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error('Erreur lors de la mise à jour du mot de passe :', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
  } catch (err) {
    console.error('Erreur interne lors de la réinitialisation du mot de passe :', err);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

// POST user change password
router.post('/update-password', async (req: Request, res: Response) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Le mot de passe est requis.' });
  }

  try {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
  } catch (err) {
    console.error('Erreur lors de la mise à jour du mot de passe :', err);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

// Route DELETE pour supprimer l'utilisateur connecté
router.delete('/delete', async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token missing in Authorization header' });
  }

  try {
    // Récupérer l'utilisateur via le token
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({ error: 'Unauthorized or user not found' });
    }

    const userId = user.id;

    // Supprimer l'utilisateur de Supabase Auth
    const { error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (deleteAuthError) {
      return res.status(500).json({ error: 'Failed to delete user from Supabase Auth' });
    }

    // Supprimer l'utilisateur de la table public.users
    const { error: deleteUserError } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (deleteUserError) {
      return res.status(500).json({ error: 'Failed to delete user from database' });
    }

    return res.status(200).json({ message: 'Compte supprimé' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
