import express from "express";
import {
  create,
  getAll,
  getDetail,
  remove,
  update,
} from "../controllers/category.js";
import { checkisAdmin } from "../middlewares/checkPermission.js";
const routerCategory = express.Router();

routerCategory.get("/", getAll);
routerCategory.get("/:id", getDetail);
routerCategory.post("/", checkisAdmin, create);
routerCategory.put("/:id", checkisAdmin, update);
routerCategory.delete("/:id", checkisAdmin, remove);

export default routerCategory;
