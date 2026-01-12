import { openDb } from "../database/sqliteConnection.js";
import { Message } from "../models/message.js";

export class MessageRepository {
    async getAll() {
        const db = await openDb();
        const rows = await db.all(`
            SELECT m.*,
            u.id AS id_user, u.name AS name_user,
            c.id AS id_chat
            FROM message m
            JOIN user u ON m.id_user = u.id
            JOIN chat c ON m.id_chat = c.id
        `);
        await db.close();

        return rows.map(
            (r) => new Message(
                r.id, r.content, r.datePublished, r.is_read,
                { id: r.id_chat }, // chat object
                { id: r.id_user, name: r.name_user } // user object
            )
        );
    }

    async getById(id) {
        const db = await openDb();
        const r = await db.get(`
            SELECT m.*,
            u.id AS id_user,
            c.id AS id_chat
            FROM message m
            JOIN user u ON m.id_user = u.id
            JOIN chat c ON m.id_chat = c.id
            WHERE m.id = ?
        `, [id]);
        await db.close();
        return r ? new Message(
            r.id, r.content, r.datePublished, r.is_read,
            { id: r.id_chat }, // chat object
            { id: r.id_user } // user object
        ) : null;
    }

    // async getByUser(id_user) {
    //     const db = await openDb();
    //     const r = await db.get(`
    //         SELECT m.*,
    //         u.id AS id_user,
    //         c.id AS id_chat
    //         FROM message m
    //         JOIN user u ON m.id_user = u.id
    //         JOIN chat c ON m.id_chat = c.id
    //         WHERE u.id = ?
    //     `, [id_user]);
    //     await db.close();
    //     return r ? new Message(
    //         r.id, r.content, r.datePublished, r.is_read,
    //         { id: r.id_chat },
    //         { id: r.id_user }
    //     ) : null;
    // }
    
    async create(message) {
        const db = await openDb();
        const { content, datePublished, is_read, id_chat, id_user } = message;
        const result = await db.run(`
            INSERT INTO message (content, datePublished, is_read, id_chat, id_user)
            VALUES (?, ?, ?, ?, ?)
        `, [content, datePublished, is_read, id_chat, id_user]);
        await db.close();
        return result.lastID;
    }

    async update(id, message) {
        const db = await openDb();
        const { content, datePublished, is_read } = message;
        await db.run(
            `UPDATE message SET content = ?, datePublished = ?, is_read = ? WHERE id = ?`,
            [content, datePublished, is_read, id]
        );
        await db.close();

        return true;
    }

    async delete(id) {
        const db = await openDb();
        await db.run("DELETE FROM message WHERE id = ?", [id]);
        await db.close();
        return true;
    }
}