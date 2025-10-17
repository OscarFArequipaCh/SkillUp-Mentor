import fs from "fs";
import path from "path";
import { openDb } from "./sqliteConnection.js";

async function initDatabase() {
  const db = await openDb();
  const schemaPath = path.resolve("./database/schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");
  await db.exec(schema);
  console.log("✅ Base de datos inicializada correctamente");
  await db.close();
}

initDatabase().catch((err) => console.error("❌ Error al inicializar DB:", err));
