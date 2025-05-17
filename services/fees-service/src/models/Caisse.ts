import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

class Caisse extends Model {
  public id!: number;
  public name!: string;
  public balance!: number;
  public minBalance!: number;
  public participants!: number[];
  public isDeleted!: boolean;
}

Caisse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    minBalance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    participants: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
    },
  },
  {
    sequelize,
    modelName: "Caisse",
    tableName: "Caisses",
  }
);

export default Caisse;
