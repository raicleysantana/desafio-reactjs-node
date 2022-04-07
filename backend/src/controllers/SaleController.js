const Sale = require("../models/Sale");
const Product = require("../models/Product");

module.exports = {
    async index(req, res) {
        const sales = await Sale.findAll({
            include : [{
                model : Product
            }]
        });

        return res.json(sales);
    },

    async create(req, res) {
        const data = req.body;
        const sale = await Sale.create(data);

        return res.json(sale);
    },

    async view(req, res) {
        const {id} = req.query;

        const sale = await Sale.findOne({
            where: {id},
            include : [{
                model : Product
            }]
        });

        return res.json(sale);
    },

    async update(req, res) {
        const {id} = req.params;
        const data = req.body;

        const sale = await Sale.update(data, {
            where: {id}
        });

        return res.json({"id" : id});
    },

    async delete(req, res) {
        const {id} = req.params;

        const response = await Sale.destroy({
            where: {id},
        });

        return res.json(response);
    }
}