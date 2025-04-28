const promisePool = require('../config/db'); // Importar promisePool


class User {
  constructor({ id, names, lastname, nickname, mail, password }) {
    this.id = id;
    this.names = names;
    this.lastname = lastname;
    this.nickname = nickname;
    this.mail = mail;
    this.password = password;
  }

  validate() {
    if (!this.names || !this.lastname || !this.nickname || !this.mail || !this.password) {
      throw new Error('Todos los campos son obligatorios');
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.mail)) {
      throw new Error('El formato del email no es válido');
    }
  }

  // Método para crear un objeto plano
  toJSON() {
    return {
      names: this.names,
      lastname: this.lastname,
      nickname: this.nickname,
      mail: this.mail,
      password: this.password,
    };
  }
  static async exists(userId) {
    const [rows] = await promisePool.query(
      'SELECT 1 FROM users WHERE idusers = ?', 
      [userId]
    );
    return rows.length > 0;
  }
}

module.exports = User;