const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  senderId: { type: String, required: true },
  type: { type: String, enum: ['text', 'image', 'video', 'audio'], default: 'text' },
  timestamp: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
  participant1: { type: String, required: true },
  participant2: { type: String, required: true },
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Validación para participantes únicos
chatSchema.path('participant1').validate(function(value) {
  return value !== this.participant2;
}, 'Participants must be different users');

// Índice para búsqueda rápida de chats por participantes
chatSchema.index({ participant1: 1, participant2: 1 }, { unique: true });

// Middleware para actualizar updatedAt
chatSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Método para agregar mensajes
chatSchema.methods.addMessages = function(newMessages) {
  // Validar participantes
  newMessages.forEach(msg => {
    if (this.participant1 !== msg.senderId && this.participant2 !== msg.senderId) {
      throw new Error(`User ${msg.senderId} is not a participant in this chat`);
    }
  });

  this.messages.push(...newMessages);
  this.updatedAt = new Date();
  return this.save();
};

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;