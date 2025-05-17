import { User } from "../../models/User";
import bcrypt from "bcrypt";
import { IUser } from "../../interface/IUser";

async function updateUser(userData: IUser, userID: string) {
  try {
    const user = await User.findByPk(userID);
    if (!user) {
      throw new Error("User not found");
    }
    if (userData.email) user.email = userData.email;
    if (userData.username) user.username = userData.username;
    if (userData.lastName) user.lastName = userData.lastName;
    if (userData.role) user.role = userData.role;
    if (userData.isDeleted !== undefined) user.isDeleted = userData.isDeleted;

    await user.save();

    return user;
  } catch (error) {
    console.error("Error Updating Data:", (error as Error).message);
    throw new Error("Error Updating Data");
  }
}

export { updateUser };
