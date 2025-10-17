import { openDb } from "../database/sqliteConnection.js";
import { Chat } from "../models/chat.js";

export class ChatRepository {
  async getAll() {
    const db = await openDb();
    const rows = await db.all("SELECT * FROM chat");
    await db.close();
    return rows.map(
      (r) => 
        new Chat(r.id, r.message, r.timestamp, r.id_user, r.id_mentor)
    );
  }
    async getById(id) {
    const db = await openDb();
    const r = await db.get("SELECT * FROM chat WHERE id = ?", [id]);
    await db.close();
    return r
      ? new Chat(r.id, r.message, r.timestamp, r.id_user, r.id_mentor)
      : null;
  }
    async create(chat) {
    const db = await openDb();
    const { message, timestamp, id_user, id_mentor } = chat;
    const result = await db.run(
        `INSERT INTO chat (message, timestamp, id_user, id_mentor)
            VALUES (?, ?, ?, ?)`,
        [message, timestamp, id_user, id_mentor]
    );
    await db.close();
    return result.lastID;
  }
    async update(id, chat) {
    const db = await openDb();
    const { message, timestamp, id_user, id_mentor } = chat;
    await db.run(
        `UPDATE chat SET message = ?, timestamp = ?, id_user = ?, id_mentor = ? WHERE id = ?`,
        [message, timestamp, id_user, id_mentor, id]
    );
    await db.close();
  }
    async delete(id) {
    const db = await openDb();
    await db.run("DELETE FROM chat WHERE id = ?", [id]);
    await db.close();
  }
}
