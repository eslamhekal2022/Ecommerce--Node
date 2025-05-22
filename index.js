import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

// 👇 ROUTES
import userRouter from "./src/user/user.routes.js";
import ProductRouter from "./src/product/product.routes.js";
import { CartRouter } from "./src/Cart/cart.routes.js";
import WishListRouter from "./src/wishlist/wishlist.routes.js";
import OrderRouter from "./src/order/order.routes.js";
import userReviews from "./src/ReviewUsers/ReviewUsers.routes.js";
import { ContactRouter } from "./src/contact/contact.routes.js";

import { connectDB } from "./dbConnection/dbConnection.js";

// 📦 CONFIG
dotenv.config();
connectDB();

// ⚙️ APP & SERVER SETUP
const app = express();
const server = http.createServer(app); // استخدم http.createServer بدلاً من app.listen

// ⚡ SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: "*", // أو حدد الدومين بتاع الفرونت
    methods: ["GET", "POST"]
  }
});

// 🧠 Make io available in every request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// 🔌 SOCKET CONNECTION LOGIC
io.on("connection", (socket) => {
  console.log("🟢 A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 A client disconnected:", socket.id);
  });
});

// 🔗 MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(morgan("dev"));

// 📁 ROUTES
app.use(userRouter);
app.use(ProductRouter);
app.use(CartRouter);
app.use(WishListRouter);
app.use(OrderRouter);
app.use(userReviews);
app.use(ContactRouter);

// 🧩 STATIC FRONTEND SETUP
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the FE folder
app.use(express.static(path.join(__dirname, "../FE")));

// Handle any route that doesn't match an API route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../FE", "index.html"));
});

// 🚀 START SERVER
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
