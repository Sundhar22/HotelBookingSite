import { v2 as cloudinary } from "cloudinary";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import multer from "multer";
import verifyToken from "../middleware/auth";
import Hotel from "../models/HotelType";
import { HotelType } from "../shared/types";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Description is required"),
    body("pricePer24h").notEmpty().isNumeric().withMessage("Price is required"),
    body("type").notEmpty().withMessage("Hotel Type is required"),
  ],
  upload.array("images", 6),
  async (req: Request, res: Response) => {
    try {
      const images = req.files as Express.Multer.File[];
      const images_urls = await uploadImages(images);

      const newHotels: HotelType = req.body;

      newHotels.imageUrls = images_urls;
      newHotels.userId = req.userId;

      const hotel = new Hotel(newHotels);
      await hotel.save();

      res.status(201).send(hotel);
    } catch (error) {
      console.error("error in my-hotel end point: ");
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const response = await Hotel.find({ userId: req.userId });

    res.status(200).send(response);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      res.status(404).send({ message: "Hotel not found" });
    } else {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await Hotel.findOne({ _id: id, userId: req.userId });
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("images", 6),
  async (req: Request, res: Response) => {
    try {
      const hotelId = req.params.hotelId;
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();
      const hotel = await Hotel.findByIdAndUpdate(hotelId, updatedHotel, {
        new: true,
      });

      if (!hotel) {
        res.status(404).json({ message: "Hotel not found" });
        return;
      }

      const images = req.files as Express.Multer.File[];
      const newImageUrls = await uploadImages(images);

      hotel.imageUrls = [
        ...(updatedHotel.imageUrls || []),
        ...(newImageUrls || []),
      ];
      await hotel.save();

      res.status(200).json(hotel);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

async function uploadImages(images: Express.Multer.File[]) {
  try {
    const image_promises = images.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      const img64 = `data:${image.mimetype};base64,${b64}`;
      const uploadedResponse = await cloudinary.uploader.upload(img64);
      return uploadedResponse.url;
    });
    const images_urls = await Promise.all(image_promises);
    return images_urls;
  } catch (error) {
    console.error("Error uploading images to Cloudinary:", error);
    throw error;
  }
}
export default router;