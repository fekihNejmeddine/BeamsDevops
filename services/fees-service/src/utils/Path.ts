const PATHS = {
  TRANSACTION: {
    CREATE_TRANSACTION: "/",
    UPDATE_TRANSACTION: "/:transactionId",
    DELETE_TRANSACTION: "/:transactionId",
    GET_BY_CAISSE_TRANSACTION: "/caisse/:caisseId/transactions",

    ADD_PARTICIPANT: "/caisse/participants",
    DELETE_PARTICIPANT: "/caisse/participants/:participantId",
    GET_PARTICIPANT_CAISSE: "/caisse/participants",
  },
  CAISSE: {
    CREATE_CAISSE: "/",
    GET_ALL_CAISSE: "/",
    GET_CAISSE: "/AllCaisses",
    PUT_CAISSE: "/:caisseId",
    DELETE_CAISSE: "/:caisseId",
  },
};

export default PATHS;
