"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
// creating router instance. this is responsible for handling routes from express.
const router = express_1.default.Router();
router.post(
// route name-> "/register"
"/register", 
// checking fields in request body
[
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "password is required at-least 6 characters").isLength({
        min: 6,
    }),
    (0, express_validator_1.check)("firstName", "firstName is required").isString(),
    (0, express_validator_1.check)("lastName", "lastName is required").isString(),
], 
// this is call back function which will be executed when /register route is hit.
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // checking validation errors in request body
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array(),
        });
    }
    try {
        // gathering user data from request body via  /register route.
        let user = yield user_1.default.findOne({ email: req.body.email });
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
        user = new user_1.default(req.body);
        yield user.save();
        /**
         * creating jwt token with user id and secret key
         */
        const token = jsonwebtoken_1.default.sign({
            userId: user._id,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });
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
    }
    catch (error) {
        console.log(error);
        // sending response with status 500 not any specific error message because mongodb can throw any valuable message.
        return res.status(500).json({ message: "Internal sever error" });
    }
}));
exports.default = router;
