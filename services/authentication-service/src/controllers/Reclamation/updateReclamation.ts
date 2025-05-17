import { Request, Response } from "express";
import { updateReclamation as updateReclamationService } from "../../service/Reclamation/updateReclamation";

export const updateReclamation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reclamationId = req.params.id;
    const reclamationData = req.body;
    if (!reclamationId || typeof reclamationId !== "string") {
      res.status(400).json({ message: "Valid reclamation ID is required." });
      return;
    }

    const updatedReclamation = await updateReclamationService(
      reclamationData,
      reclamationId
    );

    res.status(200).json({
      message: "Reclamation updated successfully.",
      data: updatedReclamation,
    });
  } catch (error) {
    console.error("Update Reclamation Error:", error);
    res.status(500).json({
      message: "An error occurred while updating the reclamation.",
      error: (error as Error).message,
    });
  }
};
