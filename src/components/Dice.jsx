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
  const [diceStyleValue, setDiceStyleValue] = useState(1);
  const [diceStyleCSS, setDiceStyleCSS] = useState("DiceColor1");

  const [DiceLoaded, setDiceLoaded] = useState("DiceColor1");

  const DiceImgImport = import.meta.glob("../assets/dices/*/*.png", {
    eager: false,
  });

  const loadImage = async (diceStyleValue, diceType) => {
    const imageModule = await DiceImgImport[
      `../assets/dices/${diceStyleValue}/${diceType}.png`
    ]();
    return imageModule.default;
  };

  useEffect(() => {
    const loadDiceImages = async () => {
      const D4 = await loadImage(diceStyleValue, 4);
      const D6 = await loadImage(diceStyleValue, 6);
      const D8 = await loadImage(diceStyleValue, 8);
      const D10 = await loadImage(diceStyleValue, 10);
      const D12 = await loadImage(diceStyleValue, 12);
      const D20 = await loadImage(diceStyleValue, 20);
      const D100 = await loadImage(diceStyleValue, 100);

      setDiceLoaded({ D4, D6, D8, D10, D12, D20, D100 });
    };

    loadDiceImages();
  }, [diceStyleValue]);

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

  return (
    <section className="DiceComponent">
      <div className="DiceIMG">
        <div>
          {DiceNumber === 4 ? (
            <img src={DiceLoaded.D4} alt="" className={diceAnim2} />
          ) : DiceNumber === 6 ? (
            <img src={DiceLoaded.D6} alt="" className={diceAnim1} />
          ) : DiceNumber === 8 ? (
            <img src={DiceLoaded.D8} alt="" className={diceAnim2} />
          ) : DiceNumber === 10 ? (
            <img src={DiceLoaded.D10} alt="" className={diceAnim2} />
          ) : DiceNumber === 12 ? (
            <img src={DiceLoaded.D12} alt="" className={diceAnim2} />
          ) : DiceNumber === 20 ? (
            <img src={DiceLoaded.D20} alt="" className={diceAnim1} />
          ) : (
            <img src={DiceLoaded.D100} alt="" className={diceAnim1} />
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
