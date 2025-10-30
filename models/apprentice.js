// models/apprenticeModel.js
export class Apprentice {
  constructor(id, certificates, languages, degree, gender, discount, id_user) {
    this.id = id;
    this.certificates = certificates || [];
    this.languages = languages || [];
    this.degree = degree; // "Licenciatura", "Secundaria", etc.
    this.gender = gender;
    this.discount = discount || 0;
    this.id_user = id_user; // referencia al usuario base
  }
}

export default Apprentice;