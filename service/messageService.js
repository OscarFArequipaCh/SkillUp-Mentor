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
    if (!data.content || !data.id_chat || !data.id_user) {
        throw new Error("Content, chat ID, and user ID are required");
    }
    const newMessage = new Message(
        null,
        data.content,
        data.datePublished,
        data.is_read || false,
        data.chat,
        data.user
    );

    const id = await this.messageRepository.create({
      ...newMessage,
      id_chat: data.id_chat,
      id_user: data.id_user
    });

    return await this.getMessageById(id);
  }
    
  async updateMessage(id, data) {
    const existing = await this.messageRepository.getById(id);
    if (!existing) throw new Error("Message not found");
    const updatedMessage = new Message(
        id,
        data.content || existing.content,
        data.datePublished || existing.datePublished,
        data.is_read !== undefined ? data.is_read : existing.is_read,
        existing.chat,
        existing.user
    );

    await this.messageRepository.update(id, {
      ...updatedMessage,
      id_chat: updatedMessage.chat.id,
      id_user: updatedMessage.user.id
    });
    
    return await this.getMessageById(id);
  }
    
  async deleteMessage(id) {
    const existing = await this.messageRepository.getById(id);
    if (!existing) throw new Error("Message not found");
    await this.messageRepository.delete(id);
    return true;
  }
}