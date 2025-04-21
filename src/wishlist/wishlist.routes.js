import express from "express";
import {
  addToWishlist,
  getWishlist,
  deleteProductFromWishlist,
} from "./WishList.controller.js";
import { authMiddleware } from "../../MiddleWare/MiddleWare.js";

const WishListRouter = express.Router();

WishListRouter.get("/WishList", authMiddleware, getWishlist);
WishListRouter.post("/addToWishlist", authMiddleware, addToWishlist);
WishListRouter.delete("/removeWishList/:id", authMiddleware, deleteProductFromWishlist);

export default WishListRouter;
