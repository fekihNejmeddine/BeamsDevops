import { Request, Response } from "express";
import { createBuilding } from "../../service/Building/createBuilding";

export const createBuildingHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const buildingData = req.body;
    await createBuilding(buildingData);
    res
      .status(200)
      .json({ message: "Building created successfully", buildingData });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "An error occurred" });
  }
};
