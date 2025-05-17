import { Meeting } from "../models/Meeting";
import axios from "axios";

// Fetch all Rooms
export const fetchMeetings = async () => {
  try {
    const meetings = await Meeting.findAll();
    return meetings;
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};
// Fetch meeting by Room
export const fetchMeetingsByRoom = async (idMeetingRoom: number) => {
  try {
    const meetings = await Meeting.findAll({
      where: {
        idMeetingRoom: idMeetingRoom,
      },
    });
    return meetings;
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};
// Fetch meeting by ID
export const fetchMeeting = async (meetingID: string) => {
  try {
    const meeting = await Meeting.findByPk(meetingID);
    return meeting;
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};
