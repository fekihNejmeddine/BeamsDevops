import express, { Request, Response } from "express";
import {
  fetchNewNotifs,
  setViewed,
  getNotifications,
} from "../controllers/Reclamation/reclamation";
import { authenticateToken } from "../middleware/authMiddleware";
import PATHS from "../utils/apiPaths";
import { createReclamation } from "../controllers/Reclamation/createReclamation";
import { getAllReclamations, getReclamationsByUserId } from "../controllers/Reclamation/fetchReclamation";
import { updateReclamation } from "../controllers/Reclamation/updateReclamation";
import { deleteReclamation } from "../controllers/Reclamation/deleteReclamation";

const router = express.Router();

// router.get("/:user_id", fetchNewNotifs);
// router.put("/viewed/:user_id", authenticateToken, setViewed);
router.get(
  PATHS.RECLAMATION.GET_ALL_RECLAMATIONS,
  getAllReclamations
);

router.get(
  PATHS.RECLAMATION.GET_RECLAMATION_BY_USERID,
  getReclamationsByUserId
);

router.post(PATHS.RECLAMATION.CREATE_RECLAMATION, createReclamation);
router.put(PATHS.RECLAMATION.PUT_RECLAMATION,updateReclamation);
router.delete(PATHS.RECLAMATION.DELETE_RECLAMATION,deleteReclamation);
export default router;
