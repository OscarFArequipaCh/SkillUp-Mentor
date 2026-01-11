import { openDb } from "../database/sqliteConnection.js";
import { Area } from "../models/area.js";
export class AreaRepository {
    async getAll() {
        const db = await openDb();
        const rows = await db.all("SELECT * FROM area");
        await db.close();

        return rows.map(
            (r) => new Area(r.id, r.name, r.description)
        );
    }

    async getById(id) {
        const db = await openDb();
        const r = await db.get("SELECT * FROM area WHERE id = ?", [id]);
        await db.close();

        return r ? new Area(
            r.id, r.name, r.description
        ) : null;
    }

    async create(area) {
        const db = await openDb();
        const { name, description } = area;
        const result = await db.run(
            `INSERT INTO area (name, description)
            VALUES (?, ?)`,
            [name, description]
        );
        await db.close();

        return result.lastID;
    }

    async update(id, area) {
        const db = await openDb();
        const { name, description } = area;
        await db.run(
            `UPDATE area SET name = ?, description = ? WHERE id = ?`,
            [name, description, id]
        );
        await db.close();

        return true;
    }

    async delete(id) {
        const db = await openDb();
        await db.run("DELETE FROM area WHERE id = ?", [id]);
        await db.close();

        return true;
    }
}