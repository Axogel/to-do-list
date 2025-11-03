import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const   authMiddleware = async (req, res, next ) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token requerido" });

  const token = authHeader.split(" ")[1];

  console.log('tokensito', token)
  try {
    console.log('JWT_SECRET', process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decodes', decoded)
    req.user = await User.findByPk(decoded.id);
    console.log('req.user', req.user)
    if (!req.user) return res.status(401).json({ message: "Usuario no encontrado" });
    next();
  } catch {
    res.status(403).json({ message: "Token inválido" });
  }
}
