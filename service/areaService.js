import { AreaRepository } from "../repositories/areaRepository.js";
import { Area } from "../models/area.js";

export class AreaService {
  constructor() {
    this.areaRepository = new AreaRepository();
  }
    async getAllAreas() {
    return await this.areaRepository.getAll();
  }
    async getAreaById(id) {
    return await this.areaRepository.getById(id);
  }
    async createArea(name, description) {
    const area = new Area(null, name, description);
    return await this.areaRepository.create(area);
  }
    async updateArea(id, name, description) {
    const existingArea = await this.areaRepository.getById(id);
    if (!existingArea) {
      throw new Error("Area not found");
    }
    const updatedArea = new Area(
      id,
      name || existingArea.name,
      description || existingArea.description
    );
    return await this.areaRepository.update(id, updatedArea);
  }
    async deleteArea(id) {
    const existingArea = await this.areaRepository.getById(id);
    if (!existingArea) {
      throw new Error("Area not found");
    }
    return await this.areaRepository.delete(id);
    }
}