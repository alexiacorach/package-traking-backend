import express from "express";
import { registerUser } from "../controllers/userController";
import { loginUser } from "../controllers/userController";
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware";


const router = express.Router();

// Register Route
router.post("/register", registerUser);
//log in route
router.post("/login", loginUser);
//proteccion route
router.get("/admin-data", authenticate, authorizeRoles("admin"), (req, res) => { //authorizeRoles("admin") verifica que el rol del usuario sea "admin".authenticate verifica que haya un token válido
  res.json({ message: "Solo visible para administradores" });
});

export default router;
