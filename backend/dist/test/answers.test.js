import dotenv from "dotenv";
import request from "supertest";
import express from "express";
import { supabaseAdmin } from "../dist/backendSupabase.js";
import testRouter from "../test/routes/answersTest.js";
import { seedTestDatabase } from "../dist/test/seedTestDb.js";
// Charger les variables d'environnement
dotenv.config({ path: ".env.test" });
const app = express();
app.use(express.json());
app.use('/answersTest', testRouter);
let chapterId;
let server;
beforeAll(async () => {
    server = app.listen(process.env.PORT || 6000, () => {
        console.log(`Server started on port ${process.env.PORT || 6000}`);
    });
    chapterId = await seedTestDatabase();
    console.log("Chapter ID for tests:", chapterId); // Afficher l'ID du chapitre pour le test
});
afterAll(async () => {
    console.log("🛑 Cleaning up test environment...");
    // Supprimer les données de test de la base de données
    await supabaseAdmin.from("answers").delete().neq("id", "");
    // Fermer le serveur Express
    if (server) {
        await new Promise((resolve) => server.close(() => resolve()));
        console.log("🛑 Server closed.");
    }
    // Attendre pour s'assurer que tout est proprement fermé
    await new Promise((resolve) => setTimeout(resolve, 1000));
});
describe("GET /quiz/:chapterId", () => {
    it("should return the quiz question for a valid chapterId", async () => {
        console.log("Testing with Chapter ID:", chapterId);
        const res = await request(app).get(`/answersTest/quiz/${chapterId}`);
        console.log("Response received:", res.statusCode, res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ question: "Qu’est-ce qu’un qubit?" });
    });
});
describe("GET /answers/:chapterId", () => {
    it("should return the answers for a valid chapterId", async () => {
        console.log("Testing with Chapter ID:", chapterId);
        const res = await request(app).get(`/answersTest/answers/${chapterId}`);
        console.log('Reponse recieved:', res.statusCode, res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([{ "possible_answer": "Superposition de 0 et de 1" }, { "possible_answer": "Utilisation de bits (0 et 1)" }, { "possible_answer": "Superposition de qubits" }, { "possible_answer": "Utilisation de 0 ou de 1" }]);
    });
});
