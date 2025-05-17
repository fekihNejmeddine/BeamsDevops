import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_secretKey = process.env.JWT_ACCESS_SECRET_KEY as string;

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
    (req as any).role = user.role; 

    next();
  });
}
