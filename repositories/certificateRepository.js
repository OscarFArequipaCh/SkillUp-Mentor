import { openDb } from "../database/sqliteConnection.js";
import { Certificate } from "../models/certificate.js";

export class CertificateRepository {
    async getAll() {
        const db = await openDb();
        const rows = await db.all(
            `SELECT c.*, 
            u.id AS id_user, 
            u.email, 
            u.name 
            FROM certificate c
            JOIN user u ON c.id_user = u.id`
        );
        await db.close();
        
        return rows.map(
            (r) => new Certificate(
                r.id, r.description, r.dateUpload, r.url, // Datos del certificado
                {id: r.id_user, email: r.email, name: r.name} // Datos del usuario asociado
            )
        );
    }

    async getById(id) {
        const db = await openDb();
        const r = await db.get(
            `SELECT c.*, 
            u.id AS id_user, 
            u.email,
            u.name 
            FROM certificate c
            JOIN user u ON c.id_user = u.id
            WHERE c.id = ?`,
            [id]
        );
        await db.close();

        return r ? new Certificate(
            r.id, r.description, r.dateUpload, r.url,
            {id: r.id_user, email: r.email, name: r.name}
        ) : null;
    }

    async create(certificate) {
        const db = await openDb();
        const { description, dateUpload, url, id_user } = certificate;
        const result = await db.run(
            `INSERT INTO certificate (description, dateUpload, url, id_user)
            VALUES (?, ?, ?, ?)`,
            [description, dateUpload, url, id_user]
        );
        await db.close();
        return result.lastID;
    }

    async update(id, certificate) {
        const db = await openDb();
        const { description, dateUpload, url } = certificate;
        await db.run(
            `UPDATE certificate 
            SET description = ?, dateUpload = ?, url = ? 
            WHERE id = ?`,
            [description, dateUpload, url, id]
        );
        await db.close();
        return true;
    }

    async delete(id) {
        const db = await openDb();
        await db.run("DELETE FROM certificate WHERE id = ?", [id]);
        await db.close();
        return true;
    }
}