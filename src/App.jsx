import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState("");
  const [pressed, setPressed] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const onClickNumber = (number) => {
    if (result == 0) {
      setResult(number.toString());
      return;
    }
    console.log(evaluated);
    if (evaluated && !isOperator(result.charAt(result.length - 1))) {
      setEvaluated((prevEvaluated) => !prevEvaluated);
      setResult(number.toString());
      return;
    }
    setPressed(number);
    setResult(result + number);
  };

  const onClickOperator = (operator) => {
    let length = result.length;
    if (result.charAt(length - 1) == operator || length == 0) {
      return;
    } else if (isOperator(result.charAt(result.length - 1))) {
      setResult(result.slice(0, result.length - 1) + operator);
    } else {
      setPressed(operator);
      setResult(result + operator);
    }
  };

  const onClickClear = () => {
    setResult("");
  };

  const onClickDelete = () => {
    if (evaluated) {
      return;
    }
    setResult(result.slice(0, result.length - 1));
  };

  const isOperator = (operator) => {
    let operators = ["+", "*", "/", "-"];
    if (operators.includes(operator)) {
      return true;
    }
    return false;
  };

  const onClickEquals = (result) => {
    setEvaluated(true);
    setResult(eval(result).toString());
  };

  const onClickParenthesis = (side) => {
    if (result.length == 0 && side == "left") {
      setResult("(");
    } else if (side == "left") {
      setResult(result + "(");
    } else if (result.includes("(") && side == "right") {
      setResult(result + ")");
    }
  };

  useEffect(() => {
    setEvaluated((prevEvaluate) => (prevEvaluate = false));
  }, [pressed]);

  return (
    <>
      <div className="body">
        <div className="result_box">
          <span id="result_text">{result}</span>
        </div>
        <div className="number_buttons">
          <div className="individual_num_button">
            <button onClick={() => onClickNumber(1)}>1</button>
          </div>
          <div className="individual_num_button">
            <button onClick={() => onClickNumber(2)}>2</button>
          </div>
          <div className="individual_num_button">
            <button onClick={() => onClickNumber(3)}>3</button>
          </div>
          <div className="individual_num_button">
            <button onClick={() => onClickNumber(4)}>4</button>
          </div>
          <div className="individual_num_button">
            <button onClick={() => onClickNumber(5)}>5</button>
          </div>
          <div className="individual_num_button">
            <button onClick={() => onClickNumber(6)}>6</button>
          </div>
          <div className="individual_num_button">
            <button onClick={() => onClickNumber(7)}>7</button>
          </div>
          <div className="individual_num_button">
            <button onClick={() => onClickNumber(8)}>8</button>
          </div>
          <div className="individual_num_button">
            <button onClick={() => onClickNumber(9)}>9</button>
          </div>
          <div className="individual_num_button">
            <button onClick={() => onClickNumber(0)}>0</button>
          </div>
          <div className="individual_num_button">
            <button onClick={() => onClickParenthesis("left")}>(</button>
          </div>
          <div className="individual_num_button">
            <button onClick={() => onClickParenthesis("right")}>)</button>
          </div>
        </div>
        <div className="operator_buttons">
          <div>
            <button onClick={() => onClickOperator("+")}>+</button>
          </div>
          <div>
            <button onClick={() => onClickOperator("-")}>-</button>
          </div>
          <div>
            <button onClick={() => onClickOperator("*")}>x</button>
          </div>
          <div>
            <button onClick={() => onClickOperator("/")}>/</button>
          </div>
          <div>
            <button id="equals" onClick={() => onClickEquals(result)}>
              =
            </button>
          </div>
        </div>
        <div>
          <button id="clear" onClick={onClickClear}>
            {" "}
            CLEAR
          </button>
          <button id="delete" onClick={onClickDelete}>
            {" "}
            DEL
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
