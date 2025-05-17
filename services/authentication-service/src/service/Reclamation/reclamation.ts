import { Op } from "sequelize"; // Add this import
import Notification from "../../models/Notification";
import { sequelize } from "../../config/db";
import { QueryTypes } from "sequelize";
import Reclamation from "../../models/Reclamation";

export const fetchNewNotifications = async (userId: number) => {
  const notifications = await Notification.findAll({
    where: { userId },
    order: [["created_at", "DESC"]],
  });

  // Assuming you want to count new notifications separately
  const newNotifs = notifications.filter(
    (notif: any) => notif.status === "unread"
  );
  return { notifications, newNotifs };
};

export const setNotificationsViewed = async (userId: number) => {
  await Notification.update(
    { status: "viewed" },
    { where: { userId, status: "unread" } }
  );
};

export const getNotifications = async () => {
  try {
    const notifications = await Notification.findAll({
      order: [["created_at", "DESC"]],
    });
    console.log(notifications);
    return notifications;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la récupération des notifications");
  }
};


