export class Mentor {
  constructor(id, experience, schedules, languages, certificates, user, area, pedagogicalMethod) {
    this.id = id;
    this.experience = experience; // descripción o años
    this.schedules = schedules; // array de horarios disponibles
    this.languages = languages; // array de idiomas
    this.certificates = certificates; // array de certificados
    this.user = user; // referencia al usuario
    this.area = area;
    this.pedagogicalMethod = pedagogicalMethod;
  }
}

export default Mentor;