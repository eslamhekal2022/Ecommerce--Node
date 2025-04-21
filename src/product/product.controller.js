import { ProductModel } from "../../Model/Product.model.js";
import mongoose from "mongoose";

export const addProduct = async (req, res) => {
  try {
    const { name, description, price,category } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "الرجاء تحميل صورة واحدة على الأقل" });
    }

    // حفظ مسارات الصور
    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

    // إنشاء المنتج
    const newItem = new ProductModel({ name, description, price,category, images: imagePaths });
    await newItem.save();

    res.status(201).json({ success: true, message: "تمت إضافة العنصر بنجاح", newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "حدث خطأ أثناء الإضافة", error });
  }
};

export const getAllProducts=async (req, res) => {
  const allProducts = await ProductModel.find()

  const count = allProducts.length
  console.log("count",count)
  res.status(200).json({message: "All products",success: true,data:allProducts,count})
}

export const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }

    res.status(200).json({ message: "Product removed successfully", success: true });

  }
  catch (error) {
    res.status(500).json({ message: "Server error", success: false, error: error.message });
  }
};

export const productDetails= async (req, res) => {


  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (product) {
      res.status(200).json({message:"product found successfully",success:true,data:product});
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}

export const searchProducts =  async (req, res) => {
  try {
    const { query } = req.query;
    const products = await ProductModel.find({
      name: { $regex: query, $options: 'i' },
      category: { $regex: query, $options: 'i' },
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ message: "Error searching for products", error });
  }
};

export const getCategoryProduct= async (req, res) => {
  try {
    // استعلام aggregate لجلب منتج واحد فقط من كل category
    const products = await ProductModel.aggregate([
      {
        $group: {
          _id: '$category', // تجميع حسب الـcategory
          product: { $first: '$$ROOT' } // أخذ أول منتج من كل فئة
        }
      },
      {
        $replaceRoot: { newRoot: '$product' } // استبدال الجذر بالـproduct
      }
    ]);

    // إرجاع البيانات للـ Frontend
    res.status(200).json({data:products,success:true});
  } catch (err) {
    // التعامل مع الخطأ
    res.status(500).json({ message: err.message });
  }
}

export const getFilterCat= async (req, res) => {
  const category = req.params.category;

  try {
    const products = await ProductModel.find({ category: category });
    res.status(200).json({data:products,success:true});
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ أثناء جلب المنتجات', error });
  }
}