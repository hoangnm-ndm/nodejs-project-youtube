import express from "express";
import {
  create,
  getAll,
  getDetail,
  remove,
  update,
} from "../controllers/product.js";
import { checkPermisson } from "../middlewares/checkPermission.js";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getDetail);
router.post("/", checkPermisson, create);
router.put("/:id", checkPermisson, update);
router.delete("/:id", checkPermisson, remove);

export default router;
