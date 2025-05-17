import { Request, Response } from "express";
import { forgotPassword as forgotPasswordService } from "../../service/Auth/forgotPassword";

const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { Email } = req.params;

    await forgotPasswordService(Email);

    res.status(201).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    res.status(401).json({ message: "Wrong Email" });
  }
};

export { forgotPassword };
