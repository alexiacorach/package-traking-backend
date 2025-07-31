import jwt, { SignOptions } from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto_super_seguro";

export const generateToken = (
  payload: object,
  expiresIn:  SignOptions["expiresIn"] = "1d"
): string => {
  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
