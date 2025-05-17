import { Request, Response } from "express";
import { deleteBuilding as deleteBuildingService } from "../../service/Building/deleteBuilding";
import { Building } from "../../models/Building"; // Import du modèle User

export const deleteBuilding = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const doneBy: string = req.query.doneBy as string;
    const buildingID: string = req.params.id;

    if (!buildingID) {
      res.status(400).json({ message: "Building ID is required" });
      return;
    }

    // Vérifier si l'utilisateur existe
    const building = await Building.findByPk(buildingID);
    if (!building) {
      res.status(404).json({ message: "Building not found" });
      return;
    }

    await deleteBuildingService(doneBy, buildingID);
    res.status(200).json({ message: "Building Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
};
