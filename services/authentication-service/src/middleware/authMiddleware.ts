import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../interface/IUser";

const ACCESS_secretKey = process.env.JWT_ACCESS_SECRET_KEY as string;

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.header("Authorization");
  console.log("Authorization header:", authHeader);

  if (!authHeader) {
    console.log("No Authorization header provided");
    res.status(401).json({ message: "Unauthorized: Missing token!" });
    return;
  }

  const [bearer, token] = authHeader.split(" ");
  console.log("Bearer:", bearer, "Token:", token);

  if (bearer !== "Bearer" || !token) {
    console.log("Invalid token format");
    res.status(401).json({ message: "Unauthorized: Invalid token format!" });
    return;
  }

  try {
    const user = jwt.verify(token, ACCESS_secretKey) as IUser & {
      id: number;
      role: string;
    };
    console.log("Decoded token payload:", user);
    req.user = user;
    (req as any).role = user.role;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(403).json({ message: `Forbidden: Invalid token! (${error})` });
    return;
  }
}
