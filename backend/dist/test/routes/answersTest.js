import { supabaseAdmin as supabase } from "../../backendSupabase.js";
import express from "express";
const testRouter = express.Router();
// GET quiz question 
testRouter.get("/quiz/:chapterId", async function (req, res) {
    const { chapterId } = req.params;
    console.log("Received test chapterId:", chapterId);
    const { data: question, error } = await supabase
        .from("chapters")
        .select("question")
        .eq("id", chapterId);
    console.log("Supabase test DB returned:", question, "Error:", error);
    const { data: chapter, error: chapterError } = await supabase
        .from("chapters")
        .select("*")
        .eq("id", chapterId);
    console.log("🔍 Full chapter data:", chapter, "Error:", chapterError);
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    if (!question || question.length === 0) {
        return res.status(404).json({ error: "No question found for this chapter" });
    }
    res.status(200).json(question[0]);
});
export default testRouter;
