const Sequelize = require("sequelize");
const db = require("../db");
const Product = require("./Product");

const Sale = db.define("sales", {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    product_id : {
        type : Sequelize.BIGINT,
        allowNull : false,    
    },

    quantity : {
        type : Sequelize.INTEGER,
        allowNull : false,    
    },
    
    total: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },

    payment_type: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },

    status: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },

    /*created_at: {
        type: Sequelize.DATE,
        allowNull: false,
    },*/

}, {
    updatedAt: false,
});

Sale.belongsTo(Product, {foreignKey : "product_id", allowNull : false});

Sale.sync();

module.exports = Sale;