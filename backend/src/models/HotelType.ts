import mongoose from "mongoose";
import { HotelType } from "../shared/types";

const hotelSchema = new mongoose.Schema<HotelType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  adultCounts: { type: Number, required: true },
  childrenCounts: { type: Number, required: true },
  facilities: [{ type: String, required: true }],
  imageUrls: [{ type: String, required: true }],
  pricePer24h: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  lastUpdated: { type: Date, default: Date.now },
});

const Hotel = mongoose.model<HotelType>("Hotels", hotelSchema);

export default Hotel;
