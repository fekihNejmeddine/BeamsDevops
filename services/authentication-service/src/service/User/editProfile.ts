import { User } from "../../models/User";
import bcrypt from "bcrypt";
import { IUser } from "../../interface/IUser";

async function editProfile(userData: IUser, currentPassword?: string): Promise<User> {
  try {

    const user = await User.findByPk(userData.id);
    if (!user) {
      console.log("User not found for ID:", userData.id);
      throw new Error("User not found");
    }

    // Update personal information
    if (userData.email) {
      user.email = userData.email;
    }
    if (userData.Gender) {
      user.Gender = userData.Gender;
    }
    if (userData.username) {
      // Serialize Address object to JSON string
      user.username = userData.username;
    }

    await user.save();
    console.log("User profile updated successfully");
    return user;
  } catch (error) {
    console.error("Error Updating Data:", error);
    throw error;
  }
}

export { editProfile };