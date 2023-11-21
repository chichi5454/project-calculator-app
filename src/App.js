/** @format */

import React, { useState } from "react";
import * as math from "mathjs";

import "./App.css";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ["/", "*", "+", "-", "."];

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc((prevCalc) => prevCalc + value);
    if (!ops.includes(value)) {
      try {
        setResult(math.evaluate(calc + value).toString());
      } catch (error) {
        setResult("Error");
      }
    }
  };

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  const calculate = () => {
    try {
      setCalc(math.evaluate(calc).toString());
    } catch (error) {
      setCalc("Error");
    }
  };

  const deleteLast = () => {
    if (calc === "") {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value);
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ""}
          {""}
          {calc || "0"}
        </div>
        <div className="operators">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("+")}>+</button>
          <button onClick={() => updateCalc("-")}>-</button>

          <button onClick={deleteLast}>DELETE</button>
        </div>
        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc("0")}> 0</button>
          <button onClick={() => updateCalc(".")}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
      <div className="footer">
        <p>
          Developed by Lauryn Mutai
          <a href="https://github.com/chichi5454" target="blank">
            {" "}
            GitHub{" "}
          </a>
          and hosted on
          <a href="https://github.com/chichi5454" target="blank">
            {" "}
            Netlify.{" "}
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
