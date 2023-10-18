import { DataTypes, Sequelize } from "sequelize";
import { db } from "../db.js";

export const Review = db.define("Review", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  authorId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

await (async () => {
  await Review.sync();
})();
