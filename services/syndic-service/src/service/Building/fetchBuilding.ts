import { Building } from "../../models/Building";
import { Op } from "sequelize";

interface FetchOptions {
  limit?: number;
  offset?: number;
  search?: string;
  address?: string;
  numberOfFloors?: number;
  order?: [string, string][];
}
// Fetch all users
const fetchBuildings = async (options: FetchOptions) => {
  try {
    const { limit, offset, order, search, address, numberOfFloors } = options;
    const where: any = {
      isDeleted: false, 
    };

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
      ];
    }

    // Apply role filter
    if (address) {
      where.role = { [Op.eq]: address };
    }
    if (numberOfFloors) {
      where.numberOfFloors = { [Op.eq]: numberOfFloors };
    }
    const buildings = await Building.findAndCountAll({
      where,
      limit,
      offset,
      order,
    });
    return buildings;
  } catch (error: any) {
    console.error("Error Fetching Buildings:", error.message);
    throw new Error("Error Fetching Buildings");
  }
};

// Fetch user by ID
const fetchBuilding = async (buildingID: string) => {
  try {
    const building = await Building.findByPk(buildingID);
    return building;
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};
export { fetchBuildings, fetchBuilding };
