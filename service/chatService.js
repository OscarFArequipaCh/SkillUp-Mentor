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
    if (!data.sender?.id || !data.receiver?.id) {
        throw new Error("Message, timestamp, user ID, and mentor ID are required");
    }

    const newChat = new Chat(
        null,
        new Date().toISOString(),
        data.sender,
        data.receiver
    );

    const id = await this.chatRepository.create({
      ...newChat,
      id_sender: data.sender.id,
      id_receiver: data.receiver.id
    });

    return await this.getChatById(id);
  }
  
  async updateChat(id, data) {
    const existing = await this.chatRepository.getById(id);
    if (!existing) throw new Error("Chat not found");

    const updatedChat = new Chat(
        id,
        existing.created_at,
        data.sender || existing.sender,
        data.receiver || existing.receiver
    );

    await this.chatRepository.update(id, {
      ...updatedChat,
      id_sender: updatedChat.sender.id,
      id_receiver: updatedChat.receiver.id
    });

    return await this.getChatById(id);
  }
    
  async deleteChat(id) {
    const existing = await this.chatRepository.getById(id);
    if (!existing) throw new Error("Chat not found");
    await this.chatRepository.delete(id);
    return true;
  }
}