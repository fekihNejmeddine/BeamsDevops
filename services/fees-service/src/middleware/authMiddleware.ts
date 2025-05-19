import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_secretKey = process.env.JWT_ACCESS_SECRET_KEY as string;
declare module "express-serve-static-core" {
  interface Request {
    user?: any; // ou un type précis comme JwtPayload si tu l’as défini
    role?: string;
  }
}
export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized: Missing token!" });
    return;
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    res.status(401).json({ message: "Unauthorized: Invalid token format!" });
    return;
  }

  jwt.verify(token, ACCESS_secretKey, (err, user: any) => {
    if (err) {
      res.status(403).json({ message: "Forbidden: Invalid token!" });
      return;
    }

    req.user = user;
    req.role = user.role;
    next();
  });
}
