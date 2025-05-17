import Transaction from "../../models/Transaction";
import { ITransaction } from "../../interface/ITransaction";

const updateTransaction = async (
  transactionData: ITransaction,
  transactionID: string
) => {
  try {
    const transaction = await Transaction.findByPk(transactionID);
    if (!transaction) {
      throw new Error("transaction not found");
    }

    if (transactionData.amount) transaction.amount = transactionData.amount;
    if (transactionData.date) transaction.date = transactionData.date;
    if (transactionData.caisseId)
      transaction.caisseId = transactionData.caisseId;
    if (transactionData.userId) transaction.userId = transactionData.userId;
    if (transactionData.description)
      transaction.description = transactionData.description;
    await transaction.save();
    if (transactionData.isDeleted !== undefined)
      transaction.isDeleted = transactionData.isDeleted;

    return transaction;
  } catch (error) {
    console.error("Error Updating Data:", (error as Error).message);
    throw new Error("Error Updating Data");
  }
};

export { updateTransaction };
