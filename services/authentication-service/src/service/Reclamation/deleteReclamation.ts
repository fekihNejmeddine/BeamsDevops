import Reclamation from "../../models/Reclamation";

const deleteReclamation = async (doneBy: string, reclamationId: string) => {
  try {
    const reclamation = await Reclamation.findByPk(reclamationId);
console.log("reclamationId :",reclamationId)
    if (!reclamation) {
      throw new Error("reclamation not found");
    }

    // Supprimer l'utilisateur
    await reclamation.destroy();

    return { message: "reclamation Deleted Successfully" };
  } catch (error) {
    console.error("Error Deleting Data:", (error as Error).message);
    throw new Error("Error Deleting Data");
  }
};

export { deleteReclamation };
