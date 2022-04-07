const Product = require("../models/Product");
const db = require("../db");

module.exports = {
    async index(req, res) {
        const products = await Product.findAll();

        return res.json(products);
    },

    async create(req, res) {
        const data = req.body;
        const product = await Product.create(data);

        return res.json(product);
    },

    async view(req, res) {
        const {id} = req.query;

        const product = await Product.findOne({
            where: {id},
        });

        return res.json(product);
    },

    async update(req, res) {
        const {id} = req.params;
        const data = req.body;

        const product = await Product.update(data, {
            where: {id}
        });

        return res.json({"id" : id});
    },

    async delete(req, res) {
        const {id} = req.params;

        const response = await Product.destroy({
            where: {id},
        });

        return res.json(response);
    }
}