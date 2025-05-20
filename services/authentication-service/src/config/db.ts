import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize('auth_db', 'root', 'myPassword', {
  host: 'mysql-db-fees',
  port: 3306,
  dialect: 'mysql'
});

// export const sequelize = new Sequelize(
//   process.env.DB_NAME!,
//   process.env.DB_USER!,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//   }
// );

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL successfully!");
  } catch (error) {
    console.error("Unable to connect to MySQL:", error);
  }
};
