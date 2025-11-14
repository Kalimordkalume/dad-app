import type { ButtonHTMLAttributes, FC } from "react";
import "./button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "link";
    disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
                                           children,
                                           variant = "primary",
                                           disabled = false,
                                           ...rest
                                       }) => {

    const classList = [`btn`, `btn-${variant}`];
    if (disabled) classList.push("btn-disabled");

    return (
        <button className={classList.join(" ")} disabled={disabled} {...rest}>
            {children}
        </button>
    );
};

export default Button;
