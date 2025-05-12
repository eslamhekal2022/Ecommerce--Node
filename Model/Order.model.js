import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "pending" }, // ممكن تبقى: pending - paid - canceled
  createdAt: { type: Date, default: Date.now },

},{timestamps:true});

export const OrderModel = mongoose.model("Order", orderSchema);
