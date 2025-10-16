// models/ratingModel.js
class Rating {
  constructor(id, score, comment, date, ratedBy, ratedFor, id_user) {
    this.id = id;
    this.score = score; // 1 a 5
    this.comment = comment;
    this.date = date || new Date().toISOString();
    this.ratedBy = ratedBy; // id del aprendiz o mentor que califica
    this.ratedFor = ratedFor; // id del usuario que recibe la calificación
    this.id_user = id_user; // redundante si se asocia con user base
  }
}
module.exports = Rating;
