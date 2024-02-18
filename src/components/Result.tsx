import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";

const Result = () => {
  const [count, setCount] = useState<number>(0);
  const { wordsArr, chosenOptions, transArr } = useSelector(
    (state: IRootState) => state.words
  );

  useEffect(() => {
    setCount(0);
    for (let i = 0; i < wordsArr.length; i++) {
      if (wordsArr[i] == chosenOptions[i]) {
        setCount((prev) => (prev += 1));
      }
    }
  }, []);
  return (
    <div id="result">
      <h2>
        Marks: {count}/{wordsArr.length}
      </h2>
      <p>
        Result:{" "}
        <span
          className={
            wordsArr.length - count < wordsArr.length / 2 ? "pass" : "fail"
          }
        >
          {wordsArr.length - count < wordsArr.length / 2 ? "Pass" : "Fail"}
        </span>
      </p>

      <div className="list-container">
        <ul>
          <h3>Learned Word</h3>
          <div>
            {wordsArr.map((word, i) => {
              return <li key={i}>{transArr[i]}</li>;
            })}
          </div>
        </ul>
        <ul>
          <h3>Chosen Option</h3>
          <div>
            {wordsArr.map((word, i) => {
              return <li key={i}>{chosenOptions[i]}</li>;
            })}
          </div>
        </ul>
        <ul>
          <h3>Right Option</h3>
          <div>
            {wordsArr.map((word, i) => {
              return <li key={i}>{word}</li>;
            })}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Result;
