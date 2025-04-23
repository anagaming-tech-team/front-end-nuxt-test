import "express-async-errors";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import config from "./config";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import referralRoutes from "./routes/referralRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/referrals", referralRoutes);

app.use(errorHandler);

mongoose
  .connect(config.mongoUri)
  .then(() =>
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    })
  )
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
