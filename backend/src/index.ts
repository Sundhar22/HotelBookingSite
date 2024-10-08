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
import hotelsRoute from "./routes/hotels"
import myBookings from "./routes/my_bookings"
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
  timeout: 60000
})

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to DB"));
  // .catch((err) => console.error("connection error:"));
// creating express
const app = express();
// using express.json for parsing json data which mean we can get json data from the body of the request
app.use(express.json());
// using urlencoded for parsing the url encoded data
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL as string,"http://localhost:7000","http://localhost:5000"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../../frontend/dist/")));

app.use("/api/users", userRoute);
app.use("/api/auth", userLoginRoute);
app.use("/api/my-hotels", myHotelRoute);
app.use("/api/my-bookings", myBookings);
app.use("/api/hotels",hotelsRoute)

app.get("*", (req, res, next) => {
  if (req.url.startsWith("/api")) {
    next();
  } else if (req.url.startsWith("/static")) {
    next();
  } else {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
