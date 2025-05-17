import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

class Notification extends Model {
  public id!: number;
  public user_id!: number;
  public title!: string;
  public detail!: string;
  public type!: number;
  public created_at!: Date;
  public isRead!: boolean;
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.NUMBER, 
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "notifications",
    timestamps: false, 
  }
);

export default Notification;
