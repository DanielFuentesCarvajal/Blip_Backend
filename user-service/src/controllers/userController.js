const { createUser } = require('../models/userModel');
const { getUserByEmail, getUserByNick } = require('../models/userModel');

const registerUser = (req, res) => {
  const { nombre, apellido, nick, email, contraseña } = req.body;

  // no puede haber dos mails iguales
  const existingUserByEmail = getUserByEmail(email);
  if (existingUserByEmail) {
    return res.status(400).json({ message: 'El email ya está registrado' });
  }

  // no puede haber dos nicks iguales
  const existingUserByNick = getUserByNick(nick);
  if (existingUserByNick) {
    return res.status(400).json({ message: 'El nick ya está en uso' });
  }

  // Crear un nuevo usuario
  const newUser = {
    id: Date.now(), // Generar un ID único             (ni se para que meto esta mkada, esto lo deberia hacer la base de datos, pero como se van a manejar varias y de tipo sql y no sql, tal ves deberia generarse aca en el back y no en la base de datos?, no lo se, mirar esto despues)
    nombre,
    apellido,
    nick,
    email,
    contraseña,
  };

  // Guardar 
  createUser(newUser);

  // Devolver userId
  res.status(201).json({ userId: newUser.id });
};
const loginUser = (req, res) => {
  const { email, contraseña } = req.body;

  // Buscar el usuario por email
  const user = getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  // Verificar la contraseña (sin encriptación por ahora)
  if (user.contraseña !== contraseña) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Devolver el userId
  res.status(200).json({ userId: user.id });
};
module.exports = { registerUser, loginUser };
