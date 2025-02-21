import dotenv from "dotenv";
import request from "supertest";
import express from "express";
import { supabaseAdmin } from "../dist/backendSupabase.js";
import usersTestRouter from "./routes/usersTest.js";
import { seedTestDatabase } from "../dist/test/seedTestDb.js";
dotenv.config({ path: ".env.test" });
const app = express();
app.use(express.json());
app.use('/usersTestRouter', usersTestRouter);
let server;
let data;
beforeAll(async () => {
    server = app.listen(process.env.PORT || 6001, () => {
        console.log(`Server started on port ${process.env.PORT || 6001}`);
    });
    data = await seedTestDatabase();
    console.log("Data received: ", data);
});
afterAll(async () => {
    console.log("🛑 Cleaning up test environment...");
    // Supprimer les données de test de la base de données
    await supabaseAdmin.from("users").delete().neq("id", "");
    // Fermer le serveur Express
    if (server) {
        await new Promise((resolve) => server.close(() => resolve()));
        console.log("🛑 Server closed.");
    }
    // Attendre pour s'assurer que tout est proprement fermé
    await new Promise((resolve) => setTimeout(resolve, 1000));
});
describe("POST /signup", () => {
    it("it should create a user account", async () => {
        const response = await request(app)
            .post('/usersTestRouter/signup')
            .send({
            name: "Test User",
            email: "test2@example.com",
            password: "password123",
            confirmPassword: "password123"
        });
        console.log(response);
        expect(response.status).toBe(200);
    });
});
