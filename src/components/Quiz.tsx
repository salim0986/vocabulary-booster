import React, { useEffect, useState } from "react";
import { generate } from "random-words";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IRootState } from "../redux/store";
import { chosenSave } from "../redux/reducers";

const Quiz = () => {
  const [count, setCount] = useState<number>(0);
  const dispatch = useDispatch();
  const [chosenOption, setChosenOption] = useState<string>("");
  const [chosenOptionList, setChosenOptionList] = useState<string[]>([]);
  const { wordsArr, transArr } = useSelector(
    (state: IRootState) => state.words
  );
  const [randomOpt, setRandomOpt] = useState<string[]>([]);

  const nav = useNavigate();
  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setChosenOption(e.currentTarget.value);
  };

  const randIndexGenerator = () => {
    return Math.floor(Math.random() * 4);
  };

  const optionsMaker = () => {
    const rand = generate(3);
    const randomNum = randIndexGenerator();
    const remOpt = rand[randomNum];
    rand[randomNum] = wordsArr[count];
    rand.push(remOpt);
    setRandomOpt(rand);
  };
  const handleNext = () => {
    setChosenOptionList((prev) => [...prev, chosenOption]);
    setChosenOption("");
    setCount((prev) => (prev += 1));
  };
  useEffect(() => {
    optionsMaker();
  }, []);
  useEffect(() => {
    if (count == 8) {
      dispatch(chosenSave(chosenOptionList));
      nav("/result");
    }
    optionsMaker();
  }, [count, chosenOptionList]);
  return (
    <div id="quiz">
      <h3>
        {count + 1}. {transArr[count]}
      </h3>
      <div className="options">
        <label htmlFor="first">
          <input
            checked={chosenOption == randomOpt[0]}
            type="radio"
            name="selection"
            id="first"
            onClick={handleClick}
            value={randomOpt[0]}
          />
          {randomOpt[0]}
        </label>

        <label htmlFor="second">
          <input
            type="radio"
            checked={chosenOption == randomOpt[1]}
            id="second"
            name="selection"
            onClick={handleClick}
            value={randomOpt[1]}
          />
          {randomOpt[1]}
        </label>

        <label htmlFor="third">
          <input
            type="radio"
            checked={chosenOption == randomOpt[2]}
            id="third"
            name="selection"
            onClick={handleClick}
            value={randomOpt[2]}
          />
          {randomOpt[2]}
        </label>

        <label htmlFor="fourth">
          <input
            type="radio"
            checked={chosenOption == randomOpt[3]}
            id="fourth"
            name="selection"
            onClick={handleClick}
            value={randomOpt[3]}
          />
          {randomOpt[3]}
        </label>
      </div>
      <button
        className="next-btn"
        onClick={handleNext}
        disabled={chosenOption == "" ? true : false}
      >
        {count == 7 ? "See Results" : "Next"}
      </button>
    </div>
  );
};

export default Quiz;
