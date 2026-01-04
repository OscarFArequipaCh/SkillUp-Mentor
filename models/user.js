// models/userModel.js
export class User {
  constructor(id, name, email, password, role, photo, dateCreated, region, gender, birthDate, language = []) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role; // "user" | "admin"
    this.photo = photo;
    this.dateCreated = dateCreated || new Date().toISOString();
    this.region = region;
    this.gender = gender; // "M" | "F"
    this.birthDate = birthDate;
    this.language = language; // Array of language IDs
  }
}
