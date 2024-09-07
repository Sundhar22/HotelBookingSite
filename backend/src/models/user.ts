import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { UserType } from "../shared/types";

// userSchema-> schema for user.
// schema is a blueprint of how the data will be stored in the database
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.get("password"), 8);
  }
  next();
});

const userModel = mongoose.model<UserType>("User", userSchema);

export default userModel;
