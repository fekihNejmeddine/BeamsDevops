import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_secretKey = process.env.JWT_ACCESS_SECRET_KEY as string;

interface DecodedToken {
  Role: string;
  [key: string]: any;
}

interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
  role?: string;
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Response | void {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Missing token!" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token format!" });
  }

  jwt.verify(token, ACCESS_secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: err.message });
    }
    req.user = user as DecodedToken; // Assign user data to request object
    req.role = req.user?.role; // Ensure role is properly assigned
    next();
  });
}