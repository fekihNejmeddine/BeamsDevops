import { Request, Response } from "express";
import {
  signup as signupService,
  activate as activateService,
} from "../../service/User/signup";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData = req.body;
    const { savedUser, token } = await signupService(userData);
    res
      .status(201)
      .json({ user: savedUser, token, message: "User Created Successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "An error occurred" });
  }
};

export const activate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, token } = req.body;
    const emailStatus = await activateService(user, token);
    res.status(201).json({ emailStatus });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "An error occurred" });
  }
};
