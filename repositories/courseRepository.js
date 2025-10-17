import { openDb } from "../database/sqliteConnection.js";
import { Course } from "../models/course.js";
export class CourseRepository {
  async getAll() {
    const db = await openDb();
    const rows = await db.all("SELECT * FROM course");
    await db.close();
    return rows.map(
      (r) =>
        new Course(
          r.id,
          r.title,
          r.description,
          r.startDate,
          r.endDate,
          r.status,
          r.cost,
          r.id_mentor,
          r.id_apprentice
        )
    );
  }
  async getById(id) {
    const db = await openDb();
    const r = await db.get("SELECT * FROM course WHERE id = ?", [id]);
    await db.close();
    return r
      ? new Course(
          r.id,
          r.title,
          r.description,
          r.startDate,
          r.endDate,
          r.status,
          r.cost,
          r.id_mentor,
          r.id_apprentice
        )
      : null;
  }
  async create(course) {
    const db = await openDb();
    const {
      title,
      description,
      startDate,
      endDate,
      status,
      cost,
      id_mentor,
      id_apprentice,
    } = course;
    const result = await db.run(
      `INSERT INTO course (title, description, startDate, endDate, status, cost, id_mentor, id_apprentice)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        startDate,
        endDate,
        status,
        cost,
        id_mentor,
        id_apprentice,
      ]
    );
    await db.close();
    return result.lastID;
  }
  async update(id, course) {
    const db = await openDb();
    const {
      title,
      description,
      startDate,
      endDate,
      status,
      cost,
      id_mentor,
      id_apprentice,
    } = course;
    await db.run(
      `UPDATE course SET title = ?, description = ?, startDate = ?, endDate = ?, status = ?, cost = ?, id_mentor = ?, id_apprentice = ? WHERE id = ?`,
      [
        title,
        description,
        startDate,
        endDate,
        status,
        cost,
        id_mentor,
        id_apprentice,
        id,
      ]
    );
    await db.close();
  } 
  async delete(id) {
    const db = await openDb();
    await db.run("DELETE FROM course WHERE id = ?", [id]);
    await db.close();
  }
}