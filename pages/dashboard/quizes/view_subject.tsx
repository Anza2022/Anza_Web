/* eslint-disable @next/next/no-img-element */
import { Router, useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import GamifiedQuizRepo from "../../../data/repos/gamified_quiz_repo";
import { GamifiedQuestionsContext } from "../../../presentation/contexts/gamified_quizes_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import { showToast } from "../../../presentation/utils/helper_functions";
import { AiFillStar, AiTwotoneLock } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";
import { ImBooks, ImUnlocked } from "react-icons/im";
import quizholder from "../../../assets/images/quizholder.png";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { useSpeechSynthesis } from "react-speech-kit";
import GamifiedQuizTest from "../../../models/curriculum/gamified_quizes_model";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import playbutton from "./../../../assets/icons/play.png";
import { prodUrl } from "../../../presentation/utils/constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import { LoggedInUserContext } from "../../../presentation/contexts/loggedin_user_controller";

const ViewSubjects = () => {
  const { selectedSubject } = useContext(NavigationContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { testQuizes, setTestQuizes } = useContext(GamifiedQuestionsContext);
  let test = testQuizes.filter((e) => e.classLevel == selectedSubject)[0];
  const { accountSubscription } = useContext(LoggedInUserContext);
  const SubStatus = accountSubscription[0] != undefined
   ? accountSubscription[0].isSubscriptionActive
     ? "Active"
     : "Ended"
   : "";
  const {
    setSelectedForm,
    setSelectedSubject,
    setSelectedVideoId,
    setShowPremiumModal,
  } = useContext(NavigationContext);

  async function getQuizes() {
    try {
      setLoading(true);
      let quizes = await GamifiedQuizRepo.getQuizes();
      setTestQuizes(quizes);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (testQuizes.length < 1) {
      getQuizes();
    }
  }, []);

  // const getSubjects = () => {};
  const { speak } = useSpeechSynthesis();
  const [searchvalue, setSearchvalue] = useState("");
  const [searchResults, setSearchResults] = useState<GamifiedQuizTest[]>([]);
  const searchLesson = (value: string) => {
    setSearchResults(
      testQuizes.filter((e) => e.title.toLowerCase().includes(value) ||  e.classLevel.toLowerCase().includes(value) )
    );
  };

  const getAllSubjects = () => {
    let set = new Set(testQuizes.map((e) => e.classLevel));
    return Array.from(set);
  };

  const getSubjectsAll = (SpecificClassLevel: string) => {
    let papers = testQuizes.filter((e) => e.classLevel == SpecificClassLevel && e.subjectType == selectedSubject );
    return papers;
  };

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative h-screen py-16 w-full items-center flex flex-no-wrap overflow-x-auto scroll-smooth scrolling-touch  ">

      {!loading && (
          <div className="flex h-10 mb-2  mt-1 items-center justify-between mt-4 w-[98%]" >

<div className="flex  mr-10">
              <p className="text-main  text-main font-bold capitalize pb-0 text-xl md:text-1xl font-bold"
               style={{ fontFamily: "Montserrat" }}
               >
                {selectedSubject.replace(/(?:^|\s)\S/g, (res) => {
                            return res.toUpperCase();
                          })} {" "} 
              </p>
            </div>

            <input
              className="outline-none p-2 md:p-3 pl-4 w-[90%] md:w-[600px] bg-white dark:bg-darkmain rounded-md"
              placeholder="Search a topic or form"
              value={searchvalue}
              onChange={(e) => {
                let v = e.target.value.toLowerCase();
                setSearchvalue(v);
                searchLesson(v);
              }}
            />
          </div>

          
        )}

{!loading && searchvalue.length > 0 && (
          <div className="flex flex-wrap w-full h-[90%] mt-5">
            {searchResults.length < 1 && (
              <div className="h-full w-full flex flex-col items-center justify-center">
                <p>
                  Sorry <span className="text-yellow-500">No result found</span>
                </p>
              </div>
            )}
            <div className="holder mx-auto w-9/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
              {searchResults.length > 0 &&
                searchResults.map((e, i) => (

                  <div
                  className="each mb-10 m-2 relative cursor-pointer rounded-md group transform duration-500  md:hover:-translate-y-1 md:hover:scale-105 border border-gray-300 text-sm font-medium rounded-md "
                  key={e.testId}
                  onClick={() => {
                    if(SubStatus == "Ended"){
                    if (i == 0) {
                    MySwal.clickConfirm();
                    setSelectedVideoId(e.testId);
                    router.push("/dashboard/quizes/take_test");
                    } else {
                    MySwal.clickConfirm();
                    setShowPremiumModal(true);
                    }
                    }else if(SubStatus == "Active"){
                      setSelectedVideoId(e.testId);
                      router.push("/dashboard/quizes/take_test");
                    }
                    }}
                >
                  <div className="relative">
                    <a className="absolute inset-0 z-10 text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
                      <h1 className="tracking-wider">
                        {" "}
                        <img
                          style={{ transition: "5s ease" }}
                          src={playbutton.src}
                        />
                      </h1>
                    </a>
                    <a className="relative group-hover:opacity-100 group-hover:blur-sm ">
                      <img
                        className="w-full border-l rounded-md border-gray-400 h-28"
                        src={
                          e.thumbnailUrl == ""
                            ? quizholder.src
                            : `${prodUrl}/view_thumbnail/quizes/${e.thumbnailUrl}`
                        }
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="badge  bg-gray-100 absolute top-0 right-0 dark:bg-darkmain m-1 p-1 px-2 text-xs font-bold rounded text-main">
                          {SubStatus == "Active" ? (
                            <ImUnlocked color="green" size={21} />
                          ) : SubStatus == "Ended" &&   i > 0 ?  (
                            <AiTwotoneLock color="red" size={21} />
                          ): "PLAY"}
                        </div>

                  <div className="info-box text-xs flex p-1 font-semibold justify-between text-gray-500 bg-gray-300">
                    <span className="mr-1 p-1 px-2 font-xs font-bold text-main">
                      {e.questions.length} MIN{" "}
                    </span>
                    <span className="mr-1 font-xs p-1 px-2 font-bold border-l border-gray-400">
                      {e.subjectType.toUpperCase()}
                    </span>
                    <span className="mr-1 font-xs p-1 px-2 font-bold border-l border-gray-400">
                      {e.classLevel.toUpperCase()}
                    </span>
                  </div>
                  <div className="desc p-2 text-gray-800 ">
                    <a className="title font-bold block cursor-pointer dark:text-main">
                      {e.title.replace(/(?:^|\s)\S/g,(res)=>{ return res.toUpperCase();})}
                    </a>
                    <a className="text-xs font-normal cursor-pointer dark:text-white">
                      By Tr. {e.teacherName.replace(/(?:^|\s)\S/g,(res)=>{ return res.toUpperCase();})}
                    </a>
                  </div>
                </div>


                ))}
            </div>
          </div>
        )}


        {loading && (
          <div className="flex flex-col justify-center items-center h-96 w-full">
            <LoadingComponent loading={loading} color={"main"} />
            <p className="text-xs mt-1">Loading tests...</p>
          </div>
        )}
        {!loading && testQuizes.length < 1 && (
          <div className="flex w-full h-[75vh] justify-center items-center flex-col">
            <div
              className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-teal-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Oops! No quiz found. </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* {
console.log(testQuizes)
} */}


        {!loading &&   searchvalue.length < 1 &&
          getAllSubjects().length > 0 &&
          getAllSubjects().map((e, i) => (
            <div
              key={e}
              className="flex flex-col mt-0 w-full pb-2  justify-center md:justify-start"
            >

              <div className="flex w-full mb-1 justify-left">
              <p className="text-main mt-4 ml-3 text-main font-normal capitalize pb-0 text-lg md:text-1xl font-bold"
               >
              {" "}
                {e.replace(/(?:^|\s)\S/g,(res)=>{ return res.toUpperCase();})} Quizes
              </p>
            </div>


            <div className="flex flex-no-wrap overflow-x-auto scroll-smooth scrolling-touch ">
                {  getSubjectsAll(e).length > 0 && getSubjectsAll(e).map((l, i) => (
                  <div
                    className="each mb-10 m-2 relative cursor-pointer rounded-md group transform duration-500  md:hover:-translate-y-1 md:hover:scale-105 border border-gray-300 text-sm font-medium rounded-md "
                    key={l.testId}
                    onClick={() => {
                      if(SubStatus == "Ended"){
                      if (i == 0) {
                      MySwal.clickConfirm();
                      setSelectedVideoId(l.testId);
                      router.push("/dashboard/quizes/take_test");
                      } else {
                      MySwal.clickConfirm();
                      setShowPremiumModal(true);
                      }
                      }else if(SubStatus == "Active"){
                        setSelectedVideoId(l.testId);
                        router.push("/dashboard/quizes/take_test");
                      }
                      }}
                  >
                    <div className="relative">
                      <a className="absolute inset-0 z-10 text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
                        <h1 className="tracking-wider">
                          {" "}
                          <img
                            style={{ transition: "5s ease" }}
                            src={playbutton.src}
                          />
                        </h1>
                      </a>
                      <a className="relative group-hover:opacity-100 group-hover:blur-sm ">
                        <img
                          className="w-full border-l rounded-md border-gray-400 h-28"
                          src={
                            l.thumbnailUrl == ""
                              ? quizholder.src
                              : `${prodUrl}/view_thumbnail/quizes/${l.thumbnailUrl}`
                          }
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="badge  bg-gray-100 absolute top-0 right-0 dark:bg-darkmain m-1 p-1 px-2 text-xs font-bold rounded text-main">
                          {SubStatus == "Active" ? (
                            <ImUnlocked color="green" size={21} />
                          ) : SubStatus == "Ended" &&   i > 0 ?  (
                            <AiTwotoneLock color="red" size={21} />
                          ): "PLAY"}
                        </div>

                    <div className="info-box text-xs flex p-1 font-semibold justify-between text-gray-500 bg-gray-300">
                      <span className="mr-1  px-2 font-xs font-bold">
                        {l.questions.length} MIN{" "}
                      </span>
                      <span className="mr-1 font-xs p-1 px-2 font-bold border-l border-gray-400">
                        {l.subjectType.toUpperCase()}
                      </span>
                      <span className="mr-1 font-xs p-1 px-2 font-bold border-l border-gray-400">
                        {l.classLevel.toUpperCase()}
                      </span>
                    </div>
                    <div className="desc p-2 text-gray-800 ">
                      <a className="title font-bold block cursor-pointer dark:text-white">
                        {l.title.replace(/(?:^|\s)\S/g,(res)=>{ return res.toUpperCase();})}
                      </a>
                      <a className="text-xs font-normal cursor-pointer dark:text-white">
                        By Tr. {l.teacherName.replace(/(?:^|\s)\S/g,(res)=>{ return res.toUpperCase();})}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </DashboardLayout>
  );
};

export default ViewSubjects;
