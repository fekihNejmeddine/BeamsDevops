import Transaction from "../../models/Transaction";

const deleteTransaction = async (doneBy: string, transactionID: string) => {
  try {
    const transaction = await Transaction.findByPk(transactionID);

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    // Supprimer l'utilisateur
    await transaction.destroy();

    return { message: "transaction Deleted Successfully" };
  } catch (error) {
    console.error("Error Deleting Data:", (error as Error).message);
    throw new Error("Error Deleting Data");
  }
};

export { deleteTransaction };
