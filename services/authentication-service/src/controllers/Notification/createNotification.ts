import { Request, Response } from "express";
import Notification from "../../models/Notification";
import { User } from "../../models/User";
import { io } from "../../server";
import { UserRole } from "../../interface/IUser";

export const createNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Received notification request:", req.body);
    const { user_id, title, detail, type } = req.body;

    if (!title || !detail || !type) {
      console.error("Missing required fields:", {
        user_id,
        title,
        detail,
        type,
      });
      res
        .status(400)
        .json({ message: "Missing required fields: title, detail, type" });
      return;
    }

    let targetUserIds: number[] = [];
    // Check if this is a meeting notification (type matches user_id)
    if (String(type) === String(user_id)) {
      // Meeting notification: send to the specified user_id
      targetUserIds = [user_id];
    } else {
      // Transaction or other notification: check creator's role
      const transactionUser = await User.findOne({ where: { id: user_id } });
      if (!transactionUser) {
        console.error("User not found for user_id:", user_id);
        res.status(400).json({ message: "Invalid user_id: user not found" });
        return;
      }
      console.log("transactionUser:", transactionUser);

      if (transactionUser.role === UserRole.Rh) {
        // Send to all Admins
        const admins = await User.findAll({ where: { role: UserRole.Admin } });
        targetUserIds = admins.map((admin) => admin.id);
      } else if (transactionUser.role === UserRole.Resident) {
        // Send to all Syndics
        const syndics = await User.findAll({
          where: { role: UserRole.Syndic },
        });
        targetUserIds = syndics.map((syndic) => syndic.id);
      } else {
        // Send to the specified user_id
        targetUserIds = [user_id];
      }
    }
    // Create notifications for each target user
    const notifications = await Promise.all(
      targetUserIds.map(async (targetId) => {
        const notification = await Notification.create({
          user_id,
          title,
          detail,
          type: targetId,
          isRead: false,
          created_at: new Date(),
        });

        // Emit WebSocket event
        io.to(`user:${targetId}`).emit("notification", {
          id: notification.id,
          user_id: notification.user_id,
          title: notification.title,
          detail: notification.detail,
          type: notification.type,
          isRead: notification.isRead,
          created_at: notification.created_at,
        });

        return notification;
      })
    );

    res.status(201).json({ message: "Notifications created", notifications });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Error creating notification" });
  }
};
