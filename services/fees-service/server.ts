import express from "express";
import dotenv from "dotenv";

import cors from "cors"; 
import transactionRoutes from "./src/routes/transactionRoutes";
import caisseRoutes from "./src/routes/caisseRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4003;
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true, 
  })
);
app.use(express.json());

app.use("/transaction", transactionRoutes);
app.use("/caisse", caisseRoutes);
app.listen(PORT, () => {
  console.log(`Fees Service running on port ${PORT}`);
});
