import { openDb } from "../database/sqliteConnection.js";
import { User } from "../models/user.js";
import { Language } from "../models/language.js";

export class UserRepository {
  async getAll() {
    const db = await openDb();
    const rows = await db.all(`
      SELECT 
        u.id AS user_id,
        u.name,
        u.email,
        u.password,
        u.role,
        u.photo,
        u.dateCreated,
        u.region,
        u.gender,
        u.birthDate,
        l.id AS language_id,
        l.name AS language_name
      FROM user u
      LEFT JOIN speak s ON s.id_user = u.id
      LEFT JOIN language l ON l.id = s.id_language
      ORDER BY u.id
    `);
    await db.close();

    const usersMap = new Map();

    for (const r of rows) {
      if (!usersMap.has(r.user_id)) {
        usersMap.set(
          r.user_id,
          new User(
            r.user_id,
            r.name,
            r.email,
            r.password,
            r.role,
            r.photo,
            r.dateCreated,
            r.region,
            r.gender,
            r.birthDate,
            []
          )
        );
      }

      if (r.language_id) {
        usersMap.get(r.user_id).language.push(
          new Language(r.language_id, r.language_name)
        );
      }
    }

    return Array.from(usersMap.values());
  }

  async getById(id) {
    const db = await openDb();

    const rows = await db.all(
    `
    SELECT 
      u.id AS user_id,
      u.name,
      u.email,
      u.password,
      u.role,
      u.photo,
      u.dateCreated,
      u.region,
      u.gender,
      u.birthDate,
      l.id AS language_id,
      l.name AS language_name
    FROM user u
    LEFT JOIN speak s ON s.id_user = u.id
    LEFT JOIN language l ON l.id = s.id_language
    WHERE u.id = ?
    `, [id]
    );

    await db.close();

    if (rows.length === 0) return null;

    const user = new User(
      rows[0].user_id,
      rows[0].name,
      rows[0].email,
      rows[0].password,
      rows[0].role,
      rows[0].photo,
      rows[0].dateCreated,
      rows[0].region,
      rows[0].gender,
      rows[0].birthDate,
      []
    );

    rows.forEach(r => {
      if (r.language_id) {
        user.language.push(
          new Language(r.language_id, r.language_name)
        );
      }
    });

    return user;
  }

  async getByEmail(email) {
    const db = await openDb();
    const r = await db.get("SELECT * FROM user WHERE email = ?", [email]);
    await db.close();
    return r ? new User(r.id, r.name, r.email, r.password, r.role, r.photo, r.dateCreated, r.region, r.gender, r.birthDate) : null;
  }

  async create(user) {
    const db = await openDb();
    const { name, email, password, role, photo, region, gender, birthDate } = user;
    const result = await db.run(
      "INSERT INTO user (name, email, password, role, photo, region, gender, birthDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, email, password, role, photo, region, gender, birthDate]
    );
    await db.close();
    return result.lastID;
  }

  async update(id, user) {
    const db = await openDb();
    const { name, email, password, role, photo, region, gender, birthDate } = user;
    await db.run(
      "UPDATE user SET name=?, email=?, password=?, role=?, photo=?, region=?, gender=?, birthDate=? WHERE id=?",
      [name, email, password, role, photo, region, gender, birthDate, id]
    );
    await db.close();
    return true;
  }

  async delete(id) {
    const db = await openDb();
    await db.run("DELETE FROM user WHERE id = ?", [id]);
    await db.close();
    return true;
  }
}