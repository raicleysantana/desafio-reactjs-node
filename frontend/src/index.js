import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {render} from 'react-dom';
import App from './App';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import Home from "./pages/Product";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App/>);