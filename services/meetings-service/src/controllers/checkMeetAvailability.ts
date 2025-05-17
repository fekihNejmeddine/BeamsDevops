import { Request, Response } from "express";
import moment from "moment";
import { checkAvailability } from "../service/checkMeetAvailability";

export const checkMeetAvailability = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { startTime, endTime, id, waitingPosition,idMeetingRoom } = req.params;

    if (!startTime || !endTime) {
      res
        .status(400)
        .json({ message: "Start time and end time are required." });
      return;
    }

    const start = moment(startTime, "YYYY-MM-DD HH:mm:ss").toDate();
    const end = moment(endTime, "YYYY-MM-DD HH:mm:ss").toDate();

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      res
        .status(400)
        .json({ message: "Invalid date format. Please use a valid date." });
      return;
    }

    const meetingId = id ? parseInt(id, 10) : undefined;
    const idRoom = idMeetingRoom ? parseInt(idMeetingRoom, 10) : undefined;
    const position = waitingPosition
      ? parseInt(waitingPosition, 10)
      : undefined;

    const isTaken = await checkAvailability(start, end, meetingId, position,idRoom);

    let message;
    switch (isTaken) {
      case 1:
        message = "Update success";
        break;
      case 2:
        message = "Seconde choice is available.";
        break;
      case 3:
        message = "Third choice is available.";
        break;
      case 4:
        message = "Fourth choice is available.";
        break;
      case 5:
        message = "Update success";
        break;
      default:
        message = "error";
    }
     console.log("isTaken :", isTaken);
    res.json({
      exists: isTaken > 1,
      waitingPosition: isTaken,
      message: message,
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};
