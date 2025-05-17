import Caisse from "../../models/Caisse";
import { ICaisse } from "../../interface/ICaisse";

const updateCaisse = async (caisseData: ICaisse, caisseID: string) => {
  try {
    console.log("caisseID :",caisseID)
    const caisse = await Caisse.findByPk(caisseID);
    if (!caisse) {
      throw new Error("caisse not found");
    }

    if (caisseData.name) caisse.name = caisseData.name;
    if (caisseData.balance) caisse.balance = caisseData.balance;
    if (caisseData.minBalance) caisse.minBalance = caisseData.minBalance;
    if (caisseData.participants) caisse.participants = caisseData.participants;
    if (caisseData.isDeleted !== undefined) caisse.isDeleted = caisseData.isDeleted;
    
    await caisse.save();

    return caisse;
  } catch (error) {
    console.error("Error Updating Data:", (error as Error).message);
    throw new Error("Error Updating Data");
  }
};

export { updateCaisse };
