// models/apprenticeModel.js
export class Apprentice {
  constructor(id, certificates, languages, degree, gender, discount, id_user, user=null) {
    this.id = id;
    this.certificates = certificates || [];
    this.languages = languages || [];
    this.degree = degree; // "Licenciatura", "Secundaria", etc.
    this.gender = gender;
    this.discount = discount || 0;
    // 🔥 clave foránea en BD
    this.id_user = id_user;
    // ✅ relación enriquecida
    this.user = user;
  }
}

export default Apprentice;