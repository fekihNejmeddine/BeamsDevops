import { Request, Response } from "express";
import * as BuildingService from "../../service/Building/fetchBuilding";

// Fonction pour récupérer tous les Buildings
export const fetchBuildings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 5;
    const offset = (page - 1) * pageSize;
    const search = req.query.search as string | undefined;
    const address = req.query.address as string | undefined;
    const numberOfFloors = req.query.numberOfFloors as number | undefined;

    const { count, rows } = await BuildingService.fetchBuildings({
      limit: pageSize,
      offset: offset,
      search: search,
      address: address,
      numberOfFloors: numberOfFloors,
      order: [["name", "ASC"]],
    });

    res.status(200).json({
      total: count,
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(count / pageSize),
      buildings: rows,
    });
  } catch (error) {
    res.status(401).json({ message: "Error fetching Buildings" });
  }
};

// Fonction pour récupérer un Building par ID
export const fetchBuilding = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const building = await BuildingService.fetchBuilding(req.params.id);
    res.status(200).json(building);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Building" });
  }
};
