import React, { useEffect, useState } from "react"
import Confetti from "react-confetti"
import Die from "./components/Die"
import { nanoid } from "nanoid";
import './App.css';

function App() {

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [bestRolls, setBestRolls] = useState(Number(localStorage.getItem('bestRolls')) || Infinity);
  const [timer, setTimer] = useState(0);
  const [bestTime, setBestTime] = useState(Number(localStorage.getItem('bestTime')) || Infinity);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld); // Check if all dice are held
    const allEqual = dice.every((die) => die.value === dice[0].value); // Check if all dice have the same value
    if (allHeld && allEqual) {
      setTenzies(true)
      console.log("You win!");
      // Do something to handle the win condition 
      // (e.g. display a message or trigger an animation)
    }
  }, [dice]);

  // timer to count time elapsed to play game every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  /* The useEffect hook is used to update the bestTime state variable and 
  store the new best time in local storage whenever the game is won and 
  the timer value is less than the current best time. The Tenzies and timer 
  values are added as dependencies to this hook to ensure that it only runs when 
  the game is won and the timer value changes. */
  useEffect(() => {
    if (tenzies && timer < bestTime) {
      localStorage.setItem('bestTime', timer);
      setBestTime(timer);
    }
  }, [tenzies, timer]);

  // this use effect tracks rolls and upodate localStorage same as our timer useEffect
  useEffect(() => {
    if (tenzies && rolls < bestRolls) {
      localStorage.setItem('bestRolls', rolls)
      setBestRolls(rolls)
    }
  }, [tenzies, rolls])

  // useEffect
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
  //   setDice(prevDice => prevDice.map(die => {
  //     return die.isHeld && generateNewDie()
  //   }))
  //   setTenzies(false)
  // }

  // Clicking the button should generate a new array of numbers
  // and set the `dice` state to that new array (thus re-rendering
  // the array to the page)


  // Increase rolls counter updating previous state
  function updateRollCounter() {
    return setRolls((prevRolls) => prevRolls + 1);
  }

  function rollDice() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }));
      // update roll counter when we roll dice
      updateRollCounter();
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setTimer(0)
      setRolls(0)
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
      <main>
        {tenzies && <Confetti width="450px" height="450px" />}
        <h1 className="title">TENZIES</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="stats-container">
          <p className="roll-count">Rolls:{rolls}</p>
          <p className="timer">Timer:{timer}s</p>
        </div>
        <div className="dice-container">
          {diceElements}
        </div>
        <div className="btn">
          <button className="button-86" onClick={rollDice}>
            {tenzies ? "New Game" : "Roll"}
          </button>

        </div>

      </main>
      <div className="best-stats-container">
        {/* default our best time to N/A when we have nothing in local storage */}
        <p className="best">Best Time: {bestTime === Infinity ? 'N/A' : `${bestTime}s`}</p>
        <p className="best">Best Roll: {bestRolls === Infinity ? 'N/A' : `${bestRolls}`} </p>
      </div>
    </div>
  );
}
export default App;
