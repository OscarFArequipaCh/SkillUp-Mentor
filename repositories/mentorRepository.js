import { openDb } from "../database/sqliteConnection.js";
import Mentor from "../models/mentor.js";

export class MentorRepository {
  async getAll() {
    const db = await openDb();
    const rows = await db.all(`
      SELECT m.*, u.id AS user_id, u.name, u.email, u.photo
      FROM mentor m
      JOIN user u ON u.id = m.id_user
    `);
    await db.close();

    return rows.map(r =>
      new Mentor(
        r.id,
        r.experience,
        JSON.parse(r.schedules || "[]"),
        JSON.parse(r.languages || "[]"),
        JSON.parse(r.certificates || "[]"),
        { id: r.user_id, name: r.name, email: r.email, photo: r.photo }, // <── user object
        r.id_area,
        r.id_pedagogicalMethod
      )
    );
  }

  async getById(id) {
    const db = await openDb();
    const r = await db.get(
      `SELECT m.*, u.id AS user_id, u.name, u.email, u.photo
      FROM mentor m
      JOIN user u ON u.id = m.id_user
      WHERE m.id = ?`,
      [id]
    );
    await db.close();

    return r
      ? new Mentor(
          r.id,
          r.experience,
          JSON.parse(r.schedules || "[]"),
          JSON.parse(r.languages || "[]"),
          JSON.parse(r.certificates || "[]"),
          { id: r.user_id, name: r.name, email: r.email, photo: r.photo },
          r.id_area,
          r.id_pedagogicalMethod
        )
      : null;
  }

  async create(mentor) {
    const db = await openDb();
    const { experience, schedules, languages, certificates, id_user, id_area, id_pedagogicalMethod } = mentor;
    const result = await db.run(
      `INSERT INTO mentor (experience, schedules, languages, certificates, id_user, id_area, id_pedagogicalMethod)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        experience,
        JSON.stringify(schedules || []),
        JSON.stringify(languages || []),
        JSON.stringify(certificates || []),
        id_user,
        id_area,
        id_pedagogicalMethod,
      ]
    );
    await db.close();
    return result.lastID;
  }

  async update(id, mentor) {
    const db = await openDb();
    const { experience, schedules, languages, certificates, id_area, id_pedagogicalMethod } = mentor;
    await db.run(
      `UPDATE mentor SET experience=?, schedules=?, languages=?, certificates=?, id_area=?, id_pedagogicalMethod=?
       WHERE id=?`,
      [
        experience,
        JSON.stringify(schedules || []),
        JSON.stringify(languages || []),
        JSON.stringify(certificates || []),
        id_area,
        id_pedagogicalMethod,
        id,
      ]
    );
    await db.close();
    return true;
  }

  async delete(id) {
    const db = await openDb();
    await db.run("DELETE FROM mentor WHERE id=?", [id]);
    await db.close();
    return true;
  }
}
