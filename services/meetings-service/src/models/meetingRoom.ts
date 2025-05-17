import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../config/db";
import { IMeetingRoom } from "../interface/IMeetingRoom";

class meetingRoom extends Model<IMeetingRoom> implements IMeetingRoom {
  public id!: number;
  public name!: string;
  public capacity!: number;
  public location!: string;
  public isDeleted!: boolean;
}

meetingRoom.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    capacity: {
      type: DataTypes.NUMBER,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "meetingRoom",
    timestamps: true, // We handle timestamps manually
  }
);
export { meetingRoom };
