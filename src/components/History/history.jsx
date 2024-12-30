import { useEffect, useState } from "react";
import "./history.css";

export default function history({
  pastExpressions,
  sendDataToParent,
  clearChildHistory,
}) {
  const [past, setPast] = useState(pastExpressions);

  // Handles clicking of an exression within the History Component. Sends the selected Expression
  // back to the parent component to set that as the current result within the Calc Screen.
  const getExpression = (result) => {
    let index = result.indexOf("=");
    let expression = result.substring(0, index);
    console.log(expression);
    sendDataToParent(expression);
    return expression;
  };

  // Update the past array whenever the pastExpressions array is updated. We recieve the pastExpressions array
  // from the history state variable within the Parent. Every time the user selects '=' and it solves a valid
  // expression, the history state variable is updated, and therefore the past state variable array is also
  // updated. This is important for when the user selects the 'Clear' button in the History Component, we erase
  // all values in the history array, and therefore must also erase all values in the past expression array.
  useEffect(() => {
    setPast(pastExpressions);
    console.log("History Cleared");
  }, [pastExpressions]);

  return (
    <>
      <div className="flex-history">
        <div className="history-title">
          <h4>History</h4>
        </div>
        <div className="historyBox">
          <div className="line"></div>
          <div className="history-button-position">
            {past.map((value, index) => (
              <button
                className="history-button"
                key={index}
                onClick={() => {
                  getExpression(value);
                }}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <a className="history-title">
          <button className="clear-button" onClick={() => clearChildHistory()}>
            <span id="clear-1">CLEAR</span>
          </button>
        </a>
      </div>
    </>
  );
}
