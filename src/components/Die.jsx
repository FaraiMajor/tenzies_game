import React from "react";

export default function Die(props) {
    // initial die face
    let dieFace = "";
    switch (props.value) {
        case 1:
            dieFace = "/images/dice1.png";
            break;
        case 2:
            dieFace = "/images/dice2.png";
            break;
        case 3:
            dieFace = "/images/dice3.png";
            break;
        case 4:
            dieFace = "/images/dice4.png";
            break;
        case 5:
            dieFace = "/images/dice5.png";
            break;
        case 6:
            dieFace = "/images/dice6.png";
            break;
        default:
            break;
    }
    let dieFaceHeld = "";
    switch (props.value) {
        case 1:
            dieFaceHeld = "/images/dice-red1.png";
            break;
        case 2:
            dieFaceHeld = "/images/dice-red2.png";
            break;
        case 3:
            dieFaceHeld = "/images/dice-red3.png";
            break;
        case 4:
            dieFaceHeld = "/images/dice-red4.png";
            break;
        case 5:
            dieFaceHeld = "/images/dice-red5.png";
            break;
        case 6:
            dieFaceHeld = "/images/dice-red6.png";
            break;
        default:
            break;
    }

    const styles = {
        backgroundImage: props.isHeld ? `url(${dieFaceHeld})` : `url(${dieFace})`,
        backgroundSize: "cover",
    }
    return (
        <div className="die-face"
            style={styles}
            onClick={props.holdDice}>
            {/* <h2 className="die-num"><img src={dieFace} /></h2> */}
        </div>
    )
}