// models/userModel.js
export class User {
  constructor(id, name, email, password, role, photo, dateCreated, region) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role; // "mentor" | "apprentice" | "admin"
    this.photo = photo;
    this.dateCreated = dateCreated || new Date().toISOString();
    this.region = region;
  }
}

module.exports = User;