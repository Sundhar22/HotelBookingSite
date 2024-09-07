import express, { Request, Response } from "express";
import Hotel from "../models/HotelType";
import { searchResponseType } from "../shared/types";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const pageSize = 5;

    const pageNumber = parseInt(req.query.page as string) || 1;

    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find().skip(skip).limit(pageSize);

    const totalHotels = await Hotel.countDocuments();

    const response:searchResponseType = {
      data: hotels,
      pagination: {
        totalHotels,
        page: pageNumber,
        pages: Math.ceil(totalHotels / pageSize),
      },
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "some thing went wrong" });
  }
});

export default router;
