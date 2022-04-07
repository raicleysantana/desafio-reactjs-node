import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import NumberFormat from 'react-number-format';
import {toast} from 'react-toastify';
import api from "../../services/api";


export default function Form() {
    // @formatter:off
    const [id, setId]                   = useState("");
    const [name, setName]               = useState("");
    const [price, setPrice]             = useState("");
    const [description, setDescription] = useState("");
    // @formatter:on

    let navigate = useNavigate();
    let params = useParams();

    useEffect(() => {
        (async () => {
            const {id} = await params;

            if (id) {
                const {data} = await api.get(`/product/view`, {params: {id}});
                setId(data.id);
                setName(data.name);
                setPrice(data.price);
                setDescription(data.description);
            }
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let response = "";

        if (id) {
            response = await api.put(`/product/update/${id}`, {name, price, description});
        } else {
            response = await api.post('/product/create', {name, price, description});
        }

        toast.success("Dados salvo com sucesso!", {
            position: toast.POSITION.TOP_RIGHT,
            className: 'foo-bar'
        });

        await navigate(`/product-view/${response.data.id}`);
    }

    return (
        <div className={"container"}>

            <nav className={"my-4"} style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <Link to={"/product"} className={"breadcrumb-item text-decoration-none"}>Produtos</Link>
                    <li className="breadcrumb-item active" aria-current="page">{
                        (() => {
                            return id ? "Alterar" : "Cadastrar";
                        })()
                    }</li>
                </ol>
            </nav>

            <div className="card">
                <div className="card-body px-4">

                    <h4 className={"mb-4"}>{id ? "Alterar" : "Cadastrar"} produto</h4>

                    <form onSubmit={handleSubmit}>
                        <div className={"mb-3"}>
                            <label htmlFor="name" className="form-label">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                aria-describedby="name"
                                onChange={e => setName(e.target.value)}
                                value={name}
                                placeholder={"Nome do produto"}
                                required={true}
                            />
                        </div>

                        <div className={"mb-3"}>
                            <label htmlFor="price" className="form-label">Preço</label>

                            <NumberFormat
                                thousandSeparator={"."}
                                prefix={'R$'}
                                className={"form-control"}
                                id={"price"}
                                onValueChange={(values) => {
                                    const {formattedValue, value} = values;
                                    setPrice(value);
                                }}
                                value={price}
                                decimalSeparator={','}
                                decimalScale={2}
                                allowNegative={false}
                                isNumericString={true}
                                fixedDecimalScale={true}
                                placeholder={"Valor do produto"}
                                required={true}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className={"form-label"}>Descrição</label>
                            <textarea
                                className={"form-control"}
                                id="description"
                                rows="5"
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                                placeholder={"Descrição do produto"}
                            />
                        </div>

                        <div className={"d-flex flex-row justify-content-between"}>
                            <Link
                                to={"/product"}
                                className={"btn btn-outline-danger"}>
                                Voltar
                            </Link>
                            <button
                                type="submit"
                                className={"btn btn-outline-success"}
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}