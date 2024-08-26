import mongoose from "mongoose";

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCounts: number;
  childrenCounts: number;
  facilities: string[];
  imageUrls: string[];
  pricePer24h: number;
  starRating: number;
  lastUpdated: Date;
};

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

const Hotel= mongoose.model<HotelType>("Hotels", hotelSchema);

export default Hotel ;
