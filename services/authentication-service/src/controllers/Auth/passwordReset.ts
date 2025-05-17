import { Request, Response } from "express";
import { resetPassword as resetPasswordService } from "../../service/Auth/passwordReset";
import { forgotPassword as forgotPasswordService } from "../../service/Auth/forgotPassword";
import { User } from "../../models/User";
import { Op } from "sequelize";

const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    await forgotPasswordService(email);
    res.status(201).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    res.status(401).json({
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params;

  // Vérification du token pour les requêtes GET
  if (req.method === "GET") {
    try {
      const user = await User.findOne({
        where: {
          resetToken: token,
          resetTokenExpiry: {
            [Op.gt]: new Date(),
          },
        },
      });

      if (!user) {
        throw new Error("Invalid or expired token");
      }

      res.status(200).json({ message: "Token is valid" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
    return;
  }

  // Gestion de la réinitialisation du mot de passe pour les requêtes POST
  try {
    const { newPassword } = req.body;

    if (!newPassword) {
      res.status(400).json({ message: "New password is required" });
      return;
    }

    await resetPasswordService(token, newPassword);
    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export { forgotPassword, resetPassword };