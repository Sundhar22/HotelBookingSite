import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userLoginRoute from "./routes/auth";
import userRoute from "./routes/users";

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

app.use("/api/users", userRoute);
app.use("/api/auth", userLoginRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
