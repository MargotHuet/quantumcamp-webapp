import { supabaseAdmin as supabase } from "../../backendSupabase.js";
import express from "express";
const usersTestRouter = express.Router();
// POST create user account
usersTestRouter.post('/signup', async function (req, res) {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe requis.' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Les mots de passe ne correspondent pas.' });
    }
    try {
        const { error } = await supabase.auth.admin.createUser({
            email,
            password,
        });
        if (error) {
            if (error.message === "Utilisateur déjà existant") {
                return res.status(400).json({ error: "Email déjà utilisé." });
            }
            return res.status(400).json({ error: `Une erreur est survenue: ${error.message}` });
        }
        return res.status(200).json({ message: "Compte crée. Connectez-vous." });
    }
    catch (err) {
        console.error("Error creating user:", err.message);
        return res.status(500).json({ error: "Internal server error." });
    }
});
export default usersTestRouter;
