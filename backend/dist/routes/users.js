var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { supabase } from '../clientSupabase.js';
import { supabaseAdmin } from '../backendSupabase.js';
const router = express.Router();
// Route GET pour récupérer les informations d'un utilisateur connecté
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = "0669b347-6cbf-43c6-960e-1ee6b68e1869";
        const { data: { user }, error, } = yield supabase.auth.admin.getUserById(uid);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json({ message: 'User not found' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Route pour créer un compte utilisateur
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, confirmPassword } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords should match.' });
    }
    try {
        const { error } = yield supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name },
            },
        });
        if (error) {
            if (error.message === "User already registered") {
                return res.status(400).json({ error: "Email already used. Choose another one." });
            }
            return res.status(400).json({ error: `An unexpected error occurred: ${error.message}` });
        }
        return res.status(200).json({ message: "Account successfully created. Please login." });
    }
    catch (err) {
        console.error("Error creating user:", err.message);
        return res.status(500).json({ error: "Internal server error." });
    }
}));
// Route pour qu'un utilisateur se connecte à son compte
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    try {
        const { data, error } = yield supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error('Authentication error:', error.message);
            return res.status(401).json({ error: 'Incorrect credentials.' });
        }
        // Définir le cookie avec le token d'accès
        res.cookie('supabase-auth-token', (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token, {
            httpOnly: true, // Sécurise le cookie pour ne pas être accessible en JS
            secure: false, // Passez à `true` en production (HTTPS)
            sameSite: 'lax', // Empêche les attaques CSRF tout en autorisant les requêtes cross-origin nécessaires
            maxAge: 60 * 60 * 24 * 7, // Expiration dans 7 jours
        });
        return res.status(200).json({
            message: 'Login successful.',
            user: data.user,
        });
    }
    catch (err) {
        const error = err;
        console.error('Error logging in:', error.message);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}));
// Route pour qu'un utilisateur se déconnecte
router.post('/logout', (req, res) => {
    res.clearCookie('supabase-auth-token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
    return res.status(200).json({ message: "Logout successful." });
});
// Route pour envoyer un mail en cas de mot de passe oublié
router.post('/forgot-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }
    try {
        const { error } = yield supabase.auth.resetPasswordForEmail(email);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(200).json({ message: 'Password reset email sent successfully.' });
    }
    catch (err) {
        console.error("Error sending password reset email:", err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}));
// Route pour vérifier le token
router.post('/verify-token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken, refreshToken } = req.body;
    if (!accessToken || !refreshToken) {
        return res.status(400).json({ error: 'Access and refresh tokens are required.' });
    }
    try {
        const { error } = yield supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
        });
        if (error) {
            return res.status(401).json({ error: 'Invalid or expired token.' });
        }
        return res.status(200).json({ message: 'Token verified.' });
    }
    catch (err) {
        console.error("Error verifying token:", err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}));
// Route pour mettre à jour le mot de passe
router.post('/update-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Password is required.' });
    }
    try {
        const { error } = yield supabase.auth.updateUser({ password });
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(200).json({ message: 'Password updated successfully.' });
    }
    catch (err) {
        console.error("Error updating password:", err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}));
// Route DELETE pour supprimer l'utilisateur connecté
router.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { data: { user }, error: userError } = yield supabase.auth.getUser(token);
        if (userError || !user) {
            return res.status(401).json({ error: 'Unauthorized or user not found' });
        }
        const userId = user.id;
        // Supprimer l'utilisateur de Supabase Auth
        const { error: deleteAuthError } = yield supabaseAdmin.auth.admin.deleteUser(userId);
        if (deleteAuthError) {
            return res.status(500).json({ error: 'Failed to delete user from Supabase Auth' });
        }
        // Supprimer l'utilisateur de la table public.users
        const { error: deleteUserError } = yield supabase
            .from('users')
            .delete()
            .eq('id', userId);
        if (deleteUserError) {
            return res.status(500).json({ error: 'Failed to delete user from database' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}));
export default router;
