import { meetingRoom } from "../../models/meetingRoom";
import { IMeetingRoom } from "../../interface/IMeetingRoom";

export const createMeeting = async (
  meetData: IMeetingRoom
): Promise<IMeetingRoom> => {
  try {
    const { name, capacity, location } = meetData;

    // Create Meeting in MySQL
    const newMeeting = await meetingRoom.create({
      name,
      capacity,
      location,
    });

    return newMeeting.toJSON() as IMeetingRoom;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
