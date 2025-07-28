import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

//User register
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        //validate nothing is missing
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Every field must be filled" })
        }
        //validate existing user
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        //crypted password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create New User
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "User register succesfull", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server Error" });
    }
}