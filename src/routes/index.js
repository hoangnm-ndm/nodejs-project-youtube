import express from "express";
import routerProduct from "./product.js";
const router = express.Router();

router.use("/product", routerProduct);
export default router;
