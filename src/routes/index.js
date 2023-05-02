import express from "express";
import routerProduct from "./product.js";
import routerAuth from "./auth.js";
const router = express.Router();

router.use("/product", routerProduct);
router.use("/auth", routerAuth);
export default router;
