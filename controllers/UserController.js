import { validationResult } from "express-validator";

import { User } from "../db/models/User.js";
import isUsernameUnique from "../utils/isUsernameUnique.js";

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json(errors.array);
    }
    if (!(await isUsernameUnique(req.body.username))) {
      return res.status(400).json({
        message: "a user with this username already exists",
      });
    }
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = await User.create({ username, password, email });

    res.json({
      ...newUser.dataValues,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "failed to register",
    });
  }
};

//обрабатываем логин, проверяем, если ли юзер в бд, если да - отправляем его данные с ответом

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "no such user",
      });
    }
    res.json({ ...user.dataValues });
  } catch (err) {
    res.status(500).json({
      message: "failed to log in",
    });
  }
};

// export const getMe = async (req, res) => {};
