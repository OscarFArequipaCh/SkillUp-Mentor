import { CourseRepository } from "../repositories/courseRepository.js";
import { Course } from "../models/course.js";

export class CourseService {
  constructor() {
    this.courseRepository = new CourseRepository();
  }

  async getAllCourses() {
    return await this.courseRepository.getAll();
  }

  async getCourseById(id) {
    return await this.courseRepository.getById(id);
  }

  async createCourse(data) {
    if (!data.mentor?.id) throw new Error("Debe enviar un mentor con un ID válido");

    const newCourse = new Course(
      null,
      data.title,
      data.description,
      data.startDate,
      data.endDate,
      data.status,
      data.cost,
      data.mentor
    );

    const id = await this.courseRepository.create({
      ...newCourse,
      id_mentor: data.mentor.id
    });

    return await this.getCourseById(id);
  }

  async updateCourse(id, data) {
    const existingCourse = await this.courseRepository.getById(id);
    if (!existingCourse) {
      throw new Error("Course not found");
    }

    const updatedCourse = new Course(
      id,
      data.title || existingCourse.title, // se le asigna los valores nuevos o los ya existentes en la consulta de esxistencia anterior
      data.description || existingCourse.description,
      data.startDate || existingCourse.startDate,
      data.endDate || existingCourse.endDate,
      data.status || existingCourse.status,
      data.cost || existingCourse.cost,
      data.mentor || existingCourse.mentor
    );

    await this.courseRepository.update(id, {
      ...updatedCourse,
      id_mentor: updatedCourse.mentor.id
    });

    return updatedCourse;
  }

  async deleteCourse(id) {
    const existingCourse = await this.courseRepository.getById(id);
    if (!existingCourse) throw new Error("Course not found");
    return await this.courseRepository.delete(id);
  }
}