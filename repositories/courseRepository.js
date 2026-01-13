import { openDb } from "../database/sqliteConnection.js";
import { Course } from "../models/course.js";

export class CourseRepository {
  async getAll() {
    const db = await openDb();
    const rows = await db.all(`
      SELECT c.*,
      m.id AS mentor_id, m.id_user AS id_mentor_user,
      u.id AS user_id, u.name AS user_name, u.email
      FROM course c
      JOIN mentor m ON c.id_mentor = mentor_id
      JOIN user u ON id_mentor_user = user_id
    `);
    await db.close();

    return rows.map(
      (r) => new Course(
        r.id, r.title, r.description, r.startDate, r.endDate, r.status, r.cost,
        { id: r.id_mentor, name: r.user_name, email: r.email }
      )
    );
  }

  async getById(id) {
    const db = await openDb();
    const r = await db.get(`
      SELECT c.*,
      m.id AS mentor_id, m.id_user AS id_mentor_user,
      u.id AS user_id, u.name AS user_name, u.email
      FROM course c
      JOIN mentor m ON c.id_mentor = mentor_id
      JOIN user u ON id_mentor_user = user_id
      WHERE c.id = ?
    `, [id]);
    await db.close();

    return r ? new Course(
      r.id, r.title, r.description, r.startDate, r.endDate, r.status, r.cost,
      { id: r.id_mentor, name: r.user_name, email: r.email }
    ) : null;
  }

  async create(course) {
    const db = await openDb();
    const { title, description, startDate, endDate, status, cost, id_mentor } = course;
    const result = await db.run(`
      INSERT INTO course (title, description, startDate, endDate, status, cost, id_mentor)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [ title, description, startDate, endDate, status, cost, id_mentor ]);
    await db.close();

    return result.lastID;
  }

  async update(id, course) {
    const db = await openDb();
    const { title, description, startDate, endDate, status, cost, id_mentor } = course;
    await db.run(`
      UPDATE course SET title = ?, description = ?, startDate = ?, endDate = ?, status = ?, cost = ?, id_mentor = ? 
      WHERE id = ?
    `, [ title, description, startDate, endDate, status, cost, id_mentor, id ]);
    await db.close();

    return true;
  }

  async delete(id) {
    const db = await openDb();
    await db.run("DELETE FROM course WHERE id = ?", [id]);
    await db.close();
  }
}