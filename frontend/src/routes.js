import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Home from './pages/Home';

import ProductHome from './pages/Product';
import ProductForm from './pages/Product/form';
import ProductView from './pages/Product/view';

import SaleHome from './pages/Sale';
import SaleForm from './pages/Sale/form';
import SaleView from './pages/Sale/view';

export default function routes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/product"} element={<ProductHome/>}/>
                <Route path={"/product-create"} element={<ProductForm/>}/>
                <Route path={"/product-update/:id"} element={<ProductForm/>}/>
                <Route path={"/product-view/:id"} element={<ProductView/>}/>

                <Route path={"/sale"} element={<SaleHome/>}/>
                <Route path={"/sale-create"} element={<SaleForm/>}/>
                <Route path={"/sale-update/:id"} element={<SaleForm/>}/>
                <Route path={"/sale-view/:id"} element={<SaleView/>}/>

            </Routes>
        </BrowserRouter>
    )
}