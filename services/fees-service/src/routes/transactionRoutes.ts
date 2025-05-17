import express from "express";
import { createTransactionHandler } from "../controllers/transaction/createTransaction";
import { deleteTransaction } from "../controllers/transaction/deleteTransaction";
import * as fetchTransactions from "../controllers/transaction/fetchTransactions";
import { updateTransaction } from "../controllers/transaction/updateTransaction";

import { ROLES, verifyRole } from "../utils/verifyRole";
import { authenticateToken } from "../middleware/authMiddleware";
import PATHS from "../utils/Path";
const router = express.Router();

router.post(
  PATHS.TRANSACTION.CREATE_TRANSACTION,
  authenticateToken,
  //verifyRole(ROLES.RH  ||ROLES.ADMIN),
  createTransactionHandler
);
router.delete(
  PATHS.TRANSACTION.DELETE_TRANSACTION,
  //authenticateToken,
  //verifyRole(ROLES.RH),
  deleteTransaction
);
router.get(
  PATHS.TRANSACTION.GET_BY_CAISSE_TRANSACTION,
  fetchTransactions.fetchTransactionsByCaisse
);
router.put(
  PATHS.TRANSACTION.UPDATE_TRANSACTION,
  //authenticateToken,
  //verifyRole(ROLES.RH),
  updateTransaction
);


export default router;
