import { Request, Response } from "express";
import { updateBuilding as updateBuildingService } from "../../service/Building/updateBuilding";

export const updateBuilding = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const buildingID: string = req.params.id;
    const buildingData = req.body;

    if (!buildingID) {
      res.status(400).json({ message: "Building ID is required" });
      return;
    }

    const updatedBuilding = await updateBuildingService(
      buildingData,
      buildingID
    );
    res.status(200).json(updatedBuilding);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: (error as Error).message });
  }
};
