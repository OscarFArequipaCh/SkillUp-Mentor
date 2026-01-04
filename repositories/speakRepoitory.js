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

    async replaceUserLanguages(userId, languages = []) {
        const db = await openDb();
        await db.run("DELETE FROM speak WHERE id_user = ?", [userId]);
        for (const lang of languages) {
            await db.run(
                "INSERT INTO speak (id_user, id_language) VALUES (?, ?)",
                [userId, lang]
            );
        }
    }

}