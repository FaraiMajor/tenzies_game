import React from "react";
import dice1 from "../images/dice1.png"
import dice2 from "../images/dice2.png"
import dice3 from "../images/dice3.png"
import dice4 from "../images/dice4.png"
import dice5 from "../images/dice5.png"
import dice6 from "../images/dice6.png"
import dicered1 from "../images/dice-red1.png"
import dicered2 from "../images/dice-red2.png"
import dicered3 from "../images/dice-red3.png"
import dicered4 from "../images/dice-red4.png"
import dicered5 from "../images/dice-red5.png"
import dicered6 from "../images/dice-red6.png"



export default function Die(props) {
    // initial die face
    let dieFace = "";
    switch (props.value) {
        case 1:
            dieFace = dice1;
            break;
        case 2:
            dieFace = dice2;
            break;
        case 3:
            dieFace = dice3;
            break;
        case 4:
            dieFace = dice4;
            break;
        case 5:
            dieFace = dice5;
            break;
        case 6:
            dieFace = dice6;
            break;
        default:
            break;
    }
    let dieFaceHeld = "";
    switch (props.value) {
        case 1:
            dieFaceHeld = dicered1;
            break;
        case 2:
            dieFaceHeld = dicered2;
            break;
        case 3:
            dieFaceHeld = dicered3;
            break;
        case 4:
            dieFaceHeld = dicered4;
            break;
        case 5:
            dieFaceHeld = dicered5;
            break;
        case 6:
            dieFaceHeld = dicered6;
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