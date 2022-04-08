const Sequelize = require("sequelize");
require("dotenv/config");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados realizado com sucesso!");
  })
  .catch((error) => {
    console.log(`Error de conexão com banco de dados: ${error}`);
  });

module.exports = sequelize;
