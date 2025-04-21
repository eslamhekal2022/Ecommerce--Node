import { addProduct, getAllProducts, getCategoryProduct, getFilterCat, productDetails, removeProduct, searchProducts } from "./product.controller.js"
import express from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


const ProductRouter = express.Router()
ProductRouter.post("/addProduct",upload.array("images", 5),addProduct)
ProductRouter.get("/getAllProducts",getAllProducts)
ProductRouter.get("/productDetails/:id",productDetails)
ProductRouter.delete("/removeProduct/:id",removeProduct)
ProductRouter.get("/searchProducts",searchProducts)
ProductRouter.get("/getCategoryProduct",getCategoryProduct)
ProductRouter.get("/getProductsCat/:category",getFilterCat)



export default ProductRouter;