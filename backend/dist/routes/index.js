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
import express from 'express';
const router = express.Router();
/* GET home page. */
router.get('/', function (req, res) {
    res.send({ key: 'value' });
});
/* GET about page. */
router.get('/about', function (req, res) {
    res.send({ key: 'value' });
});
/* GET courses title. */
router.get('/courses', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: course, error } = yield supabase
            .from('course')
            .select('*');
        if (error) {
            return res.status(500).send(error.message);
        }
        res.send(course);
    });
});
export default router;
