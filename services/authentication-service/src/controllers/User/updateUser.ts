import { Request, Response } from "express";
import { updateUser as updateUserService } from "../../service/User/updateUser";

export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const userID: string = req.params.id;
    const userData = req.body;

    if (!userID) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const updatedUser = await updateUserService(userData, userID);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: (error as Error).message });
  }
}
