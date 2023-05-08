const { validateToken } = require("../config/tokens");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  console.log("TOKEN: ", req.cookies);
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  console.log("USER: ", user);
  if (!user) return res.sendStatus(401);

  // guardar el usuario en el objeto request
  req.user = user;
  next();
};

module.exports = authMiddleware;
