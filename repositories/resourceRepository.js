import { openDb } from "../database/sqliteConnection.js";
import { Resource } from "../models/resource.js";

export class ResourceRepository {
    async getAll() {
        const db = await openDb();
        const rows = await db.all("SELECT * FROM resource");
        await db.close();
        return rows.map(
            (r) =>
                new Resource(
                    r.id,
                    r.title,
                    r.description,
                    r.url,
                    r.id_course
                )
        );
    }
    async getById(id) {
        const db = await openDb();
        const r = await db.get("SELECT * FROM resource WHERE id = ?", [id]);
        await db.close();
        return r
            ? new Resource(
                r.id,
                r.title,
                r.description,
                r.url,
                r.id_course
            )
            : null;
    }
    async create(resource) {
        const db = await openDb();
        const { title, description, url, id_course } = resource;
        const result = await db.run(
            `INSERT INTO resource (title, description, url, id_course)
            VALUES (?, ?, ?, ?)`,
            [title, description, url, id_course]
        );
        await db.close();
        return result.lastID;
    }
    async update(id, resource) {
        const db = await openDb();
        const { title, description, url, id_course } = resource;
        await db.run(
            `UPDATE resource SET title = ?, description = ?, url = ?, id_course = ? WHERE id = ?`,
            [title, description, url, id_course, id]
        );
        await db.close();
    }
    async delete(id) {
        const db = await openDb();
        await db.run("DELETE FROM resource WHERE id = ?", [id]);
        await db.close();
    }
}