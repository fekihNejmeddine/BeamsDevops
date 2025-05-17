import { Request, Response } from "express";
import * as MeetingRoomService from "../../service/MeetingRoom/fetchMeetingRoom";

// Fonction pour récupérer tous les meetings
const fetchMeetings = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 5;
    const offset = (page - 1) * pageSize;
    const search = req.query.search as string | undefined;
    const capacity = req.query.capacity as number | undefined;
    const { count, rows } = await MeetingRoomService.fetchMeetingRooms({
      limit: pageSize,
      offset: offset,
      search: search,
      capacity: capacity,
      order: [["name", "ASC"]],
    });
    res.status(200).json({
      total: count,
      page: page,
      pageSize: pageSize,
      totalPages: Math.ceil(count / pageSize),
      meetingRooms: rows,
    });
  } catch (error) {
    res.status(401).json({ message: "Error fetching Meetings" });
  }
};

// Fonction pour récupérer un meeting par ID
const fetchMeeting = async (req: Request, res: Response): Promise<void> => {
  try {
    const meeting = await MeetingRoomService.fetchMeeting(req.params.id);
    res.status(200).json(meeting);
  } catch (error) {
    res.status(401).json({ message: "Error fetching Meeting" });
  }
};

export { fetchMeetings, fetchMeeting };
