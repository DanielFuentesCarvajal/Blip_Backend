const { createUser } = require('../models/userModel');
const { getUserByEmail, getUserByNick } = require('../models/userModel');

const registerUser = async (req, res) => {
  const { nombre, apellido, nick, email, contraseña } = req.body;

  try {
    // Verificar si el email ya está registrado
    const existingUserByEmail = await getUserByEmail(email);
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    // Verificar si el nick ya está en uso
    const existingUserByNick = await getUserByNick(nick);
    if (existingUserByNick) {
      return res.status(400).json({ message: 'El nick ya está en uso' });
    }

    // Crear un nuevo usuario
    const newUser = {
      names: nombre,
      lastname: apellido,
      nickname: nick,
      mail: email,
      password: contraseña,
    };

    // Guardar el nuevo usuario en la base de datos
    const createdUser = await createUser(newUser);
    console.log('Usuario creado:', createdUser);

    // Devolver el userId
    res.status(201).json({ userId: createdUser.insertId });  // insertId para obtener el ID generado por la base de datos
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const loginUser = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    // Buscar el usuario por email
    const user = await getUserByEmail(email);
    console.log('Usuario encontrado por email:', user);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    if (user.password !== contraseña) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Devolver el userId
    res.status(200).json({ userId: user.idusers });
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { registerUser, loginUser };
