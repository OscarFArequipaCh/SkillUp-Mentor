export class Message {
  constructor(id, content, datePublished, is_read = false, chat, user) {
    this.id = id;
    this.content = content;
    this.datePublished = datePublished || new Date().toISOString();
    this.is_read = is_read;
    this.chat = chat;
    this.user = user;
  }
}

export default Message;