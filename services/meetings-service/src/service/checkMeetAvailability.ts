import { Op } from "sequelize";
import { Meeting } from "../models/Meeting";

export const checkAvailability = async (
  startTime: Date,
  endTime: Date,
  meetingId?: number,
  position?: number,
  idRoom?: number
): Promise<number> => {
  const overlappingMeetings = await Meeting.findAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            { startTime: { [Op.between]: [startTime, endTime] } },
            { endTime: { [Op.between]: [startTime, endTime] } },
            {
              startTime: { [Op.lte]: startTime },
              endTime: { [Op.gte]: endTime },
            },
          ],
        },
        idRoom !== undefined ? { idMeetingRoom: idRoom } : {},
        typeof meetingId === "number" ? { id: { [Op.not]: meetingId } } : {},
      ],
    },
  });

  // Affichage pour debug
  console.log("Overlapping meetings (filtered):", overlappingMeetings);

  // Vérification des positions déjà prises
  const takenPositions = new Set<number>();
  for (const meeting of overlappingMeetings) {
    if (meeting.waitingPosition != null) {
      takenPositions.add(meeting.waitingPosition);
    }
  }

  // Retourner la première position disponible de 1 à 4
  for (let i = 1; i <= 4; i++) {
    if (!takenPositions.has(i)) {
      return i;
    }
  }

  return -1; // Aucune position disponible
};
