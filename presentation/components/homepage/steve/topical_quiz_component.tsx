import React, { useState } from "react";
import { showToast } from "../../../utils/helper_functions";
import {
  BsFillPaletteFill,
} from "react-icons/bs";
import fancy from "../../../../assets/icons/fancy.png";


const TopicalQuizComponent = () => {
  let quizfeatures = [
    "Inclusive, read-aided topical tests.",
    "Gamification for good- sound effects, images, voice and more to motivate you",
    "Instantly identify your problem areas that you can improve ​on",
    "Access all your reports  at any time.",
  ];
  return (
    <div className=" w-full flex flex-col px-4 my-8 py-6 bg-gray-100 dark:bg-darksec ">
      <div className="flex w-full md:w-[70%] leading-left mt-5 flex-wrap justify-around ">
          <div
className="    bg-gray-200  dark:bg-darksec  rounded-lg px-8 py-4 cursor-pointer   justify-center md:justify-left text-xl text-black "
          >
<p className="text-2xl font-bold "    style={{ fontFamily: "Montserrat", fontWeight: 900 }}> Start A Live Quiz</p>
<p className="flex text-xl font-normal text-center items-center" 
 style={{ "fontFamily": "Overpass", "fontWeight":"500", "textAlign":"center" }}>              
 <BsFillPaletteFill
                            size={30}
                            color="green"
                            className="text-white text-center justify-center"
                          > </BsFillPaletteFill>  </p>

<p className="text-xl font-normal"  style={{ fontFamily: "Overpass", fontWeight: 500 }}>               Self paced practice  </p>
          </div>
          </div>



      <div className="flex items-center mt-10 flex-wrap-reverse w-full justify-around   ">
      <div className="hidden"></div>
    <div className="animate-bounce bg-white dark:bg-slate-800  w-20 h-20 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center ml-2"> 
      <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-down-right"><line x1="7" y1="7" x2="17" y2="17"></line><polyline points="17 7 17 17 7 17"></polyline></svg>
    </div>
<div className="hidden"></div>
    </div>

      <div className="flex items-center mt-1 flex-wrap-reverse w-full justify-around   ">
        <div className="flex flex-col justify-center w-80 md:w-[460px] p-5 rounded-lg  px-2 bg-white dark:bg-darkmain">
          <p className="text-center font-black text-2xl -ml-2"         style={{ fontFamily: "Montserrat", fontWeight: 900 }}>
        <img  src={fancy.src} alt="" className="inline-flex  h-10 mb-2" />  normal quizes
          </p>
          <div className="h-3"></div>
          {quizfeatures.map((e) => (
            <div key={e} className="flex items-center space-x-2 py-1  "  style={{ fontFamily: "Overpass", fontWeight: 500 }}>
          <div className="w-5 h-5 rounded-full bg-main flex items-center justify-center text-white">
          <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-white dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
          </div>
              <p className="px-3 ">{e}</p>
            </div>
          ))}
        </div>
        <DemoQuizComponent />
      </div>
    </div>
  );
};

export default TopicalQuizComponent;

const DemoQuizComponent = () => {
  let quizzes: DemoQuiz[] = [
    new DemoQuiz(
      "Identify the common difference",
      "97, 86, 75, 64,",
      "-11",
      ["8", "-11", "11", "-8"],
      "",
      5
    ),
    new DemoQuiz(
      "16 =k/11",
      "The variable, k, is being divided by 11. What step needs to be completed to isolate the variable k?",
      "Multiply both sides by 11",
      [
        "Divide both sides by 11",
        "Multiply both sides by 11",
        "Add 11 to both sides",
        "Subtract 11 to both sides",
      ],
      "",
      5
    ),
    new DemoQuiz(
      "What is the 5th term of the geometric sequence ?",
      "-2, -8, -32, -128,...",
      "-512",
      ["-2048", "-512", "-256", "-384"],
      "",
      5
    ),
    new DemoQuiz(
      "Factor",
      "x2 - 5x - 36",
      "(x + 4)(x - 9)",
      ["(x - 4)(x + 9)", "(x - 6)(x + 6)", "(x + 4)(x - 9)", "(x -12)(x + 3)"],
      "",
      5
    ),
    new DemoQuiz(
      "Which one is not part of the skin?",
      "",
      "Cilia",
      ["Hair erector muscles", "Receptors", "Cilia", "Blood vessels"],
      "",
      5
    ),
    new DemoQuiz(
      "Which one here reduces the amount of glucose in the blood?",
      "",
      "Insulin",
      ["Glucagon", "Insulin", "Glycogen", "ADH"],
      "",
      5
    ),
    new DemoQuiz(
      "Insulin and glucagon are produced by",
      "",
      "The pancreas",
      ["The liver", "The pancreas", "The kidneys", "Mouth"],
      "",
      5
    ),
  ];
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const submitAnswer = (answer: string) => {
    let question = quizzes[currentQuestion];
    setSelectedAnswer(answer);

    if (
      answer.toLowerCase().trim() ===
      question.correctAnswer.trim().toLowerCase()
    ) {
      showToast("Outstanding smart!", "success");

      if (currentQuestion + 1 < quizzes.length) {
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer("");
        }, 1000);
      } else {
        setCurrentQuestion(0);
      }
    } else {
      showToast("Oops! Try again", "error");
    }
  };
  return (
    <div className="md:min-h-80 py-8 md:py-0 w-96 md:w-[500px]  bg-gray-100 dark:bg-black dark:bg-opacity-50 rounded-lg shadow-2xl drop-shadow-2xl flex flex-col justify-center items-center my-8 md:my-0 "  style={{ fontFamily: "Overpass", fontWeight: 500 }}>
      <div className="flex flex-col text-black items-center w-full rounded-lg px-5 py-5 p-2 shadow-full ">
        <p className="font-bold text-center  text-lg px-5  ">
          {quizzes[currentQuestion].question}
        </p>
        <p className="px-5 text-xl">{quizzes[currentQuestion].questionSecondLine}</p>
      </div>
      <div className="flex w-full mt-5 flex-wrap justify-around pb-5">
        {quizzes[currentQuestion].answerOptions.map((e, i) => (
          <div
            key={e}
            onClick={() => submitAnswer(e)}
            className={`${
              i == 0
                ? "bg-pink-600"
                : i === 1
                ? "bg-orange-500"
                : i == 2
                ? "bg-lime-600"
                : "bg-cyan-600"
            } dark:bg-darksec  rounded-lg px-4 py-4 cursor-pointer m-2  flex justify-center w-44 text-sm text-white ${
              selectedAnswer == e &&
              selectedAnswer === quizzes[currentQuestion].correctAnswer
                ? "bg-green-600 text-white dark:bg-green-600"
                : ""
            } ${
              selectedAnswer == e &&
              selectedAnswer !== quizzes[currentQuestion].correctAnswer
                ? "bg-red-600 text-white dark:bg-red-600"
                : ""
            } drop-shadow-2xl  shadow-lg  shadow-gray-800/100
            `}
          >
            {e}
          </div>
        ))}
      </div>
    </div>
  );
};

class DemoQuiz {
  constructor(
    public question: string,
    public questionSecondLine: string,
    public correctAnswer: string,
    public answerOptions: string[],
    public questionImageUrl: string,
    public points: number
  ) {}
}
