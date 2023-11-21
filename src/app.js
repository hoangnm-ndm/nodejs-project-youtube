import express from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import router from "./routes/index.js";
const app = express();
dotenv.config();
const { PORT, URI_DB } = process.env;

connect(URI_DB)
  .then(() => {
    console.log("Connect DB success");
  })
  .catch((err) => {
    console.log("Connect DB failed!", err);
  });

app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
