"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const path_1 = __importDefault(require("path"));
mongoose_1.default
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.error("connection error:"));
// creating express
const app = (0, express_1.default)();
// using express.json for parsing json data which mean we can get json data from the body of the request
app.use(express_1.default.json());
// using urlencoded for parsing the url encoded data
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist/")));
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
