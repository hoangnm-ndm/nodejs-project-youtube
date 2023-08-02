import express from "express";
import {
  create,
  getAll,
  getDetail,
  remove,
  update,
} from "../controllers/category.js";
import { checkPermisson } from "../middlewares/checkPermission.js";
const routerCategory = express.Router();

routerCategory.get("/", getAll);
routerCategory.get("/:id", getDetail);
routerCategory.post("/", checkPermisson, create);
routerCategory.put("/:id", checkPermisson, update);
routerCategory.delete("/:id", checkPermisson, remove);

export default routerCategory;
