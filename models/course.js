// models/courseModel.js
export class Course {
  constructor(id, title, description, startDate, endDate, status, cost, id_mentor, id_apprentice) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status; // "active" | "completed" | "cancelled"
    this.cost = cost;
    this.id_mentor = id_mentor;
    this.id_apprentice = id_apprentice;
  }
}
