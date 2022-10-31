/* eslint-disable @next/next/no-img-element */
import React, { PropsWithChildren, useState } from "react";
import { InLessonQuiz } from "../../../../models/curriculum/video_lesson_model";
import failavatar from "../../../../assets/images/failavatar.png";
import passavatar from "../../../../assets/images/passavatar.png";
import testavatar from "../../../../assets/images/quizavatar.png";
const PopupInLessonQuiz = (
  props: PropsWithChildren<{
    showQuiz: boolean;
    setShowQuiz: (v: boolean) => void;
    resumeVideo: () => void;
    question: InLessonQuiz;
  }>
) => {
  const [answer, setAnswer] = useState("");

  return (
    <div
      style={{ fontFamily: "Montserrat" }}
      className="fixed top-0 left-0  w-screen text-white  h-screen flex justify-center items-center bg-black bg-opacity-20 z-50"
    >
      {props.question != undefined && (
        <div
          className={`w-96 h-[300px] md:w-[400px] flex flex-col rounded-xl  ${
            answer == ""
              ? "bg-gray-500 dark:bg-black"
              : answer == props.question.correctAnswer
              ? "bg-green-400"
              : "bg-red-400"
          } bg-opacity-50  dark:bg-opacity-80 px-4 shadow-2xl border-2 border-gray-500 dark:border-gray-700`}
        >
          <div className="flex justify-between items-center w-full">
            {answer == "" && (
              <p className="font-bold text-sm py-2 pb-1">
                Answer The question to <br className="md:hidden" /> continue
                watching the lesson{" "}
              </p>
            )}
            {answer == props.question.correctAnswer && (
              <p className="font-bold text-green-600 text-sm py-2 pb-1">
                Passed: You can continue with the lesson.
              </p>
            )}
            {answer != "" && answer !== props.question.correctAnswer && (
              <p className="font-bold text-red-600 text-sm  py-2 pb-1">
                Oops! Try again to continue.
              </p>
            )}

            <div className="flex">
              {answer == "" && (
                <img
                  onClick={() => {
                    props.setShowQuiz(false);
                    props.resumeVideo();
                  }}
                  src={testavatar.src}
                  className="w-24 animate-bounce"
                  alt="avatar not found"
                />
              )}
              {answer == props.question.correctAnswer && (
                <img
                  src={passavatar.src}
                  className="w-24 animate-bounce"
                  alt="avatar not found"
                />
              )}
              {answer != "" && answer !== props.question.correctAnswer && (
                <img
                  src={failavatar.src}
                  className="w-24 animate-bounce"
                  alt="avatar not found"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-start ">
            <p className="font-bold text-base text-main ">
              {props.question.question}
            </p>
            <div className="h-5"></div>
            <div className="flex flex-wrap justify-around w-full">
              {props.question.answerOptions.map((e, i) => (
                <div
                  key={e}
                  onClick={() => {
                    setAnswer(e);
                    setTimeout(() => {
                      if (e === props.question.correctAnswer) {
                        props.setShowQuiz(false);
                        props.resumeVideo();
                      }
                    }, 700);
                  }}
                  className={`px-7 py-2 w-full my-1 rounded-md shadow-2xl  text-xs text-white text-center cursor-pointer ${
                    answer == e
                      ? answer === props.question.correctAnswer &&
                        i == props.question.answerOptions.indexOf(e)
                        ? "bg-green-600"
                        : "bg-red-700"
                      : "bg-pink-600"
                  }`}
                >
                  {e}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupInLessonQuiz;
