import { where } from "sequelize";
import { User } from "../db/models/User.js";

export default async (username) => {
  const duplicateUser = await User.findOne({ where: { username } });
  if (duplicateUser) return false;
  return true;
};
