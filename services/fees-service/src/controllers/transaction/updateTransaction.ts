import { Request, Response } from "express";
import { updateTransaction as updateTransactionService } from "../../services/transaction/updateTransaction";

export const updateTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transactionID: string = req.params.transactionId;
    const transactionData = req.body;
    if (!transactionID) {
      res.status(400).json({ message: "Transaction ID is required" });
      return;
    }

    const updatedTransaction = await updateTransactionService(
      transactionData,
      transactionID
    );
    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: (error as Error).message });
  }
};
