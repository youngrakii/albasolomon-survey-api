import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import surveyResponseRouter from "./routers/surveyResponses.js";
import consultationResponseRouter from "./routers/consultationResponses.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use("/api", [consultationResponseRouter, surveyResponseRouter]);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});