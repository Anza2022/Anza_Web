/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import VideoLessonModel from "../../../models/curriculum/video_lesson_model";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { VideoLessonContext } from "../../../presentation/contexts/video_lessons_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import { MdLiveTv, MdOutlineQuiz } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { AiOutlineCloudDownload, AiTwotoneLock } from "react-icons/ai";
import { MdGroupAdd } from "react-icons/md";
import { BsEmojiSunglasses } from "react-icons/bs";
import { showToast } from "../../../presentation/utils/helper_functions";
import { MdArrowDropDown, MdOutlineArrowRight } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import playbutton from "../../../assets/icons/play.png";
import { LoggedInUserContext } from "../../../presentation/contexts/loggedin_user_controller";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ImUnlocked } from "react-icons/im";
const MySwal = withReactContent(Swal);

const SubjectTopicsPage = () => {
  const router = useRouter();
  const { accountSubscription } = useContext(LoggedInUserContext);
  const SubStatus =
    accountSubscription[0] != undefined
      ? accountSubscription[0].isSubscriptionActive
        ? "Active"
        : "Ended"
      : "";
  const [selecteChapter, setSelectedChapter] = useState("demo");
  const [topicsState, setTopicsState] = useState<boolean[]>(
    Array(100).fill(false)
  );
  function openTopic(index: number) {
    if (topicsState[index]) {
      let newstate = Array(100).fill(false);
      setTopicsState(newstate);
    } else {
      let newstate = Array(100).fill(false);
      newstate[index] = true;
      setTopicsState(newstate);
    }
  }
  const {
    setShowPremiumModal,
    selectedForm,
    selectedSubject,
    setSelectedVdocipher,
    setSelectedVideoId,
  } = useContext(NavigationContext);
  const [showJoin, setShowJoin] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const { lessons } = useContext(VideoLessonContext);
  const getTopics = (c: string): VideoLessonModel[] => {
    let set = new Set(
      lessons
        .filter((f) => f.chapter.toLowerCase() === c)
        .map((e) => e.topicName.toLowerCase())
    );

    return lessons.filter(
      (e) =>
        e.chapter.toLowerCase() == c &&
        e.classLevel.toLowerCase() == selectedForm.toLowerCase() &&
        e.subjectType.toLowerCase() == selectedSubject.toLowerCase()
    );
  };
  const getChapters = () => {
    let set = new Set(
      lessons
        .filter(
          (e) =>
            e.classLevel === selectedForm &&
            e.subjectType.toLowerCase() === selectedSubject.toLowerCase()
        )
        .map((e) => e.chapter.toLowerCase())
    );
    return Array.from(set);
  };
  return (
    <DashboardLayout>
      <div className="flex w-full ">
        <div className="flex-1 flex flex-col bg-gray-200  md:ml-44 relative  py-16 w-full items-center mt-12 justify-between dark:bg-darksec">
          <div className="flex  items-center justify-start z-9  pl-5  md:pl-10 w-full h-12 fixed left-0 md:left-44 top-16 shadow-2xl bg-gray-300 dark:bg-darksec ">
            {/* <BackButton /> */}
            <div
              className="flex text-main font-black text-2xl text-center justify-center "
              style={{ fontFamily: "Montserrat" }}
            >
              {selectedForm[0].toUpperCase() +
                selectedForm.substring(1).toUpperCase()}
              <span className="mx-0.5"></span>
              {selectedSubject[0].toUpperCase() +
                selectedSubject.substring(1).toUpperCase()}{" "}
              <span className="mx-0.5"></span>
            </div>
          </div>
          {getChapters().length < 1 ? (
            <div>
              <p>No Topics</p>
            </div>
          ) : (
            getChapters().map((c, t) => (
              <div
                key={t}
                className="flex flex-col w-full justify-start md:ml-14 "
              >
                <p className="text-purple-600 font-bold text-xl mt-3 ml-3">
                  {c[0] != undefined ? c[0].toUpperCase() : ""}
                  {c[0] != undefined ? c.substring(1).toUpperCase() : ""}
                </p>

                {Array.from(
                  new Set(
                    getTopics(c).map((e) => e.topicName.toLowerCase().trim())
                  )
                ).map((e, m) => (
                  <div
                    key={m}
                    className={`flex flex-col  w-full   cursor-pointer  p-0.5  ${
                      selectedTopic == e
                        ? " border-2 border-main border-opacity-30"
                        : ""
                    } `}
                  >
                    <div
                      onClick={() => {
                        setSelectedChapter(c);
                        if (selectedTopic === e) {
                          setSelectedTopic("demo");
                        } else {
                          setSelectedTopic(e);
                        }
                        openTopic(m);
                      }}
                      className={`flex space-x-2  hover:bg-gray-100  p-0.5 pl-6 items-center dark:hover:bg-darkmain  ${
                        selectedTopic == e
                          ? " bg-gray-100  dark:bg-darkmain"
                          : ""
                      } `}
                    >
                      {/* <div className="w-2 h-2 bg-black rounded-full mr-0 "></div> */}
                      {selectedTopic != e ? (
                        <MdOutlineArrowRight size={35} />
                      ) : (
                        <MdArrowDropDown size={35} color="teal" />
                      )}

                      <p
                        className={`${
                          selecteChapter == c && selectedTopic == e
                            ? "text-main font-bold "
                            : ""
                        }`}
                      >
                        {e.replace(/(?:^|\s)\S/g, (res) => {
                          return res.toUpperCase();
                        })}
                      </p>
                    </div>
                    <AnimatePresence>
                      {e.toLowerCase() === selectedTopic.toLowerCase() && (
                        <motion.div
                          initial={{ opacity: 0.3 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.7 }}
                          // exit={{ opacity: 0.8 }}
                          className={`flex   bg-gray-100 w-full  flex-wrap    dark:bg-darkmain pl-10 `}
                        >
                          <div className="flex flex-no-wrap overflow-x-scroll scroll-smooth scrolling-touch  ">
                            {lessons
                              .filter(
                                (l) =>
                                  l.chapter.toLowerCase() == c.toLowerCase() &&
                                  l.topicName.toLowerCase() ==
                                    selectedTopic.toLowerCase()
                              )
                              .map((e, i) => (
                                <motion.div
                                  initial={{ translateX: 15 }}
                                  animate={{ translateX: 0 }}
                                  transition={{
                                    duration: 0.7,
                                    delay: 0.1 * i,
                                    ease: "easeOut",
                                  }}
                                  onClick={() => {
                                    if (SubStatus == "Ended") {
                                      if (m == 0 && t == 0 && i == 0) {
                                        MySwal.clickConfirm();  
                                          setSelectedVideoId(e.videoId);
                                          setSelectedVdocipher(e.vidCipherId);
                                        router.push(
                                          "/dashboard/videos/view_lesson"
                                        );
                                      } else {
                                        MySwal.clickConfirm();
                                        setShowPremiumModal(true);
                                      }
                                    } else if (SubStatus == "Active") {
                                      setSelectedVideoId(e.videoId);
                                      setSelectedVdocipher(e.vidCipherId);
                                      router.push( 
                                        "/dashboard/videos/view_lesson"
                                      );
                                    }
                                  }}
                                  key={i}
                                  className="flex-none w-2/3 md:w-1/3 mr-10 md:pb-4  group"
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
                                          className="w-full"
                                          src={e.thumbnailUrl}
                                          alt=""
                                        />
                                      </div>
                                    </a>

                                    <div className="badge  bg-gray-100 absolute top-0 right-0 dark:bg-darkmain m-1 p-1 px-2 text-xs font-bold rounded text-main">
                          {SubStatus == "Active" ? (
                            <ImUnlocked color="green" size={21} />
                          ) : SubStatus == "Ended" && m >  0 || t > 0 || i > 0 ?  (
                            <AiTwotoneLock color="red" size={21} />
                          ): "PLAY"}
                        </div>
                        
                                  </div>
                                  <div className="desc p-1 text-gray-800 cursor-pointer mt-2 mb-2">
                                    <a className="title font-normal text-sm dark:text-white block cursor-pointer  ">
                                      {e.title.replace(/(?:^|\s)\S/g, (res) => {
                                        return res.toUpperCase(); 
                                      })}
                            
                                    </a>
                                  </div>
                                </motion.div>
                              ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
        {/* <div className="flex w-10 bg-pink-500"></div> */}
        <div
          className={`hidden     md:flex flex-col w-72 z-40 h-screen border-2 bg-gray-200  border-gray-300 shadow-2xl sticky top-16 dark:bg-darksec dark:border-gray-800 `}
        >
          <video
            onContextMenu={(e) => e.preventDefault()}
            // autoPlay
            onChange={(e) => {}}
            onChangeCapture={(e) => {}}
            controls
            id="myVideo"
            disablePictureInPicture
            controlsList="nodownload noplaybackrate"
            className=" md:h-[195px]  shadow-xl hover:shadow-2xl cursor-pointer  drop-shadow-2xl  bg-gray-800"
          >
            <source
              src={
                lessons !== undefined && lessons.length > 1
                  ? lessons.filter(
                      (e) =>
                        e.classLevel.toLowerCase() ==
                          selectedForm.toLowerCase() &&
                        e.subjectType.toLowerCase() ==
                          selectedSubject.toLowerCase()
                    )[0].videoUrl
                  : ""
              }
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="flex flex-col pl-4 mt-2">
            <div className="flex justify-end w-full">
              <div
                onClick={() => showToast("Study Groups Coming Soon", "success")}
                className="px-5 py-1 cursor-pointer   rounded-lg relative"
              >
                <MdGroupAdd
                  size={25}
                  className="hover:text-main"
                  onMouseEnter={() => setShowJoin(true)}
                  onMouseLeave={() => setShowJoin(false)}
                />
                <div
                  className={`absolute top-2 -left-24 text-xs text-main dark:text-white ${
                    showJoin ? "flex" : "hidden"
                  } `}
                >
                  Join study group
                </div>
              </div>
            </div>
            <p className="font-bold text-main">This course includes:</p>
            <div className="flex flex-col pl-5">
              <div className="flex space-x-2 py-1 text-sm pl-6 items-left justify-left">
                <MdLiveTv size={15} />

                <p> Animated videos</p>
              </div>{" "}
              <div className="flex space-x-2 py-1 text-sm pl-6 items-center">
                <MdOutlineQuiz size={15} />
                <p>Past Papers</p>
              </div>
              <div className="flex space-x-2 py-1 text-sm pl-6 items-center">
                {" "}
                <CgNotes size={15} />
                <p> Simplified lesson notes</p>
              </div>
              {/* <div className="flex space-x-2 py-1 text-sm pl-6 items-center">
                {" "}
                <AiOutlineCloudDownload size={15} />
                <p> 2 Downloadable Resources</p>
              </div>
              <div className="flex space-x-2 py-1 text-sm pl-6 items-center">
                {" "}
                <MdGroupAdd size={15} />
                <p> Study group</p>
              </div> */}
              <div className="flex space-x-2 py-1 text-sm pl-6 items-center">
                {" "}
                <BsEmojiSunglasses size={15} />
                <p> Interactive topical quizes</p>
              </div>{" "}
            </div>{" "}
          </div>
          <div className="mt-5 flex justify-start px-5">
            <div
              onClick={() => showToast("Coming soon", "success")}
              className="px-5 py-1 cursor-pointer bg-main text-white rounded-md"
            >
              Share
            </div>{" "}
            <div className="w-5"></div>
            {/* <div
              onClick={() => router.push("/dashboard/videos")}
              className="px-5 py-1 cursor-pointer bg-main text-white rounded-lg"
            >
              Subjects
            </div> */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubjectTopicsPage;
