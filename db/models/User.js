import { DataTypes, Sequelize } from "sequelize";
import { db } from "../db.js";

export const User = db.define("User", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Username",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

await (async () => {
  await User.sync();
})();