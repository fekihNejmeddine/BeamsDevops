import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../config/db";
import { IBuilding } from "../interface/IBuilding";

export class Building extends Model<IBuilding> implements IBuilding {
  public id!: number;
  public name!: string;
  public address!: string;
  public numberOfFloors!: number;
  public city?: string;
  public country?: string;
  public constructionYear?: number;
  public owner?: string;
  public isDeleted!: boolean;
}

Building.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfFloors: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    constructionYear: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "Building",
    timestamps: true, // We handle timestamps manually
  }
);
