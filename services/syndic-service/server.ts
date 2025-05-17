import express from "express";
import dotenv from "dotenv";
import BuildingRoute from "./src/routes/BuildingRoute";
import cors from "cors"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true, 
  })
);
app.use(express.json());

app.use("/api/building", BuildingRoute);

app.listen(PORT, () => {
  console.log(`Authentication Service running on port ${PORT}`);
});
