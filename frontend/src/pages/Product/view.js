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
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    const [dialog, setDialog] = useState({
        message: "",
        isVisible: false
    });

    const idProductRef = useRef();

    let params = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const {id} = params;

        (async () => {
            const {data} = await api.get("product/view", {
                params: {id}
            });

            setId(data.id);
            setName(data.name);
            setPrice(data.price);
            setDescription(data.description);
            setCreatedAt(dateFormat(data.createdAt));
            setUpdatedAt(dateFormat(data.updatedAt));
        })();
    }, []);

    const handleDialog = (message, isVisible, nameProduct) => {
        setDialog({
            message,
            isVisible,
            nameProduct
        });
    }

    async function handleDeleteProduct(id) {
        handleDialog("Deseja realmente excluír este produto?", true, name);
        idProductRef.current = id;
    }

    const areUSureDelete = async (choose) => {
        if (choose) {
            const response = await api.delete(`/product/delete/${idProductRef.current}`);

            if (response.data) {
                toast.success("Produto excluído com sucesso!", {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'foo-bar'
                });

                await navigate(`/product`);
            }
        }

        handleDialog("", false);
    }


    return (
        <div className={"container"}>

            <nav className={"my-4"} style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <Link to={"/product"} className={"breadcrumb-item text-decoration-none"}>Produtos</Link>
                    <li className="breadcrumb-item active" aria-current="page">Visualizar</li>
                </ol>
            </nav>

            <div className={"card"}>
                <div className={"card-body"}>

                    <div className={"d-flex flex-row justify-content-between"}>

                        <h4 className={"mb-4"}>Visualização do produto</h4>

                        <div className={"d-flex flex-row align-items-center"}>
                            <Link
                                to={"/product"}
                                className={"btn btn-outline-info btn-sm me-1"}>
                                <FaArrowLeft/> Voltar
                            </Link>

                            <Link
                                to={`/product-update/${id}`}
                                className={"btn btn-outline-warning btn-sm me-1"}
                            >
                                <FaPen/> Alterar
                            </Link>

                            <button
                                className={"btn btn-outline-danger btn-sm"}
                                type={"button"}
                                onClick={() => handleDeleteProduct(id)}
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
                        <div className={"col-3 fw-bold"}>Nome do produto:</div>
                        <div className={"col"}>{name}</div>
                    </div>

                    <div className="row">
                        <div className={"col-3 fw-bold"}>Preço:</div>
                        <div className={"col"}>{MoneyFormat(price)}</div>
                    </div>

                    <div className="row">
                        <div className={"col-3 fw-bold"}>Descrição:</div>
                        <div className={"col"}>{description}</div>
                    </div>

                    <div className="row">
                        <div className={"col-3 fw-bold"}>Criado em:</div>
                        <div className={"col"}>{createdAt}</div>
                    </div>

                    <div className="row">
                        <div className={"col-3 fw-bold"}>Atualizado em:</div>
                        <div className={"col"}>{updatedAt}</div>
                    </div>
                </div>
            </div>

            {dialog.isVisible && <Dialog onDialog={areUSureDelete} message={dialog.message}/>}
        </div>
    );
}