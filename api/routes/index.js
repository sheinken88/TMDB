const express = require("express");
const router = express.Router(); // para modularizar las rutas en otros archivos.

const users = require("./users");

router.use("/users", users);

module.exports = router;
