class Message {
    constructor({ id, chatId, senderId, content, type = 'text', createdAt }) {
      this.id = id;
      this.chatId = chatId;
      this.senderId = senderId;
      this.content = content;
      this.type = type;
      this.createdAt = createdAt || new Date();
      this.status = 'sent'; // sent, delivered, read
    }
  
    validate() {
      if (!this.chatId || !this.senderId || !this.content) {
        throw new Error('Missing required message fields');
      }
      
      if (this.type !== 'text' && this.type !== 'image' && this.type !== 'video') {
        throw new Error('Invalid message type');
      }
    }
  
    toJSON() {
      return {
        id: this.id,
        chatId: this.chatId,
        senderId: this.senderId,
        content: this.content,
        type: this.type,
        status: this.status,
        createdAt: this.createdAt
      };
    }
  }
  
  module.exports = Message;