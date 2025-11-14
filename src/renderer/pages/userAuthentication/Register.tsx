import React, {useEffect, useState} from 'react';
import SwapThemeButton from "../../components/SwapTheme/SwapThemeButton";
import Title from "../../components/titles/Title";
import './Register.css'
import TextField from "../../components/text-fields/TextField";
import Button from "../../components/buttons/Button";
import {registerUser} from "../../../authService";
import SpinnerLoader from "../../components/SpinnerLoader";
import {useNavigate} from "react-router-dom";



type PasswordError =
    | "empty"
    | "minLength"
    | "maxLength"
    | "missingLowercase"
    | "missingUppercase"
    | "missingNumber"
    | "missingSymbol";


function ensureEmailIsValid(value: string, maxLength = 50) {
    if (typeof value !== 'string' || value.trim() === '') return false;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(value)) return false;

    return value.length <= maxLength;

}
function ensurePasswordIsValid(
    value: string,
    minLength = 8,
    maxLength = 128
): true | PasswordError {
    if (typeof value !== "string" || value.trim() === "") return "empty";
    if (value.length < minLength) return "minLength";
    if (value.length > maxLength) return "maxLength";
    if (!/[a-z]/.test(value)) return "missingLowercase";
    if (!/[A-Z]/.test(value)) return "missingUppercase";
    if (!/\d/.test(value)) return "missingNumber";
    if (!/[@$!%*?&._-]/.test(value)) return "missingSymbol";

    return true;
}


const Register = () => {
    const [userEmail, setUserEmail] = useState("");
    const [emailIsWrong, setEmailIsWrong] = useState<boolean>(false);
    const [emailHelperText, setEmailHelperText] = useState("Escriba un correo");

    const [userPassword, setUserPassword] = useState("");
    const [userPasswordIsWrong, setUserPasswordIsWrong] = useState<boolean>(false);
    const [passwordHelperText, setPasswordHelperText] = useState("Escriba una contraseña segura, min 8 caracteres");
    const [apiResult, setApiResult] = useState({});

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        if (success && countdown === 0) {
            navigate("/");
        }
    }, [countdown, success, navigate]);


    function handleEmailBlur(e: React.FocusEvent<HTMLInputElement>) {
        const result = ensurePasswordIsValid(userPassword);
        if (result === true) {
            return;
        }

        if (userEmail.trim() === "") {
            setEmailIsWrong(false);
            return
        }

        const isValidEmailInput:boolean = ensureEmailIsValid(e.currentTarget.value);

        if (isValidEmailInput) {
            setEmailIsWrong(false);
        } else {
            setEmailIsWrong(true);
        }
    }

    function handleUserPasswordBlur(e: React.FocusEvent<HTMLInputElement>) {
        const result = ensurePasswordIsValid(userPassword);

        if (result === true) {
            setUserPasswordIsWrong(false);
            setPasswordHelperText("Escriba una contraseña segura, min 8 caracteres");
        } else {
            setUserPasswordIsWrong(true);
            switch (result) {
                case "minLength":
                    setPasswordHelperText("La contraseña debe tener al menos 8 caracteres de longitud.");
                    break;
                case "maxLength":
                    setPasswordHelperText("La contraseña no puede exceder 128 caracteres de longitud.");
                    break;
                case "missingUppercase":
                    setPasswordHelperText("La contraseña debe tener al menos una mayúscula.");
                    break;
                case "missingLowercase":
                    setPasswordHelperText("La contraseña debe tener al menos una minúscula.");
                    break;
                case "missingNumber":
                    setPasswordHelperText("La contraseña debe tener al menos un número.");
                    break;
                case "missingSymbol":
                    setPasswordHelperText("La contraseña debe tener al menos un caracter especial [@$!%*?&._-]");
                    break;

            }
        }

    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!ensureEmailIsValid(userEmail) || ensurePasswordIsValid(userPassword) !== true) {
            return;
        }

        setLoading(true);
        setSuccess(false);
        setCountdown(3);

        // procesamos API + tiempo mínimo de spinner en paralelo
        const apiCall = registerUser(userEmail, userPassword);
        const minDelay = new Promise(resolve => setTimeout(resolve, 2500)); // 2.5s mínimo

        const result = await apiCall;
        await minDelay;

        if (result.success) {
            setLoading(false);
            setSuccess(true);

            const interval = setInterval(() => {
                setCountdown(prev => {
                    if (prev === 1) {
                        clearInterval(interval);
                    }
                    return prev - 1;
                });
            }, 1000);

        } else {
            setLoading(false);
            setSuccess(false);
        }
    }


    return (
        <div className="register-container">

            <div className="icon-container">
                <SwapThemeButton />
            </div>

            <Title>Registro</Title>

            {loading && !success && (
                <div>
                    <SpinnerLoader />
                </div>
            )}

            {success && (
                <div className={"feedback-wrapper"}>
                    <p>Registro completado</p>
                    <p>Se ha enviado un correo de confirmación a su dirección de email</p>
                    <p>Volviendo en {countdown}...</p>
                </div>
            )}

            {!loading && !success && (
                <form className="register-form" onSubmit={handleSubmit}>
                    <TextField
                        type="email"
                        label="Correo Electrónico"
                        placeholder="ejemplo@email.com"
                        helperText={emailHelperText}
                        name="user-email"
                        onChange={e => setUserEmail(e.target.value)}
                        onBlur={handleEmailBlur}
                        value={userEmail}
                        error={emailIsWrong}
                    />

                    <TextField
                        type="password"
                        label="Contraseña"
                        placeholder="Contraseña..."
                        helperText={passwordHelperText}
                        name="user-password"
                        onChange={e => setUserPassword(e.target.value)}
                        onBlur={handleUserPasswordBlur}
                        value={userPassword}
                        error={userPasswordIsWrong}
                    />

                    <div className="register-button-container">
                        <Button type="submit">Registrar</Button>
                    </div>
                    <Button type={"button"} variant={"link"} onClick={() => navigate('/')}>Volver</Button>
                </form>
            )}
        </div>
    );
};

export default Register;
