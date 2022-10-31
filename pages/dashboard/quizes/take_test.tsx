import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { BiFullscreen } from "react-icons/bi";
import { FaVolumeMute } from "react-icons/fa";
import { GrVolume } from "react-icons/gr";
import { ImVolumeHigh } from "react-icons/im";
import { deleteFromLocalStorage } from "../../../data/services/local_storage_services";
import { OneQuiz } from "../../../models/curriculum/gamified_quizes_model";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import { useSpeechSynthesis } from "react-speech-kit";
import { IsDarkThemeContext } from "../../../presentation/contexts/app_theme_controller";
import { showToast } from "../../../presentation/utils/helper_functions";
import ReactCanvasConfetti from "react-canvas-confetti";
import playbutton from "../../../assets/icons/play.png";
import {
  BsCheck,
  BsCheck2,
  BsCheckAll,
  BsFillCheckCircleFill,
  BsShieldFillCheck,
} from "react-icons/bs";
import { GamifiedQuestionsContext } from "../../../presentation/contexts/gamified_quizes_controller";
import {
  Md10K,
  MdDangerous,
  MdOutlineCheck,
  MdOutlineFactCheck,
  MdSmsFailed,
} from "react-icons/md";
import { KeyObject } from "crypto";
import { prodUrl } from "../../../presentation/utils/constants";
import GamifiedQuizRepo from "../../../data/repos/gamified_quiz_repo";

const TakeGamifiedQuizesTestPage = () => {
  const { selectedVideoId } = useContext(NavigationContext);
  const { speak, cancel, speaking, voices } = useSpeechSynthesis();
  const { testQuizes } = useContext(GamifiedQuestionsContext);
  let test = testQuizes.filter((e) => e.testId == selectedVideoId)[0];

  let quizes = test == undefined ? [] : test.questions;
  const [selectedQuiz, setSelectedQuiz] = useState(0);
  const [showQuiz, setShowQuiz] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  const router = useRouter();

  const [userAnswer, setUserAnswer] = useState("");
  const [userscore, setUserscore] = useState(0);
  const [passed, setPassed] = useState(0);
  const [failed, setFailed] = useState(0);

  const moveToNextQuestion = (timeout: boolean) => {
    if (timeout) {
      setFailed(failed + 1);
    }
    if (speaking) {
      cancel();
    }
    setIsfirst(!isfirst);
    if (selectedQuiz < quizes.length - 1) {
      setShowProgress(true);
      setUserAnswer("");
      setSelectedQuiz(selectedQuiz + 1);
      if (allowSound) {
        speak({
          text: quizes[selectedQuiz + 1].question,
          voice: voices[2],
        });
      }
    } else {
      setShowProgress(false);

      setIsTestFinished(true);
      setTimeout(() => {
        setFireConfetti(false);
      }, 10);
    }
  };

  const moveToPreviousQuestion = () => {
    if (speaking) {
      cancel();
    }
    setIsfirst(!isfirst);

    if (selectedQuiz > 0) {
      setSelectedQuiz(selectedQuiz - 1);
      setShowProgress(true);
      if (allowSound) {
        speak({
          text: quizes[selectedQuiz - 1].question,
          voice: voices[2],
        });
      }
    }
  };
  //animation and audio
  const [isfirst, setIsfirst] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [showsecond, setShowsecond] = useState(false);
  const [playStarter, setStarter] = useState(false);
  const { allowSound, setAllowSound } = useContext(IsDarkThemeContext);
  function playAudio() {
    let audio = new Audio("/notification.ogg");
    audio.play();
  }

  function starterAudio() {
    if(playStarter){
    let audio = new Audio("/starter2.mp3");
    audio.play();
    }
  }

  function Correct() {
    let audio = new Audio("/correct.mp3");
    audio.play();
  }

  function Wrong() {
    let audio = new Audio("/wrong2.mp3");
    audio.play();
  }

  //start countdown
  const [coundownValue, setcoundownValue] = useState(5);
  useEffect(() => {
    if (coundownValue == 0 && selectedQuiz == 0) {
      setStarter(false)
      if (allowSound) {
        speak({
          text: quizes[selectedQuiz].question,
          voice: voices[2],
        });
      }
    }
  }, [coundownValue]);
  useEffect(() => {
    let interval = setInterval(() => {
      if(coundownValue > 1){
        setStarter(true)
        starterAudio()
      }
      if (coundownValue > 0) {
        setcoundownValue(coundownValue - 1);
      } else {
        setStarter(false)
        clearInterval(interval);
      }
    }, 2000);
    return () => {
      setStarter(false)
      clearInterval(interval);
    };
  }, [coundownValue]);
  useEffect(() => {
    if (window != undefined) {
      try {
        window.Tawk_API.hideWidget();
      } catch (e) {}
    }
    return () => {
      try {
        window.Tawk_API.showWidget();
      } catch (e) {}
    };
  });
  let totalScore =
    quizes.length < 1 ? 0 : quizes.map((e) => e.points).reduce((a, b) => a + b);

  let quizinterval = setInterval(() => {}, 1000);

  //confetti and results
  const [fireConfetti, setFireConfetti] = useState(false);

  //answers state
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const restartTest = () => {
    router.back();
    setTimeout(() => {
      router.push("/dashboard/quizes/take_test");
    }, 10);
  };
  

  return (
    <DashboardLayout>
      <div className="fixed top-0 left-0 z-[3000] bg-darksec dark:bg-darksec overflow-auto">
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className=" flex-1 flex flex-col  dark:bg-darkmain  relative h-screen  w-screen "
        >
          {showAnswers && (
            <div className="bg-black fixed bg-opacity-80 h-screen w-screen z-[5010] flex  justify-center items-center">
              <div className="w-[75%] h-[92vh] bg-white flex flex-col p-3 rounded-lg overflow-y-auto">
                <div className="flex justify-end w-full">
                  <div
                    onClick={() => {
                      setShowAnswers(false);
                    }}
                    className="px-3 text-xs py-2 text-white  flex justify-between rounded-md cursor-pointer bg-red-600 hover:bg-red-500 "
                  >
                    Close Answers
                  </div>
                </div>
                <p className="text-lg  font-xl font-bold text-main text-center">
                  TEST ANSWERS.
                </p>
                <p className="text-lg  font-xl text-xl font-bold text-main text-center">
                  {test.title.toUpperCase()}
                </p>

                {quizes[selectedQuiz].questionType == "text" && quizes.map((e, i) => (
                  <div
                    key={e.question}
                    className="flex flex-col mt-10 border-l border-r border-t border-b rounded-lg border-gray-400"
                  >
                    <p className="font-semibold text-black font-xl m-2">
                      {i + 1}: {e.question}
                    </p>
                    {e.answerOptions.map((a, index) => (
                      <div
                        className="flex pl-4 items-center   text-sm p-2 "
                        key={a}
                      >
                        <div
                          className={`flex  ${
                            a == e.answer ? "text-white-700" : ""
                          } `}
                        >
                          {/* {index + 1}: */}
                          <p className="w-3.5"> </p> <p>{a}</p>
                        </div>
                        <div className="w-2"></div>
                        {a == e.answer && (
                          <BsCheckAll
                            size={30}
                            color="green"
                            className="text-white"
                          />
                        )}
                      </div>
                    ))}

                    <p className="text-lg mt-4  font-xl font-bold text-main text-left ml-2">
                      EXPLANATION
                    </p>
                    <p className="w-full font-normal text-black-200 font-xl m-2 p-10">
                      {" "}
                      {e.answerExplanation == ""
                        ? "No answer explanations provided."
                        : 
                        <textarea
                        rows={5}
                        value={e.answerExplanation}
                        className="outline-none bg-white text-main rounded-md px-3 py-2  dark:bg-darkmain w-full ring-1 ring-main"
                      />
                      }
                    </p>
                  </div>
                ))}



                {/* for text+image type of questions */}
                {quizes[selectedQuiz].questionType == "text+image" && quizes.map((e, i) => (
                  <div
                    key={e.question}
                    className="flex flex-col mt-10 border-l border-r border-t border-b rounded-lg border-gray-400"
                  >
                    <p className="font-semibold text-black font-xl m-2">
                      {i + 1}: {e.question}
                    </p>

                    {e.questionType != "text+image"
                              ? ""
                              :<img
                              className="w-[20%] border-gray-400 h-32 text-blue-200 text-sm mt-2"
                              src={`${prodUrl}/view_thumbnail/quizes/${e.questionImage}`}
                              alt="Image missing"
                            />
                          }

                    {e.answerOptions.map((a, index) => (
                      <div
                        className="flex pl-4 items-center   text-sm p-1 "
                        key={a}
                      >
                        <div
                          className={`flex  ${
                            a == e.answer ? "text-white-700" : ""
                          } `}
                        >
                          <p className="w-3.5"> </p> 
                          {e.answerType != "image"
                              ?  <p>{index + 1}: {" "} {a}</p>
                              :
                              <img
                              className="w-[75%] border-gray-400 h-28  text-blue-200 text-sm mt-2"
                              src={`${prodUrl}/view_thumbnail/quizes/${a}`}
                              alt="Image missing"
                            />
                          }
                          
                         
                        </div>
                        <div className="w-2"></div>
                        {a == e.answer && (
                          <BsCheckAll
                            size={30}
                            color="green"
                            className="text-white"
                          />
                        )}
                      </div>
                    ))}

<p className="text-lg mt-2 mb-2  font-xl font-bold text-main text-left ml-2">
EXPLANATION
</p>
{/* for text answers */}
{e.explanationType == "text" && (
            <textarea
            rows={4}
            value={e.answerExplanation}
            className="outline-none bg-white text-main rounded-md px-3 py-2  dark:bg-darkmain w-full focus:ring-1 focus:ring-main "
          />
)}

{/* for image answers */}
{e.explanationType == "image" && (
<p className="font-normal text-black-200 font-xl m-2">
{" "}
{e.answerExplanation == ""
? "No image answer explanations provided."
:
<img
className="w-[20%] border-gray-400 h-32  text-blue-200 text-sm mt-2"
src={`${prodUrl}/view_thumbnail/quizes/${e.answerExplanation}`}
alt="Image missing"
/>
}
</p>
)}                    
                  </div>
                ))}
              </div>
            </div>
          )}
          {coundownValue > 0 && (
            <div className="h-full w-full flex flex-col justify-center items-center">
              {/* {coundownValue % 2 == 0 && (
                <motion.p
                  initial={{ zoom: 5 }}
                  animate={{ zoom: 0.7 }}
                  transition={{ duration: 1.4, ease: "linear" }}
                  className="text-8xl text-white"
                >
                  {coundownValue}
                </motion.p>
              )}{" "} */}
              {/* {coundownValue % 2 !== 0 && (
                <motion.p
                  initial={{ zoom: 5 }}
                  animate={{ zoom: 0.7 }}
                  transition={{ duration: 1.4, ease: "linear" }}
                  className="text-8xl text-white"
                >
                  {coundownValue}
                </motion.p>
              )} */}
             {coundownValue > 3 &&  (
                <motion.p
                  initial={{ zoom: 5 }}
                  animate={{ zoom: 0.7 }}
                  transition={{ duration: 1.4, ease: "linear" }}
                  className="text-2xl text-white"
                >
                  {
          test == undefined ? "" : test.title
                  }
                </motion.p>
              )}


             {coundownValue > 1 && coundownValue <= 3 && (
                <motion.p
                  initial={{ zoom: 5 }}
                  animate={{ zoom: 0.7 }}
                  transition={{ duration: 1.4, ease: "linear" }}
                  className="text-8xl text-white"
                >
                  {coundownValue}
                </motion.p>
              )}

{coundownValue == 1 && (
                <motion.p
                  initial={{ zoom: 5 }}
                  animate={{ zoom: 0.7 }}
                  transition={{ duration: 1.4, ease: "linear" }}
                  className="text-8xl text-white"
                >
                  {"GO"}
                </motion.p>
              )}

            </div>
          )}

          {coundownValue < 1 && (
            <div className="flex flex-col w-full h-full text-gray-200">
              {showProgress && isfirst && (
                <motion.div
                  initial={{ width: "99%" }}
                  animate={{ width: "-1%%" }}
                  transition={{ duration: 0.2, ease: "linear", delay: 0 }}
                  onAnimationComplete={(d) => {
                    setIsfirst(false);
                    // moveToNextQuestion();
                  }}
                  className="flex w-full h-2 rounded-r-lg  bg-green-500 transition-all duration-200 transform my-0.5"
                ></motion.div>
              )}
              {showProgress && !isfirst && (
                <motion.div
                  initial={{ width: "99%" }}
                  animate={{ width: "-1%" }}
                  transition={{
                 duration: quizes[selectedQuiz].timerSeconds,
                   // duration: 20000,
                    ease: "linear",
                    delay: 0,
                  }}
                  onAnimationComplete={(d) => {
                    setIsfirst(true);
                    moveToNextQuestion(true);
                  }}
                  className="flex w-full h-2 rounded-r-lg  bg-green-400 transition-all duration-200 transform my-0.5"
                ></motion.div>
              )}

              <div className="flex flex-wrap justify-between m-1 px-4 items-center">
                {!isTestFinished && (
                  <p className="font-bold text-white mr-2 text-xl">
                    {" "}
                    {userscore}
                    {"/"}
                    {totalScore}
                    {/* <span className="text-white font-bold">{parseInt(`${totalScore * 0.60}`)}</span>
                  <span className="text-white">    {" "} / {totalScore} POINTS </span> */}
                  </p>
                )}

                <div
                  onClick={() => {
                    setAllowSound(!allowSound);
                    if (!allowSound) {
                      playAudio();
                    }
                    if (speaking) {
                      cancel();
                    }
                  }}
                  className="my-1  hover:bg-darksec cursor-pointer p-1 px-3 rounded-full"
                >
                  {allowSound ? (
                    <ImVolumeHigh size={24} className="text-gray-200 mr-1" />
                  ) : (
                    <FaVolumeMute size={24} className="text-gray-200 mr-1" />
                  )}
                </div>
                <div
                  onClick={() => {
                    router.back();
                    if (speaking) {
                      cancel();
                    }
                  }}
                  className="px-3 text-sm py-1  flex justify-right rounded-md cursor-pointer bg-red-600 hover:bg-red-500 "
                >
                  Close
                </div>
              </div>

              {/* <div className="w-full mt-10 flex px-4 justify-between items-center">
                <div className="flex flex-col ">
                  <div className="flex">
                    {selectedQuiz + 1 <= 1 && (
                      <p className="text-3xl  font-bold">{test.title}</p>
                    )}
                  </div>
                </div>
              </div> */}

              {!isTestFinished && (
                <div className="flex  flex-col justify-between items-center mt-8   ">
                  <div className="flex md:w-[50%] justify-around">
                  <p className="text-xl m-0 font-bold">
                        {
                           quizes[selectedQuiz].questionType != "text+image"
                              ? ""
                              :
                              <div className = {`w-48 h-40 m-2 md:m-4
                             ring-darksec transition-all rounded-md cursor-pointer
                          bg-white  flex text-center justify-center p-2

                            `}>
                              <img
                              className="h-[90%]"
                              src={`${prodUrl}/view_thumbnail/quizes/${quizes[selectedQuiz].questionImage}`}
                              alt="Image missing"
                            />
                            </div>
                          }
                  </p>
                  <p className="text-xl mt-6  self-align-center font-bold cursor-pointer">
                  {quizes[selectedQuiz].question}
                  </p>

          
                  </div>
                  


                  <div className="flex flex-wrap mt-5  justify-center text-xl  text-center mb-4">
{quizes[selectedQuiz].answerType == "text" && quizes[selectedQuiz].answerOptions.map((e, i) => (
                      <div
                        id={i.toString()}
                        onClick={() => {
                          setUserAnswer(e);
                          if (e === quizes[selectedQuiz].answer) {
                            // stop reading quiz
                            if (speaking) {
                              cancel();
                            }
                            // play correct answer sound
                            setAllowSound(allowSound);
                              Correct();
                            setUserscore(
                              userscore + quizes[selectedQuiz].points
                            );
                            setPassed(passed + 1);
                          } else {
                            setFailed(failed + 1);
                            // stop reading quiz
                            if (speaking) {
                              cancel();
                            }
                            // play wrong answer sound
                            setAllowSound(allowSound);
                              Wrong();
                          }
                          setTimeout(() => {
                            setIsfirst(!isfirst);
                            setUserAnswer("");
                            moveToNextQuestion(false);
                          }, 2000);
                        }}
                        className={`
                      flex justify-around items-center w-80 h-28 md:w-96 xl:w-[570px] m-2 md:m-4
                       py-1  ring-1 p-5
                      ring-darksec transition-all rounded-md cursor-pointer
                      ${
                        i == 0
                          ? "bg-darksec border-none" 
                          : i === 1
                          ? "bg-darksec border-none"
                          : i == 2
                          ? "bg-darksec border-none"
                          : "bg-darksec border-none"
                      }


                      ${
                        userAnswer == e
                          ? e == quizes[selectedQuiz].answer
                            ? "bg-red-600"
                            : "bg-red-600"
                          : i === 1
                          ? "bg-orange-500"
                          : i == 2
                          ? "bg-lime-600"
                          : "bg-cyan-600"
                      }


                          `}
                        key={e}
                      >
{e}
                      </div>
                    ))}


{quizes[selectedQuiz].answerType == "image" && quizes[selectedQuiz].answerOptions.map((e, i) => (
                      <div
                        id={i.toString()}
                        onClick={() => {
                          setUserAnswer(e);
                          if (e === quizes[selectedQuiz].answer) {
                            // stop reading quiz
                            if (speaking) {
                              cancel();
                            }
                            // play correct answer sound
                            setAllowSound(allowSound);
                              Correct();
                            setUserscore(
                              userscore + quizes[selectedQuiz].points
                            );
                            setPassed(passed + 1);
                          } else {
                            setFailed(failed + 1);
                            // stop reading quiz
                            if (speaking) {
                              cancel();
                            }
                            // play wrong answer sound
                            setAllowSound(allowSound);
                              Wrong();
                          }
                          setTimeout(() => {
                            setIsfirst(!isfirst);
                            setUserAnswer("");
                            moveToNextQuestion(false);
                          }, 2000);
                        }}
                        className={`
                        flex justify-around items-center w-80 h-[50%] md:w-96 xl:w-[570px] m-2 md:m-4
                        py-1  ring-1 p-5
                       ring-darksec transition-all rounded-md cursor-pointer
                      ${
                        userAnswer == e
                          ? e == quizes[selectedQuiz].answer
                            ? "bg-white"
                            : "bg-white"
                          : i === 1
                          ? "bg-white"
                          : i == 2
                          ? "bg-white"
                          : "bg-white"
                      }
                          `}
                          //      flex-none w-4/4 md:w-4/4 mr-4 md:pb-4  mb-0 mt-5 transform duration-500  md:hover:-translate-y-1 md:hover:scale-105 cursor-pointer justify-between
                        key={e}
                      >
                             <img
                          className=""
                          src={`${prodUrl}/view_thumbnail/quizes/${e}`}
                        />
                      </div>
                    ))}



                  </div>
                </div>
              )}
              {/* finished test page */}
              {isTestFinished && (
                <div className="flex-1 flex  justify-around mt-2">
                  <div className="w-96 h-80 md:w-[600px] rounded-lg bg-darksec flex flex-col">
                    <div className="flex flex-col mb-2 flex-1 p-3">
                      {
                      userscore >= 0.60 * totalScore &&  userscore < 0.70 * totalScore ? (
                        <p className="text-5xl font-bold text-green-600">
                          {"Yay👏👏"}
                        </p>
                      ): userscore >= 0.70 * totalScore &&  userscore < 0.80 * totalScore ?(
                        <p className="text-5xl font-bold text-green-600">
                          {"Awesome👏✔"}
                        </p>
                      ) : userscore >= 0.80 * totalScore &&  userscore * totalScore < 0.90 ?(
                        <p className="text-5xl font-bold text-green-600">
                          {"Incredible🎉🎈"}
                        </p>
                      ): userscore >= 0.90 * totalScore  ?(
                        <p className="text-5xl font-bold text-green-600">
                          {"Excellent🎊🥇"}
                        </p>
                      ):
                       (
  <p className="text-5xl font-bold text-red-600">
  Oops! You missed.😥😎
</p>
                      )}


                      <p className="text-2xl mt-3">
                        Your score:{" "}
                        <span className="text-white text-2xl">
                          {" "}
                          {userscore}
                          {"/"}
                          {totalScore}
                        </span>{" "}
                      </p>

                      <p className="text-2xl mt-2">
                        Passmark:
                        <span className="text-white text-2xl font-bold">
                          {" "}
                          {parseInt(`${totalScore * 0.6}`)}
                        </span>
                        <span className="text-white text-2xl">
                          {" "}
                          / {totalScore} Points{" "}
                        </span>
                      </p>
                      <p className="text-2xl mt-2">
                        Accuracy:
                        <span className="text-white text-2xl font-bold">
                          {" "}
                          {parseInt(`${userscore * 100 / totalScore}`)}
                          {"%"}
                        </span>
                      </p>
                    </div>

                    <div className="flex justify-around w-full py-10 text-sm z-[4000]">
                      <div
                        onClick={() => {
                          restartTest();
                        }}
                        className="cursor-pointer rounded-md bg-amber-700 hover:bg-opacity-40 ml-0 items-center justify-center text-center  w-40 flex text-center justify-center"
                      >
                        Try Again
                      </div>
                      <div
                        onClick={() => setShowAnswers(true)}
                        className="cursor-pointer rounded-md bg-main hover:bg-opacity-40  p-3 w-40 flex ml-2 items-center justify-center text-center"
                      >
                        Show Answers
                      </div>
                      <div
                        onClick={() => {
                          restartTest();
                        }}
                        className="cursor-pointer rounded-md bg-green-700  hover:bg-opacity-40 p-3 w-40 flex ml-2 items-center justify-center text-center"
                      >
                        Next Test
                      </div>
                      
                    </div>
                  </div>

                  <div
                    className={`hidden md:flex flex-col w-4/12 -mt-0    sticky  dark:bg-darksec dark:border-gray-800 `}
                  >
                    <p className="text-xl m-4 font-bold mt-0 text-white  text-center">
                      {"You might find this lesson useful."}
                    </p>

                    <div
                    >

<iframe src="https://player.vdocipher.com/v2/?otp=20160313versUSE323T85DvTKREvA7e3nYJDRcaRKMeMDZJAE58SQqzLaVV0md0Y&playbackInfo=eyJ2aWRlb0lkIjoiNjgyNTJmZWVjZGQwNDc1NDlmM2Q4YjE4ZDEzNDdkY2YifQ==" style={{"border":"0", "height":"240px","width":"1080px","maxWidth":"100%"}} allowFullScreen={true} allow="encrypted-media"></iframe>


                    </div>
                                      </div>
                </div>
              )}

{isTestFinished && (
<div>
<div className="ml-[4%]  text-2xl mt-20  md:mt-0  text-white items-left justify-left text-left">
Similar Quizes.
</div>

    <div        
onClick={() => {
restartTest();
}}
                         className="flex holder mx-auto w-[97%] w-3/4 md:w-11/12 grid sm:grid-cols-3 md:grid-cols-5">     
<div className="each mb-10 m-3  relative cursor-pointer   hover:shadow-md hover:shadow-main transition-all duration-300 group transform duration-500  md:hover:-translate-y-1 md:hover:scale-105"  
     >  
  <div className="relative">
    <a className="absolute inset-0 z-10 text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
      <h1  className="tracking-wider" > <img style={{"transition" : "5s ease"}} src = {playbutton.src}  /></h1>
      </a>
    <a className="relative group-hover:opacity-100 group-hover:blur-sm">
     <img className="w-full h-32 rounded-t-md"   src={`${prodUrl}/view_thumbnail/quizes/${test.thumbnailUrl}`}  
     alt={test.thumbnailUrl} />
    </a>
  </div>
    <div className="badge absolute top-0 right-0 bg-indigo-500 m-2 text-gray-200 dark:text-white p-1 px-2 text-xs font-bold rounded">{test.totalPlays} {" "}Plays</div>
  <div className="info-box text-xs flex p-1 font-semibold text-gray-500 bg-gray-300 rounded-b-md justify-around">
    <span className="mr-1 p-1 px-2  font-bold">{test.subjectType.toUpperCase()} </span>
    <span className="mr-1 p-1 px-2 font-bold  border-l border-gray-400"></span>
    <span className="mr-1 p-1 px-2 font-bold  "> {test.classLevel.toUpperCase()}</span>
  </div>
</div>
</div>


</div>
        )}
              {isTestFinished && (
                <ReactCanvasConfetti
                  style={{
                    zIndex: 3020,
                  }}
                  // colors={["green", "purple", "pink", "red"]}
                  className={"fixed top-1/4 left-1/4 w-96 h-96"}
                  particleCount={100}
                  fire={fireConfetti}
                  onDecay={() => setFireConfetti(false)}
                />
              )}
              <div className="flex flex-1"></div>

              <div className="flex px-3 mb-5 justify-between items-center ">
                {!isTestFinished && (
                  <div className="inline-flex mb-10">
                    <button
                      onClick={() => {
                        showToast(
                          "You Cannot Move To Previous In Test Mode",
                          "error"
                        );
                      }}
                      className="bg-gray-400 text-white hover:bg-gray-400 text-sm  font-bold py-2 px-4 rounded"
                    >
                      {selectedQuiz + 1} {" of "} {quizes.length}
                    </button>
                  </div>
                )}

                {!isTestFinished && (
                  <div className="inline-flex mb-10">
                    <button className="bg-gray-400 text-white hover:bg-main  font-bold py-2 px-2 rounded-md">
                      <div className=" text-white">{test.title}</div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default TakeGamifiedQuizesTestPage;

const OneQuizTestComponent = (
  props: PropsWithChildren<{
    quiz: OneQuiz;
    totalPoints: number;
    increasePoints: (v: number) => void;
    goNext: () => void;
  }>
) => {
  const [bgColor, setBgColor] = useState("bg-white");
  const [selectedAnswer, setSelectedAnswer] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.2 }}
      className="flex flex-col w-full bg-purple-600 dark:bg-darkmain h-96 my-2 justify-around flex-1 "
    >
      <div className="flex justify-end">
        <div className="px-4 py-1 font-bold">Points {props.totalPoints}</div>
      </div>
      <p className="text-center my-4 text-3xl">{props.quiz.question}</p>
      <div className="flex flex-wrap justify-around ">
        {props.quiz.answerOptions.map((e, i) => (
          <div
            key={i}
            onClick={() => {
              setSelectedAnswer(e);
              if (e === props.quiz.answer) {
                setBgColor("bg-green-500");
                props.increasePoints(props.quiz.points);
              } else {
                setBgColor("bg-red-500");
              }
              props.goNext();
            }}
            className={`flex flex-col w-40 h-40 bg-white dark:bg-black m-2 rounded-xl  items-center justify-center cursor-pointer ${
              e === selectedAnswer ? bgColor : ""
            }`}
          >
            {e}
          </div>
        ))}
      </div>
    </motion.div>
  );
};


