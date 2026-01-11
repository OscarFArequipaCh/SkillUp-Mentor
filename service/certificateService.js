import { CertificateRepository } from "../repositories/certificateRepository.js";
import Certificate from "../models/certificate.js";

export class CertificateService {
    constructor() {
        this.CertificateRepository = new CertificateRepository();
    }
    async getAllCertificates() {
        return await this.CertificateRepository.getAll();
    }

    async getCertificateById(id) {
        if (!id) throw new Error("Certificate ID is required");
        const certificate = await this.CertificateRepository.getById(id);
        if (!certificate) throw new Error("Certificate not found");
        return certificate;
    }

    async createCertificate(data) {
        if (!data.user || !data.user.id) {
            throw new Error("Debe enviar un usuario con un ID válido");
        }
        const newCertificate = new Certificate(
            null, 
            data.description, 
            data.dateUpload, 
            data.url, 
            data.user
        );

        const id = await this.CertificateRepository.create({
            ...newCertificate,
            id_user: data.user.id
        });

        return await this.getCertificateById(id); // ✅ ya devuelve con user anidado
    }

    async updateCertificate(id, data) {
        const existing = await this.CertificateRepository.getById(id);
        if (!existing) throw new Error("Certificate not found");
        const updatedCertificate = new Certificate(
            id,
            data.description || existing.description,
            data.dateUpload || existing.dateUpload,
            data.url || existing.url,
            existing.user
        );
        
        await this.CertificateRepository.update(id, {
            ...updatedCertificate,
            id_user: updatedCertificate.user.id
        });

        return updatedCertificate;
    }

    async deleteCertificate(id) {
        const existing = await this.CertificateRepository.getById(id);
        if (!existing) throw new Error("Certificate not found");
        await this.CertificateRepository.delete(id);
        return true;
    }
}