import { openDb } from "../database/sqliteConnection.js";
import Apprentice from "../models/apprentice.js";

export class ApprenticeRepository {
  async getAll() {
    const db = await openDb();
    const rows = await db.all(`
      SELECT a.*, u.id as uid, u.name, u.email, u.photo
      FROM apprentice a
      JOIN user u ON a.id_user = u.id
    `);
    await db.close();

    return rows.map((r) =>
      new Apprentice(
        r.id,
        r.degree,
        r.id_user,
        {
          id: r.uid,
          name: r.name,
          email: r.email,
          photo: r.photo
        }
      )
    );
  }

  async getById(id) {
    const db = await openDb();
    const r = await db.get(`
      SELECT a.*, u.id as uid, u.name, u.email, u.photo
      FROM apprentice a
      JOIN user u ON a.id_user = u.id
      WHERE a.id = ?
    `, [id]);
    await db.close();

    return r
      ? new Apprentice(
          r.id,
          r.degree,
          r.id_user,
          {
            id: r.uid,
            name: r.name,
            email: r.email,
            photo: r.photo
          }
        )
      : null;
  }

  async create(apprentice) {
    const db = await openDb();
    const { degree, id_user } = apprentice;
    const result = await db.run(
      `INSERT INTO apprentice (degree, id_user)
       VALUES (?, ?)`,
      [
        degree,
        id_user,
      ]
    );
    await db.close();
    return result.lastID;
  }

  async update(id, apprentice) {
    const db = await openDb();
    const { degree } = apprentice;
    await db.run(
      `UPDATE apprentice SET degree=? WHERE id=?`,
      [
        degree,
        id,
      ]
    );
    await db.close();
    return true;
  }

  async delete(id) {
    const db = await openDb();
    await db.run("DELETE FROM apprentice WHERE id=?", [id]);
    await db.close();
    return true;
  }
}
