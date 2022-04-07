const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING(60),
        allowNull: false,
    },

    description: {
        type: Sequelize.TEXT,
        allowNull: true,
    },

    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },

    /*created_at: {
        type: Sequelize.DATE,
        allowNull: false,
    },

    updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
    }*/
});

Product.sync();

module.exports = Product;