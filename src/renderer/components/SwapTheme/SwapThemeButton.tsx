import React, {useState} from 'react';
import Moon from "../icons/Moon";
import {Sun} from "../icons";

type ThemeUI = "light" | "dark";


const SwapThemeButton = () => {
    const [theme, setTheme] = useState<ThemeUI>("light");

    return (
        <button onClick={() => {setTheme(theme === "light" ? "light" : "dark")}}>
            {
                theme === "light" ? (<Moon width={"100%"} height={"100%"} fill={"inherit"}></Moon>) : (<Sun width={"100%"} height={"100%"} fill={"inherit"}></Sun>)
            }
            
        </button>
    );
};

export default SwapThemeButton;