// service/userService.js
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserRepository } from "../repositories/userRepository.js";
import { SpeakRepository } from "../repositories/speakRepoitory.js";
import { User } from "../models/user.js";

dotenv.config();
export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.speakRepository = new SpeakRepository();
    this.uploadDir = path.join(process.cwd(), "public", "uploads", "users");
    // asegurar existencia (redundante con middleware, pero seguro)
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async getAllUsers() {
    return await this.userRepository.getAll();
  }

  async getUserById(id) {
    if (!id) throw new Error("User ID is required");
    const user = await this.userRepository.getById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async getUserByEmail(data) {
    const { email, password } = data;
    if (!email || !password) throw new Error("Email and password are required");

    const user = await this.userRepository.getByEmail(email);
    if (!user) throw new Error("Incorrect Email");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Incorrect password");

    // ✅ Crear token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    // ✅ Devolver datos sin contraseña
    return {
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        role: user.role,
        region: user.region,
        dateCreated: user.dateCreated,
        gender: user.gender,
        birthDate: user.birthDate
      }
    };
  }

  async createUser(data, file) {
    if (!data.name || !data.email || !data.password) {
      throw new Error("Name, email, and password are required");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    let photoPath = null;
    if (file && file.filename) {
      // multer already saved the file into uploadDir with filename
      photoPath = `/uploads/users/${file.filename}`;
    }

    const newUser = new User(
      null,
      data.name,
      data.email,
      hashedPassword,
      data.role || "user",
      photoPath,
      new Date().toISOString(),
      data.region || "unspecified",
      data.gender,
      data.birthDate || null
    );

    // ===== Falta optimizar el envio de lenguajes =====

    const id = await this.userRepository.create(newUser);
    if (data.language && Array.isArray(data.language)) {
      await this.speakRepository.addLanguagesToUser(id, data.language);
    }
    newUser.id = id;
    return newUser;
  }

  async updateUser(id, data, file) {
    const existing = await this.userRepository.getById(id);
    if (!existing) throw new Error("User not found");

    // Mantener foto existente si no se envía nueva (Opción A)
    let photoPath = existing.photo;

    if (file && file.filename) {
      // eliminar foto antigua si existía
      if (photoPath) {
        const oldPath = path.join(process.cwd(), "public", photoPath);
        try {
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        } catch (err) {
          // no detener proceso si falla el borrado, solo log
          console.warn("Could not delete old photo:", oldPath, err.message);
        }
      }
      photoPath = `/uploads/users/${file.filename}`;
    }

    const newPassword = data.password
      ? await bcrypt.hash(data.password, 10)
      : existing.password;

    // Crear objeto User con orden correcto:
    const updated = new User(
      id,
      data.name || existing.name,
      data.email || existing.email,
      newPassword,
      data.role || existing.role,
      photoPath,
      existing.dateCreated,
      data.region || existing.region,
      data.gender || existing.gender,
      data.birthDate || existing.birthDate
    );

    // ===== Falta optimizar el envio de lenguajes =====
    await this.speakRepository.replaceUserLanguages(id, data.language);
    await this.userRepository.update(id, updated);
    return updated;
  }

  async deleteUser(id) {
    const existing = await this.userRepository.getById(id);
    if (!existing) throw new Error("User not found");

    // Eliminar archivo físico si existe
    if (existing.photo) {
      const oldPath = path.join(process.cwd(), "public", existing.photo);
      try {
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      } catch (err) {
        console.warn("Could not delete user photo:", oldPath, err.message);
      }
    }

    await this.userRepository.delete(id);
    return true;
  }
}
