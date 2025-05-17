import { Router } from "express";
import { createBuildingHandler } from "../controllers/Building/createBuilding";
import {
  fetchBuildings,
  fetchBuilding,
} from "../controllers/Building/fetchBuildings";
import { deleteBuilding } from "../controllers/Building/deleteBuilding";
import { updateBuilding } from "../controllers/Building/updateBuilding";

import PATHS from "../utils/apiPaths";

// import { authenticateToken } from "../middleware/authMiddleware";
// import { verifyRole, ROLES } from "../utils/verifyRole";

const router = Router();

router.post(PATHS.BUILDING.CREATE_BUILDING, createBuildingHandler);

router.get(PATHS.BUILDING.GET_ALL, fetchBuildings);
router.get(PATHS.BUILDING.GET_BY_ID, fetchBuilding);
router.delete(PATHS.BUILDING.DELETE, deleteBuilding);
router.put(PATHS.BUILDING.UPDATE, updateBuilding);
export default router;
