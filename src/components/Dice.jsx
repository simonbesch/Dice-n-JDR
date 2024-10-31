import D4 from "../assets/dices/pack1/4.png";
import D6 from "../assets/dices/pack1/6.png";
import D8 from "../assets/dices/pack1/8.png";
import D10 from "../assets/dices/pack1/10.png";
import D12 from "../assets/dices/pack1/12.png";
import D20 from "../assets/dices/pack1/20.png";
import D100 from "../assets/dices/pack1/100.png";

import CriticPng from "../assets/critic/critic.png";
import CriticGif from "../assets/critic/critic.gif";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Dice = ({ DiceNumber }) => {
  const [resultDice, setResultDice] = useState();
  const [sessionThrow, setSessionThrow] = useState(0);
  const [criticPourcent, setCriticPourcent] = useState(5);
  const [diceAnim, setDiceAnim] = useState("diceAnimStop");
  const [isCritic, setIsCritic] = useState(false);
  const [isClicThrow, setIsClicThrow] = useState(true);

  useEffect(() => {
    const imageList = [D4, D6, D8, D10, D12, D20, D100, CriticPng, CriticGif];
    imageList.forEach((image) => {
      new Image().src = image;
    });
  }, []);

  useEffect(() => {
    setResultDice();
  }, [DiceNumber]);

  useEffect(() => {
    localStorage.setItem("dice", JSON.stringify(DiceNumber));
    localStorage.setItem("result", JSON.stringify(resultDice));
  }, [resultDice]);

  const Throw = (e) => {
    setDiceAnim("diceAnimStart");
    setIsCritic(false);
    setIsClicThrow(false);

    setSessionThrow(sessionThrow + 1);
    let totalThrows = JSON.parse(localStorage.getItem("TotalThrow")) || 0;
    totalThrows += 1;
    localStorage.setItem("TotalThrow", JSON.stringify(totalThrows));

    setTimeout(() => {
      setDiceAnim("diceAnimStop");
      const result = Math.floor(Math.random() * DiceNumber) + 1;
      setResultDice(result);
      setIsClicThrow(true);

      const calcPourcentDice = (criticPourcent / 100) * DiceNumber;

      if (result < calcPourcentDice || result > DiceNumber - calcPourcentDice) {
        setIsCritic(true);
      }
    }, 2000);
  };

  return (
    <section className="DiceComponent">
      <div className="DiceIMG">
        <div className={diceAnim}>
          {DiceNumber === 4 ? (
            <img src={D4} alt="" />
          ) : DiceNumber === 6 ? (
            <img src={D6} alt="" />
          ) : DiceNumber === 8 ? (
            <img src={D8} alt="" />
          ) : DiceNumber === 10 ? (
            <img src={D10} alt="" />
          ) : DiceNumber === 12 ? (
            <img src={D12} alt="" />
          ) : DiceNumber === 20 ? (
            <img src={D20} alt="" />
          ) : (
            <img src={D100} alt="" />
          )}
        </div>
        {isCritic ? <img src={CriticGif} alt="" className="Critic" /> : null}
        <p className="Result">
          {diceAnim === "diceAnimStop" ? resultDice : null}
        </p>
      </div>
      <div className="separation"></div>
      {isClicThrow ? (
        <button onClick={Throw} className="ThrowButton">
          THROW
        </button>
      ) : (
        <button className="ThrowButton">Not Throwable</button>
      )}
      <input
        type="range"
        name="critic"
        className="criticPourcent"
        min="0"
        max="100"
        defaultValue="5"
        onChange={(e) => setCriticPourcent(e.target.value)}
      />
      <p className="Criticalp">Critical % {criticPourcent}</p>

      <p>Session Throw : {sessionThrow}</p>
      <p>Total Throw : {localStorage.getItem("TotalThrow")}</p>
      <p className="LastThrowp">Last Throw : </p>
      <p>
        Dice: {localStorage.getItem("dice")} - Result:{" "}
        {localStorage.getItem("result")}
      </p>
    </section>
  );
};

Dice.propTypes = {
  DiceNumber: PropTypes.number,
};

export default Dice;