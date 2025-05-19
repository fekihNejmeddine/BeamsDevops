import { Op } from "sequelize";
import Caisse from "../../models/Caisse";
interface FetchOptions {
  limit?: number;
  offset?: number;
  search?: string;
  name?: string;
  order?: [string, string][];
}

// Fetch all Caisses
const fetchCaisses = async (options: FetchOptions) => {
  try {
    const { limit, offset, search, name, order } = options;
    const where: any = {
      isDeleted: false, 
    };

    if (search) {
      where[Op.or] = [{ name: { [Op.like]: `%${search}%` } }];
    }

    // Apply role filter
    if (name) {
      where.name = { [Op.eq]: name };
    }

    const users = await Caisse.findAndCountAll({
      where,
      limit,
      offset,
      order,
    });

    return users;
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};
const fetchAllCaisses = async () => {
  try {
    const caisse = await Caisse.findAll();
    return caisse;
  } catch (error: any) {
    console.error("🔥 Sequelize error:", error); // log complet de l'erreur
    throw error;
  }
};
// Fetch Caisse by ID
const fetchCaisse = async (caisseID: string) => {
  try {
    const caisse = await Caisse.findByPk(caisseID);
    return caisse;
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};

export { fetchCaisses, fetchCaisse,fetchAllCaisses };
