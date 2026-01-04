import { openDb } from "../database/sqliteConnection.js";
import { Language } from "../models/language.js";
export class LanguageRepository {
    async getAll() {
        const db = await openDb();
        const rows = await db.all("SELECT * FROM language");
        await db.close();
        return rows.map(
            (r) => new Language(r.id, r.name)
        );
    }
    async create(language) {
        const db = await openDb();
        const { name } = language;
        const result = await db.run(
            `INSERT INTO language (name)
            VALUES (?)`,
            [name]
        );
        await db.close();
        return result.lastID;
    }
    async delete(id) {
        const db = await openDb();
        await db.run("DELETE FROM language WHERE id = ?", [id]);
        await db.close();
    }
}