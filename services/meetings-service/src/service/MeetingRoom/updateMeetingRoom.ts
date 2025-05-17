import { meetingRoom } from "../../models/meetingRoom";
import { IMeetingRoom } from "../../interface/IMeetingRoom";

export const updateMeeting = async (
  meetingData: IMeetingRoom,
  meetingID: string
) => {
  try {
    const meeting = await meetingRoom.findByPk(meetingID);
    if (!meeting) {
      throw new Error("Meeting not found");
    }

    // Mise à jour des champs si fournis
    if (meetingData.name) meeting.name = meetingData.name;
    if (meetingData.capacity) meeting.capacity = meetingData.capacity;
    if (meetingData.location) meeting.location = meetingData.location;

    await meeting.save(); // Attendre la sauvegarde

    return meeting;
  } catch (error) {
    console.error("Error Updating Data:", (error as Error).message);
    throw new Error("Error Updating Data");
  }
};
