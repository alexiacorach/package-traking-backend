import { Router } from "express";
import { assignPackageToDelivery, createPackage, getAssignedPackages, getMyPackages } from "../controllers/packageController";
import { authenticate, authorizeRoles } from "../middlewares/authMiddleware";

const router = Router();

// Cliente crea paquete
router.post("/create", authenticate, authorizeRoles("client"), createPackage);

// Cliente ve sus paquetes
router.get("/my-packages", authenticate, authorizeRoles("client"), getMyPackages);

//Repartidor ve sus paquetes asignados
router.get("/assigned", authenticate, authorizeRoles("delivery"), getAssignedPackages)

//Admin asigna paquete a delivery
router.put("/assign", authenticate, authorizeRoles("admin"), assignPackageToDelivery)

export default router;
