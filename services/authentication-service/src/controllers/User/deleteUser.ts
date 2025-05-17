import { Request, Response } from "express";
import { deleteUser as deleteUserService } from "../../service/User/deleteUser";
import { User } from "../../models/User"; // Import du modèle User

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const doneBy: string = req.query.doneBy as string;
    const userID: string = req.params.id;

    if (!userID) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findByPk(userID);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await deleteUserService(doneBy, userID);
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
}
