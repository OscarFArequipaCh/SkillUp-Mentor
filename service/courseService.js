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
  async createCourse(courseData) {
    const course = new Course(
      null,
      courseData.title,
      courseData.description,
      courseData.startDate,
      courseData.endDate,
      courseData.status,
      courseData.cost,
      courseData.id_mentor,
      courseData.id_apprentice
    );
    return await this.courseRepository.create(course);
  }
  async updateCourse(id, courseData) {
    const existingCourse = await this.courseRepository.getById(id);
    if (!existingCourse) {
      throw new Error("Course not found");
    }
    const updatedCourse = new Course(
      id,
      courseData.title || existingCourse.title,
      courseData.description || existingCourse.description,
      courseData.startDate || existingCourse.startDate,
      courseData.endDate || existingCourse.endDate,
      courseData.status || existingCourse.status,
      courseData.cost || existingCourse.cost,
      courseData.id_mentor || existingCourse.id_mentor,
      courseData.id_apprentice || existingCourse.id_apprentice
    );
    return await this.courseRepository.update(id, updatedCourse);
  }
  async deleteCourse(id) {
    const existingCourse = await this.courseRepository.getById(id);
    if (!existingCourse) {
      throw new Error("Course not found");
    }
    return await this.courseRepository.delete(id);
  }
}