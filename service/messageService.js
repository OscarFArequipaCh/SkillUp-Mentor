import { MessageRepository } from "../repositories/messageRepository.js";
import { Message } from "../models/message.js";

export class MessageService {
  constructor() {
    this.messageRepository = new MessageRepository();
  }
    async getAllMessages() {
    return await this.messageRepository.getAll();
  }
    async getMessageById(id) {
    return await this.messageRepository.getById(id);
  }
    async createMessage(data) {
    if (!data.content || !data.timestamp || !data.id_sender || !data.id_receiver) {
        throw new Error("Content, timestamp, sender ID, and receiver ID are required");
    }
    const newMessage = new Message(
        null,
        data.content,
        data.timestamp,
        data.id_sender,
        data.id_receiver
    );
    const id = await this.messageRepository.create(newMessage);
    return { id, ...newMessage };
  }
    async updateMessage(id, data) {
    const existing = await this.messageRepository.getById(id);
    if (!existing) throw new Error("Message not found");
    const updated = new Message(
        id,
        data.content || existing.content,
        data.timestamp || existing.timestamp,
        data.id_sender || existing.id_sender,
        data.id_receiver || existing.id_receiver
    );
    await this.messageRepository.update(id, updated);
    return updated;
  }
    async deleteMessage(id) {
    const existing = await this.messageRepository.getById(id);
    if (!existing) throw new Error("Message not found");
    await this.messageRepository.delete(id);
    return true;
  }
}