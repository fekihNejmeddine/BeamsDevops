import { Building } from "../../models/Building";
import { IBuilding } from "../../interface/IBuilding";

const createBuilding = async (BuildingData: IBuilding): Promise<IBuilding> => {
  try {
    const {
      name,
      address,
      numberOfFloors,
      city,
      country,
      constructionYear,
      owner,
    } = BuildingData;

    // Create user in MySQL
    const newBuilding = await Building.create({
      name,
      address,
      numberOfFloors,
      city,
      country,
      constructionYear,
      owner,
    });

    return newBuilding.toJSON() as IBuilding;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export { createBuilding };
