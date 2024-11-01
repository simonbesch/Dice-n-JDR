import { useState, useEffect } from "react";
import "./App.scss";
import Dice from "./components/Dice";

import ornement from "./assets/ornements/ornement1.png";

function App() {
  const [diceSelected, setDiceSelected] = useState(6); //4 6 8 10 12 20 100
  const [personnage, setPersonnage] = useState();

  useEffect(() => {
    setPersonnage(JSON.parse(localStorage.getItem("personnage")));
  }, []);

  useEffect(() => {
    localStorage.setItem("personnage", JSON.stringify(personnage));
  }, [personnage]);

  return (
    <section className="AllContainer">
      <img src={ornement} alt="" className="Ornement" />
      <div className="BigGlobal">
        <div className="Global">
          <div className="All">
            <select
              name="ChooseDice"
              className="inputChooseDice"
              onChange={(e) => setDiceSelected(Number(e.target.value))}
            >
              <option value="4">Dice of 4</option>
              <option value="6" selected="selected">
                Dice of 6
              </option>
              <option value="8">Dice of 8</option>
              <option value="10">Dice of 10</option>
              <option value="12">Dice of 12</option>
              <option value="20">Dice of 20</option>
              <option value="100">Dice of 100</option>
            </select>

            <Dice DiceNumber={diceSelected} />
            <p className="Notep">Notes :</p>
            <textarea
              name="personnage"
              value={personnage}
              onChange={(e) => setPersonnage(e.target.value)}
            />
            <p className="GlobalHelp">HELP</p>
            <img
              src="https://img.icons8.com/?size=100&id=99991&format=png&color=000000"
              alt=""
              className="GlobalHelpImg"
            />
          </div>
        </div>

        <div className="GlobalBack">
          <h1>HELP</h1>
          <h3>Dice N' JDR</h3>
          <p>Total Throw and Notes are save in local</p>
          <p>If you clear history, Throws and Notes will be erased</p>
          <p>
            Critical % are made if you want Critical Option on your Throw (it's
            just for an animation)
          </p>
          <p>Many upgrades are comming 😉</p>
          <p> symon.xyz © Dice n' JDR </p>
          <p>If you want help me, you can buy me an Avocado ❤️</p>
        </div>
        <a href="https://www.buymeacoffee.com/Simonrouxy" target="_blank">
          <img
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            className="BuyMeCoffe"
          />
        </a>
      </div>

      <img src={ornement} alt="" className="GlobalOrnementBas" />
    </section>
  );
}

export default App;
