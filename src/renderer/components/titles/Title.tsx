import React from "react";
import './Title.css'
type TitleLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface TitleProps {
    level?: TitleLevel;
    children: React.ReactNode;
    className?: string | string[];
    align?: "left" | "center" | "right";
}

const Title: React.FC<TitleProps> = ({
                                         level = "h1",
                                         children,
                                         className = "",
                                         align = "left",
                                     }) => {
    const Tag = level;

    const classNames = ["title", `title--${level}`, `title--align-${align}`]
        .concat(Array.isArray(className) ? className : [className])
        .filter(Boolean)
        .join(" ");

    return <Tag className={classNames}>{children}</Tag>;
};

export default Title;
