// models/messageModel.js
export class Message {
  constructor(id, id_chat, content, datePublished, is_read = false) {
    this.id = id;
    this.id_chat = id_chat;
    this.content = content;
    this.datePublished = datePublished || new Date().toISOString();
    this.is_read = is_read;
  }
}
