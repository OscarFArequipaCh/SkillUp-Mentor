import { openDb } from "../database/sqliteConnection.js";
import Mentor from "../models/mentor.js";

export class MentorRepository {
  async getAll() {
    const db = await openDb();
    const rows = await db.all("SELECT * FROM mentor");
    await db.close();
    return rows.map(
      (r) =>
        new Mentor(
          r.id,
          r.experience,
          JSON.parse(r.schedules || "[]"),
          JSON.parse(r.languages || "[]"),
          JSON.parse(r.certificates || "[]"),
          r.id_user,
          r.id_area,
          r.id_pedagogicalMethod
        )
    );
  }

  async getById(id) {
    const db = await openDb();
    const r = await db.get("SELECT * FROM mentor WHERE id = ?", [id]);
    await db.close();
    return r
      ? new Mentor(
          r.id,
          r.experience,
          JSON.parse(r.schedules || "[]"),
          JSON.parse(r.languages || "[]"),
          JSON.parse(r.certificates || "[]"),
          r.id_user,
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
