import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js"





dotenv.config();

mongoose
.connect(process.env.CONNECTIONSTRING)
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


import express from "express";
import cors from "cors";



const app = express();
const port = 3000;
app.use(
    cors({
        origin: "*"
    })
);


app.use(express.json());

app.use("/api/user", userRoutes);









app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})



