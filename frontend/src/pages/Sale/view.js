import React, {useEffect, useRef, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {FaPen, FaTrashAlt, FaArrowLeft} from "react-icons/fa";
import {toast} from "react-toastify";
import api from "../../services/api";
import MoneyFormat from "../../components/MoneyFormat";
import dateFormat from "../../components/DateFormat";
import Dialog from "../../components/Dialog";

export default function View() {
    const [id, setId] = useState("");
    const [product_id, setProduct_id] = useState("");
    const [product, setProduct] = useState("");
    const [total, setTotal] = useState("");
    const [payment_type, setPayment_type] = useState("");
    const [status, setStatus] = useState("");
    const [quantity, setQuantity] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [dialog, setDialog] = useState({
        message: "",
        isVisible: false
    });

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


    const idSaleRef = useRef();

    let params = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const {id} = params;

        (async () => {
            const {data} = await api.get("sale/view", {
                params: {id}
            });

            let _payment = paymentOptions.find((v) => v.value == data.payment_type).label;
            let _status = statusOptions.find((v) => v.value == data.status).label;

            setId(data.id);
            setProduct_id(data.product_id);
            setTotal(data.total);
            setQuantity(data.quantity);
            setPayment_type(_payment);
            setCreatedAt(dateFormat(data.createdAt));
            setStatus(_status);
            setProduct(<div>{data.product.name} - <b>({MoneyFormat(data.product.price)})</b></div>);
        })();
    }, []);

    const handleDialog = (message, isVisible) => {
        setDialog({
            message,
            isVisible,
        });
    }

    async function handleDeleteSale(id) {
        handleDialog("Deseja realmente excluír este produto?", true);
        idSaleRef.current = id;
    }

    const areUSureDelete = async (choose) => {
        if (choose) {
            const response = await api.delete(`/product/delete/${idSaleRef.current}`);

            if (response.data) {
                toast.success("Venda excluída com sucesso!", {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'foo-bar'
                });

                await navigate(`/sale`);
            }
        }

        handleDialog("", false);
    }

    return (
        <div className={"container"}>

            <nav className={"my-4"} style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <Link to={"/sale"} className={"breadcrumb-item text-decoration-none"}>Vendas</Link>
                    <li className="breadcrumb-item active" aria-current="page">Visualizar</li>
                </ol>
            </nav>

            <div className={"card"}>
                <div className={"card-body"}>

                    <div className={"d-flex flex-row justify-content-between"}>

                        <h4 className={"mb-4"}>Visualização de venda</h4>

                        <div className={"d-flex flex-row align-items-center"}>
                            <Link
                                to={"/sale"}
                                className={"btn btn-outline-info btn-sm me-1"}>
                                <FaArrowLeft/> Voltar
                            </Link>

                            <Link
                                to={`/sale-update/${id}`}
                                className={"btn btn-outline-warning btn-sm me-1"}
                            >
                                <FaPen/> Alterar
                            </Link>

                            <button
                                className={"btn btn-outline-danger btn-sm"}
                                type={"button"}
                                onClick={() => handleDeleteSale(id)}
                            >
                                <FaTrashAlt/> Excluir
                            </button>
                        </div>
                    </div>


                    <div className="row">
                        <div className={"col-3 fw-bold"}>Código:</div>
                        <div className={"col"}>{id}</div>
                    </div>

                    <div className="row">
                        <div className={"col-3 fw-bold"}>Produto:</div>
                        <div className={"col"}>{product}
                        </div>
                    </div>
                    <div className="row">
                        <div className={"col-3 fw-bold"}>Quantidade:</div>
                        <div className={"col"}>{quantity}</div>
                    </div>
                    <div className="row">
                        <div className={"col-3 fw-bold"}>Total:</div>
                        <div className={"col"}>{MoneyFormat(total)}</div>
                    </div>

                    <div className="row">
                        <div className={"col-3 fw-bold"}>Tipo de Pagamento:</div>
                        <div className={"col"}>{payment_type}</div>
                    </div>

                    <div className="row">
                        <div className={"col-3 fw-bold"}>Situação:</div>
                        <div className={"col"}>{status}</div>
                    </div>

                    <div className="row">
                        <div className={"col-3 fw-bold"}>Criado em:</div>
                        <div className={"col"}>{createdAt}</div>
                    </div>


                </div>
            </div>

            {dialog.isVisible && <Dialog onDialog={areUSureDelete} message={dialog.message}/>}
        </div>
    );
}