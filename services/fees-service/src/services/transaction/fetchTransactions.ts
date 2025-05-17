import Caisse from "../../models/Caisse";
import Transaction from "../../models/Transaction";
interface FetchOptions {
  limit?: number;
  offset?: number;
  order?: [string, string][];
}
// Fetch all Transactions
const fetchTransactions = async (options: FetchOptions) => {
  try {
    const { limit, offset, order } = options;
    const transactions = await Transaction.findAndCountAll({
      limit,
      offset,
      order,
    });
    return transactions;
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};

const fetchTransaction = async (transactionID: string) => {
  try {
    const transaction = await Transaction.findByPk(transactionID);
    return transaction;
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};

const fetchTransactionsByCaisse = async (caisseId: number) => {
  try {
    const transactions = await Transaction.findAll({
      where: { caisseId },
    });

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export { fetchTransactions, fetchTransaction, fetchTransactionsByCaisse };
