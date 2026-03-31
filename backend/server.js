const express = require("express");
const cors = require("cors");

const predictRoute = require("./routes/predictRoute");
const reportRoute = require("./routes/reportRoute");

const app = express();

// ✅ 1️⃣ Enable CORS FIRST (VERY IMPORTANT)
app.use(cors({
  origin: "*", // For development (allow all)
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// ✅ 2️⃣ Parse JSON
app.use(express.json());

// ✅ 3️⃣ Routes
app.use("/api", predictRoute);
app.use("/api", reportRoute);

// ✅ 4️⃣ Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong"
  });
});

// ✅ 5️⃣ Start Server
app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});