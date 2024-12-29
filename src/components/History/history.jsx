import { useEffect, useState } from "react";
import "./history.css";

export default function history({
  pastExpressions,
  sendDataToParent,
  clearChildHistory,
}) {
  const [past, setPast] = useState(pastExpressions);

  const getExpression = (result) => {
    let index = result.indexOf("=");
    let expression = result.substring(0, index);
    console.log(expression);
    sendDataToParent(expression);
    return expression;
  };

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
