import type { FC, InputHTMLAttributes } from "react";
import "./textfield.css";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
    error?: boolean;
}

const TextField: FC<TextFieldProps> = ({
                                                 label,
                                                 helperText,
                                                 error = false,
                                                 ...inputProps
                                             }) => {
    const classNames = [
        "textfield",
        error ? "textfield--error" : "",
        inputProps.className
    ].filter(Boolean).join(" ");

    const id = inputProps.id || `${inputProps.name}-${Math.random().toString(36).slice(2, 8)}`;

    return (
        <div
            className={classNames}>

                {label && <label className={"textfield__label"} htmlFor={id}>{label}</label>}
                <input
                    {...inputProps}
                    id={id}
                    className={`textfield__input ${inputProps.className || ""}`.trim()}
                />

                {helperText && <p className="textfield__helper">{helperText}</p>}

        </div>
    );
};


export default TextField;