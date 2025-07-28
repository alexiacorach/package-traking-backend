import express from "express";
import { registerUser } from "../controllers/userController";

const router = express.Router();

// Register Rute
router.post("/register", registerUser);

export default router;
