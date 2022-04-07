import React from "react";

export default function MoneyFormat(value) {
    return value.toLocaleString("pt-BR", {
        style: 'currency',
        currency: 'BRL',
    });
}