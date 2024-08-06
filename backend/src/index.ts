import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import userLoginRoute from "./routes/auth";
import userRoute from "./routes/users";
import {v2 as cloudinary} from "cloudinary";
import myHotelRoute from "./routes/my-Hotels";

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})


mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("connection error:"));

// creating express
const app = express();
// using express.json for parsing json data which mean we can get json data from the body of the request
app.use(express.json());
// using urlencoded for parsing the url encoded data
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../../frontend/dist/")));

app.use("/api/users", userRoute);
app.use("/api/auth", userLoginRoute);
app.use("/api/my-hotels", myHotelRoute);

const PORT = process.env.xPORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
