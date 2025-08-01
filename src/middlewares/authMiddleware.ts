import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto_super_seguro";

export interface AuthRequest extends Request {
  user?: any;
}

//Lee el header Authorization, verifica JWT y guarda req.user = decoded.
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


//Recibe roles permitidos (["admin"], etc) y verifica req.user.role.
export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}

