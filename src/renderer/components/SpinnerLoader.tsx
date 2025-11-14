import React, {useEffect, useState} from 'react';

const SpinnerLoader = () => {
    const [text, setText] = useState('');
    const [showImg, setShowImg] = useState(true);
    useEffect(() => {
            setTimeout(()=>{
                setShowImg(false);
                setText('I waited for 3 seconds to be loaded, did you see the spinner?');
            },3000)
    }, []);


    return (
        <>
            <div>
                {
                    showImg ? (
                        <img src="src/renderer/assets/icons/Spinner.svg"/>
                    ) : (
                        <h3>{text}</h3>
                    )
                }
            </div>
            
        </>
    );
};

export default SpinnerLoader;