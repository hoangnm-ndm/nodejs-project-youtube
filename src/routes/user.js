import express from "express";
const routerUser = express.Router();

routerUser.get("/", getList);
routerUser.get("/:id", getDetail);
routerUser.post("/", checkisAdmin, create);
routerUser.put("/:id", checkisAdmin, update);
routerUser.delete("/:id", checkisAdmin, remove);

export default routerUser;
