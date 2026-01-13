import { ExperienceRepository } from "../repositories/experienceRepository.js";
import { Experience } from "../models/experience.js";

export class ExperienceService {
    constructor() {
        this.experienceRepository = new ExperienceRepository();
    }

    async getAllExperiences() {
        return await this.experienceRepository.getAll();
    }

    async getExperienceById(id) {
        if (!id) throw new Error("Experience ID is required");
        const experience = await this.experienceRepository.getById(id);
        if (!experience) throw new Error("Experience not found");
        return experience;
    }

    async createExperience(data) {
        if (!data.mentor?.id) throw new Error("Debe enviar un mentor con un ID válido");

        const newExperience = new Experience(
            null, 
            data.company, 
            data.position, 
            data.description, 
            data.dateStart, 
            data.dateFinish, 
            data.mentor
        );

        const id = await this.experienceRepository.create({
            ...newExperience,
            id_mentor: data.id_mentor
        });

        return await this.getExperienceById(id); // ✅ ya devuelve con mentor anidado
    }

    async updateExperience(id, data) {
        const existing = await this.ExperienceRepository.getById(id);
        
        if (!exixting) throw new Error("Experience not found");

        const updatedExperience = new Experience(
            id,
            data.company || existing.company,
            data.position || existing.position,
            data.description || existing.description,
            data.dateStart || existing.dateStart,
            data.dateFinish || existing.dateFinish,
            existing.mentor
        );

        await this.experienceRepository.update(id, {
            ...updatedExperience,
            id_mentor: updatedExperience.mentor.id
        })

        return updatedExperience;
    }

    async deleteExperience(id) {
        const existing = await this.experienceRepository.getById(id);
        if (!existing) throw new Error("Experience not found");
        return await this.experienceRepository.delete(id);
    }
}