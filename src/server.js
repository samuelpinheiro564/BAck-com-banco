import express from "express";
import { config } from "dotenv";
import { router } from "./routes/index.routes.js";
import {connect} from "./database/index.js";

connect();
config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(router);


app.listen(port, () =>
  console.log(`⚡ Server started on http://localhost:${port}`)
);

