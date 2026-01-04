import { ApprenticeRepository } from "../repositories/apprenticeRepository.js";
import Apprentice from "../models/apprentice.js";

export class ApprenticeService {
  constructor() {
    this.apprenticeRepository = new ApprenticeRepository();
  }

  async getAllApprentices() {
    return await this.apprenticeRepository.getAll();
  }

  async getApprenticeById(id) {
    if (!id) throw new Error("Apprentice ID is required");
    const apprentice = await this.apprenticeRepository.getById(id);
    if (!apprentice) throw new Error("Apprentice not found");
    return apprentice;
  }

  async createApprentice(data) {
    if (!data.user || !data.user.id) {
      throw new Error("Debe enviar un usuario con un ID válido");
    }

    const newApprentice = new Apprentice(
      null,
      data.degree || "",
      data.user.id
    );

    const id = await this.apprenticeRepository.create(newApprentice);

    return await this.getApprenticeById(id); // ✅ ya devuelve con user anidado
  }

  async updateApprentice(id, data) {
    const existing = await this.apprenticeRepository.getById(id);
    if (!existing) throw new Error("Apprentice not found");

    const updated = new Apprentice(
      id,
      data.degree || existing.degree,
      existing.id_user
    );

    await this.apprenticeRepository.update(id, updated);
    return updated;
  }

  async deleteApprentice(id) {
    const existing = await this.apprenticeRepository.getById(id);
    if (!existing) throw new Error("Apprentice not found");
    await this.apprenticeRepository.delete(id);
    return true;
  }
}
