import express from "express";
import { signUp } from "../controllers/auth.js";
const router = express.Router();

router.post("/signup", signUp);
// router.post("/:id", getDetail);

export default router;