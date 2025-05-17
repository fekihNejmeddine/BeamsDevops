import { Request, Response } from "express";
import { createTransaction } from "../../services/transaction/createTransaction";

const createTransactionHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transactionData = req.body;
    const createdTransaction = await createTransaction(transactionData);
    res
      .status(200)
      .json({
        message: "Transaction created successfully",
        Data: createdTransaction,
      });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "An error occurred" });
  }
};
export { createTransactionHandler };
