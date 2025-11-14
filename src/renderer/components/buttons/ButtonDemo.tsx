import React from 'react';
import Button from "./Button";

const ButtonDemo = () => {
    return (
        <div style={{ padding: "2rem" }}>
            <h1>Demo Buttons</h1>
            <Button onClick={() => alert("Clicked")}>
                Enviar
            </Button>
            <Button disabled>Deshabilitado</Button>

        </div>
    );
};

export default ButtonDemo;