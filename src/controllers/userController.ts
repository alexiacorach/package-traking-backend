import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

//User register, crea usuario, encripta contraseña
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role = "client" } = req.body; // dejamos asi x ahora para facilitar el testing

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
            role,
        });

        await newUser.save();
        res.status(201).json({ message: "User register succesfull", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

//metodo login, valida credenciales, genera token con { id, role }

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "User not found" })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" })

        const token = generateToken({ id: user.id, role: user.role })
        res.json({ token })

    } catch (error) {
        res.status(500).json({ message: "Login error", error })
    }
}