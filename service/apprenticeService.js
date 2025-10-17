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
    if (!data.id_user) throw new Error("User ID is required");

    const newApprentice = new Apprentice(
      null,
      data.certificates || [],
      data.languages || [],
      data.degree || "",
      data.gender || "unspecified",
      data.discount || 0,
      data.id_user
    );

    const id = await this.apprenticeRepository.create(newApprentice);
    return { id, ...newApprentice };
  }

  async updateApprentice(id, data) {
    const existing = await this.apprenticeRepository.getById(id);
    if (!existing) throw new Error("Apprentice not found");

    const updated = new Apprentice(
      id,
      data.certificates || existing.certificates,
      data.languages || existing.languages,
      data.degree || existing.degree,
      data.gender || existing.gender,
      data.discount || existing.discount,
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
