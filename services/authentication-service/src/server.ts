import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute";
import AuthRoute from "./routes/AuthRoute";
import cookieParser from "cookie-parser";
import ReclamationRoutes from "./routes/ReclamationRoutes";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Notification from "./models/Notification";
import createNotificationRoute from "./routes/NotificationRoute";

dotenv.config();

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// WebSocket authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error: Missing token"));
  }

  jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET_KEY as string,
    (user: any) => {
      socket.data.user = user;
      next();
    }
  );
});

// WebSocket connection
io.on("connection", (socket) => {
  console.log(`User ${socket.data.user.id} connected`);

  // Join a room for user-specific notifications
  socket.join(`user:${socket.data.user.id}`);

  socket.on("disconnect", () => {
    console.log(`User ${socket.data.user.id} disconnected`);
  });
});

// Routes
app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/reclamation", ReclamationRoutes);
app.use("/", createNotificationRoute);

httpServer.listen(process.env.PORT || 4001, () => {
  console.log(
    `Authentication Service running on port ${process.env.PORT || 4001}`
  );
});
