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

  async createSession(data) {
    const session = new Session(
      null,
      data.startDate,
      data.mode,
      data.duration,
      data.status,
      data.course
    );

    const id = await this.sessionRepository.create({
      ...session,
      id_course: data.course.id
    });

    return await this.getSessionById(id);
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
      sessionData.course || existingSession.course
    );

    await this.sessionRepository.update(id, {
      ...updatedSession,
      id_course: sessionData.course.id
    });
    
    return await this.getSessionById(id);
  }

  async deleteSession(id) {
    const existingSession = await this.sessionRepository.getById(id);
    if (!existingSession) throw new Error("Session not found");
    return await this.sessionRepository.delete(id);
  }
}