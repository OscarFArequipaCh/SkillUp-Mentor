import { openDb } from "../database/sqliteConnection.js";
import { PedagogicalMethod } from "../models/pedagogicalMethod.js";

export class PedagogicalMethodRepository {
    async getAll() {
        const db = await openDb();
        const rows = await db.all("SELECT * FROM pedagogicalMethod");
        await db.close();
        return rows.map(
            (r) => new PedagogicalMethod(r.id, r.name, r.description)
        );
    }
    async getById(id) {
        const db = await openDb();
        const r = await db.get("SELECT * FROM pedagogicalMethod WHERE id = ?", [id]);
        await db.close();
        return r ? new PedagogicalMethod(
            r.id, r.name, r.description
        ) : null;
    }
    async create(pedagogicalMethod) {
        const db = await openDb();
        const { name, description } = pedagogicalMethod;
        const result = await db.run(
            `INSERT INTO pedagogicalMethod (name, description)
            VALUES (?, ?)`,
            [name, description]
        );

        await db.close();
        return result.lastID;
    }
    async update(id, pedagogicalMethod) {
        const db = await openDb();
        const { name, description } = pedagogicalMethod;
        await db.run(
            `UPDATE pedagogicalMethod SET name = ?, description = ? WHERE id = ?`,
            [name, description, id]
        );
        await db.close();

        return true;
    }
    async delete(id) {
        const db = await openDb();
        await db.run("DELETE FROM pedagogicalMethod WHERE id = ?", [id]);
        await db.close();

        return true;
    }
}