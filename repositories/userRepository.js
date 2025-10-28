import { openDb } from "../database/sqliteConnection.js";
import { User } from "../models/user.js";

export class UserRepository {
  async getAll() {
    const db = await openDb();
    const rows = await db.all("SELECT * FROM user");
    await db.close();
    return rows.map(
      (r) =>
        new User(r.id, r.name, r.email, r.password, r.role, r.photo, r.dateCreated, r.region)
    );
  }

  async getById(id) {
    const db = await openDb();
    const r = await db.get("SELECT * FROM user WHERE id = ?", [id]);
    await db.close();
    return r
      ? new User(r.id, r.name, r.email, r.password, r.role, r.photo, r.dateCreated, r.region)
      : null;
  }

  async getByEmail(email) {
    const db = await openDb();
    const r = await db.get("SELECT * FROM user WHERE email = ?", [email]);
    await db.close();
    return r ? new User(r.id, r.name, r.email, r.password, r.role, r.photo, r.dateCreated, r.region) : null;
  }

  async create(user) {
    const db = await openDb();
    const { name, email, password, role, photo, region } = user;
    const result = await db.run(
      "INSERT INTO user (name, email, password, role, photo, region) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, password, role, photo, region]
    );
    await db.close();
    return result.lastID;
  }

  async update(id, user) {
    const db = await openDb();
    const { name, email, password, role, photo, region } = user;
    await db.run(
      "UPDATE user SET name=?, email=?, password=?, role=?, photo=?, region=? WHERE id=?",
      [name, email, password, role, photo, region, id]
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
