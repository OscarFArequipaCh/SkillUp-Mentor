import { openDb } from "../database/sqliteConnection.js";
import { Chat } from "../models/chat.js";

export class ChatRepository {
  async getAll() {
    const db = await openDb();
    const rows = await db.all("SELECT * FROM chat");
    await db.close();
    return rows.map(
      (r) => 
        new Chat(r.id, r.id_sender, r.id_receiver, r.created_at)
    );
  }
    async getById(id) {
    const db = await openDb();
    const r = await db.get("SELECT * FROM chat WHERE id = ?", [id]);
    await db.close();
    return r
      ? new Chat(r.id, r.id_sender, r.id_receiver, r.created_at)
      : null;
  }
    async create(chat) {
    const db = await openDb();
    const { id_sender, id_receiver } = chat;
    const result = await db.run(
        `INSERT INTO chat (id_sender, id_receiver)
            VALUES (?, ?)`,
        [id_sender, id_receiver]
    );
    await db.close();
    return result.lastID;
  }
    async update(id, chat) {
    const db = await openDb();
    const { id_sender, id_receiver } = chat;
    await db.run(
        `UPDATE chat SET id_sender = ?, id_receiver = ? WHERE id = ?`,
        [id_sender, id_receiver]
    );
    await db.close();
  }
    async delete(id) {
    const db = await openDb();
    await db.run("DELETE FROM chat WHERE id = ?", [id]);
    await db.close();
  }
}
