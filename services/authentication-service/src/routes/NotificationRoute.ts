import { Router } from "express";
import { fetchNotification } from "../controllers/Notification/fetchNotification";
import { createNotification } from "../controllers/Notification/createNotification";
import { updateNotification } from "../controllers/Notification/updateNotification";
import { authenticateToken } from "../middleware/authMiddleware";
import PATHS from "../utils/apiPaths";

const router = Router();

router.get(
  PATHS.NOTIFICATION.GET_ALL_NOTIFICATIONS,
  authenticateToken,
  fetchNotification
);
router.post(PATHS.NOTIFICATION.ADD_NOTIFICATION, createNotification);
router.put(
  PATHS.NOTIFICATION.PUT_NOTIFICATION_AS_READ,
  authenticateToken,
  updateNotification
);

export default router;
