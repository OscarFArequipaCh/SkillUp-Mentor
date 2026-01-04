// models/ratingModel.js
export class Rating {
  constructor(id, score, comment, date, ratedBy, user) {
    this.id = id;
    this.score = score; // 1 a 5
    this.comment = comment;
    this.date = date || new Date().toISOString();
    this.ratedBy = ratedBy; // id del aprendiz o mentor que califica
    this.user = user; // redundante si se asocia con user base
  }
}
