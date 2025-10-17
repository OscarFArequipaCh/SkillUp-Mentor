import { openDb } from "../database/sqliteConnection.js";
import { Rating } from "../models/rating.js";

export class RatingRepository {
    async getAll() {
        const db = await openDb();
        const rows = await db.all("SELECT * FROM rating");
        await db.close();
        return rows.map(
            (r) => new Rating(r.id, r.score, r.comment, r.id_user, r.id_course)
        );
    }
    async getById(id) {
        const db = await openDb();
        const r = await db.get("SELECT * FROM rating WHERE id = ?", [id]);
        await db.close();
        return r
            ? new Rating(r.id, r.score, r.comment, r.id_user, r.id_course)
            : null;
    }
    async create(rating) {
        const db = await openDb();
        const { score, comment, id_user, id_course } = rating;
        const result = await db.run(
            `INSERT INTO rating (score, comment, id_user, id_course)
            VALUES (?, ?, ?, ?)`,
            [score, comment, id_user, id_course]
        );
        await db.close();
        return result.lastID;
    }
    async update(id, rating) {
        const db = await openDb();
        const { score, comment, id_user, id_course } = rating;
        await db.run(
            `UPDATE rating SET score = ?, comment = ?, id_user = ?, id_course = ? WHERE id = ?`,
            [score, comment, id_user, id_course, id]
        );
        await db.close();
    }
    async delete(id) {
        const db = await openDb();
        await db.run("DELETE FROM rating WHERE id = ?", [id]);
        await db.close();
    }
}