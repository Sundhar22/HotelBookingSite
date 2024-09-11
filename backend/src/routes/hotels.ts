import express, { Request, Response } from "express";
import { ParsedQs } from "qs";
import Hotel from "../models/HotelType";
import { searchResponseType } from "../shared/types";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const searchQuery = constructSearchQuery(req.query);

    // Sorting logic based on query parameter
    let sortOptions: any = {};

    switch (req.query.sortBy) {
      case "pricePer24hDesc":
        sortOptions = { pricePer24h: -1 };
        break;
      case "starRatings":
        sortOptions = { starRating: -1 };
        break;
      default:
        sortOptions = { pricePer24h: 1 };
    }

    const pageSize = 5; // Define how many hotels per page
    const pageNumber = Math.max(1, parseInt(req.query.page as string) || 1); // Ensure page is at least 1

    // Query all matching hotels to calculate the total count
    const totalHotels = await Hotel.countDocuments(searchQuery);

    // Calculate total pages and ensure valid pageNumber
    const totalPages = Math.ceil(totalHotels / pageSize);
    const validPageNumber = Math.min(pageNumber, totalPages); // Ensure page number isn't larger than total pages

    const skip = (validPageNumber - 1) * pageSize;

    // Query the hotels with pagination and sorting
    const hotels = await Hotel.find(searchQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const response: searchResponseType = {
      data: hotels,
      pagination: {
        totalHotels,
        page: validPageNumber, // Use validPageNumber to ensure current page is valid
        pages: totalPages, // Calculated based on totalHotels and pageSize
      },
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Construct search query based on the request parameters
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
      $gte: parseInt(query.adultsCounts as string),
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

  if (query.facilities) {
    searchQuery.facilities = {
      $all: Array.isArray(query.facilities)
        ? query.facilities
        : [query.facilities],
    };
  }

  if (query.starRatings) {
    searchQuery.starRating = {
      $in: Array.isArray(query.starRatings)
        ? query.starRatings
        : [query.starRatings],
    };
  }

  if (query.maxPrice) {
    searchQuery.pricePer24h = {
      $lte: parseInt(query.maxPrice as string),
    };
  }

  return searchQuery;
}

export default router;
