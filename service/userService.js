import { UserRepository } from "../repositories/userRepository.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
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

    // ✅ bcrypt se encarga de comparar el hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Incorrect password");
    
    return user;
  }

  async createUser(data) {
    if (!data.name || !data.email || !data.password) {
      throw new Error("Name, email, and password are required");
    }

     // ✅ generar hash del password antes de guardar
    const hashedPassword = await bcrypt.hash(data.password, 10); // 10 = saltRounds

    const newUser = new User(
      null,
      data.name,
      data.email,
      hashedPassword, // guardamos el hash
      data.role || "apprentice",
      data.photo || null,
      new Date().toISOString(),
      data.region || "unspecified"
    );
    const id = await this.userRepository.create(newUser);
    return { id, ...newUser };
  }

  async updateUser(id, data) {
    const existing = await this.userRepository.getById(id);
    if (!existing) throw new Error("User not found");

    // Si se envía un nuevo password, se vuelve a hashear
    let newPassword = existing.password;
    if (data.password) {
      newPassword = await bcrypt.hash(data.password, 10);
    }

    const updated = new User(
      id,
      data.name || existing.name,
      data.email || existing.email,
      newPassword,
      data.role || existing.role,
      data.photo || existing.photo,
      existing.dateCreated,
      data.region || existing.region
    );

    await this.userRepository.update(id, updated);
    return updated;
  }

  async deleteUser(id) {
    const existing = await this.userRepository.getById(id);
    if (!existing) throw new Error("User not found");
    await this.userRepository.delete(id);
    return true;
  }
}
