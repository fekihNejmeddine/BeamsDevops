import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "syndic_db",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
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
