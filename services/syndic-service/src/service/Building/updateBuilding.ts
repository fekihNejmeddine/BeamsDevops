import { Building } from "../../models/Building";
import bcrypt from "bcrypt";
import { IBuilding } from "../../interface/IBuilding";

export const updateBuilding = async (
  buildingData: IBuilding,
  buildingID: string
) => {
  try {
    const building = await Building.findByPk(buildingID);
    if (!building) {
      throw new Error("Building not found");
    }

    // Mise à jour des champs si fournis
    if (buildingData.name) building.name = buildingData.name;
    if (buildingData.address) building.address = buildingData.address;
    if (buildingData.constructionYear)
      building.constructionYear = buildingData.constructionYear;
    if (buildingData.numberOfFloors)
      building.numberOfFloors = buildingData.numberOfFloors;
    if (buildingData.city) building.city = buildingData.city;
    if (buildingData.country) building.country = buildingData.country;
    if (buildingData.owner) building.owner = buildingData.owner;
    if (buildingData.isDeleted !== undefined) building.isDeleted = buildingData.isDeleted;

    await building.save(); // Attendre la sauvegarde

    return building; // Retourne l'utilisateur mis à jour
  } catch (error) {
    console.error("Error Updating Data:", (error as Error).message);
    throw new Error("Error Updating Data");
  }
};
