const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../config/tokens");

const registerUser = (req, res) => {
  // capturar los campos del req.body
  const { userName, email, password } = req.body;

  // validar si todos los campos están presentes
  // esta verificación la tengo que llevar al front cuando lo arme
  if (!userName || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  // verificar si el usuario ya existe
  User.findOne({ where: { email } })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ error: "El correo electrónico ya está en uso" });
      }

      // crear el nuevo usuario
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
  // capturar los campos del req.body
  const { userName, email, password } = req.body;

  // validar si los campos email y password están presentes
  // esta verificación la tengo que llevar al front cuando lo arme
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Se requieren correo electrónico y contraseña" });
  }

  // buscar el usuario en la base de datos
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // Use validatePassword method from User model
      user
        .validatePassword(password)
        .then((isValid) => {
          if (!isValid) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
          }

          // Generate the token
          const token = generateToken({
            userName: user.UserName,
            email: user.email,
          });

          res.status(200).json({ token });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ error: "Error al comparar las contraseñas" });
        });
    })
    .catch((error) =>
      res.status(500).json({ error: "Error al buscar el usuario" })
    );
};

module.exports = { registerUser, loginUser };
