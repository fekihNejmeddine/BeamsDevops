import express from "express";
import { createCaisseHandler } from "../controllers/caisse/createCaisse";
import { deleteCaisse } from "../controllers/caisse/deleteCaisse";
import * as fetchCaisses from "../controllers/caisse/fetchCaisse";
import { updateCaisse } from "../controllers/caisse/updateCaisse";

import { ROLES, verifyRole } from "../utils/verifyRole";
import { authenticateToken } from "../middleware/authMiddleware";
import PATHS from "../utils/Path";
const router = express.Router();

router.post(PATHS.CAISSE.CREATE_CAISSE, createCaisseHandler);

router.get(
  PATHS.CAISSE.GET_ALL_CAISSE,
  verifyRole(ROLES.RH || ROLES.ADMIN),
  fetchCaisses.fetchCaisses
);
router.get(PATHS.CAISSE.GET_CAISSE, fetchCaisses.fetchAllCaisses);

router.delete(PATHS.CAISSE.DELETE_CAISSE, deleteCaisse);

router.put(PATHS.CAISSE.PUT_CAISSE, updateCaisse);
export default router;
