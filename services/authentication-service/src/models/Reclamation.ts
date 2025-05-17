import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { IReclamation, Status } from "../interface/IReclamation";

export class Reclamation extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public user_id!: number;
  public status!: Status;
  public Photo!: string[];
  public createdAt?: number;
}
Reclamation.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(Status)),
      allowNull: false,
    },
    Photo: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("NOW"),
    },
  },
  {
    sequelize,
    modelName: "Reclamation",
    tableName: "reclamations",
    timestamps: false,
  }
);

export default Reclamation;
