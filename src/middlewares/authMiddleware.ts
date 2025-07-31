import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto_super_seguro";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response , next: NextFunction)=> {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json ({message: "No token provided"})

        try{
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        }catch(error){
            return res.status(403).json({ message: "Invalid token" });
        }
}

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}

