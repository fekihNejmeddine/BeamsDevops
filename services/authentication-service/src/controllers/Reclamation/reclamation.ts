import { Request, Response } from "express";
import {
  fetchNewNotifications,
  setNotificationsViewed,
  getNotifications as getNotificationsService,
} from "../../service/Reclamation/reclamation";

export const fetchNewNotifs = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.user_id, 10);
    const { notifications, newNotifs } = await fetchNewNotifications(userId);
    res.status(200).json({ notifications, newNotifs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

export const setViewed = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    await setNotificationsViewed(userId);
    res.status(200).json({ message: "Notifications marked as viewed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating notifications" });
  }
};

// Fetch all notifications for a user

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await getNotificationsService();

    if (!notifications) {
      res.status(404).json({ message: "Aucune notification trouvée" });
    }

    res.status(200).json({ notifications });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des notifications" });
  }
};

