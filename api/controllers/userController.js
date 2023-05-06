const User = require("../models/User");

const getUserInfo = (req, res) => {
  // caputar los campos del req.user que se decodean en authMiddleware
  const { email } = req.user;

  User.findOne({ where: { email } })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) =>
      res.status(500).json({ error: "Error al buscar usuarios por email" })
    );
};

module.exports = { getUserInfo };
