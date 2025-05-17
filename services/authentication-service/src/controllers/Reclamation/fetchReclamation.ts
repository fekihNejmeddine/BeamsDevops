import { Request, Response } from "express";
import * as getReclamations from "../../service/Reclamation/fetchReclamation";

export const getAllReclamations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reclamation = await getReclamations.getAllReclamations();
    res.status(200).json(reclamation);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Reclamation" });
  }
};

export const getReclamationsByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { search, status, page, limit } = req.query;

    const reclamation = await getReclamations.getReclamationsByUserId(
      Number(req.params.userid),
      {
        search: search?.toString(),
        status: status?.toString(),
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      }
    );

    res.status(200).json(reclamation);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Reclamation" });
  }
};
