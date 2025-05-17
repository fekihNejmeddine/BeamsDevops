import { Request, Response } from "express";
import Notification from "../../models/Notification";

export const updateNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("req.params :",req.params)
    await Notification.update(
      { isRead: true },
      { where: { type: req.params.user_id, isRead: false } }
    );
    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ message: "Error marking notifications" });
  }
};
