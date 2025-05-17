import { Request, Response } from "express";
import { verifyPassword as verifyPasswordService } from "../../service/User/verifyPassword";
import { authenticateToken } from "../../middleware/authMiddleware";
import { User } from "../../models/User";

const verifyPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const passwordData = req.body;

    // Validate user ID matches authenticated user
    // if (!req.user || req.user.id !== passwordData.id) {
    //   console.log("Unauthorized access attempt");
    //   res.status(403).json({ message: "Unauthorized" });
    //   return;
    // }

    // Check if user exists
    const user = await User.findByPk(passwordData.id);
    if (!user) {
      console.log(`User not found for ID: ${passwordData.id}`);
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Update password
    const updatedUser = await verifyPasswordService(passwordData);

    // Return safe user data (excluding password)
    const { password, ...safeUserData } = updatedUser.toJSON();
    res.status(200).json({
      message: "Password updated successfully",
      user: safeUserData,
    });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(400).json({ message: (error as Error).message });
  }
};

export default [authenticateToken, verifyPassword];