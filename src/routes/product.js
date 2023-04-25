import express from "express";
import {
  create,
  getAll,
  getDetail,
  remove,
  update,
} from "../controllers/product.js";
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getDetail);
router.post("/create", create);
router.put("/update", update);
router.delete("/remove", remove);

export default router;
