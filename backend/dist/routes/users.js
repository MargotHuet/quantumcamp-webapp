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
//import deleteUser from './deleteUser.js';
import { supabase } from '../clientSupabase';
//import { supabaseAdmin } from '../backendSupabase.js'; // Si utilisé
const router = express.Router();
// Route GET pour récupérer les informations d'un utilisateur connecté
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = "0669b347-6cbf-43c6-960e-1ee6b68e1869";
        // Récupération de l'utilisateur
        const { data: { user }, error, } = yield supabase.auth.admin.getUserById(uid);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        if (user) {
            console.log(user);
            return res.status(200).json(user);
        }
        return res.status(404).json({ message: 'User not found' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Route DELETE pour supprimer un utilisateur connecté
router.delete('/delete-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }
        // Obtenir l'utilisateur connecté via son token
        const { data: { user }, error: userError, } = yield supabase.auth.getUser(token);
        if (userError || !user) {
            return res.status(401).json({ error: 'Unauthorized or session missing' });
        }
        const userId = user.id;
        // Supprimer l'utilisateur via l'Admin API
        const { error: deleteUserError } = yield supabase.auth.admin.deleteUser(userId);
        if (deleteUserError) {
            return res.status(400).json({ error: deleteUserError.message });
        }
        return res.status(200).json({ message: 'User and associated data deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
export default router;