import { Request, Response, NextFunction } from "express";

export enum ROLES {
  ADMIN = "Admin",
  RH = "Rh",
  SYNDIC = "Syndic",
  RESIDENT="Resident"
}

export function verifyRole(requiredRole: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const role = (req as any).role; // 👈 Ajout d'un cast pour éviter les erreurs TypeScript

    if (!role) {
      res.status(403).json({ message: "Forbidden: No role assigned" });
      return;
    }

    if (role !== requiredRole) {
      res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      return;
    }

    next();
  };
}
