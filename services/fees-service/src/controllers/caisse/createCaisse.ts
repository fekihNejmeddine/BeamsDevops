import { Request, Response } from "express";
import { createCaisse } from "../../services/caisse/createCaisse";

const createCaisseHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const caisseData = req.body;
    const createdCaisse = await createCaisse(caisseData);
    res
      .status(200)
      .json({ message: "Caisse created successfully", Data: createdCaisse });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "An error occurred" });
  }
};
export { createCaisseHandler };
