import { openDb } from "../database/sqliteConnection.js";
import Apprentice from "../models/apprentice.js";

export class ApprenticeRepository {
  async getAll() {
    const db = await openDb();
    const rows = await db.all("SELECT * FROM apprentice");
    await db.close();
    return rows.map(
      (r) =>
        new Apprentice(
          r.id,
          JSON.parse(r.certificates || "[]"),
          JSON.parse(r.languages || "[]"),
          r.degree,
          r.gender,
          r.discount,
          r.id_user
        )
    );
  }

  async getById(id) {
    const db = await openDb();
    const r = await db.get("SELECT * FROM apprentice WHERE id=?", [id]);
    await db.close();
    return r
      ? new Apprentice(
          r.id,
          JSON.parse(r.certificates || "[]"),
          JSON.parse(r.languages || "[]"),
          r.degree,
          r.gender,
          r.discount,
          r.id_user
        )
      : null;
  }

  async create(apprentice) {
    const db = await openDb();
    const { certificates, languages, degree, gender, discount, id_user } = apprentice;
    const result = await db.run(
      `INSERT INTO apprentice (certificates, languages, degree, gender, discount, id_user)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        JSON.stringify(certificates || []),
        JSON.stringify(languages || []),
        degree,
        gender,
        discount,
        id_user,
      ]
    );
    await db.close();
    return result.lastID;
  }

  async update(id, apprentice) {
    const db = await openDb();
    const { certificates, languages, degree, gender, discount } = apprentice;
    await db.run(
      `UPDATE apprentice SET certificates=?, languages=?, degree=?, gender=?, discount=? WHERE id=?`,
      [
        JSON.stringify(certificates || []),
        JSON.stringify(languages || []),
        degree,
        gender,
        discount,
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
