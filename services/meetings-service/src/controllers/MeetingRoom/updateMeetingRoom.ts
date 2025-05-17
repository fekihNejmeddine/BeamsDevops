import { Request, Response } from "express";
import { updateMeeting as updateMeetingService } from "../../service/MeetingRoom/updateMeetingRoom";

export const updateMeeting = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const meetingID: string = req.params.id;
    const meetingData = req.body;

    if (!meetingID) {
      res.status(400).json({ message: "Meeting ID is required" });
      return;
    }

    const updatedRoom = await updateMeetingService(meetingData, meetingID);
    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: (error as Error).message });
  }
};
