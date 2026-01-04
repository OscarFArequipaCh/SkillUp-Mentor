import { openDb } from "../database/sqliteConnection.js";
import Mentor from "../models/mentor.js";

export class MentorRepository {
  async getAll() {
    const db = await openDb();
    const rows = await db.all(`
      SELECT m.*, 
      u.id AS user_id, u.name AS user_name, u.email, u.photo,
      a.id AS id_area, a.name AS area_name, a.description AS area_description,
      p.id AS id_pedagogicalMethod, p.name AS pedagogicalMethod_name, p.description AS pedagogicalMethod_description
      FROM mentor m
      JOIN user u ON u.id = m.id_user
      JOIN area a ON a.id = m.id_area
      JOIN pedagogicalMethod p ON p.id = m.id_pedagogicalMethod
    `);
    await db.close();

    return rows.map(r =>
      new Mentor(
        r.id,
        r.profile,
        //JSON.parse(r.schedules || "[]"),
        //JSON.parse(r.languages || "[]"),
        //JSON.parse(r.certificates || "[]"),
        { id: r.user_id, name: r.user_name, email: r.email, photo: r.photo }, // <── user object
        { id: r.id_area, name: r.area_name, description: r.area_description }, // <── area object
        { id: r.id_pedagogicalMethod, name: r.pedagogicalMethod_name, description: r.pedagogicalMethod_description } // <── pedagogicalMethod object
      )
    );
  }

  async getById(id) {
    const db = await openDb();
    const r = await db.get(
      `SELECT m.*, 
      u.id AS user_id, u.name AS user_name, u.email, u.photo,
      a.id AS id_area, a.name AS area_name, a.description AS area_description,
      p.id AS id_pedagogicalMethod, p.name AS pedagogicalMethod_name, p.description AS pedagogicalMethod_description
      FROM mentor m
      JOIN user u ON u.id = m.id_user
      JOIN area a ON a.id = m.id_area
      JOIN pedagogicalMethod p ON p.id = m.id_pedagogicalMethod
      WHERE m.id = ?`,
      [id]
    );
    await db.close();

    return r
      ? new Mentor(
          r.id,
          r.profile,
          //JSON.parse(r.schedules || "[]"),
          //JSON.parse(r.languages || "[]"),
          //JSON.parse(r.certificates || "[]"),
          { id: r.user_id, name: r.user_name, email: r.email, photo: r.photo },
          { id: r.id_area, name: r.area_name, description: r.area_description },
          { id: r.id_pedagogicalMethod, name: r.pedagogicalMethod_name, description: r.pedagogicalMethod_description }
        )
      : null;
  }

  async getByArea(area_name) {
    const db = await openDb();
    const rows = await db.all(
      `SELECT m.*,
      u.id AS user_id, u.name AS user_name, u.email, u.photo,
      a.id AS id_area, a.name AS area_name, a.description AS area_description,
      p.id AS id_pedagogicalMethod, p.name AS pedagogicalMethod_name, p.description AS pedagogicalMethod_description
      FROM mentor m
      JOIN user u ON u.id = m.id_user
      JOIN area a ON a.id = m.id_area
      JOIN pedagogicalMethod p ON p.id = m.id_pedagogicalMethod
      WHERE a.area_name = ?`,
      [area_name]
    );
    await db.close();

    return r
      ? new Mentor(
          r.id,
          r.profile,
          //r.experience,
          //JSON.parse(r.schedules || "[]"),
          //JSON.parse(r.languages || "[]"),
          //JSON.parse(r.certificates || "[]"),
          { id: r.user_id, name: r.user_name, email: r.email, photo: r.photo },
          { id: r.id_area, name: r.area_name, description: r.area_description },
          { id: r.id_pedagogicalMethod, name: r.pedagogicalMethod_name, description: r.pedagogicalMethod_description }
        )
      : null;
  }

  async create(mentor) {
    const db = await openDb();
    const { profile, id_user, id_area, id_pedagogicalMethod } = mentor;
    const result = await db.run(
      `INSERT INTO mentor (profile, id_user, id_area, id_pedagogicalMethod)
       VALUES (?, ?, ?, ?)`,
      [
        profile,
        // experience,
        // JSON.stringify(schedules || []),
        // JSON.stringify(languages || []),
        // JSON.stringify(certificates || []),
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
    const { profile, id_area, id_pedagogicalMethod } = mentor;
    await db.run(
      `UPDATE mentor SET profile=?, id_area=?, id_pedagogicalMethod=?
       WHERE id=?`,
      [
        profile,
        // experience,
        // JSON.stringify(schedules || []),
        // JSON.stringify(languages || []),
        // JSON.stringify(certificates || []),
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
