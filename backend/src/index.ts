import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userLoginRoute from "./routes/auth";
import userRoute from "./routes/users";
/**
 * connecting to mongodb database using mongoose.
 * mongoose is a ODM(Object Data Modeling) library for MongoDB and Node.js.
 * Helps to manage relationships between data, provides schema validation,
 * and is used to translate between objects in code and the representation of those objects in MongoDB
 * mongoose connecting via MONGODB_CONNECTION_STRING
 */
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// creating express app which will be used to create api routes.
const app = express();
// setting up express app to use json and urlencoded data. it means express will parse json and urlencoded data.
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// setting up express app to use cors. it means cors is security feature for express app.
app.use(cors());

// setting up express app to use userRoutes. it means telling express app to use userRoutes for /api/users route.
app.use("/api/users", userRoute);
app.use("/api/auth", userLoginRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
