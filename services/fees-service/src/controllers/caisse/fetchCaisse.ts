import { Request, Response } from "express";
import * as caisseService from "../../services/caisse/fetchCaisse";

const fetchCaisses = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 5;
    const limit = parseInt(req.query.limit as string) || pageSize;
    const offset = (page - 1) * pageSize;
    const search = req.query.search as string | undefined;
    const name = req.query.name as string | undefined;

    const { count, rows } = await caisseService.fetchCaisses({
      limit,
      offset,
      search,
      name,
      order: [["name", "ASC"]],
    });

    res.status(200).json({
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
      caisses: rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching caisses" });
  }
};
const fetchAllCaisses = async (req: Request, res: Response): Promise<void> => {
  try {
    const caisse = await caisseService.fetchAllCaisses();
    res.status(200).json(caisse);
  } catch (error) {
    res.status(401).json({ message: "Error fetching users by role" });
  }
};
const fetchCaisse = async (req: Request, res: Response): Promise<void> => {
  try {
    const caisse = await caisseService.fetchCaisse(req.params.id);
    res.status(200).json(caisse);
  } catch (error) {
    res.status(401).json({ message: "Error fetching caisse" });
  }
};

export { fetchCaisses, fetchCaisse, fetchAllCaisses };
