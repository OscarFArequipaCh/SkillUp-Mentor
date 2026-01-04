import { MentorRepository } from "../repositories/mentorRepository.js";
import Mentor from "../models/mentor.js";

export class MentorService {
  constructor() {
    this.mentorRepository = new MentorRepository();
  }

  async getAllMentors() {
    return await this.mentorRepository.getAll();
  }

  async getMentorById(id) {
    if (!id) throw new Error("Mentor ID is required");
    const mentor = await this.mentorRepository.getById(id);
    if (!mentor) throw new Error("Mentor not found");
    return mentor;
  }

  async createMentor(data) {
    if (!data.user?.id || !data.area?.id || !data.pedagogicalMethod?.id) {
      throw new Error("User, area, and pedagogical method are required");
    }

    const newMentor = new Mentor(
      null,
      data.profile,
      // data.experience || "",
      // data.schedules || [],
      // data.languages || [],
      // data.certificates || [],
      data.user, // <── user completo
      data.area,
      data.pedagogicalMethod
    );

    const id = await this.mentorRepository.create({
      ...newMentor,
      id_user: data.user.id, // <── el repo sigue usando FK para insertar
      id_area: data.area.id,
      id_pedagogicalMethod: data.pedagogicalMethod.id
    });

    return await this.getMentorById(id); // <── devuelve con JOIN
  }


  async updateMentor(id, data) {
    const existing = await this.mentorRepository.getById(id);
    if (!existing) throw new Error("Mentor not found");

    const updated = new Mentor(
      id,
      data.profile || existing.profile,
      // data.experience || existing.experience,
      // data.schedules || existing.schedules,
      // data.languages || existing.languages,
      // data.certificates || existing.certificates,
      existing.user, // <── user permanece igual
      existing.area,
      existing.pedagogicalMethod
    );

    await this.mentorRepository.update(id, {
      ...updated,
      id_user: updated.user.id,
      id_area: updated.area.id,
      id_pedagogicalMethod: updated.pedagogicalMethod.id
    });

    return await this.getMentorById(id);
  }


  async deleteMentor(id) {
    const existing = await this.mentorRepository.getById(id);
    if (!existing) throw new Error("Mentor not found");
    await this.mentorRepository.delete(id);
    return true;
  }
}
