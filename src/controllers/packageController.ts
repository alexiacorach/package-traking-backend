import { Request, Response } from "express";
import PackageModel, { packageState } from "../models/PackageModel";
import User from "../models/User"
import { AuthRequest } from "../middlewares/authMiddleware";

//new package for Client
export const createPackage = async (req: AuthRequest, res: Response) => {
    try {
        //validate client role
        if (req.user.role !== "client") {
            return res.status(403).json({ message: "Only clients can create packages" });
        }

        const { origin, destination } = req.body

        if (!origin || !destination) {
            return res.status(400).json({ message: "Origin and Destination are mandatory" });
        }

        const newPackage = await PackageModel.create({
            origin,
            destination,
            status: packageState.Pending,
            client: req.user.id, //comes from token
        })

        res.status(201).json(newPackage);
    } catch (error) {
        console.error("Error creating package:", error);
        res.status(500).json({ message: "Server internal error" })
    }
}
//client can visualize package
export const getMyPackages = async (req: AuthRequest, res: Response) => {
    try {
        if (req.user?.role !== "client") {
            return res.status(403).json({ message: "Only clients can have access to their packages" })
        }

        const packages = await PackageModel.find({ client: req.user.id }).populate("delivery", "name, email")
        res.json(packages)
    } catch (error) {
        console.error("Error obtaining client package:", error);
        res.status(500).json({ message: "Server internal error" });
    }
}

//Delivery can see asigned packages

export const getAssignedPackages = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const packages = await PackageModel.find({ delivery: userId }).populate("delivery", "name email");

        res.json(packages)
    } catch (error) {
        res.status(500).json({ message: "Error obtaining assigned packages", error });
    }
}

//Admin assigns package to delivery
export const assignPackageToDelivery = async (req: AuthRequest, res: Response) => {
    try {
        const { packageId, deliveryId } = req.body

        if (!packageId || !deliveryId) {
            return res.status(400).json({ message: "Package ID and Delivery ID are required" })
        }

        //verifica si el user existe y es delivery
        const deliveryUser = await User.findById(deliveryId);
        if (!deliveryUser || deliveryUser.role !== "delivery") {
            return res.status(404).json({ message: "Delivery user not found or not valid" })
        }

        //asignar repartidor a paquete
        const updatedPackage = await PackageModel.findByIdAndUpdate(
            packageId,
            { delivery: deliveryId },
            { new: true }
        ).populate("delivery", "name email")

        if (!updatedPackage) {
            return res.status(404).json({ message: "Package not found" });
        }
        res.status(200).json({
            message: "Package assigned successfully",
            package: updatedPackage,
        });
    } catch (error) {
        console.error("Error assigning package:", error);
        res.status(500).json({ message: "Server internal error" });
    }
}