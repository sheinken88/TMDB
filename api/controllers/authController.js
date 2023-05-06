const User = require("../models/User");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { generateToken } = require("../config/tokens");

const registerUser = (req, res) => {
  // Capturar los campos del req.body
  const { userName, email, password } = req.body;

  // Validar si todos los campos están presentes
  // Esta verificación la tengo que llevar al front cuando lo arme
  if (!userName || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // Verificar si el usuario ya existe
  User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ error: "El correo electrónico ya está en uso" });
      }

      // Crear el nuevo usuario
      User.create({
        userName,
        email,
        password,
      })
        .then((newUser) =>
          res.status(201).json({ message: "Usuario registrado con éxito" })
        )
        .catch((error) =>
          res.status(500).json({ error: "Error al crear el usuario" })
        );
    })
    .catch((error) =>
      res.status(500).json({ error: "Error al buscar el usuario" })
    );
};

const loginUser = (req, res) => {
  // Capturar los campos del req.body
  const { email, password } = req.body;

  // Validar si los campos email y password están presentes
  // Esta verificación la tengo que llevar al front cuando lo arme
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Se requieren correo electrónico y contraseña" });
  }

  // Buscar el usuario en la base de datos
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // Comparar la contraseña proporcionada con la contraseña almacenada
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error al comparar las contraseñas" });
        }

        if (!isMatch) {
          return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        const token = generateToken({ id: user.id });
        res.status(200).json({ token });
      });
    })
    .catch((error) =>
      res.status(500).json({ error: "Error al buscar el usuario" })
    );
};

module.exports = { registerUser, loginUser };
