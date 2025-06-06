import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

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

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

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
app.use(cors({
  origin: 'https://ecommerce-front-chi-five.vercel.app',
}));
app.use(morgan("dev"));

// 📁 ROUTES
app.use(userRouter);
app.use(ProductRouter);
app.use(CartRouter);
app.use(WishListRouter);
app.use(OrderRouter);
app.use(userReviews);
app.use(ContactRouter);
app.get('/', (req, res) => {
  res.send('🚀 Welcome to the Ecommerce API!');
});
setInterval(() => {
  fetch("https://your-replit-url.replit.dev").catch((err) =>
    console.log("Ping failed:", err)
  );
}, 60 * 1000);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));