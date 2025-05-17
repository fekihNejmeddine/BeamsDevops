import Transaction from "../../models/Transaction";
import { ITransaction } from "../../interface/ITransaction";
import { cloudinary } from "../../utils/cloudinary";
import axios from "axios";

const createTransaction = async (transactionData: ITransaction) => {
  try {
    // Validate required fields
    if (!transactionData.amount || transactionData.amount <= 0) {
      throw new Error("Amount must be positive");
    }
    if (!transactionData.userId) {
      throw new Error("User ID is required");
    }
    if (!transactionData.caisseId) {
      throw new Error("Caisse ID is required");
    }
    const photoUrl: string[] = [];
    if (transactionData.Photo && transactionData.Photo.length > 0) {
      console.log("Uploading Photos...");
      for (const photo of transactionData.Photo) {
        const uploadedResponse = await cloudinary.uploader.upload(photo, {
          upload_preset: "windBeams",
        });
        photoUrl.push(uploadedResponse.secure_url);
      }
    }
    console.log("photo :", photoUrl);
    // Create transaction
    const transaction = await Transaction.create({
      amount: transactionData.amount,
      date: transactionData.date || new Date(), // Default to now if not provided
      userId: transactionData.userId,
      caisseId: transactionData.caisseId,
      description: transactionData.description,
      Photo: photoUrl,
    });
   
    
    console.log("Transaction created:", transaction);
    return transaction;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw new Error(
      error instanceof Error ? error.message : "Error creating transaction"
    );
  }
};

export { createTransaction };
