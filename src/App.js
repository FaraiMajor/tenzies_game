import React, { useEffect, useState } from "react"
import Confetti from "react-confetti"
import Die from "./components/Die"
import { nanoid } from "nanoid";
import './App.css';

function App() {

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld); // Check if all dice are held
    const allEqual = dice.every((die) => die.value === dice[0].value); // Check if all dice have the same value
    if (allHeld && allEqual) {
      setTenzies(true)
      console.log("You win!");
      // Do something to handle the win condition (e.g. display a message or trigger an animation)
    }
  }, [dice]);
  // helper function to avoid code repetiton
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  // click button to start a new game when die is held create new die. 
  // also setTenzies to false
  // function newGame() {
  //   setDice(oldDice => oldDice.map(die => {
  //     return die.isHeld && generateNewDie()
  //   }))
  //   setTenzies(false)
  // }

  // Clicking the button should generate a new array of numbers
  // and set the `dice` state to that new array (thus re-rendering
  // the array to the page)

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  // Flip the `isHeld` property on the object in the array
  // that was clicked, based on the `id` prop passed into the function
  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      if (die.id === id) {
        return {
          ...die, isHeld: !die.isHeld //flip the propert
        };
      } else {
        return die;
      }
    }

    ))
  }
  // Map over the state numbers array to generate the array
  // of Die elements and render those in the App component
  const diceElements = dice.map(die =>
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  )
  return (
    <div className="border">
      {tenzies && <Confetti />}
      <main>

        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {diceElements}
        </div>
        <div className="btn">
          <button onClick={rollDice}>
            {tenzies ? "New Game" : "Roll"}
          </button>
        </div>
      </main>
    </div>
  );
}
export default App;
