const PATHS = {
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    LOGOUT: "/logout",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password/:token",
    CHANGE_PASSWORD: "/change-password",
    REFRESH_TOKEN: "/refresh-token",
  },
  USER: {
    GET_ALL: "/",
    GET_ALL_USER: "/ALLUSERS/",
    GET_BY_EMAIL: "/email/:email",
    GET_BY_ID: "/:id",
    GET_BY_ROLE: "/role/:role",
    CREATE_USER: "/create",
    DELETE: "/:id",
    UPDATE: "/:id",
    EDIT_PROFILE: "/edit-profile/:id",
    VERIFY_PASSWORD: "/verify-password",
  },
  RECLAMATION: {
    CREATE_RECLAMATION: "/",
    DELETE_RECLAMATION: "/:id",
    PUT_RECLAMATION: "/:id",
    GET_ALL_RECLAMATIONS: "/",
    GET_RECLAMATION_BY_USERID: "/:userid",
  },
  NOTIFICATION: {
    GET_ALL_NOTIFICATIONS: "/all",
    PUT_NOTIFICATION_AS_READ: "/viewed/:user_id",
    ADD_NOTIFICATION: "/",
  },
};

export default PATHS;
