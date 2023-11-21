import express from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import router from "./routes/index.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT;
const URI_DB = process.env.URI_DB;

connect(URI_DB);

app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
