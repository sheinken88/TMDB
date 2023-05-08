const express = require("express");
// const User = require("../models/User"); // no estoy usarndo este archivo por ahora aca
const router = express.Router();
const { authController, userController } = require("../controllers/");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/signup", authController.registerUser);
router.post("/login", authController.loginUser);

// Todas las rutas siguientes van a necesitar autorización
router.use(authMiddleware);

router.get("/me", authMiddleware, (req, res) => {
  res.send(req.user);
});

module.exports = router;
