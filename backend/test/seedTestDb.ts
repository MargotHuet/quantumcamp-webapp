import { readFileSync } from "fs";
import postgres from "postgres";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config({ path: ".env.test" });

const sql = postgres(process.env.DATABASE_URL!); // Connexion avec le client PostgreSQL

async function seedTestDatabase(): Promise<string> {
  console.log("🌱 Seeding test database...");

  // Lire le fichier SQL
  const query = readFileSync("test/seedTestDb.sql", { encoding: "utf-8" });

  try {
    await sql.unsafe(query); // Exécution du script SQL
    console.log("✅ Test database seeded successfully.");

    // Récupérer l'ID du chapitre inséré
    const chapterId = "88888888-8888-8888-8888-888888888888";

   return chapterId;
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    console.log("🔄 Database connection remains open for tests");
  }
}

// Fermeture de la connexion à la base de données après tous les tests
afterAll(async () => {
  console.log("🛑 Closing PostgreSQL connection...");
  await sql.end();
});

export { seedTestDatabase };
