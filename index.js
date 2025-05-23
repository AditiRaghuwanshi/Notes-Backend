// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import userRoutes from "./routes/user.js"
// import dotenv from "dotenv";





// dotenv.config();

// mongoose
// .connect(process.env.CONNECTIONSTRING)
// .then(() => console.log("✅ Connected to MongoDB"))
// .catch((err) => console.error("❌ MongoDB connection error:", err));


// import express from "express";
// import cors from "cors";



// const app = express();
// const port = process.env.PORT || 5000;
// app.use(
//     cors({
//         origin: "*"
//     })
// );


// app.use(express.json());

// app.use("/api/user", userRoutes);









// app.listen(port, () => {
//     console.log(`server is running on http://localhost:${port}`);
// })


import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import express from "express";
import cors from "cors";

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.CONNECTIONSTRING)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin: "https://notes-application-liard.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});


