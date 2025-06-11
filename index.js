import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

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

// 🔗 MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const allowedOrigins = [
  'http://localhost:3000',
  "http://localhost:5173",
  'https://ecommerce-front-chi-five.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
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

// 🔄 KEEP ALIVE PING (اختياري حسب الحاجة)
setInterval(() => {
  fetch("https://your-replit-url.replit.dev").catch((err) =>
    console.log("Ping failed:", err)
  );
}, 60 * 1000);

// 🚀 START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
