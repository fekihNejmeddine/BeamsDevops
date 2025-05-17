import { meetingRoom } from "../../models/meetingRoom";
import { IMeetingRoom } from "../../interface/IMeetingRoom";

export const deleteMeeting = async (doneBy: string, meetingID: string) => {
  try {
    const meeting = await meetingRoom.findByPk(meetingID);

    if (!meeting) {
      throw new Error("Meeting not found");
    }
    await meeting.destroy();
    return { message: "Meeting Deleted Successfully" };
  } catch (error) {
    console.error("Error Deleting Data:", (error as Error).message);
    throw new Error("Error Deleting Data");
  }
};
