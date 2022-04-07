import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import NumberFormat from 'react-number-format';
import {toast} from 'react-toastify';
import api from "../../services/api";
import dateFormat from "../../components/DateFormat";
import MoneyFormat from "../../components/MoneyFormat";


export default function Form() {
    // @formatter:off
    const [products, setProducts]         = useState([]);
    const [id, setId]                     = useState("");
    const [quantity, setQuantity]         = useState("");
    const [product_id, setProduct_id]     = useState("");
    const [payment_type, setPayment_type] = useState("");
    const [status, setStatus]             = useState("");
    const [createdAt, setCreatedAt]       = useState("");
    // @formatter:on

    const statusOptions = [
        {"value": "pago", "label": "Pago"},
        {"value": "pendente", "label": "Pendente"},
        {"value": "cancelado", "label": "Cancelado"},
    ];

    const paymentOptions = [
        {"value": "boleto", "label": "Boleto"},
        {"value": "cartao_de_credito", "label": "Cartão de crédito"},
        {"value": "pix", "label": "Pix"},
    ];


    let navigate = useNavigate();
    let params = useParams();

    useEffect(() => {
        (async () => {
            const {id} = await params;

            if (id) {
                const {data} = await api.get(`/sale/view`, {params: {id}});
                setId(data.id);
                setProduct_id(data.product_id);
                setQuantity(data.quantity);
                setPayment_type(data.payment_type);
                setStatus(data.status);
            }

            const {data} = await api.get("/product");

            setProducts(data);

        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let response = "";

        const index = products.findIndex((p) => p.id == product_id);
        let total = (products[index].price * quantity);

        const formData = {product_id, payment_type, status, quantity, total};

        if (id) {
            response = await api.put(`/sale/update/${id}`, formData);
        } else {
            response = await api.post('/sale/create', formData);
        }

        toast.success("Dados salvo com sucesso!", {
            position: toast.POSITION.TOP_RIGHT,
            className: 'foo-bar'
        });

        await navigate(`/sale-view/${response.data.id}`);
    }

    return (
        <div className={"container"}>

            <nav className={"my-4"} style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <Link to={"/sale"} className={"breadcrumb-item text-decoration-none"}>Vendas</Link>
                    <li className="breadcrumb-item active" aria-current="page">{
                        (() => {
                            return id ? "Alterar" : "Cadastrar";
                        })()
                    }</li>
                </ol>
            </nav>

            <div className="card">
                <div className="card-body px-4">

                    <h4 className={"mb-4"}>{id ? "Alterar" : "Cadastrar"} Venda</h4>

                    <form onSubmit={handleSubmit}>
                        <div className={"mb-3"}>
                            <label htmlFor="product_id" className="form-label">Produto</label>
                            <select
                                id={"product_id"}
                                className={"form-control"}
                                onChange={(e) => setProduct_id(e.target.value)}
                                required={true}
                            >
                                <option value={""}>(Selecione)</option>
                                {
                                    products.map((item, index) => {
                                        return (<option
                                            key={item.id}
                                            value={item.id}
                                            {...(item.id == product_id && {selected: true})}
                                        >
                                            {`${item.name} - ${MoneyFormat(item.price)}`}
                                        </option>)
                                    })
                                }
                            </select>
                        </div>

                        <div className={"mb-3"}>
                            <label htmlFor="quantity" className="form-label">Quantidade</label>
                            <input
                                type="number"
                                className="form-control"
                                id="quantity"
                                aria-describedby="quantity"
                                onChange={e => setQuantity(e.target.value)}
                                value={quantity}
                                placeholder={"Quantidade de produto"}
                                defaultValue={1}
                                required={true}
                                min={1}
                            />
                        </div>

                        <div className={"mb-3"}>
                            <label htmlFor="status" className="form-label">Situação</label>
                            <select
                                id={"status"}
                                className={"form-control"}
                                onChange={(e) => setStatus(e.target.value)}
                                required={true}
                            >
                                <option value={""}>(Selecione)</option>
                                {statusOptions.map((item, index) => {
                                    return <option
                                        key={item.value}
                                        value={item.value}
                                        {...(item.value == status && {selected: true})}
                                    >{item.label}</option>
                                })}
                            </select>
                        </div>

                        <div className={"mb-3"}>
                            <label htmlFor="payment_type" className="form-label">Tipo de Pagamento</label>
                            <select
                                id={"payment_type"}
                                className={"form-control"}
                                onChange={(e) => setPayment_type(e.target.value)}
                                required={true}
                            >
                                <option value={""}>(Selecione)</option>
                                {paymentOptions.map((item, index) => {
                                    return <option
                                        key={item.value}
                                        value={item.value}
                                        {...(item.value == payment_type && {selected: true})}
                                    >{item.label}</option>
                                })}
                            </select>
                        </div>

                        <div className={"d-flex flex-row justify-content-between"}>
                            <Link
                                to={"/sale"}
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