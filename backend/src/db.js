const Sequelize = require("sequelize");

const sequelize = new Sequelize("loja2", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

/*sequelize.authenticate().then(() => {
    console.log("Conexão com o banco de dados realizado com sucesso!");
}).catch((error) => {
    console.log("Error de conexão com banco de dados: " + error)
})*/

module.exports = sequelize;