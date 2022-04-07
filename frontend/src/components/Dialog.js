import React from 'react';

export default function Dialog({message, onDialog}) {
    return (
        <div style={{position: "fixed", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,.5)'}}>
            <div
                className={"d-flex flex-column justify-content-center align-items-center  position-absolute"}
                style={{
                    backgroundColor: "#FFFFFF",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "45%",
                    height: 250
                }}
            >
                <h4 className={"text-center mb-4"}>{message}</h4>

                <div className={"d-flex flex-row align-content-center"}>
                    <button
                        className={"btn btn-outline-success btn-lg me-2"}
                        onClick={() => onDialog(true)}
                    >
                        Sim
                    </button>
                    <button
                        className={"btn btn-outline-danger btn-lg"}
                        onClick={() => onDialog(false)}
                    >
                        Não
                    </button>
                </div>
            </div>
        </div>
    );
}
