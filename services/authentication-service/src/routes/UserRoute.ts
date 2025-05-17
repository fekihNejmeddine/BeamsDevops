import { Router } from "express";
import { signup, activate } from "../controllers/User/signup";
import { createUserHandler } from "../controllers/User/createUser";
import {
  fetchUserByEmail,
  fetchUsers,
  fetchUser,
  fetchUserByRole,
  fetchAllUsers,
} from "../controllers/User/fetchUsers";
import { deleteUser } from "../controllers/User/deleteUser";
import { updateUser } from "../controllers/User/updateUser";
import editProfile from "../controllers/User/editProfile";

import PATHS from "../utils/apiPaths";

import { authenticateToken } from "../middleware/authMiddleware";
import { verifyRole, ROLES } from "../utils/verifyRole";
import verifyPassword from "../controllers/User/verifyPassword";

const router = Router();

// Auth routes
router.post(PATHS.AUTH.SIGNUP, signup);
router.post(PATHS.USER.CREATE_USER, createUserHandler);

// User routes
router.get(
  PATHS.USER.GET_ALL,
  authenticateToken,
  //verifyRole(ROLES.ADMIN),
  fetchUsers
);
router.get(PATHS.USER.GET_BY_EMAIL, fetchUserByEmail);
router.get(PATHS.USER.GET_ALL_USER, fetchAllUsers);
router.get(PATHS.USER.GET_BY_ROLE, fetchUserByRole);
router.get(PATHS.USER.GET_BY_ID, fetchUser);
router.delete(PATHS.USER.DELETE, deleteUser);
router.put(PATHS.USER.UPDATE, updateUser);
router.put(PATHS.USER.EDIT_PROFILE, editProfile);
router.post(PATHS.USER.VERIFY_PASSWORD, verifyPassword);

export default router;
