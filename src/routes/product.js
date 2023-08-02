import express from "express";
import {
  create,
  getAll,
  getDetail,
  remove,
  update,
} from "../controllers/product.js";
import { checkPermisson } from "../middlewares/checkPermission.js";
const routerProduct = express.Router();

routerProduct.get("/", getAll);
routerProduct.get("/:id", getDetail);
routerProduct.post("/", checkPermisson, create);
routerProduct.put("/:id", checkPermisson, update);
routerProduct.delete("/:id", checkPermisson, remove);

export default routerProduct;
