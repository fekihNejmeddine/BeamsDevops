import express from "express";
import MeetingRoute from "./src/routes/MeetingRoute";
import dotenv from "dotenv";
import cors from "cors";
import MeetingRoomRoute from "./src/routes/MeetingRoomRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4004;
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use((req, res, next) => {
  console.log(`➡️ Received request: ${req.method} ${req.url}`);
  next();
});
app.use("/api/meeting", MeetingRoute);
app.use("/api/meetingRoom", MeetingRoomRoute);

app.listen(PORT, () => {
  console.log(`Authentication Service running on port ${PORT}`);
});
