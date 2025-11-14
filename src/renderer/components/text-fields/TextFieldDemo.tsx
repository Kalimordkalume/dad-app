import React from 'react';
import TextField from "./TextField";

const TextFieldDemo = () => {
    return (
        <div>
            <TextField
                label={"Username"}
                name={"userName-input"}
                placeholder={"Escriba su usuario..."}
                value={""}
                helperText={"Escriba un nombre de usuario válido."}

            />
        </div>
    );
};

export default TextFieldDemo;