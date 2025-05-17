import { Router } from "express";
import { createMeetingHandler } from "../controllers/createMeeting";
import {
  fetchMeetings,
  fetchMeeting,
  fetchMeetingsByRoom,
} from "../controllers/fetchMeeting";
import { deleteMeeting } from "../controllers/deleteMeeting";
import { updateMeeting } from "../controllers/updateMeeting";
import { checkMeetAvailability } from "../controllers/checkMeetAvailability";

import PATHS from "../utils/apiPaths";

// import { authenticateToken } from "../middleware/authMiddleware";
// import { verifyRole, ROLES } from "../utils/verifyRole";

const router = Router();

router.post(PATHS.MEETING.CREATE_MEET, createMeetingHandler);

router.get(PATHS.MEETING.GET_ALL, fetchMeetings);
router.get(PATHS.MEETING.GET_BY_ID, fetchMeeting);
router.get(PATHS.MEETING.GET_BY_MEETING_ROOM, fetchMeetingsByRoom);

router.get("/check/:startTime/:endTime/:id/:waitingPosition/:idMeetingRoom", checkMeetAvailability);

router.delete(PATHS.MEETING.DELETE, deleteMeeting);
router.put(PATHS.MEETING.UPDATE, updateMeeting);
export default router;
