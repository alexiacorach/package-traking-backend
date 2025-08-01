import { Request, Response } from "express";
import PackageModel, { packageState } from "../models/PackageModel";
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
            state: packageState.Pending,
            client: req.user.id, //comes from token
        })

        res.status(201).json(newPackage);
    } catch (error) {
        console.error("Error creating package:", error);
        res.status(500).json({ message: "Server internal error" })
    }
}

export const getMyPackages = async (req: AuthRequest, res: Response) => {
    try {
        if (req.user?.role !== "client") {
            return res.status(403).json({ message: "Only clients can have access to their packages" })
        }

        const packages = await PackageModel.find({ client: req.user.id })
        res.json(packages)
    } catch (error) {
        console.error("Error obtaining client package:", error);
        res.status(500).json({ message: "Server internal error" });
    }
}