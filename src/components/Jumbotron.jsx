import React from "react";
import iPhone from "../assets/images/iphone-14.jpg";
import HoldingPhone from "../assets/images/iphone-hand.png"

function Jumbotron() {
    // This function to made to scroll down on clicking the button
    const handleLearnMore = () => {
        const element = document.querySelector(".sound-section");
        window.scrollTo({
            top:element?.getBoundingClientRect().top,
            left:0,
            behavior:'smooth'
        });
    }

    return ( 
        <div className="jumbotron-section wrapper">
            <h2 className="title">New</h2>
            <img className="logo" src={iPhone} alt="iPhone-14-Pro"/>
            <p className="text">Big and Bigger.</p>
            <span className="description">
                From $41.69/mo for 24 mo. or $999 before trade-in
            </span>
            <ul className="links">
                <li><button className="button">Buy</button></li>
                <li><a className="link" onClick={handleLearnMore}>Learn more</a></li>
            </ul>
            <img src={HoldingPhone} className="iphone-img" alt="iphone 14"/>
        </div>
    );
}

export default Jumbotron;