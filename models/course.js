export class Course {
  constructor(id, title, description, startDate, endDate, status, cost, mentor) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status; // "active" | "completed" | "cancelled"
    this.cost = cost;
    this.mentor = mentor;
  }
}

export default Course;