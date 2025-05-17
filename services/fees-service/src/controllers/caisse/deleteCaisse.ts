import { Request, Response } from "express";
import { deleteCaisse as deleteCaisseService } from "../../services/caisse/deleteCaisse";
import Caisse from "../../models/Caisse";

export const deleteCaisse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const doneBy: string = req.query.doneBy as string;
    const caisseID: string = req.params.caisseId;
    if (!caisseID) {
      res.status(400).json({ message: "caisse ID is required" });
      return;
    }

    const caisse = await Caisse.findByPk(caisseID);
    if (!caisse) {
      res.status(404).json({ message: "caisse not found" });
      return;
    }

    await deleteCaisseService(doneBy, caisseID);
    res.status(200).json({ message: "caisse Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
};
