import React, {useEffect, useRef, useState} from "react";
import {
    FaPlus,
    FaEye,
    FaPen,
    FaTrashAlt
} from "react-icons/fa";
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import api from "../../services/api";
import MoneyFormat from "../../components/MoneyFormat";
import Dialog from "../../components/Dialog";

export default function Index() {
    const [sale, setSale] = useState([]);
    const [dialog, setDialog] = useState({
        message: "",
        isVisible: false
    });

    const idSaleRef = useRef();

    useEffect(() => {
        (async () => {
            const {data} = await api.get("/sale");

            setSale(data);

            console.log(data[0].product);

        })();
    }, []);

    const handleDialog = (message, isVisible) => {
        setDialog({
            message,
            isVisible,
        });
    }

    async function handleDeleteSale(id) {
        const index = sale.findIndex((p) => p.id === id);

        handleDialog("Deseja realmente excluír esta venda?", true);
        idSaleRef.current = id;
    }

    const areUSureDelete = async (choose) => {
        if (choose) {
            const response = await api.delete(`/sale/delete/${idSaleRef.current}`);

            if (response.data) {
                setSale(sale.filter((p) => p.id !== idSaleRef.current));

                toast.success("Venda excluído com sucesso!", {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'foo-bar'
                });
            }
        }

        handleDialog("", false);
    }

    return (
        <div className={"container"}>
            <div className={"card shadow"} style={{marginTop: '4rem'}}>
                <div className={"card-body"}>
                    <div className={"d-flex justify-content-between align-items-center mb-4"}>
                        <h3 className="card-title">Vendas</h3>

                        <Link to={"/sale-create"} className={"btn btn-outline-success"}>
                            <FaPlus/> Novo
                        </Link>
                    </div>
                    <table className={"table table-hover"}>
                        <thead className={"table-light"}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Produto</th>
                            <th scope="col">Total</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">Situação</th>
                            <th scope="col">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            sale.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <th scope="row">{(index + 1)}</th>
                                        <td>{item.product.name}</td>
                                        <td>{MoneyFormat(item.total)}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.status}</td>
                                        <td style={{width: "20%"}}>
                                            <Link
                                                to={`/sale-view/${item.id}`}
                                                className={"btn btn-outline-primary btn-sm me-1"}
                                            >
                                                <FaEye/>
                                            </Link>
                                            <Link
                                                to={`/sale-update/${item.id}`}
                                                className={"btn btn-outline-warning btn-sm me-1"}
                                            >
                                                <FaPen/>
                                            </Link>
                                            <button
                                                className={"btn btn-outline-danger btn-sm"}
                                                type={"button"}
                                                onClick={() => handleDeleteSale(item.id)}
                                            >
                                                <FaTrashAlt/>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }

                        </tbody>
                    </table>

                </div>
            </div>

            {dialog.isVisible && <Dialog onDialog={areUSureDelete} message={dialog.message}/>}
        </div>
    );
}