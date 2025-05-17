import { Request, Response } from "express";
import { updateCaisse as updateCaisseService } from "../../services/caisse/updateCaisses";

export const updateCaisse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const caisseID: string = req.params.caisseId;
    const caisseData = req.body;
    if (!caisseID) {
      res.status(400).json({ message: "Caisse ID is required" });
      return;
    }

    const updatedCaisse = await updateCaisseService(caisseData, caisseID);
    res.status(200).json(updatedCaisse);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: (error as Error).message });
  }
};
