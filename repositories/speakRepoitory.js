import { openDb } from "../database/sqliteConnection.js";

export class SpeakRepository {
    async addLanguagesToUser(userId, languageIds = []) {
        const db = await openDb();

        for (const langId of languageIds) {
            await db.run(
            "INSERT INTO speak (id_user, id_language) VALUES (?, ?)",
            [userId, langId]
            );
        }

        await db.close();
    }
}