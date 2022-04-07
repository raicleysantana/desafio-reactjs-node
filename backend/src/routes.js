const {Router} = require('express');

const routes = Router();

const Product = require("./controllers/ProductController");
const Sale = require("./controllers/SaleController");

routes.get("/", (req, res) => {
    return res.send("Inicio");
});


routes.get("/product/", Product.index);
routes.get("/product/view", Product.view);
routes.post("/product/create", Product.create);
routes.put("/product/update/:id", Product.update);
routes.delete("/product/delete/:id", Product.delete);

routes.get("/sale", Sale.index);
routes.get("/sale/view", Sale.view);
routes.post("/sale/create", Sale.create);
routes.put("/sale/update/:id", Sale.update);
routes.delete("/sale/delete/:id", Sale.delete);


module.exports = routes;