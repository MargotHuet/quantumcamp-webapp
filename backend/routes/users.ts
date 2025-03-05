import express, { Request, Response } from 'express';
import { supabase } from '../clientSupabase.js';
import { supabaseAdmin } from '../backendSupabase.js';

/*
  Ce fichier gère les routes d'authentification et de gestion des utilisateurs pour le backend.

   Routes disponibles :
  - **POST /users/signup** : Crée un nouveau compte utilisateur avec un nom, un email et un mot de passe.
  - **POST /users/login** : Authentifie un utilisateur avec un email et un mot de passe, et définit un cookie d'authentification.
  - **POST /users/logout** : Déconnecte l'utilisateur en supprimant les cookies d'authentification.
  - **POST /users/forgot-password** : Envoie un email de réinitialisation de mot de passe.
  - **GET /users/account** : Récupère les informations de l'utilisateur connecté à partir de son token.
  - **GET /users/check-auth** : Vérifie si l'utilisateur est connecté en validant la présence d'un cookie d'authentification.
  - **POST /users/update-password** : Met à jour le mot de passe de l'utilisateur connecté.
  - **DELETE /users/delete** : Supprime le compte de l'utilisateur, en le supprimant de Supabase Auth (via `supabaseAdmin`) et de la table `users`.

   Sécurité & gestion des erreurs :
  - Chaque route effectue des vérifications de paramètres et de tokens pour éviter les accès non autorisés.
  - L'authentification repose sur un token JWT stocké dans un cookie sécurisé (`supabase-auth-token`).

  Chaque route effectue des vérifications de paramètres et gère les erreurs d'authentification et d'exécution en renvoyant des codes HTTP et messages adaptés.
*/

const router = express.Router();

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

    const accessToken = data.session?.access_token;

    if (!accessToken) {
      return res.status(500).json({ error: 'Aucune session créée. Vérifiez Supabase.' });
    }

    // cookies d'authentification
    res.cookie('supabase-auth-token', accessToken, {
      httpOnly: true,  
      secure: true,  // Doit être false en local, true en production (HTTPS)
      sameSite: 'none',  
      path: '/',
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 jours
    });
    

    res.cookie('sb-gvlffwiacxezqgrcdvtu-auth-token', accessToken, {
      httpOnly: true,  
      secure: true, 
      sameSite: 'none',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 * 1000,
    });

    return res.status(200).json({ message: 'Connexion réussie.' });
  } catch (err) {
    console.error('Error logging in:', (err as Error).message);
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

  res.clearCookie('sb-gvlffwiacxezqgrcdvtu-auth-token', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
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

// Récupère les informations de l'utilisateur connecté
router.get('/account', async (req: Request, res: Response) => {
  const token = req.cookies['supabase-auth-token'];

  if (!token) {
    return res.status(401).json({ error: "Pas de token, utilisateur non authentifié" });
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Token invalide ou expiré" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error('Error fetching user:', err);
    return res.status(500).json({ error: "Erreur interne serveur" });
  }
});

// Vérifie que l'utilisateur est connectéen validant la présence d'un cookie d'authentification
router.get('/check-auth', (req: Request, res: Response) => {
  const authToken = req.cookies['supabase-auth-token'];

  if (!authToken) {
    return res.status(401).json({ error: "Aucun cookie reçu. L'utilisateur n'est pas authentifié." });
  }

  return res.status(200).json({ message: "Cookie reçu", token: authToken });
});

// POST user change password
router.post('/update-password', async (req: Request, res: Response) => {
  const { password } = req.body;
  const token = req.cookies["supabase-auth-token"];

  if (!token) {
    return res.status(401).json({ error: "Utilisateur non authentifié." });
  }

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return res.status(401).json({ error: "Token invalide ou utilisateur non connecté." });
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      return res.status(500).json({ error: error.message || "Erreur interne du serveur." });
    }

    return res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur interne du serveur :", error);
    return res.status(500).json({ error: "Erreur interne du serveur." });
}
});

// Route DELETE pour supprimer l'utilisateur connecté
router.delete('/delete', async (req, res) => {
  const token = req.cookies['supabase-auth-token'];

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
