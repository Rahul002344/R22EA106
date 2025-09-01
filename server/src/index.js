import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";
import procedureRoutes from "./routes/procedures.js";
import quoteRoutes from "./routes/quotes.js";

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/carepay";

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // allow frontend
app.use(morgan("dev"));

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/procedures", procedureRoutes);
app.use("/api/quotes", quoteRoutes);

// Start server after DB connects
connectDB(MONGO_URI)
  .then(() => {
    app.get("/", (_req, res) => {
      res.send("🚀 API up & Mongo connected");
    });

    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Mongo connection error:", err);
    process.exit(1);
  });

export default app;
