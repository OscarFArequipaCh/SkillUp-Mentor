import { ChatRepository } from "../repositories/chatRepository.js";
import { Chat } from "../models/chat.js";

export class ChatService {
  constructor() {
    this.chatRepository = new ChatRepository();
  }
    async getAllChats() {
    return await this.chatRepository.getAll();
  }
    async getChatById(id) {
    return await this.chatRepository.getById(id);
  }
    async createChat(data) {
    if (!data.message || !data.timestamp || !data.id_user || !data.id_mentor) {
        throw new Error("Message, timestamp, user ID, and mentor ID are required");
    }

    const newChat = new Chat(
        null,
        data.message,
        data.timestamp,
        data.id_user,
        data.id_mentor
    );
    const id = await this.chatRepository.create(newChat);
    return { id, ...newChat };
  }
    async updateChat(id, data) {
    const existing = await this.chatRepository.getById(id);
    if (!existing) throw new Error("Chat not found");
    const updated = new Chat(
        id,
        data.message || existing.message,
        data.timestamp || existing.timestamp,
        data.id_user || existing.id_user,
        data.id_mentor || existing.id_mentor
    );
    await this.chatRepository.update(id, updated);
    return updated;
  }
    async deleteChat(id) {
    const existing = await this.chatRepository.getById(id);
    if (!existing) throw new Error("Chat not found");
    await this.chatRepository.delete(id);
    return true;
  }
}