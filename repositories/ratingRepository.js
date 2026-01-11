import { openDb } from "../database/sqliteConnection.js";
import { Rating } from "../models/rating.js";

export class RatingRepository {
    async getAll() {
        const db = await openDb();
        const rows = await db.all(`
        SELECT r.*,
        u.id AS user_id, u.name AS user_name, u.email
        FROM rating r
        JOIN user u ON u.id = r.id_user
        `);
        await db.close();
        return rows.map(r => 
            new Rating(
                r.id, r.score, r.comment, r.date, r.ratedBy,
                { id: r.user_id, name: r.user_name, email: r.email}
            )
        );
    }
    
    async getById(id) {
        const db = await openDb();
        const r = await db.get(`
        SELECT r.*,
        u.id AS user_id, u.name AS user_name, u.email
        FROM rating r
        JOIN user u ON u.id = r.id_user
        WHERE r.id = ?
        `, [id]);
        await db.close();
        return r
            ? new Rating(r.id, r.score, r.comment, r.ratedBy,  r.id_user, 
                { id: r.user_id, name: r.user_name, email: r.email })
            : null;
    }

    async getByUser(userId) {
        const db = await openDb();
        const rows = await db.all(`
        SELECT r.*,
        u.id AS user_id, u.name AS user_name, u.email
        FROM rating r
        JOIN user u ON u.id = r.id_user
        WHERE r.id_user = ?
        `, [userId]);
        await db.close();
        return rows.map(
            (r) => new Rating(
                r.id, r.score, r.comment, r.date, r.ratedBy,
                { id: r.user_id, name: r.user_name, email: r.email}
            )
        );
    }

    async create(rating) {
        const db = await openDb();
        const { score, comment, ratedBy, id_user } = rating;
        const result = await db.run(
            `INSERT INTO rating (score, comment, ratedBy, id_user)
            VALUES (?, ?, ?, ?)`,
            [score, comment, ratedBy, id_user]
        );
        await db.close();
        return result.lastID;
    }

    async update(id, rating) {
        const db = await openDb();
        const { score, comment, ratedBy } = rating;
        await db.run(
            `UPDATE rating SET score = ?, comment = ?, ratedBy = ? WHERE id = ?`,
            [score, comment, ratedBy, id]
        );
        await db.close();

        return true;
    }

    async delete(id) {
        const db = await openDb();
        await db.run("DELETE FROM rating WHERE id = ?", [id]);
        await db.close();

        return true;
    }
}