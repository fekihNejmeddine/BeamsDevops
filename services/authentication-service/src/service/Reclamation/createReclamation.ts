import { IReclamation } from "../../interface/IReclamation";
import Notification from "../../models/Notification";
import Reclamation from "../../models/Reclamation";
import axios from "axios";
import { cloudinary } from "../../utils/cloudinary";

const createReclamation = async (reclamationData: IReclamation) => {
  try {
    console.log("reclamationData :",reclamationData)
    const photoUrl: string[] = [];
    if (reclamationData.Photo && reclamationData.Photo.length > 0) {
      console.log("Uploading Photos...");
      for (const photo of reclamationData.Photo) {
        const uploadedResponse = await cloudinary.uploader.upload(photo, {
          upload_preset: "windBeams",
        });
        photoUrl.push(uploadedResponse.secure_url);
      }
    }

    const newReclamation = await Reclamation.create({
      user_id: reclamationData.user_id,
      title: reclamationData.title,
      description: reclamationData.description,
      status: reclamationData.status,
      Photo: photoUrl,
    });

    await axios
      .post(
        "http://localhost:3001/api/notifications/",
        {
          user_id: newReclamation.user_id,
          title: "New Transaction",
          detail: `reclamation of ${newReclamation.description} .`,
          type: newReclamation.user_id,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .catch((error) => {
        console.error(
          "Error sending notification:",
          error.response?.data || error.message
        );
      });
    return newReclamation;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export { createReclamation };

