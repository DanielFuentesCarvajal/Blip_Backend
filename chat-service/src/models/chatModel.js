class Message {
    constructor({ content, senderId, type = 'text', timestamp }) {
      this.content = content;
      this.senderId = senderId;
      this.type = type;
      this.timestamp = timestamp || new Date();
    }
  
    validate() {
      if (!this.content || !this.senderId) {
        throw new Error('Message content and senderId are required');
      }
      
      const validTypes = ['text', 'image', 'video', 'audio'];
      if (!validTypes.includes(this.type)) {
        throw new Error('Invalid message type');
      }
    }
  }
  
  class Chat {
    constructor({ id, participant1, participant2, messages = [], createdAt, updatedAt }) {
      this.id = id;
      this.participant1 = participant1;
      this.participant2 = participant2;
      this.messages = messages.map(msg => new Message(msg));
      this.createdAt = createdAt || new Date();
      this.updatedAt = updatedAt || new Date();
    }
  
    validate() {
      if (!this.participant1 || !this.participant2) {
        throw new Error('Both participants are required');
      }
      
      if (this.participant1 === this.participant2) {
        throw new Error('Participants must be different users');
      }
    }
  
    addMessages(newMessages) {
      const validatedMessages = newMessages.map(msg => {
        const message = new Message(msg);
        message.validate();
        return message;
      });
      
      this.messages = [...this.messages, ...validatedMessages];
      this.updatedAt = new Date();
    }
  
    toJSON() {
      return {
        id: this.id,
        participant1: this.participant1,
        participant2: this.participant2,
        messageCount: this.messages.length,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        messages: this.messages.map(m => ({
          content: m.content,
          senderId: m.senderId,
          type: m.type,
          timestamp: m.timestamp
        }))
      };
    }
  }
  
  module.exports = Chat;