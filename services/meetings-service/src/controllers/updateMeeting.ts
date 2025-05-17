import { Request, Response } from "express";
import { updateMeeting as updateMeetingService } from "../service/updateMeeting";

export const updateMeeting = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const meetingID: string = req.params.id;
    const meetingData = req.body;

    console.log(`Received update request for meeting ID: ${meetingID}`, meetingData);

    if (!meetingID) {
      console.warn(`Meeting ID is missing in request`);
      res.status(400).json({ message: "Meeting ID is required" });
      return;
    }

    // Normalize participants to ensure correct format
    if (meetingData.participants) {
      meetingData.participants = Array.isArray(meetingData.participants)
        ? meetingData.participants.map((p: any) => ({
            username: p.username,
            email: p.email,
          }))
        : [{ username: meetingData.participants.username, email: meetingData.participants.email }];
      console.log(`Normalized participants:`, meetingData.participants);
    }

    const updatedMeeting = await updateMeetingService(meetingData, meetingID);

    console.log(`Meeting ${meetingID} updated successfully`);
    res.status(200).json(updatedMeeting);
  } catch (error) {
    console.error(`Error in updateMeeting handler for ID :`, error);
    res.status(400).json({ message: (error as Error).message });
  }
};