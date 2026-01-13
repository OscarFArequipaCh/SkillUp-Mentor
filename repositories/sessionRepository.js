import { openDb } from "../database/sqliteConnection.js";
import { Session } from "../models/session.js";
export class SessionRepository {
  async getAll() {
    const db = await openDb();
    const rows = await db.all(`
      SELECT s.*,
      c.id AS id_course, c.tittle
      FROM session s
      JOIN course c ON s.id_course = c.id
    `);
    await db.close();
    return rows.map(
      (r) => new Session(
        r.id, r.startDate, r.mode, r.duration, r.status, 
        { id: r.id_course, title: r.tittle }
      )
    );
  }

  async getById(id) {
    const db = await openDb();
    const r = await db.get(`
      SELECT s.*,
      c.id AS id_course, c.tittle
      FROM session s
      JOIN course c ON s.id_course = c.id 
      WHERE s.id = ?     
    `, [id]);
    await db.close();
    return r ? new Session(
      r.id, r.startDate, r.mode, r.duration, r.status, 
      { id: r.id_course, title: r.tittle }
    ) : null;
  }

  async create(session) {
    const db = await openDb();
    const { startDate, mode, duration, status, id_course } = session;
    const result = await db.run(`
      INSERT INTO session (startDate, mode, duration, status, id_course)
      VALUES (?, ?, ?, ?, ?)
    `, [startDate, mode, duration, status, id_course]);
    await db.close();

    return result.lastID;
  }

  async update(id, session) {
    const db = await openDb();
    const { startDate, mode, duration, status, id_course } = session;
    await db.run(`
      UPDATE session 
      SET startDate = ?, mode = ?, duration = ?, status = ?, id_course = ? 
      WHERE id = ?
    `, [startDate, mode, duration, status, id_course, id]);
    await db.close();
  }

  async delete(id) {
    const db = await openDb();
    await db.run("DELETE FROM session WHERE id = ?", [id]);
    await db.close();
  }
}
