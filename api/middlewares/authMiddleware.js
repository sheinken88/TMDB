const { validateToken } = require("../config/tokens");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

  res.send(user);
  next();
};

module.exports = authMiddleware;
