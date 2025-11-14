import React, {useEffect, useState} from 'react';
import Moon from "../icons/Moon";
import {Sun} from "../icons";
import './SwapTheme.css'



const SwapThemeButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    return (
        <button className={"swapTheme"} onClick={() => {setDarkMode(prev=>!prev)}} >
            {
                darkMode === true ?
                    (<Sun width={"100%"} height={"100%"} fill={"inherit"}></Sun>) :
                    (<Moon width={"100%"} height={"100%"} fill={"inherit"}></Moon>)

            }
            
        </button>
    );
};

export default SwapThemeButton;