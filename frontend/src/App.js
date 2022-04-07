import React from 'react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';
import Navbar from "./components/Navbar";

export default function App() {
    return (
        <div>
            <ToastContainer/>
            <Navbar/>
            <Routes/>
        </div>
    );
}