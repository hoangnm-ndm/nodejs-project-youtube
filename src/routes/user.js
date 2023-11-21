import express from "express";
const routerUser = express.Router();

routerUser.get("/", getList);
routerUser.get("/:id", getDetail);
routerUser.post("/", checkPermisson, create);
routerUser.put("/:id", checkPermisson, update);
routerUser.delete("/:id", checkPermisson, remove);

export default routerUser;
