/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState, useRef } from "react";
import VideoLessonRepo from "../../../data/repos/video_lessons_repo";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { VideoLessonContext } from "../../../presentation/contexts/video_lessons_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import { showToast } from "../../../presentation/utils/helper_functions";
import bio from "../../../assets/course_thumbnails/bio.png";
import math from "../../../assets/course_thumbnails/math.png";
import chem from "../../../assets/course_thumbnails/chem.png";
import physics from "../../../assets/course_thumbnails/physics.png";
import geo from "../../../assets/course_thumbnails/geo.png";
import agric from "../../../assets/course_thumbnails/agric.png";
import cre from "../../../assets/course_thumbnails/cre.png";
import bs from "../../../assets/course_thumbnails/bs.png";
import eng from "../../../assets/course_thumbnails/eng.png";
import kis from "../../../assets/course_thumbnails/kis.png";
import homescience from "../../../assets/course_thumbnails/homescience.png";
import { AiFillStar, AiTwotoneLock } from "react-icons/ai";
import { motion } from "framer-motion";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { LoggedInUserContext } from "../../../presentation/contexts/loggedin_user_controller";
import VideoLessonModel from "../../../models/curriculum/video_lesson_model";
import { ImBooks, ImUnlocked } from "react-icons/im";
import GamifiedQuizRepo from "../../../data/repos/gamified_quiz_repo";
import { GamifiedQuestionsContext } from "../../../presentation/contexts/gamified_quizes_controller";
import GamifiedQuizTest from "../../../models/curriculum/gamified_quizes_model";
import quizholder from "../../../assets/images/quizholder.png";
import playbutton from "../../../assets/icons/play.png";
import { FaGraduationCap } from "react-icons/fa";
import PastPaperRepo from "../../../data/repos/past_paper_repo";
import { PastPapersContext } from "../../../presentation/contexts/past_papers_controller";
import { prodUrl } from "../../../presentation/utils/constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

import {
  MdChevronLeft,
  MdChevronRight,
  MdPlayCircleFilled,
} from "react-icons/md";
const VideoLessonsPage = () => {
  const router = useRouter();
  // let formOptions: string[] = ["Form 1", "Form 2", "Form 3", "Form 4"];
  const { lessons, setLessons } = useContext(VideoLessonContext);
  const {
    setSelectedForm,
    setSelectedSubject,
    setSelectedVideoId,
    setSelectedVdocipher,
    setContinueVideo,
    setShowPremiumModal
  } = useContext(NavigationContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (lessons.length < 1) {
      getLessons();
    }
  }, []);
  const { accountSubscription } = useContext(LoggedInUserContext);
const SubStatus = accountSubscription[0] != undefined
 ? accountSubscription[0].isSubscriptionActive
   ? "Active"
   : "Ended"
 : "";
  async function getLessons() {
    setLoading(true);
    try {
      let res = await VideoLessonRepo.getAllVideoLessons();
      setLessons(res);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  }

  const getSubjects = (form: string) => {
    let set = new Set(
      lessons
        .filter((e) => e.classLevel === form)
        .map((e) => e.subjectType.toLowerCase())
    );
    return Array.from(set);
  };

  const getClassLevels = () => {
    let set = new Set(lessons.map((e) => e.classLevel));
    return Array.from(set);
  };

  const getTopicsNumber = (form: string, subject: string) => {
    let set = new Set(
      lessons
        .filter(
          (e) =>
            e.classLevel == form &&
            e.subjectType.toLowerCase() == subject.toLowerCase()
        )
        .map((e) => e.topicName)
    );
    return Array.from(set).length;
  };

  const getTeachersNumber = (form: string, subject: string) => {
    let set = new Set(
      lessons
        .filter((e) => e.classLevel == form && e.subjectType == subject)
        .map((e) => e.teacherName)
    );
    return Array.from(set).length;
  };
  const getLessonsNumber = (form: string, subject: string) => {
    return lessons.filter(
      (e) =>
        e.classLevel.toLowerCase() == form.toLowerCase() &&
        e.subjectType.toLowerCase() == subject.toLowerCase()
    ).length;
  };

  const getthumbnailurl = (form: string, subject: string) => {
    //form 1 thumbanails
    // if (form == "form 1") {
    //   if (subject == "biology") {
    //     return bio.src;
    //   } else if (subject == "geography") {
    //     return form1_geo.src;
    //   } else {
    //     return math.src;
    //   }
    // }
    if (subject == "biology") {
      return bio.src;
    } else if (subject == "chemistry") {
      return chem.src;
    } else if (subject == "physics") {
      return physics.src;
    } else if (subject == "mathematics") {
      return math.src;
    } else if (subject == "geography") {
      return geo.src;
    }
    else if (subject == "agriculture") {
      return agric.src;
    }
    else if (subject == "business studies") {
      return bs.src;
    }
    else if (subject == "cre") {
      return cre.src;
    }
    else if (subject == "english") {
      return eng.src;
    }
    else if (subject == "home science") {
      return homescience.src;
    }
    else if (subject == "kiswahili") {
      return kis.src;
    }
     else {
      return math.src;
    }
  };

  //app remember state
  const { userStats } = useContext(LoggedInUserContext);
  const { user, setUser } = useContext(LoggedInUserContext);

  let recomendedLessons = [
    "back titration 2.mp4",
    "Biological Weathering.mp4",
    "^Graphical Methods - 2. Graphical Solution of Cubic Equations.mp4",
    "Sound Wave.mp4",
    "^Compound Proportions & Rates of Work - 2. Proportional Parts.mp4",
    "Inverse Variation_Final Comp.mp4",
    "HYDRAULIC LIFT.mp4",
    "1. Quantity of Heat Final.mp4",
    "Reflection of waves2.mp4",
    "Wave2.mp4",
    "Wave2.mp4",
    "Pressure and Impurities part1.mp4",
    "Effects of Total Internal reflection.mp4",
    "Isomerism in Alkanes.mp4",
    "Nomenclature of alkanols.mp4",
    "Physical Properties of Alkanols.mp4",
    "Polymers.mp4",
    "Soapless Detergents.mp4",
    "Chemical Properties of Alkanols.mp4",
    "Redox Titrations.mp4",
    "ALKYNES.mp4",
  ];

  // let recomendedLessons = [
  //   "68252feecdd047549f3d8b18d1347dcf",
  //   "3129552a45ef4633869653f76268336f",
  //   "44ae607c48214b80b3cd00fcd2b07439",
  //   "2815e54ec12d462b99331dd2e1e78125",
  // ];

  const [searchvalue, setSearchvalue] = useState("");
  const [searchResults, setSearchResults] = useState<VideoLessonModel[]>([]);
  const searchLesson = (value: string) => {
    setSearchResults(
      lessons.filter(
        (e) =>
          e.chapter.toLowerCase().includes(value) ||
          e.topicName.toLowerCase().includes(value)
      )
    );
  };

  // GET QUIZES DATA HERE
  const { testQuizes, setTestQuizes } = useContext(GamifiedQuestionsContext);
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

  // GET PASTPAPERS DATA HERE
  const { pastPapers, setPastPapers, selectedPaperId, setSelectedPaperId } =
    useContext(PastPapersContext);

  async function getPastPapers() {
    setLoading(true);
    try {
      let papers = await PastPaperRepo.getPastPapers();
      setPastPapers(papers);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (pastPapers.length < 1) {
      getPastPapers();
    }
  }, []);

  const getClassLevelsPastPapers = () => {
    let set = new Set(pastPapers.map((e) => e.classLevel));
    return Array.from(set);
  };
  const getSubjectsPastPapers = (form: string) => {
    let set = new Set(
      pastPapers.filter((e) => e.classLevel === form).map((e) => e.subjectType)
    );

    return Array.from(set);
  };
  const getTotalPapersNumber = (form: string, subject: string): number => {
    return pastPapers.filter(
      (e) => e.classLevel == form && e.subjectType == subject
    ).length;
  };

  const [scrollOffset, setScrollOffset] = useState(0);
  // RECOMMENDED LESSONS SCROLL
  const scrollLeft = () => {
    let masterelement: any = document.querySelector(".testimonials_div");
    masterelement.scrollLeft += 300;
    setScrollOffset(scrollOffset + 300);
  };
  const scrollRight = () => {
    let masterelement: any = document.querySelector(".testimonials_div");
    masterelement.scrollLeft -= 300;
    setScrollOffset(scrollOffset - 300);
  };

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200  md:ml-44 relative min-h-screen py-16 w-full dark:bg-darksec  flex flex-no-wrap overflow-x-scroll scroll-smooth scrolling-touch   ">
        {!loading && (
          <div>
                <div className="md:hidden  ml-2 p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 justify-center cursor-pointer">
    <svg className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clip-rule="evenodd"></path><path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path></svg>
    <a             onClick={() => {
                      router.push("/dashboard/billing");
                    }}
                     >
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white cursor-pointer">Offer! Offer!</h5>
    </a>
    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">33.3% (KSH 1,000) OFF!  Limited offer till Dec. 5th, 2022 was <span className="line-through text-red-500 font-bold"> KSH 3,000</span> now KSH 2,000</p>
    <a 
     onClick={() => {
      router.push("/dashboard/billing");
    }}
     className="inline-flex items-center text-blue-600 hover:underline cursor-pointer">
   Subscribe Now
        <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
    </a>
</div>

          <div className="flex  h-10 mb-2  mt-2 items-center justify-center w-full">
            <input
              className="outline-none p-1  pl-4 w-[90%] md:w-[600px]  bg-white dark:bg-darkmain rounded-md"
              placeholder="Search a lesson"
              value={searchvalue}
              onChange={(e) => {
                let v = e.target.value.toLowerCase();
                setSearchvalue(v);
                searchLesson(v);
              }}
            />
          </div>
          </div>
        )}
        {!loading && searchvalue.length > 0 && (
          <div className="flex flex-wrap w-full h-[90%]">
            {searchResults.length < 1 && (
              <div className="h-full w-full flex flex-col items-center justify-center">
                <p>
                  Sorry <span className="text-yellow-500">No result found</span>
                </p>
              </div>
            )}
            <div className="holder mx-auto w-12/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 cursor-pointer">
              {searchResults.length > 0 &&
                searchResults.map((e, i) => (
                  <div
                    key={i}
                    className="each mb-10 m-2 relative group transform duration-500  md:hover:-translate-y-1 md:hover:scale-105"
                    onClick={() => {
                      if(SubStatus == "Ended"){
                      if (i == 0) {
                      MySwal.clickConfirm();
                      setSelectedForm(e.classLevel);
                      setSelectedSubject(e.subjectType);
                      setSelectedVideoId(e.videoId);
                      setSelectedVdocipher(e.vidCipherId);
                      router.push("/dashboard/videos/view_lesson");
                      } else {
                      MySwal.clickConfirm();
                      setShowPremiumModal(true);
                      }
                      }else if(SubStatus == "Active"){
                        setSelectedForm(e.classLevel);
                        setSelectedSubject(e.subjectType);
                        setSelectedVideoId(e.videoId);
                        setSelectedVdocipher(e.vidCipherId);
                        router.push("/dashboard/videos/view_lesson");
                      }
                      }}
                  >
                    <div className="relative cursor-pointer">
                      <a className="absolute inset-0 z-10 text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
                        <h1 className="tracking-wider ">
                          {" "}
                          <img
                            style={{ transition: "5s ease" }}
                            src={playbutton.src}
                          />
                        </h1>
                      </a>
                      <a className="relative group-hover:opacity-100 group-hover:blur-sm">
                        <img className="w-full" src={`https://anzaacademy.co/anzaapi/view_thumbnail/lesson/${e.thumbnailUrl.split("view_thumbnail/lesson/")[1]}`}  />
                      </a>
                    </div>

                    <div className="info-box text-xs flex justify-around p-1 font-semibold text-gray-500 bg-gray-300">
                      <span className="mr-1 p-1 px-2 font-bold    ">
                        {e.classLevel.toUpperCase()}
                      </span>
                      <span className="mr-1 p-1 px-2 border-l border-gray-400  font-bold  ">
                        {e.subjectType.toUpperCase()}
                      </span>
                      <span className="mr-1 p-1 px-2 border-l border-gray-400 font-bold">
                        {e.totalViews} VIEWS
                      </span>
                    </div>
                    <div className="desc p-2 text-gray-800">
                      <a className="title font-bold block cursor-pointer dark:text-white" >
                        {e.chapter.toUpperCase()}
                      </a>
                      <span className="description text-sm block  border-gray-400 mb-0 font-normal dark:text-white">
                        {e.topicName.replace(/(?:^|\s)\S/g, (res) => {
                          return res.toUpperCase();
                        })}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* {!loading &&
          searchvalue.length < 1 &&
          userStats[0] != undefined &&
          userStats[0].lastWatchedVideo.classLevel.length > 0 && (
            <div className="flex flex-col w-full px-4">
              <p className=" text-lg font-black text-center dark:text-white  text-main p-0 m-0">
                RECENTS
              </p>
              <div className="holder mx-auto w-12/12 grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
                <div
                  className="each mb-10 m-2 relative  cursor-pointer"
                  onClick={() => {
                    setContinueVideo(true);
                    setSelectedForm(userStats[0].lastWatchedVideo.classLevel);
                    setSelectedSubject(
                      userStats[0].lastWatchedVideo.subjectType
                    );
                    setSelectedVideoId(userStats[0].lastWatchedVideo.videoId);
                    router.push("/dashboard/videos/view_lesson");
                  }}
                >
                  <div className="relative flex flex-col  group transform duration-500  md:hover:-translate-y-1 md:hover:scale-105">
                    <div className="relative">
                      <a className="absolute inset-0 z-10 text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
                        <h1 className="tracking-wider ">
                          {" "}
                          <img
                            style={{ transition: "5s ease" }}
                            src={playbutton.src}
                          />
                        </h1>
                      </a>
                      <a className="relative group-hover:opacity-100 group-hover:blur-sm">
                        <img
                          className="w-full"
                          src={userStats[0].lastWatchedVideo.thumbnailUrl}
                          alt=""
                        />
                      </a>
                    </div>

                    <div className="badge absolute top-0 right-0 bg-red-500 m-1  text-gray-200 p-1 px-2 text-xs font-bold rounded">
                      {userStats[0].lastWatchedVideo.videoLength} {" MIN"}
                    </div>

                    <div className="bg-white h-1.5 w-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 200 }}
                        transition={{ duration: 0.5 }}
                        className="h-1.5 bg-red-500 "
                      ></motion.div>
                    </div>

                    <div className="info-box text-xs flex p-1 justify-between font-semibold text-gray-500 bg-gray-300 ">
                      <span className="mr-1 p-1 px-2 text-main font-bold">
                        {" "}
                        {userStats[0].lastWatchedVideo.classLevel.toUpperCase()}{" "}
                      </span>
                      <span className="mr-1 p-1 px-2 font-bold border-l border-gray-400">
                        {userStats[0].lastWatchedVideo.totalViews} VIEWS{" "}
                      </span>
                      <span className="mr-1 p-1 px-2 font-bold border-l border-gray-400">
                        {" "}
                        {userStats[0].lastWatchedVideo.subjectType.toUpperCase()}
                      </span>
                    </div>

                    <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                      <div className="w-3 h-3 -mt-0 rotate-45 bg-gray-600"></div>
                      <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">
                        {userStats[0].lastWatchedVideo.chapter}
                      </span>
                    </div>

                    <div className="desc p-1 text-gray-800 ">
                      <span className="description text-sm block p-0 font-bold mb-0">
                        {userStats[0].lastWatchedVideo.title.replace(
                          /(?:^|\s)\S/g,
                          (res) => {
                            return res.toUpperCase();
                          }
                        )}
                      </span>
                      <a className="font-normal  p-0 text-xs cursor-pointer">
                        By Anza Academy
                      </a>

                      <div className="p-0 ml-0 flex text-amber-500">
                        <p className=" text-xs mr-2">4.5</p>
                        {Array(5)
                          .fill(0)
                          .map((e, i) => (
                            <AiFillStar
                              key={i}
                              size={13}
                              className={`${i === 4 ? "text-gray-300" : ""}`}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} */}

        {loading && searchvalue.length < 1 && (
          <div className="flex  flex-wrap   justify-around items-center w-full relative">
            <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center z-40">
              <LoadingComponent loading={loading} color="main" />
              <p className="text-xs">Loading lessons...</p>
            </div>

            {Array(6)
              .fill(1)
              .map((e, i) => (
                <div key={i} className="">
                  <div className="animate-pulse-fast flex flex-col  bg-gray-200 dark:bg-darkmain rounded-t-xl duration-75">
                    <div className=" bg-white  dark:bg-gray-800 h-40 w-full animate-pulse rounded-t-xl"></div>
                    <div className=" bg-white dark:bg-gray-700 my-0.5 mt-2 h-5 self-center w-52 rounded-lg animate-pulse "></div>
                    <div className="flex justify-between  px-4 my-1">
                      <div className=" bg-white dark:bg-gray-700 my-0.5 h-5 self-center w-24 rounded-lg animate-pulse "></div>
                      <div className=" bg-white dark:bg-gray-700 my-0.5 h-5 self-center w-24 rounded-lg animate-pulse "></div>
                    </div>
                    <div className="flex justify-between  px-4 my-0.5">
                      <div className=" bg-white dark:bg-gray-700 my-0.5 h-5 self-center w-24 rounded-lg animate-pulse "></div>
                      <div className=" bg-white dark:bg-gray-700 my-0.5 h-5 self-center w-24 rounded-lg animate-pulse "></div>
                    </div>
                    <div className="flex justify-between  px-4 my-0.5">
                      <div className=" bg-white dark:bg-gray-700 my-0.5 h-5 self-center w-36 rounded-lg animate-pulse "></div>
                      <div className=" bg-white dark:bg-gray-700 my-0.5 h-5 self-center w-12 rounded-lg animate-pulse "></div>
                    </div>
                    <div className="flex justify-end  px-4 my-0.5">
                      <div className=" bg-white dark:bg-gray-700 my-0.5 h-5 self-center w-20 rounded-lg animate-pulse "></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {!loading && searchvalue.length < 1 && getClassLevels().length < 1 && (
          <div className="flex flex-col h-full items-center justify-center">
            <p>
              Sorry <span className="text-yellow-500">No result found</span>
            </p>
          </div>
        )}
        {!loading &&
          searchvalue.length < 1 &&
          getClassLevels().length > 0 &&
          getClassLevels()  //.slice(0, parseInt(user[0].classLevel.slice(5)))
            .sort()
            .map((e, i) => (
              <div
                key={e}
                className="flex flex-col m-0 text-sm
              "
              >
                <p className="text-left ml-4 mb-1 mt-3 font-black text-xl dark:text-white font-normal capitalize text-main">
                {e.replace(/(?:^|\s)\S/g, (res) => {
                            return res.toUpperCase();
                          })}                  {" "}

                   Subjects
                </p>

                {/* <div
                  onClick={scrollLeft}
                  className="flex  w-10  cursor-pointer items-center  justify-center text-main  z-10 absolute right-0
                  top-[280px] h-[700px]"
                >
                  <div className="bg-main  rounded-md text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-24 w-7 p-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                <div
                  onClick={scrollRight}
                  className={`flex  w-10 cursor-pointer items-center  justify-center text-main  z-10 absolute left-0
        top-[280px] h-[700px]`}
                >
                  <div className="bg-main  rounded-md text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-24 w-7 p-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </div>
                </div> */}

                <div
                  id="testimonials_div_id"
                  className="testimonials_div flex flex-no-wrap overflow-x-scroll scroll-smooth scrolling-touch   cursor-pointer"
                >
                  {getSubjects(e)
                    .sort()
                    .map((l, t) => (
                      <motion.div
                        key={l}
                        onClick={() => {
                          setSelectedForm(e);
                          setSelectedSubject(l);
                          router.push("/dashboard/videos/topics");
                        }}
                        className="flex-none w-2/3 md:w-1/4 mr-4 md:pb-4 hover:bg-blue-300 mb-2 transform duration-500  md:hover:-translate-y-1 md:hover:scale-105"
                      >
                        <img
                          className="w-full rounded-lg"
                          src={getthumbnailurl(e, l.toLowerCase())}
                          alt=""
                        />
                        <div className="info-box text-xs flex p-1 justify-between font-semibold text-gray-500 bg-gray-300 ">
                          <span className="mr-1 p-1 px-2  font-bold ">
                            {" "}
                            {`${e} `.replace(/(?:^|\s)\S/g, (res) => {
                            return res.toUpperCase();
                          })}{" "}
                          </span>
                          <span className="mr-1 p-1 px-2 font-bold border-l border-gray-400">
                            {" "}
                            {getTopicsNumber(e, l)} Topics
                          </span>
                          <span className="mr-1 p-1 px-2 font-bold border-l border-gray-400">
                            {" "}
                            {getLessonsNumber(e, l)} Lessons
                          </span>
                        </div>
                        <div className="desc p-2 text-gray-800">
                          <a className="title font-bold text-main block cursor-pointer dark:text-white">
                            {" "}
                            {`${l}`.toUpperCase()}
                          </a>
                          <span className="description text-sm block py-2 border-gray-400 mb-2"></span>
                        </div>
                      </motion.div>
                    ))}
                </div>
                <div className=" pb-4 w-80 md:w-[430px]  rounded-2xl  cursor-pointer flex flex-col  lg:mx-10 m-3"></div>
              </div>
            ))}

        {!loading && searchvalue.length < 1 && lessons != undefined && (
          <div className="flex flex-col w-full">
            <p className="text-left ml-4 mb-1 font-black text-2xl font-normal dark:text-white capitalize text-main">
              {" "}
              Recommended Lessons
            </p>

            {/* <p className="font-bold font-xl text-lg text-center mb-2  mt-1 dark:text-white text-blue-800 px-2 pl-5 pb-2">
              VIDEO LESSONS
            </p> */}

            <div className="flex flex-no-wrap overflow-x-scroll scroll-smooth scrolling-touch    cursor-pointer ">
              {/*
              .filter((e) => {
                  let url = e.videoUrl.split("/").pop();
                  return recomendedLessons.includes(url!);
                })
                */}
              {lessons
                .slice(0, 5)
                .sort(() => 0.5 - Math.random())
                .map((e,i) => (
                  <div
                    className="flex-none w-2/3 md:w-1/4 mr-4 md:pb-4  mb-2 group transform duration-500  md:hover:-translate-y-1 md:hover:scale-105"
                    key={e.videoId}

                    onClick={() => {
                      if(SubStatus == "Ended"){
                      if (i == 0) {
                      MySwal.clickConfirm();
                      setSelectedForm(e.classLevel);
                      setSelectedSubject(e.subjectType);
                      setSelectedVideoId(e.videoId);
                      setSelectedVdocipher(e.vidCipherId);
                      router.push("/dashboard/videos/view_lesson");
                      } else {
                      MySwal.clickConfirm();
                      setShowPremiumModal(true);
                      }
                      }else if(SubStatus == "Active"){
                        setSelectedForm(e.classLevel);
                        setSelectedSubject(e.subjectType);
                        setSelectedVideoId(e.videoId);
                        setSelectedVdocipher(e.vidCipherId);
                        router.push("/dashboard/videos/view_lesson");
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
                      <a className="relative group-hover:opacity-100 group-hover:blur-sm  rounded-md ">
                        <img className="w-full rounded-md" src={`https://anzaacademy.co/anzaapi/view_thumbnail/lesson/${e.thumbnailUrl.split("view_thumbnail/lesson/")[1]}`} alt="img missing" />
                      </a>
                    </div>

                    <div className="badge  bg-gray-100 absolute top-0 right-0 dark:bg-darkmain m-1 p-1 px-2 text-xs font-bold rounded text-main">
                          {SubStatus == "Active" ? (
                            <ImUnlocked color="green" size={21} />
                          ) : SubStatus == "Ended" && i >  0 ?  (
                            <AiTwotoneLock color="red" size={21} />
                          ): "PLAY"}
                        </div>

                    {/* <div className="badge absolute top-0 right-0 bg-main m-1  text-gray-200 p-1 px-2 text-xs font-bold rounded">
                      {e.videoLength} {" Min"}
                    </div> */}

                    <div className="info-box text-xs flex mt-2 p-1 font-semibold justify-between text-gray-500 bg-gray-200 dark:bg-darksec">
                      <span className="mr-1 p-1 px-2 font-bolder">
                        {e.classLevel.replace(/(?:^|\s)\S/g, (res) => {
                            return res.toUpperCase();
                          })}
                      </span>
                      <span className="mr-1 p-1 px-2 border-l dark:border-none border-gray-300  font-bold">
                        {e.totalViews} Views
                      </span>
                      <span className="mr-1 p-1 px-2 font-bold border-l dark:border-none border-gray-300 ">
                        {e.subjectType.replace(/(?:^|\s)\S/g, (res) => {
                            return res.toUpperCase();
                          })}
                      </span>
                    </div>
                    <div className="desc  -mt-1 ml-3 text-gray-800">
                      <a className="title text-main dark:text-white  font-bold block cursor-pointer">
                        {e.title.replace(/(?:^|\s)\S/g, (res) => {
                            return res.toUpperCase();
                          })}
                      </a>
                      {/* <a className="title text-xs m-0 font-normal block cursor-pointer dark:text-white">
                        {e.chapter.charAt(0).toUpperCase() + e.chapter.slice(1)}
                      </a> */}
                      <a className="badge  px-0 text-xs font-normal cursor-pointer dark:text-white">
                        {"By Tr. " +
                          e.teacherName.replace(/(?:^|\s)\S/g, (res) => {
                            return res.toUpperCase();
                          })}{" "}
                      </a>
                      {/* <div className="py-1 flex text-amber-500 ">
                        <p className=" text-xs mr-2">4.5</p>
                        {Array(5)
                          .fill(0)
                          .map((e, i) => (
                            <AiFillStar
                              key={i}
                              size={13}
                              className={`${i === 4 ? "text-gray-300" : ""}`}
                            />
                          ))}
                      </div> */}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {!loading && searchvalue.length < 1 && lessons != undefined && (
          <div className="flex flex-col w-full">
            <div className="flex w-full mb-1 justify-between">
              <p className="text-main mt-4 ml-5  font-normal capitalize pb-0 text-2xl  font-bold">
                Quizes
              </p>
              <p
                className="mr-4 mt-6 md:mr-5 mr-5 font-normal text-main   cursor-pointer"
                onClick={() => {
                  router.push("/dashboard/quizes");
                }}
              >
                View More
              </p>
            </div>

            {testQuizes.length < 1 && (
              <div className="h-full w-full flex flex-col items-center justify-center">
                <p>
                  Sorry <span className="text-yellow-500">No Quizes found</span>
                </p>
              </div>
            )}

            <div className="flex flex-no-wrap overflow-x-scroll scroll-smooth scrolling-touch    cursor-pointer  ">
              {!loading &&
                testQuizes.length >= 1 &&
                testQuizes
                .slice(0, 6)
                .sort(() => 0.5 - Math.random())
                .map((e, i) => (
                  <div
                    className="flex-none w-2/3 md:w-1/4 mr-4 md:pb-4 mb-2 group transform duration-500  md:hover:-translate-y-1 md:hover:scale-105"
                    key={i}
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
                      <a className="relative group-hover:opacity-100 group-hover:blur-sm">
                        <div className="h-48 flex flex-wrap content-center">
                          <img
                            className="w-full h-48 rounded-md"
                            src={`${prodUrl}/view_thumbnail/quizes/${e.thumbnailUrl}`}
                            alt=""
                          />
                        </div>
                      </a>
                    </div>

                    <div className="badge  bg-gray-100 absolute top-0 right-0 dark:bg-darkmain m-1 p-1 px-2 text-xs font-bold rounded text-main">
                          {SubStatus == "Active" ? (
                            <ImUnlocked color="green" size={21} />
                          ) : SubStatus == "Ended" && i >  0 ?  (
                            <AiTwotoneLock color="red" size={21} />
                          ): "PLAY"}
                        </div>

                    <div className="info-box text-xs flex p-1  justify-between font-semibold text-gray-500 bg-gray-300">
                      <span className="mr-1 p-1 px-2  font-bold ">
                        {e.classLevel.replace(/(?:^|\s)\S/g, (res) => {
                            return res.toUpperCase();
                          })}
                      </span>
                      {/* <span className="mr-1 p-1 px-2 border-l border-gray-400 font-bold">
                        {e.likes} LIKES{" "}
                      </span> */}
                      <span className="mr-1 p-1 px-2 font-bold">
                        {e.subjectType.replace(/(?:^|\s)\S/g, (res) => {
                            return res.toUpperCase();
                          })}
                      </span>
                      <span className="mr-1 p-1 px-2 font-bold">
                      {e.totalPlays} Plays
                      </span>
                    </div>
                    <div className="desc p-2 text-gray-800 ">
                      <a className="title text-main font-bold dark:text-white block cursor-pointer ">
                        {e.title.toLowerCase().replace(/(?:^|\s)\S/g, (res) => {
                            return res.toUpperCase();
                          })}
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}


{!loading && searchvalue.length < 1 && lessons != undefined && (
        <div className="flex flex-col w-full">
          <div className="flex w-full mb-1 justify-between">
            <p className="text-main mt-4 ml-5   text-2xl pb-0  font-normal">
              Past Papers
            </p>
            <p
              className="mr-4 mt-4 md:mr-5 mr-5  font-normal text-main cursor-pointer"
              onClick={() => {
                router.push("/dashboard/papers");
              }}
            >
              View More
            </p>
          </div>

          {getClassLevelsPastPapers().length < 1 && (
            <div className="h-full w-full flex flex-col items-center justify-center">
              <p>
                Sorry{" "}
                <span className="text-yellow-500">No past papers found</span>
              </p>
            </div>
          )}

          {!loading &&
            searchvalue.length < 1 &&
            getClassLevelsPastPapers().length >= 1 &&
            getClassLevelsPastPapers()
              // .slice(0, parseInt(user[0].classLevel.slice(5)))
              .slice(0,8)
              .map((e, i) => (
                <div
                  className="flex flex-1 overflow-x-scroll scroll-smooth scrolling-touch  cursor-pointer  "
                  key={i}
                >
                  {getSubjectsPastPapers(e)
                    .slice(0, 9)
                    .map((l, i) => (
                      <div
                        className="flex-none w-4/4 md:w-1/4 mr-4 md:pb-4  mb-2   group transform duration-500  md:hover:-translate-y-1 md:hover:scale-105"
                        key={l}

                        onClick={() => {
                          if(SubStatus == "Ended"){
                          if (i == 0) {
                          MySwal.clickConfirm();
                          setSelectedForm(e);
                          setSelectedSubject(l);
                          router.push("/dashboard/papers/all");
                          } else {
                          MySwal.clickConfirm();
                          setShowPremiumModal(true);
                          }
                          }else if(SubStatus == "Active"){
                            setSelectedForm(e);
                            setSelectedSubject(l);
                            router.push("/dashboard/papers/all");
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
                      <a className="relative group-hover:opacity-100 group-hover:blur-sm">
                        <div className="h-32 flex flex-wrap content-center">
                          <img
                            className="w-full h-32 rounded-md"
                            src={getthumbnailurl(e, l.toLowerCase())}
                            alt=""
                          />
                        </div>
                      </a>
                    </div>

                    <div className="badge  bg-gray-100 absolute top-0 right-0 dark:bg-darkmain m-1 p-1 px-2 text-xs font-bold rounded text-main">
                          {SubStatus == "Active" ? (
                            <ImUnlocked color="green" size={21} />
                          ) : SubStatus == "Ended" && i >  0 ?  (
                            <AiTwotoneLock color="red" size={21} />
                          ): "PLAY"}
                        </div>


                    <div className="info-box text-xs flex p-1  justify-between font-semibold text-gray-500 bg-gray-300">
                      <span className="mr-1 p-1 px-2  font-bold ">
                      {e[0].toUpperCase()}
                              {e.substring(1).toUpperCase()}{" "}
                      </span>
                      {/* <span className="mr-1 p-1 px-2 border-l border-gray-400 font-bold">
                        {e.likes} LIKES{" "}
                      </span> */}
                      <span className="mr-1 p-1 px-2 font-bold">
                      {l[0].toUpperCase()}
                              {l.substring(1).toUpperCase()}
                      </span>
                      <span className="mr-1 p-1 px-2 font-bold">
                      {getTotalPapersNumber(e, l)} Papers
                      </span>
                    </div>

                  
                        <div className="p-1">
                          <a className="inline-flex items-center py-1 px-2 text-sm font-medium text-center text-white bg-main rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Attempt
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
        </div>
)}
      </div>
    </DashboardLayout>
  );
};

export default VideoLessonsPage;
