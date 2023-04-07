import React from "react";

function DisplaySection({triggerPreview}) {

    const goToTop = ()=>{
        window.scrollTo({
            top:0,
            bottom:0,
            behavior:"smooth",
        })
    }

    return (  
            <div className="display-section wrapper">
                <h2 className="title"New></h2>
                <p className="text">Brilliant.</p>
                <span className="description">
                    From $41.69/mo for 24 mo. or $999 before trade-in
                </span>
                <button className="button" onClick={triggerPreview}>Try me!</button>
                <button className="back-button" onClick={goToTop}>TOP</button>
            </div>
    );
}

export default DisplaySection;