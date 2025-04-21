import { authMiddleware } from "../../MiddleWare/MiddleWare.js";
import { checkOut } from "./Order.controller.js";
import express from "express";

const OrderRouter = express.Router();
OrderRouter.post("/checkOut",authMiddleware,checkOut);
export default OrderRouter;