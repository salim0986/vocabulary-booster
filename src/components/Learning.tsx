import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generate } from "random-words";
import axios from "axios";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { transSave, wordsSave } from "../redux/reducers";

const Learning = () => {
  const lanCode = useSearchParams()[0].get("lan")!;
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(0);
  const [ranArr] = useState<string[]>(generate(8));
  const [transArr, setTransArr] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNext = () => {
    setCount((prev) => prev + 1);
    if (count == 7) {
      dispatch(wordsSave(ranArr));
      dispatch(transSave(transArr));
      nav("/test");
    }
  };

  const handlePrev = () => {
    setCount((prev) => prev - 1);
  };

  const handleStart = async () => {
    setIsLoading(true);
    let sentence = "";
    for (let i = 0; i < ranArr.length; i++) {
      sentence = sentence + " " + ranArr[i];
    }

    const translateOptions = {
      method: "POST",
      url: "https://translateai.p.rapidapi.com/google/translate/text",
      headers: {
        "x-rapidapi-key": "59dab90dadmshdd21ecbcad5ad12p16a05fjsn715af19b6b6c",
        "x-rapidapi-host": "translateai.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        origin_language: "es",
        target_language: lanCode,
        input_text: sentence,
      },
    };

    try {
      const { data } = await axios.request(translateOptions);
      const translation: string = data.translation;
      console.log(translation);
      const newTransArr: string[] = translation.split(" ");
      setTransArr(newTransArr);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div id="learning">
      {!isLoading ? (
        transArr.length != 0 ? (
          <div className="after-start">
            {" "}
            <h3>
              Word {count + 1}: {transArr[count]}-
              {ranArr[count].toLocaleUpperCase()}
            </h3>
            <div className="btnContainer">
              <button onClick={handlePrev} disabled={count != 0 ? false : true}>
                Previous
              </button>
              <button onClick={handleNext}>
                {count != 7 ? "Next" : "Start Quiz"}
              </button>
            </div>
          </div>
        ) : (
          <div className="before-start">
            <h2>Instructions:</h2>
            <ul>
              <li>
                You need to click <b>Start</b> button to initiate learning.
              </li>
              <li>
                There will be {ranArr.length} random words with their meanings
                and pronunciations.
              </li>
              <li>You have unlimited time to learn these words.</li>
              <li>
                Once you click the <b>'Start Quiz'</b> button, a test will start
                for your practice.
              </li>
              <li>After completing your test, you can see your results.</li>
              <li>Minimum passing marks for this quiz is 50%</li>
            </ul>
            <h3></h3>
            <button onClick={handleStart}> Start</button>
          </div>
        )
      ) : (
        <Loader count={2} />
      )}
    </div>
  );
};

export default Learning;
