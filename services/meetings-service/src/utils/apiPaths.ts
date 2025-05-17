const PATHS = {
  MEETING: {
    CREATE_MEET: "/",
    GET_ALL: "/",
    GET_BY_ID: "/:id",
    GET_BY_MEETING_ROOM:'/Room/:idMeetingRoom',
    DELETE: "/:id",
    UPDATE: "/:id",
    CHECK: "/check/:startTime/:endTime",
  },
  MEETINGROOM: {
    CREATE_MEET: "/",
    GET_ALL: "/",
    GET_BY_ID: "/:id",
    DELETE: "/:id",
    UPDATE: "/:id",
  },
};

export default PATHS;
