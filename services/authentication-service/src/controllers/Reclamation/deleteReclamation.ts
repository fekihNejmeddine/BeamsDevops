import { Request, Response } from "express";
import { deleteReclamation as deleteReclamationService } from "../../service/Reclamation/deleteReclamation";
import Reclamation from "../../models/Reclamation";

export const deleteReclamation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const doneBy: string = req.query.doneBy as string;
    const reclamationId: string = req.params.id;
    if (!reclamationId) {
      res.status(400).json({ message: "Reclamation ID is required" });
      return;
    }

    // Vérifier si l'utilisateur existe
    const user = await Reclamation.findByPk(reclamationId);
    if (!user) {
      res.status(404).json({ message: "Reclamation not found" });
      return;
    }

    await deleteReclamationService(doneBy, reclamationId);
    res.status(200).json({ message: "Reclamation Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
};
