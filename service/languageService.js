import { LanguageRepository } from "../repositories/languageRepository.js";
import { Language } from "../models/language.js";

export class LanguageService {
    constructor() {
        this.languageRepository = new LanguageRepository();
    }
    async getAllLanguage() {
        return await this.languageRepository.getAll();
    }
    async createLanguage(name) {
        const language = new Language(null, name);
        return await this.languageRepository.create(language);
    }
    async deleteLanguage(id) {
        return await this.languageRepository.delete(id);
    }
}