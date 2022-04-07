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
    const [products, setProducts] = useState([]);
    const [dialog, setDialog] = useState({
        message: "",
        isVisible: false
    });

    const idProductRef = useRef();

    useEffect(() => {
        (async () => {
            const {data} = await api.get("/product");

            setProducts(data);
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
        const index = products.findIndex((p) => p.id === id);

        handleDialog("Deseja realmente excluír este produto?", true, products[index].name);
        idProductRef.current = id;
    }

    const areUSureDelete = async (choose) => {
        if (choose) {
            const response = await api.delete(`/product/delete/${idProductRef.current}`);

            if (response.data) {
                setProducts(products.filter((p) => p.id !== idProductRef.current));

                toast.success("Produto excluído com sucesso!", {
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
                        <h3 className="card-title">Produtos</h3>

                        <Link to={"/product-create"} className={"btn btn-outline-success"}>
                            <FaPlus/> Novo
                        </Link>
                    </div>
                    <table className={"table table-borderless"}>
                        <thead className={"table-light"}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            products.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <th scope="row">{(index + 1)}</th>
                                        <td>{item.name}</td>
                                        <td>{MoneyFormat(item.price)}</td>
                                        <td style={{width: "20%"}}>
                                            <Link
                                                to={`/product-view/${item.id}`}
                                                className={"btn btn-outline-primary btn-sm me-1"}
                                            >
                                                <FaEye/>
                                            </Link>
                                            <Link
                                                to={`/product-update/${item.id}`}
                                                className={"btn btn-outline-warning btn-sm me-1"}
                                            >
                                                <FaPen/>
                                            </Link>
                                            <button
                                                className={"btn btn-outline-danger btn-sm"}
                                                type={"button"}
                                                onClick={() => handleDeleteProduct(item.id)}
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