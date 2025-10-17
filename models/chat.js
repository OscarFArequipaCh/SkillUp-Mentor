// models/chatModel.js
export class Chat {
  constructor(id, id_sender, id_receiver, created_at) {
    this.id = id;
    this.id_sender = id_sender;
    this.id_receiver = id_receiver;
    this.created_at = created_at || new Date().toISOString();
  }
}
