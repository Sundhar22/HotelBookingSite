import express, { Request, Response } from "express";
import { ParsedQs } from "qs";
import Hotel from "../models/HotelType";
import { searchResponseType } from "../shared/types";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const searchQuery = constructSearchQuery(req.query);

    let sortOptions = {};

    switch (req.query.sortBy) {
      case "pricePer24hAsc":
        sortOptions = { pricePer24h: 1 };
        break;
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      default:
        sortOptions = { pricePer24h: -1 };
    }

    const pageSize = 5;

    const pageNumber = parseInt(req.query.page as string) || 1;

    const skip = (pageNumber - 1) * pageSize;

    const hotelQueryCount = await Hotel.find(searchQuery);
    const hotels = await Hotel.find(searchQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const totalHotels = hotelQueryCount.length;

    const response: searchResponseType = {
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
function constructSearchQuery(query: ParsedQs) {
  let searchQuery: any = {};

  if (query.destination) {
    searchQuery.$or = [
      { city: new RegExp(query.destination as string, "i") },
      { country: new RegExp(query.destination as string, "i") },
    ];
  }

  if (query.adultsCounts) {
    searchQuery.adultsCounts = {
      $gte: parseInt(query.adultsCount as string),
    };
  }

  if (query.childrenCounts) {
    searchQuery.childrenCounts = {
      $gte: parseInt(query.childrenCounts as string),
    };
  }

  if (query.type) {
    searchQuery.type = {
      $in: Array.isArray(query.type) ? query.type : [query.type],
    };
  }

  if (query.starRating) {
    searchQuery.starRating = {
      $in: Array.isArray(query.starRating)
        ? query.starRating
        : [query.starRating],
    };
  }

  if (query.pricePer24h) {
    searchQuery.pricePer24h = {
      $lte: parseInt(query.pricePer24h as string),
    };
  }

  return searchQuery;
}
