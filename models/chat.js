export class Chat {
  constructor(id, created_at, sender, receiver) {
    this.id = id;
    this.created_at = created_at || new Date().toISOString();
    this.sender = sender;
    this.receiver = receiver;
  }
}

export default Chat;