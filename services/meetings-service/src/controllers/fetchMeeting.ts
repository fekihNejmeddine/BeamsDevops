import { Request, Response } from "express";
import * as MeetingService from "../service/fetchMeeting";

// Fonction pour récupérer tous les meetings
const fetchMeetings = async (req: Request, res: Response): Promise<void> => {
  try {
    const meetings = await MeetingService.fetchMeetings();
    res.status(200).json(meetings);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Meetings" });
  }
};
const fetchMeetingsByRoom = async (
  req: Request,
  res: Response
): Promise<void> => {
  const idMeetingRoom = parseInt(req.params.idMeetingRoom);
  if (isNaN(idMeetingRoom)) {
    res.status(400).json({ message: "Invalid room ID" });
  }

  try {
    const meetings = await MeetingService.fetchMeetingsByRoom(idMeetingRoom);

    // Send the response with the meetings data
    res.status(200).json(meetings);
  } catch (error: any) {
    console.error("Error in Controller:", error.message);
    res.status(500).json({ message: error.message });
  }
};
// Fonction pour récupérer un meeting par ID
const fetchMeeting = async (req: Request, res: Response): Promise<void> => {
  try {
    const meeting = await MeetingService.fetchMeeting(req.params.id);
    res.status(200).json(meeting);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Meeting" });
  }
};

export { fetchMeetings, fetchMeeting, fetchMeetingsByRoom };
