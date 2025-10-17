import { PedagogicalMethodRepository } from "../repositories/pedagogicalMethodRepository.js";
import { PedagogicalMethod } from "../models/pedagogicalMethod.js";

export class PedagogicalMethodService {
    constructor() {
        this.repository = new PedagogicalMethodRepository();
    }
    async getAllMethods() {
        return await this.repository.getAll();
    }
    async getMethodById(id) {
        return await this.repository.getById(id);
    }
    async createMethod(name, description) {
        const method = new PedagogicalMethod(null, name, description);
        return await this.repository.create(method);
    }
    async updateMethod(id, name, description) {
        const existingMethod = await this.repository.getById(id);
        if (!existingMethod) {
            throw new Error("Pedagogical Method not found");
        }
        const updatedMethod = new PedagogicalMethod(
            id,
            name || existingMethod.name,
            description || existingMethod.description
        );
        return await this.repository.update(id, updatedMethod);
    }
    async deleteMethod(id) {
        const existingMethod = await this.repository.getById(id);
        if (!existingMethod) {
            throw new Error("Pedagogical Method not found");
        }
        return await this.repository.delete(id);
    }
}