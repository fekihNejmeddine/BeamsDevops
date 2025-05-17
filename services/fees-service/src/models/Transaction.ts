import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";
import Caisse from "./Caisse";
class Transaction extends Model {
  public id!: number;
  public amount!: number;
  public date!: Date;
  public userId!: number;
  public caisseId!: number;
  public description!: string;
  public Photo!: string[];
  public isDeleted!: boolean;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: { min: 0 },
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    caisseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    Photo: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Transaction",
  }
);

Transaction.belongsTo(Caisse, { foreignKey: "caisseId" });

export default Transaction;
