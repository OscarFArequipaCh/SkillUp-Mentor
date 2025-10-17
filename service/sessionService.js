import { SessionRepository } from "../repositories/sessionRepository.js";
import { Session } from "../models/session.js";

export class SessionService {
  constructor() {
    this.sessionRepository = new SessionRepository();
  }
  async getAllSessions() {
    return await this.sessionRepository.getAll();
  }
  async getSessionById(id) {
    return await this.sessionRepository.getById(id);
  }
  async createSession(sessionData) {
    const session = new Session(
      null,
      sessionData.startDate,
      sessionData.mode,
      sessionData.duration,
      sessionData.status,
      sessionData.id_course
    );
    return await this.sessionRepository.create(session);
  }
  async updateSession(id, sessionData) {
    const existingSession = await this.sessionRepository.getById(id);
    if (!existingSession) {
      throw new Error("Session not found");
    }
    const updatedSession = new Session(
      id,
      sessionData.startDate || existingSession.startDate,
      sessionData.mode || existingSession.mode,
      sessionData.duration || existingSession.duration,
      sessionData.status || existingSession.status,
      sessionData.id_course || existingSession.id_course
    );
    return await this.sessionRepository.update(id, updatedSession);
  }
  async deleteSession(id) {
    const existingSession = await this.sessionRepository.getById(id);
    if (!existingSession) {
      throw new Error("Session not found");
    }
    return await this.sessionRepository.delete(id);
  }
}