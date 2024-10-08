import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/HotelType";
import { HotelType } from "../shared/types";


const router = express.Router();



router.get("/", verifyToken, async (req: Request, res: Response) => {


    try {

        const hotels = await Hotel.find({ bookings: { $elemMatch: { userId: req.userId } } });

        const result = hotels.map((hotel) => {

            const booking = hotel.bookings.filter((booking) => booking.userId === req.userId);

            const hotelWithUserBookings: HotelType = {
                ...hotel.toObject(),
                bookings: booking
            }

            return hotelWithUserBookings;


        });

        res.status(200).send(result);

    } catch (error) {

        res.status(500).send({ message: "Internal Server Error" });
    }


})

export default router