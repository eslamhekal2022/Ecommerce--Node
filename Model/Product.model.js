import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    images: [{ type: String }], // غيرت `image` إلى `images` ليتناسب مع الكود
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", ProductSchema);
