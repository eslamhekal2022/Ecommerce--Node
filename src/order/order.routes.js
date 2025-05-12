import { authMiddleware, isAdmin } from "../../MiddleWare/MiddleWare.js";
import { checkOut, deleteAllOrders, deleteorder, getAllOrders,getUserOrders, OrderDet, updateOrderStatus } from "./Order.controller.js";
import express from "express";

const OrderRouter = express.Router();
OrderRouter.post("/checkOut",authMiddleware,checkOut);
OrderRouter.post("/updateOrderStatus/:orderId",updateOrderStatus);
OrderRouter.get("/getOrders",getAllOrders);
OrderRouter.get("/getMeOrders",authMiddleware,getUserOrders);
OrderRouter.delete("/deleteAllOrders",authMiddleware,deleteAllOrders);
OrderRouter.delete("/deleteorder/:id",deleteorder);
OrderRouter.get("/OrderDet/:id",OrderDet);

export default OrderRouter;

