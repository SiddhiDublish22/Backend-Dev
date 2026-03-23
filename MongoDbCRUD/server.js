import connectDb from "./config/db.js";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDb();

const app = express();

// ✅ IMPORTANT (for reading JSON body)
app.use(express.json());

// ✅ Routes
app.use("/api", userRoutes);

// ✅ Test route (optional but useful)
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});