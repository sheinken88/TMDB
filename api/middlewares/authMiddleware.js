const { validateToken } = require("../config/tokens");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  console.log("TOKEN: ", req.cookies);
  if (!token) return res.sendStatus(401);

  const { payload } = validateToken(token);
  console.log("PAYLOAD: ", payload);
  if (!payload) return res.sendStatus(401);

  // guardar el usuario en el objeto request
  req.userName = payload;
  next();
};

module.exports = authMiddleware;
