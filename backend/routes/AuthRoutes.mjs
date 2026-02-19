import express from "express";
import { login, signup,roles } from "../controllers/AuthController.mjs";
import { verifyToken } from "../middleware/AuthMiddleware.mjs"
import { buildings, units } from "../controllers/UnitController.mjs";

const router = express.Router();

router.get('/roles',roles);

router.post("/login", login);

router.post("/signup", signup);

router.get("/profile", verifyToken, (req, res) => {
  res.json(req.user);
});


router.get('/buildings', verifyToken,buildings);

router.get('/units/{:id}', verifyToken,units);


export default router;
