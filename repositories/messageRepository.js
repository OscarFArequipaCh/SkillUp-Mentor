import { openDb } from "../database/sqliteConnection.js";
import { Message } from "../models/message.js";

export class MessageRepository {
    async getAll() {
        const db = await openDb();
        const rows = await db.all("SELECT * FROM message");
        await db.close();
        return rows.map(
            (r) => new Message(r.id, r.content, r.timestamp, r.id_user, r.id_mentor)
        );
    }
    async getById(id) {
        const db = await openDb();
        const r = await db.get("SELECT * FROM message WHERE id = ?", [id]);
        await db.close();
        return r
            ? new Message(r.id, r.content, r.timestamp, r.id_user, r.id_mentor)
            : null;
    }
    async create(message) {
        const db = await openDb();
        const { content, timestamp, id_user, id_mentor } = message;
        const result = await db.run(
            `INSERT INTO message (content, timestamp, id_user, id_mentor)
            VALUES (?, ?, ?, ?)`,
            [content, timestamp, id_user, id_mentor]
        );
        await db.close();
        return result.lastID;
    }
    async update(id, message) {
        const db = await openDb();
        const { content, timestamp, id_user, id_mentor } = message;
        await db.run(
            `UPDATE message SET content = ?, timestamp = ?, id_user = ?, id_mentor = ? WHERE id = ?`,
            [content, timestamp, id_user, id_mentor, id]
        );
        await db.close();
    }
    async delete(id) {
        const db = await openDb();
        await db.run("DELETE FROM message WHERE id = ?", [id]);
        await db.close();
    }
}