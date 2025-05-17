import Caisse from "../../models/Caisse";

const deleteCaisse = async (doneBy: string, caisseID: string) => {
  try {
    const caisse = await Caisse.findByPk(caisseID);

    if (!caisse) {
      throw new Error("caisse not found");
    }

    await caisse.destroy();

    return { message: "caisse Deleted Successfully" };
  } catch (error) {
    console.error("Error Deleting Data:", (error as Error).message);
    throw new Error("Error Deleting Data");
  }
};

export { deleteCaisse };
