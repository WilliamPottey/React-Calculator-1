import { useEffect, useState } from "react";
import "./App.css";
import History from "./components/History/history";

function App() {
  const [result, setResult] = useState("");
  const [pressed, setPressed] = useState("");
  const [evaluated, setEvaluated] = useState(false);
  const [history, setHistory] = useState([]);

  // Handles logic for clicking a number button
  const onClickNumber = (number) => {
    if (result == 0) {
      setResult(number.toString());
      return;
    }
    if (
      result.charAt(result.length - 1) == 0 &&
      isOperator(result.charAt(result.length - 2))
    ) {
      setResult(result.slice(0, result.length - 1) + number);
      return;
    }
    if (
      evaluated &&
      !isOperator(result.charAt(result.length - 1)) &&
      !isParenthesis(result.charAt(0))
    ) {
      setEvaluated((prevEvaluated) => !prevEvaluated);
      setResult(number.toString());
      return;
    }
    setPressed(number);
    setResult(result + number);
  };

  // Handles logic for clicking an Operator button
  const onClickOperator = (operator) => {
    let length = result.length;
    if (result.charAt(length - 1) == operator || length == 0) {
      return;
    } else if (isOperator(result.charAt(result.length - 1))) {
      setResult(result.slice(0, result.length - 1) + operator);
    } else if (isParenthesis(result.charAt(result.length - 1))) {
      return;
    } else {
      setPressed(operator);
      setResult(result + operator);
    }
  };

  // Logic for clicking the 'CLEAR' button
  const onClickClear = () => {
    setResult("");
  };

  // Logic for clicking the 'DELETE' button. Deletes right most char in the expression.
  const onClickDelete = () => {
    if (evaluated) {
      return;
    }
    setResult(result.slice(0, result.length - 1));
  };

  //Checks if button pressed is an Operator
  const isOperator = (operator) => {
    let operators = ["+", "*", "/", "-"];
    if (operators.includes(operator)) {
      return true;
    }
    return false;
  };

  // Checks if button pressed is a Parenthesis Button
  const isParenthesis = (char) => {
    if (char === "(" || char === ")") {
      return true;
    }
    return false;
  };

  // Checks if current expression contains an Operator
  const containsOperator = (expression) => {
    let operators = ["+", "*", "/", "-"];
    for (let i = 0; i < operators.length; i++) {
      if (expression.includes(operators[i])) return true;
    }
    return false;
  };

  // Handles Equals Button Logic
  const onClickEquals = (result) => {
    let expression = result;
    if (result.includes("(")) {
      expression = insertMultiplication(result);
      console.log("insert return", result);
    }
    if (!containsOperator(expression)) {
      return;
    }
    console.log("result: ", result);
    setEvaluated(true);
    setResult(eval(expression).toString());
    history.push(expression + " = " + eval(expression));
    console.log(history);
  };

  // Build in eval() function does not work for parenthesis unless it is preceeded by a multiplicaton
  // sign, so this inserts a '*' if a left parenthesis is identified in the expression.
  const insertMultiplication = (expression) => {
    let length = expression.length;
    console.log("insert", expression);
    for (let i = 1; i < length; i++) {
      if (expression[i] === "(" && expression[i - 1] !== "*") {
        expression = expression.slice(0, i) + "*" + expression.slice(i);
        i++;
      }
    }
    return expression;
  };

  // Logic for clicking a Parenethesis Button
  const onClickParenthesis = (side) => {
    if (result.length == 0 && side == "left") {
      setResult("(");
    } else if (side == "left") {
      setResult(result + "(");
    } else if (result.includes("(") && side == "right") {
      if (countChar(result, "(") !== countChar(result, ")")) {
        setResult(result + ")");
      }
    }
  };

  // Counts how many of a specified character is in a string. Main use is to determine how many
  // left Parenthesis exist in the expression so we know how many right Parenthesis we allow the user
  // to add to the expression.
  const countChar = (str, char) => {
    return str.split(char).length - 1;
  };

  // Updates the 'Evaluated' flag to false if a key is pressed on the Calculator.
  useEffect(() => {
    setEvaluated((prevEvaluate) => (prevEvaluate = false));
  }, [pressed]);

  // Sets expression on Calculator to selected Expression within the History Component.
  const handleExpressionFromHistory = (data) => {
    setResult(data);
  };

  // Sets History array to empty when the 'Clear' button is selected in the History Component.
  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <>
      <div className="flex">
        <div className="body">
          <div className="result_box">
            <span id="result_text">{result}</span>
            {/* <History sendDataToParent={handleDataFromChild} /> */}
          </div>
          <div className="number_buttons">
            <a className="individual_num_button">
              <button className="button-1" onClick={() => onClickNumber(1)}>
                1
              </button>
            </a>
            <a className="individual_num_button">
              <button className="button-1" onClick={() => onClickNumber(2)}>
                2
              </button>
            </a>
            <a className="individual_num_button">
              <button className="button-1" onClick={() => onClickNumber(3)}>
                3
              </button>
            </a>
            <a className="individual_num_button">
              <button className="button-1" onClick={() => onClickNumber(4)}>
                4
              </button>
            </a>
            <a className="individual_num_button">
              <button className="button-1" onClick={() => onClickNumber(5)}>
                5
              </button>
            </a>
            <a className="individual_num_button">
              <button className="button-1" onClick={() => onClickNumber(6)}>
                6
              </button>
            </a>
            <a className="individual_num_button">
              <button className="button-1" onClick={() => onClickNumber(7)}>
                7
              </button>
            </a>
            <a className="individual_num_button">
              <button className="button-1" onClick={() => onClickNumber(8)}>
                8
              </button>
            </a>
            <a className="individual_num_button">
              <button className="button-1" onClick={() => onClickNumber(9)}>
                9
              </button>
            </a>
            <a className="individual_num_button">
              <button className="button-1" onClick={() => onClickNumber(0)}>
                0
              </button>
            </a>
            <div className="individual_num_button">
              <button
                className="button-1"
                onClick={() => onClickParenthesis("left")}
              >
                (
              </button>
            </div>
            <div className="individual_num_button">
              <button
                className="button-1"
                onClick={() => onClickParenthesis("right")}
              >
                )
              </button>
            </div>
          </div>
          <div className="operator_buttons">
            <div>
              <button className="button-1" onClick={() => onClickOperator("+")}>
                +
              </button>
            </div>
            <div>
              <button className="button-1" onClick={() => onClickOperator("-")}>
                -
              </button>
            </div>
            <div>
              <button className="button-1" onClick={() => onClickOperator("*")}>
                x
              </button>
            </div>
            <div>
              <button className="button-1" onClick={() => onClickOperator("/")}>
                /
              </button>
            </div>
            <div>
              <button
                className="button-1"
                id="equals"
                onClick={() => onClickEquals(result)}
              >
                =
              </button>
            </div>
          </div>
          <div>
            <button className="button-1" id="clear" onClick={onClickClear}>
              {" "}
              CLEAR
            </button>
            <button className="button-1" id="delete" onClick={onClickDelete}>
              {" "}
              DEL
            </button>
          </div>
        </div>
        <History
          pastExpressions={history}
          sendDataToParent={handleExpressionFromHistory}
          clearChildHistory={clearHistory}
        />
      </div>
    </>
  );
}

export default App;
