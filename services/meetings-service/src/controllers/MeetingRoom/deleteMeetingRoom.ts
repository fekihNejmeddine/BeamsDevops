import { Request, Response } from "express";
import { deleteMeeting as deleteMeetingService } from "../../service/MeetingRoom/deleteMeetingRoom";
import { meetingRoom } from "../../models/meetingRoom";

export const deleteMeeting = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const doneBy: string = req.query.doneBy as string;
    const meetingID: string = req.params.id;

    if (!meetingID) {
      res.status(400).json({ message: "Meeting ID is required" });
      return;
    }

    // Vérifier si meeting existe
    const meeting = await meetingRoom.findByPk(meetingID);
    if (!meeting) {
      res.status(404).json({ message: "Meeting not found" });
      return;
    }

    await deleteMeetingService(doneBy, meetingID);
    res.status(200).json({ message: "Meeting Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
};
