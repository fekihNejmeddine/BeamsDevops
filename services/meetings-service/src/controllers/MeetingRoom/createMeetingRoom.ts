import { Request, Response } from "express";
import { createMeeting } from "../../service/MeetingRoom/createMeetingRoom";
import moment from "moment";

const createMeetingHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const meetingData = req.body;

    const createdMeetingRoom = await createMeeting(meetingData);

    res.status(200).json({
      message: "Meeting created successfully",
      Data: createdMeetingRoom,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message || "An error occurred" });
  }
};

export { createMeetingHandler };
