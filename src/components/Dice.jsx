import CriticPng from "../assets/critic/critic.png";
import CriticGif from "../assets/critic/critic.gif";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const DiceImgImport = import.meta.glob("../assets/dices/*/*.png", {
  eager: true,
});

const Dice = ({ DiceNumber }) => {
  const [resultDice, setResultDice] = useState();
  const [sessionThrow, setSessionThrow] = useState(0);
  const [criticPourcent, setCriticPourcent] = useState(5);
  const [diceAnim1, setDiceAnim1] = useState("diceAnimStop");
  const [diceAnim2, setDiceAnim2] = useState("diceAnimStop");
  const [isCritic, setIsCritic] = useState(false);
  const [isClicThrow, setIsClicThrow] = useState(true);
  const [isCriticalInput, setIsCriticalInput] = useState(false);
  const [diceStyleValue, setDiceStyleValue] = useState(1);
  const [diceStyleCSS, setDiceStyleCSS] = useState("DiceColor1");

  useEffect(() => {
    const imageList = [CriticPng, CriticGif];
    imageList.forEach((image) => {
      new Image().src = image;
    });
  }, []);

  useEffect(() => {
    const diceStyleLoad = JSON.parse(localStorage.getItem("diceStyle"));
    const diceStyleCSSLoad = JSON.parse(localStorage.getItem("diceStyleCSS"));

    setDiceStyleValue(diceStyleLoad);
    setDiceStyleCSS(diceStyleCSSLoad);
  }, []);

  useEffect(() => {
    setResultDice();
    setIsCritic(false);
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

  const StyleDiceChange = (e) => {
    localStorage.setItem("diceStyle", JSON.stringify(e));
    localStorage.setItem("diceStyleCSS", JSON.stringify(`DiceColor${e}`));
    setDiceStyleValue(e);
    setDiceStyleCSS(`DiceColor${e}`);
    console.log(diceStyleCSS, diceStyleValue);
  };

  const diceIMG = {
    D4: DiceImgImport[`../assets/dices/${diceStyleValue}/4.png`]?.default,
    D6: DiceImgImport[`../assets/dices/${diceStyleValue}/6.png`]?.default,
    D8: DiceImgImport[`../assets/dices/${diceStyleValue}/8.png`]?.default,
    D10: DiceImgImport[`../assets/dices/${diceStyleValue}/10.png`]?.default,
    D12: DiceImgImport[`../assets/dices/${diceStyleValue}/12.png`]?.default,
    D20: DiceImgImport[`../assets/dices/${diceStyleValue}/20.png`]?.default,
    D100: DiceImgImport[`../assets/dices/${diceStyleValue}/100.png`]?.default,
  };

  return (
    <section className="DiceComponent">
      <div className="DiceIMG">
        <div>
          {DiceNumber === 4 ? (
            <img src={diceIMG.D4} alt="" className={diceAnim2} />
          ) : DiceNumber === 6 ? (
            <img src={diceIMG.D6} alt="" className={diceAnim1} />
          ) : DiceNumber === 8 ? (
            <img src={diceIMG.D8} alt="" className={diceAnim2} />
          ) : DiceNumber === 10 ? (
            <img src={diceIMG.D10} alt="" className={diceAnim2} />
          ) : DiceNumber === 12 ? (
            <img src={diceIMG.D12} alt="" className={diceAnim2} />
          ) : DiceNumber === 20 ? (
            <img src={diceIMG.D20} alt="" className={diceAnim1} />
          ) : (
            <img src={diceIMG.D100} alt="" className={diceAnim1} />
          )}
        </div>
        {isCritic ? <img src={CriticGif} alt="" className="Critic" /> : null}
        <p className="Result">
          {diceAnim1 === "diceAnimStop" ? (
            <span className={diceStyleCSS}>{resultDice}</span>
          ) : null}
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
      <select
        name="StyleDice"
        className="StyleDice"
        onChange={(e) => StyleDiceChange(e.target.value)}
        value={diceStyleValue}
      >
        <option value="1">Dice Style 1</option>
        <option value="2"> Dice Style 2</option>
      </select>
    </section>
  );
};

Dice.propTypes = {
  DiceNumber: PropTypes.number,
};

export default Dice;
