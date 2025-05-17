import { Building } from "../../models/Building";

export const deleteBuilding = async (doneBy: string, buildingID: string) => {
  try {
    const building = await Building.findByPk(buildingID);

    if (!building) {
      throw new Error("building not found");
    }

    await building.destroy();
    return { message: "Building Deleted Successfully" };
  } catch (error) {
    console.error("Error Deleting Data:", (error as Error).message);
    throw new Error("Error Deleting Data");
  }
};
