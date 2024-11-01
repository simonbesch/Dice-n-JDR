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
  const [diceAnim1, setDiceAnim1] = useState("diceAnimStop");
  const [diceAnim2, setDiceAnim2] = useState("diceAnimStop");
  const [isCritic, setIsCritic] = useState(false);
  const [isClicThrow, setIsClicThrow] = useState(true);
  const [isCriticalInput, setIsCriticalInput] = useState(false);

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

  const CriticalChecked = () => {
    setIsCriticalInput(!isCriticalInput);
  };

  const Throw = (e) => {
    setDiceAnim1("diceAnimStart1");
    setDiceAnim2("diceAnimStart2");
    setIsCritic(false);
    setIsClicThrow(false);

    setSessionThrow(sessionThrow + 1);
    let totalThrows = JSON.parse(localStorage.getItem("TotalThrow")) || 0;
    totalThrows += 1;
    localStorage.setItem("TotalThrow", JSON.stringify(totalThrows));

    setTimeout(() => {
      setDiceAnim1("diceAnimStop");
      setDiceAnim2("diceAnimStop");
      const result = Math.floor(Math.random() * DiceNumber) + 1;
      setResultDice(result);
      setIsClicThrow(true);

      if (isCriticalInput) {
        const calcPourcentDice = (criticPourcent / 100) * DiceNumber;

        if (
          result < calcPourcentDice ||
          result > DiceNumber - calcPourcentDice
        ) {
          setIsCritic(true);
        }
      }
    }, 2000);
  };

  return (
    <section className="DiceComponent">
      <div className="DiceIMG">
        <div>
          {DiceNumber === 4 ? (
            <img src={D4} alt="" className={diceAnim2} />
          ) : DiceNumber === 6 ? (
            <img src={D6} alt="" className={diceAnim1} />
          ) : DiceNumber === 8 ? (
            <img src={D8} alt="" className={diceAnim2} />
          ) : DiceNumber === 10 ? (
            <img src={D10} alt="" className={diceAnim2} />
          ) : DiceNumber === 12 ? (
            <img src={D12} alt="" className={diceAnim2} />
          ) : DiceNumber === 20 ? (
            <img src={D20} alt="" className={diceAnim1} />
          ) : (
            <img src={D100} alt="" className={diceAnim1} />
          )}
        </div>
        {isCritic ? <img src={CriticGif} alt="" className="Critic" /> : null}
        <p className="Result">
          {diceAnim1 === "diceAnimStop" ? resultDice : null}
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
      {isCriticalInput ? (
        <input
          type="range"
          name="critic"
          className="criticPourcent"
          min="0"
          max="100"
          defaultValue={criticPourcent}
          onChange={(e) => setCriticPourcent(e.target.value)}
        />
      ) : null}
      <div className="ActivCritic">
        <p>Critical</p>
        {isCriticalInput ? (
          <p className="criticPourcentp">% {criticPourcent}</p>
        ) : null}
      </div>
      <input
        type="checkbox"
        name="ActivCriticInput"
        checked={isCriticalInput}
        onClick={CriticalChecked}
        className="InputCheckCritic"
      />

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
