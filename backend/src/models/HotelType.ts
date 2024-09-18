import mongoose from "mongoose";
import { BookingType, HotelType } from "../shared/types";

const bookingSchema =  new  mongoose.Schema<BookingType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: { type: String, required: true },
  totalCost: { type: Number, required: true },
})

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
  bookings:[bookingSchema]
});

const Hotel = mongoose.model<HotelType>("Hotels", hotelSchema);

const Bookings = mongoose.model<BookingType>("Bookings", bookingSchema);

export default Hotel;
