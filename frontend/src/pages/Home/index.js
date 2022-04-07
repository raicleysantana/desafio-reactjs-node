import React from 'react';
import {FaGifts, FaShoppingCart} from 'react-icons/fa';
import {Link} from "react-router-dom";

export default function Index() {
    return (
        <div className={"row"}>
            <div style={{flex: 1}} className={"mt-5 d-flex align-items-center justify-content-center"}>

                <Link to={"/product"} className="col-12 col-md-6 col-lg-3 me-2 text-decoration-none">
                    <div className="card shadow py-4" style={{borderRadius: 8}}>
                        <div className="card-body d-flex flex-column align-items-center">
                            <FaGifts className={"fs-1"}/>
                            <h5 className="card-title align-left">
                                <strong>Produtos</strong>
                            </h5>
                            <p className="card-text text-muted">
                                Gerenciamento de produtos
                            </p>
                        </div>
                    </div>
                </Link>


                <Link to={"/sale"} className="col-12 col-md-6 col-lg-3 ms-2 text-decoration-none">
                    <div className="card shadow py-4" style={{borderRadius: 8}}>
                        <div className="card-body d-flex flex-column align-items-center">
                            <FaShoppingCart className={"fs-1"}/>
                            <h5 className="card-title align-left">
                                <strong>Vendas</strong>
                            </h5>
                            <p className="card-text text-muted">
                                Gerenciamento das vendas
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}