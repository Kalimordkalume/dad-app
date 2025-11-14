import React, {useEffect, useState} from 'react';
import Title from "../../components/titles/Title";
import './Login.css';
import Button from "../../components/buttons/Button";
import TextField from "../../components/text-fields/TextField";
import SwapThemeButton from "../../components/SwapTheme/SwapThemeButton";
import {useNavigate} from "react-router-dom";
import SpinnerLoader from "../../components/SpinnerLoader";
import {loginUser} from "../../../authService";


interface LoginFormData {
    email: string;
    password: string;
    isValidEmail:boolean;
    isValidPassword:boolean;
}


const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
        isValidEmail: false,
        isValidPassword: false,
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [countdown, setCountdown] = useState(3);


    useEffect(() => {
        if (success && countdown === 0) {
            navigate("/empire");
        }
    }, [success, countdown, navigate]);


    async function handleFormLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setLoading(true);
        setSuccess(false);
        setCountdown(3);

        const apiCall = loginUser(formData.email,formData.password);
        const minDelay = new Promise(resolve=>setTimeout(resolve, 2500));

        const result = await apiCall;
        await minDelay;

        if (result.success){
            setLoading(false);
            setSuccess(true);

            const interval = setInterval(() => {
                setCountdown(prev =>{
                    if (prev ===1){
                        clearInterval(interval);
                    }
                    return prev -1
                },);
            },1000);
        } else {
            setLoading(false);
            setSuccess(false);
        }

    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        switch (e.target.id) {
            case "user-email":
                setFormData({...formData, email: e.target.value});
                return
            case "user-password":
                setFormData({...formData, password: e.target.value});
                return
        }
    }

    return (
        <div className="login-container">
            <div className="icon-container">
                <SwapThemeButton></SwapThemeButton>
            </div>
            <Title
                align={"center"}
                level={"h1"}>Login</Title>
            {
                loading && !success && (
                    <SpinnerLoader/>
                )
            }
            {
                success && (
                    <div className={"feedback-wrapper"}>
                        <p>Login exitoso</p>
                        <p>En {countdown} segundos tendremos todo listo para ti.</p>
                    </div>
                )
            }

            {
                !loading && !success && (
                    <>
                        <form onSubmit={(event)=> handleFormLogin(event)}
                              className={"login-body"}>
                            <TextField type={"email"}
                                       label={"Email"}
                                       placeholder={"mi-nombre@dominio.com"}
                                       helperText={"Introduzca el email de registro."}
                                       name={"user-email"}
                                       id={"user-email"}
                                       onChange={(e) => handleChange(e)}
                                       value={formData.email}

                            ></TextField>
                            <TextField
                                type="password"
                                label={"Contraseña"}
                                placeholder={"Contraseña..."}
                                helperText={"Introduza su contraseña"}
                                name={"user-password"}
                                id={"user-password"}
                                onChange={(e) => handleChange(e)}
                                value={formData.password}
                            ></TextField>

                            <div className={"login-button-wrapper"}>
                                <Button type={"submit"} variant={"primary"}>Login</Button>
                            </div>
                        </form>
                        <div className={"login-footer"}>
                            <Button type={"button"} variant={"link"} onClick={() => navigate('/register')}>Regístrese
                                aquí</Button>
                            <Button type={"button"} variant={"link"}>¿Olvidó su contraseña?</Button>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default Login;