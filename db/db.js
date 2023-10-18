import { Sequelize } from "sequelize";

export const db = new Sequelize({
  dialect: "sqlite",
  storage: "./db/dataBase.sqlite",
});

try {
  await db.authenticate();
  console.log("DB OK");
} catch (err) {
  console.log(err);
}
