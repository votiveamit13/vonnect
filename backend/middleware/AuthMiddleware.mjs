import jwt from "jsonwebtoken";
import User from "../models/User.mjs";

export const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header)
    return res.status(401).json({ message: "Unauthorized" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded",decoded)
    req.user = await User.findByPk(decoded.id, {attributes: { exclude: ['password'] }});
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};

export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role_id))
      return res.status(403).json({ message: "Forbidden" });

    next();
  };
};
