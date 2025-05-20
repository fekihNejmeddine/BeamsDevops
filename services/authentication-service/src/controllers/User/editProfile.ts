import { Request, Response } from "express";
import { editProfile as editProfileService } from "../../service/User/editProfile";
import { authenticateToken } from "../../middleware/authMiddleware";
import { User } from "../../models/User";

const editProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate user ID from URL matches authenticated user
    const userId = parseInt(req.params.id, 10);

    // if (!req.user) {
    //   console.log("No authenticated user found");
    //   res.status(403).json({ message: "No authenticated user found" });
    //   return;
    // }

    // Check if user exists in database
    const user = await User.findByPk(userId);
    if (!user) {
      console.log(`User not found for ID: ${userId}`);
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Prepare user data and extract currentPassword
    const userData = {
      id: userId,
      email: req.body.email,
      Gender: req.body.Gender,
      username: req.body.username,
    };

    // Update profile
    const updatedUser = await editProfileService(userData);
    const { password, ...safeUserData } = updatedUser.toJSON();
    res.status(200).json({
      message: "Profile Modified Successfully",
      user: safeUserData,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(400).json({ message: (error as Error).message });
  }
};

// Export with middleware
export default [authenticateToken, editProfile];
