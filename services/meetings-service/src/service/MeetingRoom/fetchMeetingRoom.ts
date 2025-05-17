import { meetingRoom } from "../../models/meetingRoom";
import { Op } from "sequelize";

interface FetchOptions {
  limit?: number;
  offset?: number;
  search?: string;
  capacity?: number;
  order?: [string, string][];
}
// Fetch all Rooms
export const fetchMeetingRooms = async (options: FetchOptions) => {
  try {
    const { limit, offset, order, search, capacity } = options;
    const where: any = {
      isDeleted: false,
    };
    if (search) {
      where[Op.or] = [{ name: { [Op.like]: `%${search}%` } }];
    }

    if (capacity) {
      where.capacity = { [Op.eq]: capacity };
    }
    const meetingRooms = await meetingRoom.findAndCountAll({
      where,
      limit,
      offset,
      order,
    });
    return meetingRooms;
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};

// Fetch meeting by ID
export const fetchMeeting = async (meetingID: string) => {
  try {
    const meeting = await meetingRoom.findByPk(meetingID);
    return meeting;
  } catch (error: any) {
    console.error("Error Fetching Data:", error.message);
    throw new Error("Error Fetching Data");
  }
};
