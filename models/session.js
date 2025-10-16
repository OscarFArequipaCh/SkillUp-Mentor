// models/sessionModel.js
class Session {
  constructor(id, startDate, mode, duration, status, id_course) {
    this.id = id;
    this.startDate = startDate;
    this.mode = mode; // "virtual" | "presencial"
    this.duration = duration; // en minutos
    this.status = status; // "scheduled" | "in_progress" | "completed"
    this.id_course = id_course;
  }
}
module.exports = Session;