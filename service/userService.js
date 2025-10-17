import { UserRepository } from "../repositories/userRepository.js";
import { User } from "../models/user.js";

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

  async createUser(data) {
    if (!data.name || !data.email || !data.password) {
      throw new Error("Name, email, and password are required");
    }
    const newUser = new User(
      null,
      data.name,
      data.email,
      data.password,
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

    const updated = new User(
      id,
      data.name || existing.name,
      data.email || existing.email,
      data.password || existing.password,
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
