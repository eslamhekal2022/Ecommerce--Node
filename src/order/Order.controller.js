import { OrderModel } from "../../Model/Order.model.js";


export const checkOut= async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await CartModel.findOne({ userId }).populate("products.productId");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalPrice = 0;

    cart.products.forEach(item => {
      if (item.productId && item.productId.price) {
        totalPrice += item.productId.price * item.quantity;
      }
    });
    const newOrder = new OrderModel({
      userId,
      products: cart.products,
      totalPrice
    });

    await newOrder.save();
    cart.products = [];
    await cart.save();
    res.status(201).json({ message: "Order placed successfully",success:true, order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Checkout failed" });
  }
}