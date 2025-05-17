import { Request, Response } from "express";
import { deleteTransaction as deleteTransactionService } from "../../services/transaction/deleteTransaction";
import Transaction from "../../models/Transaction";

export const deleteTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const doneBy: string = req.query.doneBy as string;
    const transactionID: string = req.params.transactionId;
    if (!transactionID) {
      res.status(400).json({ message: "transaction ID is required" });
      return;
    }

    const transaction = await Transaction.findByPk(transactionID);
    if (!transaction) {
      res.status(404).json({ message: "transaction not found" });
      return;
    }

    await deleteTransactionService(doneBy, transactionID);
    res.status(200).json({ message: "Transaction Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
};
