import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
export const sequelize = new Sequelize(
  process.env.DB_NAME as string,      
  process.env.DB_USER as string,      
  process.env.DB_PASS,      
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',         
    logging: false,           
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL successfully!");
  } catch (error) {
    console.error("Unable to connect to MySQL:", error);
  }
};
