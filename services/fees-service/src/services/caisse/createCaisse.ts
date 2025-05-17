import Caisse from "../../models/Caisse";
import { ICaisse } from "../../interface/ICaisse";

const createCaisse = async (caisseData: ICaisse) => {
  try {
    const caisse = await Caisse.create({
      name: caisseData.name,
      balance: caisseData.balance || 0,
      minBalance:caisseData.minBalance,
      participants: caisseData.participants || [],
    });
    return caisse; 
  } catch (error) {
    console.error("Error creating caisse:", (error as Error).message);
    throw new Error("Error creating caisse");
  }
};

export { createCaisse };
