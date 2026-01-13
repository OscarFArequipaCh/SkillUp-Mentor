export class Session {
  constructor(id, startDate, mode, duration, status, course) {
    this.id = id;
    this.startDate = startDate;
    this.mode = mode; // "virtual" | "presencial"
    this.duration = duration; // en minutos
    this.status = status; // "scheduled" | "in_progress" | "completed"
    this.course = course;
  }
}

export default Session;