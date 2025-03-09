const userService = require('../services/userService');

const registerUser = async (req, res) => {
  const { nombre, apellido, nick, email, contraseña } = req.body;

  try {
    const newUser = {
      names: nombre,
      lastname: apellido,
      nickname: nick,
      mail: email,
      password: contraseña,
    };

    const createdUser = await userService.registerUser(newUser);
    res.status(201).json({ userId: createdUser.insertId });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const user = await userService.loginUser(email, contraseña);
    res.status(200).json({ userId: user.idusers });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser };