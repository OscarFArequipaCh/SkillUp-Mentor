export class Mentor {
  constructor(id, profile, user, area, pedagogicalMethod) {
    this.id = id;
    this.profile = profile;
    this.user = user; // referencia al usuario
    this.area = area;
    this.pedagogicalMethod = pedagogicalMethod;
  }
}

export default Mentor;