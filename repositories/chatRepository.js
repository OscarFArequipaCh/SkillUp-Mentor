import { openDb } from "../database/sqliteConnection.js";
import { Chat } from "../models/chat.js";

export class ChatRepository {
  async getAll() {
    const db = await openDb();
    const rows = await db.all(`
      SELECT c.*,
      us.id AS id_sender, us.name AS name_sender,
      ur.id AS id_receiver, ur.name AS name_receiver
      FROM chat c
      JOIN user us ON c.id_sender = us.id
      JOIN user ur ON c.id_receiver = ur.id
    `);
    await db.close();
    return rows.map(
      (r) => new Chat(
        r.id, r.created_at,
        { id: r.id_sender, name: r.name_sender }, // object for sender (user)
        { id: r.id_receiver, name: r.name_receiver } // object for receiver (user)
      )
    );
  }

  async getById(id) {
    const db = await openDb();
    const r = await db.get(`
      SELECT c.*,
      us.id AS id_sender, us.name AS name_sender,
      ur.id AS id_receiver, ur.name AS name_receiver
      FROM chat c
      JOIN user us ON c.id_sender = us.id
      JOIN user ur ON c.id_receiver = ur.id
      WHERE c.id = ?
    `, [id]);

    await db.close();

    return r ? new Chat(
      r.id, r.created_at, 
      { id: r.id_sender, name: r.name_sender }, 
      { id: r.id_receiver, name: r.name_receiver }
    ) : null;
  }

  async create(chat) {
    const db = await openDb();
    const { id_sender, id_receiver } = chat;
    const result = await db.run(`
      INSERT INTO chat (id_sender, id_receiver)
      VALUES (?, ?)
    `, [id_sender, id_receiver]);
    await db.close();
    return result.lastID;
  }

  // ========================================= 
  // metodo update innecesario por el momento 
  // =========================================
  
  // async update(id, chat) {
  //   const db = await openDb();
  //   const { id_sender, id_receiver } = chat;
  //   await db.run(
  //       `UPDATE chat SET id_sender = ?, id_receiver = ? WHERE id = ?`,
  //       [id_sender, id_receiver]
  //   );
  //   await db.close();
  // }

  async delete(id) {
    const db = await openDb();
    await db.run("DELETE FROM chat WHERE id = ?", [id]);
    await db.close();
  }
}
