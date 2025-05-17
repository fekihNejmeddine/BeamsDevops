import { Request, Response } from "express";
import { createMeeting } from "../service/createMeeting";
import moment from "moment";

const createMeetingHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const meetingData = req.body;
    const { participants } = req.body;
    console.log("participants controller :", meetingData);
    // Validate required fields
    if (!meetingData.startTime || !meetingData.endTime) {
      throw new Error("Start Time and End Time are required");
    }

    // Ensure participants is an array of { username, email }
    const participantsArray = Array.isArray(participants)
      ? participants.map((p: any) => ({
          id: p.id,
          username: p.username,
          email: p.email,
        }))
      : participants && typeof participants === "object"
      ? [{ username: participants.username, email: participants.email }]
      : [];

    meetingData.participants = participantsArray;

    // Validate date format
    const isValidStartTime = moment(
      meetingData.startTime,
      "YYYY-MM-DD HH:mm:ss",
      true
    ).isValid();
    const isValidEndTime = moment(
      meetingData.endTime,
      "YYYY-MM-DD HH:mm:ss",
      true
    ).isValid();

    if (!isValidStartTime || !isValidEndTime) {
      throw new Error(
        "Invalid date format. Expected format: YYYY-MM-DD HH:mm:ss"
      );
    }

    let createmeeting = await createMeeting(meetingData);

    res.status(200).json({ Data: createmeeting });
  } catch (error: any) {
    console.error(`Error in createMeetingHandler:`, error);
    res.status(400).json({ message: error.message || "An error occurred" });
  }
};

export { createMeetingHandler };
