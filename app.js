import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import {
  registerValidator,
  loginValidator,
  reviewValidator,
} from "./validations.js";
import { scrapeTTN, scrape5elem, scrapeAllo } from "./scraper.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import * as UserController from "./controllers/UserController.js";
import * as ReviewController from "./controllers/ReviewController.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json());

app.get("/comparePrices", async (req, res) => {
  const keyword = req.query.keyword;
  const elemData = scrape5elem(keyword);
  const ttnData = scrapeTTN(keyword);
  const alloData = scrapeAllo(keyword);
  res.send({
    elem: { ...(await elemData) },
    ttn: { ...(await ttnData) },
    allo: { ...(await alloData) },
  });
});

app.post(
  "/auth/register",
  registerValidator,
  handleValidationErrors,
  UserController.register
);

app.post(
  "/auth/login",
  loginValidator,
  handleValidationErrors,
  UserController.login
);

app.get("/reviews", ReviewController.listReviews);

app.post(
  "/reviews/add",
  reviewValidator,
  handleValidationErrors,
  ReviewController.addReview
);

app.listen(port, () => console.log(`Express app running on port ${port}!`));
