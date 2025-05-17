import { Request, Response } from "express";
import Notification from "../../models/Notification";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  [key: string]: any;
}

export const fetchNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ message: "Missing token" });
      return;
    }

    const user = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET_KEY as string
    ) as JwtPayload;
    if (!user.id) {
      res.status(401).json({ message: "Invalid token: Missing user ID" });
      return;
    }

    const notifications = await Notification.findAll({
      where: { type: user.id },
      order: [["created_at", "DESC"]],
    });

    res.json({ notifications });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Error fetching notifications" });
  }
};
