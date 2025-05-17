import { User } from "../../models/User";

async function deleteUser(doneBy: string, userID: string) {
  try {
    const user = await User.findByPk(userID);

    if (!user) {
      throw new Error("User not found");
    }

    // Supprimer l'utilisateur
    await user.destroy();

    return { message: "User Deleted Successfully" };
  } catch (error) {
    console.error("Error Deleting Data:", (error as Error).message);
    throw new Error("Error Deleting Data");
  }
}

export { deleteUser };
