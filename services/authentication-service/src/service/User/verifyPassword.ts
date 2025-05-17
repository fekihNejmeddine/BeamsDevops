import { PasswordData } from "../../interface/IPasswordData";
import { User } from "../../models/User";
import bcrypt from "bcrypt";

async function verifyPassword(passwordData: PasswordData): Promise<User> {
  try {
    console.log("verifyPasswordService: passwordData:", passwordData);

    const user = await User.findByPk(passwordData.id);
    if (!user) {
      console.log("User not found for ID:", passwordData.id);
      throw new Error("User not found");
    }

    // Verify current password
    const isMatch = await bcrypt.compare(passwordData.currentPassword, user.password);
    if (!isMatch) {
      console.log("Current password incorrect");
      throw new Error("Current password is incorrect");
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(passwordData.password, salt);

    await user.save();
    console.log("User password updated successfully");
    return user;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
}

export { verifyPassword };