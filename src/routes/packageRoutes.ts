import { Router } from "express";
import { createPackage, getMyPackages } from "../controllers/packageController";
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware";

const router = Router();

// Cliente crea paquete
router.post("/create", authenticate, authorizeRoles("client"), createPackage);

// Cliente ve sus paquetes
router.get("/my-packages", authenticate, authorizeRoles("client"), getMyPackages);

export default router;
