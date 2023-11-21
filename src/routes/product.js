import express from "express";
import {
  create,
  getDetail,
  getList,
  remove,
  update,
} from "../controllers/product.js";
import {
  checkAdminLastest,
  checkisAdmin,
} from "../middlewares/checkPermission.js";
const routerProduct = express.Router();

routerProduct.get("/", getList);
routerProduct.get("/:id", getDetail);
routerProduct.post("/", checkisAdmin, checkAdminLastest, create);
routerProduct.put("/:id", checkisAdmin, update);
routerProduct.delete("/:id", checkisAdmin, remove);

export default routerProduct;
