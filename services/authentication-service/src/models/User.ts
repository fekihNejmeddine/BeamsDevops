import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Gendre, IUser, UserRole } from "../interface/IUser";

export class User extends Model<IUser> implements IUser {
  public id!: number;
  public username!: string;
  public lastName!: string;
  public password!: string;
  public email!: string;
  public role!: UserRole;
  public Gender!: Gendre;
  public refreshToken?: string;

  public resetToken?: string;
  public resetTokenExpiry?: Date;
  public isDeleted!: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Gender: {
      type: DataTypes.ENUM(...Object.values(Gendre)),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },

   
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true, // Set to false if you are handling `createdAt` and `modifiedAt` manually
   
  }
);
