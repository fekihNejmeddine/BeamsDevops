import { Op } from "sequelize";
import Reclamation from "../../models/Reclamation";

export const getAllReclamations = async () => {
  try {
    const reclamation = await Reclamation.findAll();
    return reclamation;
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};

export const getReclamationsByUserId = async (
  user_id: number,
  options: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  } = {}
) => {
  try {
    const { search, status, page = 1, limit = 5 } = options;
    
    const offset = (page - 1) * limit;
    
    const whereClause: any = { user_id };
    
    if (status) {
      whereClause.status = status;
    }
    
    if (search) {
      whereClause.description = {
        [Op.like]: `%${search}%`
      };
    }
    
    const { count, rows } = await Reclamation.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });
    
    return {
      data: rows,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit)
    };
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};