import React from 'react';

export default function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 text-white">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Desafio React Node</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={"nav-link"}
                                href={"/product"}

                            >Produtos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={"/sale"}>Vendas</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}