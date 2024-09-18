import express, { Request, Response } from "express";
import { param, validationResult } from "express-validator";
import { ParsedQs } from "qs";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";
import Hotel from "../models/HotelType";
import {
  BookingType,
  PaymentIntentResponse,
  searchResponseType,
} from "../shared/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query as ParsedQs;

  try {
    const hotels = await Hotel.find()
      .sort("-lastUpdated")
      .limit(parseInt(limit as string, 10))
      .skip((parseInt(page as string, 10) - 1) * parseInt(limit as string, 10));

    res.json(hotels);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get(
  "/detail/:id",
  [param("id").notEmpty().withMessage("Hotel id is required and valid")],
  async (req: Request, res: Response) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res.status(400).json({ error: err.array() });
    }
    const id = req.params.id.toString();
    try {
      const hotel = await Hotel.findById(id);
      return res.status(200).json(hotel);
    } catch (error) {
      console.log("error in hotelId fetching" + error);
      return res.status(500).json({ message: "some thing went wrong" });
    }
  }
);

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

router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const hotelId = req.params.hotelId;
      const numberOfDays = req.body.numberOfDays;
      const userId = req.userId;

      const hotel = await Hotel.findById(hotelId);

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      const totalCost = hotel.pricePer24h * numberOfDays;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCost * 100,
        currency: "usd",
        metadata: {
          hotelId: hotelId,
          userId: userId,
        },
      });

      if (!paymentIntent.client_secret) {
        return res.status(500).json({ message: "Something went wrong " });
      }

      const response: PaymentIntentResponse = {
        totalCost: totalCost,
        clientSecret: paymentIntent.client_secret?.toString(),
        paymentIntentId: paymentIntent.id,
      };

      res.send(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong " });
    }
  }
);

router.post(
  "/:hotelId/bookings",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      // verify the paymentIntent by paymentIntentId. is user created booking
      // verify the userId and hotelId
      // verify the user payment status

      const paymentIntentId = req.body.paymentIntentId;
      const userId = req.userId;
      const hotelId = req.params.hotelId;

      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId as string
      );

      if (!paymentIntent) {
        return res.status(404).json({ message: "Payment intent not found" });
      }

      if (
        paymentIntent.metadata.userId !== userId ||
        paymentIntent.metadata.hotelId !== hotelId
      ) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (paymentIntent.status !== "succeeded") {
        return res
          .status(400)
          .json({ message: "Payment intent not successful" });
      }

      const newBooking: BookingType = {
        ...req.body,
        userId: userId,
      };

      const hotel = await Hotel.findOneAndUpdate(
        { _id: hotelId },
        {
          $push: {
            bookings: newBooking,
          },
        }
      );

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      hotel.save();
      res.status(200).json({ message: "Booking created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong " });
    }
  }
);

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
