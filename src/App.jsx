import { useState, useEffect } from "react";
import "./App.scss";
import Dice from "./components/Dice";

import ornement from "./assets/ornements/ornement1.png";

function App() {
  const [diceSelected, setDiceSelected] = useState(6); //4 6 8 10 12 20 100
  const [personnage, setPersonnage] = useState();
  const [isTips, setIsTips] = useState(false);

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
            <button onClick={(e) => setIsTips(!isTips)}>Help</button>
          </div>
        </div>
        {isTips ? (
          <div className="GlobalBack">
            <h1>HELP</h1>

            <button onClick={(e) => setIsTips(!isTips)}>return</button>
            <a href="https://www.buymeacoffee.com/Simonrouxy" target="_blank">
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
              />
            </a>
          </div>
        ) : null}
      </div>

      <img src={ornement} alt="" className="GlobalOrnementBas" />
    </section>
  );
}

export default App;
