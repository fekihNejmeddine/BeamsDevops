import { Request, Response } from "express";
import { createReclamation as createReclamationService } from "../../service/Reclamation/createReclamation";

export const createReclamation = async (req: Request, res: Response) => {
  try {
    const reclamationData = req.body;
    console.log("reclamationData:",reclamationData)
    const createdReclamation = await createReclamationService(reclamationData);
    res
      .status(200)
      .json({
        message: "Reclamation created successfully",
        Data: createdReclamation,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating reclamation" });
  }
};
