import express from "express";
import { login, signup } from "../controllers/AuthController.mjs";
import { verifyToken } from "../middleware/AuthMiddleware.mjs"

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.get("/profile", verifyToken, (req, res) => {
  res.json(req.user);
});


export default router;
