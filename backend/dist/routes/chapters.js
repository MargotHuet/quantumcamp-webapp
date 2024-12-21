var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "../clientSupabase.js";
import express from "express";
const router = express.Router();
// GET courses title
const coursesQuery = supabase
    .from("courses")
    .select("*");
router.get('/courses', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield coursesQuery;
        if (error) {
            res.status(500).send(error.message);
            return;
        }
        res.json(data);
    });
});
// GET full chapter
const chaptersQuery = supabase
    .from("chapters")
    .select("id, title");
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield chaptersQuery;
        if (error) {
            res.status(500).send(error.message);
            return;
        }
        res.json(data);
    });
});
// GET chapter by Id
router.get('/:chapterId', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { chapterId } = req.params;
        const chapterByIdQuery = supabase
            .from("chapters")
            .select("*")
            .eq("id", chapterId);
        const { data, error } = yield chapterByIdQuery;
        if (error) {
            if (error.code === 'PGRST116') {
                res.status(404).json({ error: "Chapter not found" });
                return;
            }
            res.status(500).json({ error: error.message });
            return;
        }
        if (!data || data.length === 0) {
            res.status(404).json({ error: "Chapter not found" });
            return;
        }
        res.json(data[0]);
    });
});
export default router;
