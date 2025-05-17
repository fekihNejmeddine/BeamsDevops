import express from "express";
import { login } from "../controllers/Auth/login";
import { signup, activate } from "../controllers/User/signup";
//import { forgotPassword } from "../controllers/Auth/forgotPassword";
import { resetPassword ,forgotPassword} from "../controllers/Auth/passwordReset";
import { Logout } from "../controllers/Auth/logout";
import { changePassword } from "../controllers/Auth/changePassword";
import { refreshToken } from "../controllers/Auth/refreshToken";
import PATHS from "../utils/apiPaths";

const router = express.Router();

// Authentication routes
router.post(PATHS.AUTH.LOGIN, login);
router.post(PATHS.AUTH.SIGNUP, signup);
router.post(PATHS.AUTH.LOGOUT, Logout);
router.post(PATHS.AUTH.FORGOT_PASSWORD, forgotPassword);
router.post(PATHS.AUTH.RESET_PASSWORD, resetPassword);
router.get(PATHS.AUTH.RESET_PASSWORD, resetPassword);
router.put(PATHS.AUTH.CHANGE_PASSWORD, changePassword);
router.get(PATHS.AUTH.REFRESH_TOKEN, refreshToken);
export default router;
