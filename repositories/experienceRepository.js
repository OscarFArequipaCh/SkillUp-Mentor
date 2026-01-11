import { openDb } from "../database/sqliteConnection.js";
import { Experience } from "../models/experience.js";

export class ExperienceRepository {
    async getAll() {
        const db = await openDb();
        const rows = await db.all(`
            SELECT e.*,
            m.id AS mentor_id, m.id_user AS id_mentor_user,
            u.id AS user_id, u.name AS user_name, u.email
            FROM experience e
            JOIN mentor m ON e.id_mentor = mentor_id
            JOIN user u ON id_mentor_user = user_id
        `);
        await db.close();
        return rows.map(
            (r) => new Experience(
                r.id, r.company, r.position, r.description, r.dateStart, r.dateFinish,
                { id: r.id_mentor, name: r.user_name, email: r.email }
            )
        );
    }

    async getById(id) {
        const db = await openDb();
        const r = await db.get(`
            SELECT e.*,
            m.id AS mentor_id, m.id_user AS id_mentor_user,
            u.id AS user_id, u.name AS user_name, u.email
            FROM experience e
            JOIN mentor m ON e.id_mentor = mentor_id
            JOIN user u ON id_mentor_user = user_id
            WHERE e.id = ?
        `, [id]);
        await db.close();

        return r ? new Experience(
            r.id, r.company, r.position, r.description, r.dateStart, r.dateFinish,
            { id: r.id_mentor, name: r.user_name, email: r.email }
        ) : null;
    }

    async create(experience) {
        const db = await openDb();
        const { company, position, description, dateStart, dateFinish, id_mentor } = experience;
        const result = await db.run(
            `INSERT INTO experience (company, position, description, dateStart, dateFinish, id_mentor)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [company, position, description, dateStart, dateFinish, id_mentor]
        );
        await db.close();

        return result.lastID;
    }

    async update(id, experience) {
        const db = await openDb();
        const { company, position, description, dateStart, dateFinish } = experience;
        await db.run(
            `UPDATE experience
             SET company = ?, position = ?, description = ?, dateStart = ?, dateFinish = ?
             WHERE id = ?`,
            [company, position, description, dateStart, dateFinish, id]
        );
        await db.close();

        return true;
    }

    async delete(id) {
        const db = await openDb();
        await db.run(
            `DELETE FROM experience WHERE id = ?`,
            [id]
        );
        await db.close();

        return true;
    }
}