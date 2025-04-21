import express from "express";
import { authMiddleware } from "../../MiddleWare/MiddleWare.js";
import { addToCart, getCart,deleteProductCart,updateCartQuantity } from "./Cart.controller.js";

export const CartRouter=express.Router()

CartRouter.put("/update-Quantity",authMiddleware,updateCartQuantity)
CartRouter.post("/AddToCart",authMiddleware,addToCart)
CartRouter.get("/getCart",authMiddleware,getCart)
CartRouter.delete("/deleteProductCart/:id",authMiddleware,deleteProductCart)
CartRouter.put('/updateQuntatiy',authMiddleware,updateCartQuantity);
