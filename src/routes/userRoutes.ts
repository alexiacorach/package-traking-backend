import express from "express";
import { registerUser } from "../controllers/userController";
import { loginUser } from "../controllers/userController";
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware";


const router = express.Router();

// Register Route
router.post("/register", registerUser);
//log in route
router.post("/login", loginUser);
//proteccion route Admin,client,delivery 
router.get("/admin-data", authenticate, authorizeRoles("admin"), (req, res) => { //authorizeRoles("admin") verifica que el rol del usuario sea "admin".authenticate verifica que haya un token válido
  res.json({ message: "Only available to Administrators" });
});

router.get("/client-data", authenticate, authorizeRoles("client"), (req, res) => { 
  res.json({ message: "Only available to clients" });
});

router.get("/delivery-data", authenticate, authorizeRoles("delivery"), (req, res) => { 
  res.json({ message: "Only available to delivery employee" });
});



export default router;
