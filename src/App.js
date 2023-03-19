import React, { useState } from "react"
// import Confetti from "react-confetti"
import Die from "./components/Die"
import './App.css';

function App() {

  const [dice, setDice] = useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.ceil(Math.random() * 6));
    }
    return newDice;
  }

  const diceElements = dice.map(die => <Die value={die} />)

  function rollDice() {
    setDice(allNewDice())
  }

  return (
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
      <div className="btn">
        <button onClick={rollDice}>Roll</button>
      </div>

    </main>
  );
}

export default App;
