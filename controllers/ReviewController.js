import { validationResult } from "express-validator";

import { Review } from "../db/models/Review.js";
import { User } from "../db/models/User.js";

export const listReviews = async (req, res) => {
  try {
    const reviewsArray = await Review.findAll({
      where: { productName: req.query.productName },
    });
    if (!reviewsArray || reviewsArray.length === 0)
      return res.json({ hasReviews: false });

    const reviews = await Promise.all(
      reviewsArray.map(async (reviewItem) => {
        const id = reviewItem.dataValues.authorId;
        const author = await User.findOne({ where: { id } });
        const authorName = author.dataValues.username;
        return { ...reviewItem.dataValues, authorName };
      })
    );

    res.json([...reviews]);
  } catch (err) {
    res.status(500).json({
      message: "Unable to find reviews",
    });
  }
};

export const addReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json(errors.array);
    }

    const { authorId, content, productName } = req.body;

    const newReview = await Review.create({ authorId, content, productName });

    res.json({
      ...newReview.dataValues,
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to add review",
    });
  }
};
