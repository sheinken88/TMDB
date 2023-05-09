const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const db = require("./db/index");
// const models = require("./models/index");
const routes = require("./routes/index");

app.use(express.json()); // middleware para parsear json

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
); // para utilizar dos puertos, uno front y otro back.

app.use(cookieParser());

app.use("/api", routes);

db.sync({ force: false })
  .then(() => {
    app.listen(5000, () => {
      console.log("Servidor escuchando en el puerto 5000");
    });
  })
  .catch(console.error);
