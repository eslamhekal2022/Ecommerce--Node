import { CartModel } from "../../Model/Cart.model.js";


export const addToCart=  async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;

      if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const parsedQuantity = Number(quantity) || 1;
    if (parsedQuantity<= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({ userId, products: [{ productId, quantity:parsedQuantity }] });
    }

    else{
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += parsedQuantity;
      }
      else {
        cart.products.push({ productId, quantity: parsedQuantity });
      }

    }

    await cart.save();
    res.status(200).json({ message: "Added to cart", cart,success: true });
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};


export const getCart= async (req, res) => {
  const userId = req.userId;

  try {
    // هات السـلة للمستخدم
    const cart = await CartModel.findOne({ userId }).populate('products.productId');

    // لو مفيش سلة للمستخدم
    if (!cart || !cart.products || cart.products.length === 0) {
      return res.status(200).json({
        data: [],
        count: 0,
        success: true,
        message: 'Cart is empty',
      });
    }

    // عدّ العناصر
    const count = cart.products.length;

    // فورمات العناصر اللى جوه الـ cart
    const formattedCart = cart.products.map((item) => {
      const product = item.productId;

      return {
        _id: product._id,
        name: product.name,
        price: product.price,
        images: product.images,
        description: product.description,
        quantity: item.quantity || 1,
      };
    });

    res.status(200).json({
      data: formattedCart,
      count,
      success: true,
    });
  } catch (error) {
    console.error("❌ Error in getCart:", error);
    res.status(500).json({ message: 'Server error', success: false });
  }
};


export const deleteProductCart=async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    const cart = await CartModel.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId: id } } } ,
      { new: true }
    ).populate('products.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Item removed from cart', data: cart, success: true });
  } catch (error) {
    console.error(error);
    
    res.status(500).json({ message: 'Server error' });
  }
};



export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.userId; 
    const { productId, quantity } = req.body;

    if (!productId || quantity == null) {
      return res.status(400).json({ message: 'Product ID and quantity are required.' });
    }

    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex > -1) {
      // Update existing product quantity
      cart.products[productIndex].quantity = quantity;
    } else {
      // Add new product
      cart.products.push({ productId, quantity });
    }

    await cart.save();

    return res.status(200).json({ message: 'Quantity updated successfully', success:true,cart });
  } catch (error) {
    console.error('Update quantity error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};