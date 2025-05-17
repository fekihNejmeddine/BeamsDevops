import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../config/db";
import { IMeeting, status, TypeMeeting } from "../interface/IMeeting";
import { meetingRoom } from "./meetingRoom";

class Meeting extends Model<IMeeting> implements IMeeting {
  public id!: number;
  public title!: string;
  public description!: string;
  public startTime!: Date;
  public endTime!: Date;
  public organizer!: string;
  public typeMeeting!: TypeMeeting;
  public location!: string;
  public idMeetingRoom!: number;
  public participants!: { id: number; username: string; email: string }[];
  public waitingPosition?: number;
  public status?: status;
  public UserId!: number;
}

Meeting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    startTime: {
      type: DataTypes.DATE,
    },
    endTime: {
      type: DataTypes.DATE,
    },
    organizer: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    typeMeeting: {
      type: DataTypes.ENUM("team meet", "Client Meeting", "Project Meeting"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "scheduled",
        "in-progress",
        "completed",
        "cancelled",
      ),
      allowNull: false,
    },
    waitingPosition: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    participants: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    idMeetingRoom: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: meetingRoom,
        key: "id",
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "meeting",
    timestamps: true, // We handle timestamps manually
  }
);
Meeting.belongsTo(meetingRoom, {
  foreignKey: "idMeetingRoom",
  as: "meetingRoom",
});
export { Meeting, TypeMeeting };
