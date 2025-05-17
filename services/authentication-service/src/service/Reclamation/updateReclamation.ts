import { IReclamation } from "../../interface/IReclamation";
import Reclamation from "../../models/Reclamation";

const updateReclamation = async (
  reclamationData: IReclamation,
  reclamationId: string
) => {
  try {
    const reclamation = await Reclamation.findByPk(reclamationId);
    if (!reclamation) {
      throw new Error("Reclamation not found");
    }

    // Mise à jour des champs si fournis
    if (reclamationData.user_id) reclamation.user_id = reclamationData.user_id;
    if (reclamationData.title) reclamation.title = reclamationData.title;
    if (reclamationData.description)
      reclamation.description = reclamationData.description;
    if (reclamationData.status) reclamation.status = reclamationData.status;

    await reclamation.save();

    return reclamation;
  } catch (error) {
    console.error("Error Updating Data:", (error as Error).message);
    throw new Error("Error Updating Data");
  }
};

export { updateReclamation };
