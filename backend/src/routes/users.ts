import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user";
// creating router instance. this is responsible for handling routes from express.
const router = express.Router();

router.post(
  // route name-> "/register"
  "/register",

  // checking fields in request body
  [
    check("email", "Email is required").isEmail(),
    check("password", "password is required at-least 6 characters").isLength({
      min: 6,
    }),
    check("firstName", "firstName is required").isString(),
    check("lastName", "lastName is required").isString(),
  ],

  // this is call back function which will be executed when /register route is hit.
  async (req: Request, res: Response) => {
    // checking validation errors in request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array(),
      });
    }

    try {
      // gathering user data from request body via  /register route.
      let user = await User.findOne({ email: req.body.email });

      // checking user exists status. if true then return message along with 400 status
      if (user) {
        return res
          .status(400)
          .json({ message: "User already exists. Please login." });
      }

      /**creating new user instance of User model
       * which uses mongoose schema for document storage from request body
       *  and saving the user.
       */
      user = new User(req.body);

      await user.save();
      /**
       * creating jwt token with user id and secret key
       */
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      /***
       * setting the token in cookie it can accessed browser. we need not to send token in response body.
       * httpOnly: true -> cookie can't be accessed on the sever side.
       * secure: process.env.NODE_ENV === "production" -> cookie can be accessed only on https.
       * maxAge: 86400000 -> cookie will be expired after 24 hours.
       */

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      // sending response with status 200
      return res.status(200).send({ message: "User registered OK" });
    } catch (error) {
      console.log(error);
      // sending response with status 500 not any specific error message because mongodb can throw any valuable message.
      return res.status(500).json({ message: "Internal sever error" });
    }
  }
);

export default router;
