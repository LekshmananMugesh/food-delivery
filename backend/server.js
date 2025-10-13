import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRouter.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// API routes
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Test route
app.get("/api", (req, res) => {
  res.send("API Working ✅");
});

// Serve frontend build
app.use("/", express.static(path.join(__dirname, "../frontend/dist")));

// Serve admin build
app.use("/admin", express.static(path.join(__dirname, "../admin/dist")));

// Handle client-side routing (React Router)
app.get("*", (req, res) => {
  if (req.path.startsWith("/admin")) {
    res.sendFile(path.join(__dirname, "../admin/dist", "index.html"));
  } else {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
