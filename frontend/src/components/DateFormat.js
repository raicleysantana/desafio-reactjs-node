import React from 'react';

export default function DateFormat(value) {
    const dbDate = new Date(value);
    console.log(value);
    return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }).format(dbDate);
}