const { validateToken } = require("../config/tokens");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No se proporcionó el token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = validateToken(token);
    req.userId = decoded.payload.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = authMiddleware;
