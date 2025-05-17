import { Request, Response } from "express";
import * as transactionService from "../../services/transaction/fetchTransactions";

const fetchTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const transaction = await transactionService.fetchTransactions;
    res.status(201).json(transaction);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Une erreur inconnue est survenue" });
    }
  }
};

const fetchTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const transaction = await transactionService.fetchTransaction(
      req.params.id
    );
    res.status(200).json(transaction);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Transaction" });
  }
};
const fetchTransactionsByCaisse = async (req: Request, res: Response) => {
  try {
    const caisseId = parseInt(req.params.caisseId);
    const transactions = await transactionService.fetchTransactionsByCaisse(
      caisseId
    );
    console.log("transactions :",transactions)
    res.status(200).json(transactions);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Une erreur inconnue est survenue" });
    }
  }
};
export { fetchTransactions, fetchTransaction ,fetchTransactionsByCaisse};
