const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/index");
// const models = require("./models/index");
const routes = require("./routes/index");

app.use(cors()); // para utilizar dos puertos, uno front y otro back.

app.use(express.json()); // middleware para parsear json

app.use("/api", routes);

db.sync({ force: false })
  .then(() => {
    app.listen(5000, () => {
      console.log("Servidor escuchando en el puerto 5000");
    });
  })
  .catch(console.error);
