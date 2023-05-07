const { validateToken } = require("../config/tokens");

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ error: "No se proporcionó el token" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = validateToken(token);
//     req.userId = decoded.payload.id;
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Token inválido" });
//   }
// };

const authMiddleware = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) return res.sendStatus(401);

  const { user } = validateToken(token);
  if (!user) return res.sendStatus(401);

  res.send(user);
  next();
};

module.exports = authMiddleware;
