import { body } from "express-validator";

export const registerValidator = [
  body("email", "invalid email").isEmail(),
  body("password", "invalid password").isLength({ min: 5 }),
  body("username", "invalid username").isLength({ min: 3 }),
];

export const loginValidator = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
];

export const reviewValidator = [
  body("authorId").isLength({ min: 36 }),
  body("content").isLength({ min: 3 }),
  body("productName").isLength({ min: 3 }),
];
