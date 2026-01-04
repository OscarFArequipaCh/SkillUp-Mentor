// models/apprenticeModel.js
export class Apprentice {
  constructor(id, degree, id_user, user=null) {
    this.id = id;
    this.degree = degree; // "Licenciatura", "Secundaria", etc.
    // 🔥 clave foránea en BD
    this.id_user = id_user;
    // ✅ relación enriquecida
    this.user = user;
  }
}

export default Apprentice;