import { Router } from "express";
import { createMeetingHandler } from "../controllers/MeetingRoom/createMeetingRoom";
import {
  fetchMeetings,
  fetchMeeting,
} from "../controllers/MeetingRoom/fetchMeetingRoom";
import { deleteMeeting } from "../controllers/MeetingRoom/deleteMeetingRoom";
import { updateMeeting } from "../controllers/MeetingRoom/updateMeetingRoom";

import PATHS from "../utils/apiPaths";

// import { authenticateToken } from "../middleware/authMiddleware";
// import { verifyRole, ROLES } from "../utils/verifyRole";

const router = Router();

router.post(PATHS.MEETINGROOM.CREATE_MEET, createMeetingHandler);

router.get(PATHS.MEETINGROOM.GET_ALL, fetchMeetings);
router.get(PATHS.MEETINGROOM.GET_BY_ID, fetchMeeting);

router.delete(PATHS.MEETINGROOM.DELETE, deleteMeeting);
router.put(PATHS.MEETINGROOM.UPDATE, updateMeeting);
export default router;
