/* eslint-disable @next/next/no-img-element */
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { VideoLessonContext } from "../../../presentation/contexts/video_lessons_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import { BiLike, BiDislike } from "react-icons/bi";
import {
  getCurrentDate,
  getTimeAgo,
  isBrowser,
  showToast,
} from "../../../presentation/utils/helper_functions";
import CommentModel from "../../../models/others/comments_models";
import { LoggedInUserContext } from "../../../presentation/contexts/loggedin_user_controller";
import CommentsRepo from "../../../data/repos/comments_repo";
import { useRouter } from "next/router";
import useravatar from "../../../assets/icons/userbg.png";
import VideoLessonRepo from "../../../data/repos/video_lessons_repo";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import VideoLessonModel, {
  InLessonQuiz,
  LessonNotes,
} from "../../../models/curriculum/video_lesson_model";
import draftToHtml from "draftjs-to-html";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { BsChatLeft } from "react-icons/bs";
import { CgDetailsMore, CgNotes } from "react-icons/cg";
import { MdOutlineSkipNext } from "react-icons/md";
import { IoIosShareAlt } from "react-icons/io";
import { GrChapterNext, GrChapterPrevious, GrFavorite } from "react-icons/gr";
import UserStatsRepo from "../../../data/repos/user_stats";
import PopupInLessonQuiz from "./components/popup_inlesson_quiz";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Worker, Viewer, ScrollMode, LoadError } from "@react-pdf-viewer/core";
import {
  AppThemeProvider,
  IsDarkThemeContext,
} from "../../../presentation/contexts/app_theme_controller";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);


const ViewVideoLessonsPage = () => {
  const { accountSubscription } = useContext(LoggedInUserContext);
  const SubStatus = accountSubscription[0] != undefined
   ? accountSubscription[0].isSubscriptionActive
     ? "Active"
     : "Ended"
   : "";
  const { lessons, setLessons } = useContext(VideoLessonContext);
  const {
    selectedVideoId,
    setSelectedVideoId,
    selectedVdocipher,
    setSelectedVdocipher,
    selectedForm,
    selectedSubject,
    setContinueVideo,
    continueVideo,
    setShowPremiumModal,
  } = useContext(NavigationContext);

  const [lesson, setLesson] = useState(
    lessons.filter((e) => e.videoId === selectedVideoId)[0]
  );

  const [currentStep, setCurrentStep] = useState(0);
  const components = [
    <OverviewComponent key="overview" />,
    <CommentsComponents
      key="comments"
      videoId={lesson == undefined ? "" : lesson.videoId}
    />,
    <PdfNotesComponent key={"notes"} notesUrl="" />,
    <StudyGroups key="groups" />,
    <NextLessonsComponent key="lessons" />,
  ];
  const router = useRouter();

  const [isLiked, setLiked] = useState(false);

  const likeVideo = async () => {
    try {
      let res = await VideoLessonRepo.addVideoLike(
        lesson == undefined ? "" : lesson.videoId
      );
      if (res) {
        let updatedLessons = lessons.map((e) => {
          if (e.videoId == lesson.videoId) {
            e.likes += 1;
          }
          return e;
        });
        setLessons(updatedLessons);
        setLiked(true);
        showToast("Video Liked", "success");
      }
    } catch (e) {}
  };
  const dislikeVideo = async () => {
    try {
      let res = await VideoLessonRepo.addVideoDisLike(
        lesson == undefined ? "" : lesson.videoId
      );
      if (res) {
        let updatedLessons = lessons.map((e) => {
          if (e.videoId == lesson.videoId) {
            e.disLikes += 1;
          }
          return e;
        });
        setLessons(updatedLessons);
        showToast("Video disliked", "success");
      }
    } catch (e) {}
  };
  const addVideoView = async () => {
    try {
      let sublessons = lessons.filter(
        (e) =>
          e.subjectType == lesson.subjectType &&
          e.classLevel == lesson.classLevel
      );
      let videoindex = sublessons.findIndex((e) => e.videoId == lesson.videoId);
      if (videoindex != -1 && videoindex != sublessons.length - 1) {
        setSelectedVideoId(sublessons[videoindex + 1].videoId);
        router.push("/dashboard/videos/topics");
        router.push("/dashboard/videos/view_lesson");
      }
      let res = await VideoLessonRepo.addVideoView(
        lesson == undefined ? "" : lesson.videoId
      );
      if (res) {
        let updatedLessons = lessons.map((e) => {
          if (e.videoId == lesson.videoId) {
            e.totalViews += 1;
          }
          return e;
        });
        setLessons(updatedLessons);
      }
    } catch (e) {}
  };

  // const logLesson = async () => {
  //   await setTimeout(() => {
  //     alert(`video url = ${lesson.videoUrl}`);
  //   }, 2000);
  // };
  useEffect(() => {
    if (continueVideo) {
      console.log(userStats[0].lastWatchedVideo);
      setLesson(userStats[0].lastWatchedVideo);

      let videoelement: any = document.getElementById("video");
      videoelement.currentTime = userStats[0].lastVideoTimeSecs;
      setContinueVideo(false);
    } else {
      updateStats(1, lesson);
    }

    () => {};
  }, []);
  const handleVideoMounted = (element: any) => {};

  const { userStats, setUserStats } = useContext(LoggedInUserContext);
  //view stats

  const updateStats = async (
    duration: number,
    currentLesson: VideoLessonModel
  ) => {
    try {
      let newStats = userStats[0];
      newStats.lastVideoTimeSecs = duration;
      newStats.lastWatchedVideo = currentLesson;
      let res = await UserStatsRepo.updateUserStats(newStats);
      if (res) {
        setUserStats([newStats]);
      }
    } catch (e) {}
  };

  const [showQuiz, setShowQuiz] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const stopVideo = () => {
    let videoelement: any = document.getElementById("video");
    // if (isFullScreen) {
    //   if (document.exitFullscreen) {
    //     document?.exitFullscreen();
    //   }
    // }
    videoelement?.webkitExitFullscreen();
    videoelement.pause();
    videoelement.currentTime = videoelement.currentTime + 1;
  };

  // const resumeVideo = () => {
  //   let videoelement: any = document.getElementById("video");
  //   videoelement.play();
  // };

  const getsubjectlessons = () => {
    let sublessons = lessons.filter(
      (e) =>
        e.classLevel === selectedForm &&
        e.subjectType.toLowerCase() === selectedSubject.toLowerCase()
    );

    let i = sublessons.findIndex((e) => e.videoId === selectedVideoId) - 3;
    i = Math.min(Math.max(0, i), sublessons.length - 5);
    return sublessons.slice(i, i + 7);
  };

  const checkForNextandPreviousLesson = () => {
    let sublessons = lessons.filter(
      (e) =>
        e.classLevel === selectedForm &&
        e.subjectType.toLowerCase() === selectedSubject.toLowerCase()
    );
    let i = sublessons.findIndex((e) => e.videoId === selectedVideoId);
    if (i == 0) {
      return [undefined, sublessons[i + 1]];
    } else if (i == sublessons.length - 1) {
      return [undefined, sublessons[i + 1]];
    } else {
      return [sublessons[i - 1], sublessons[i + 1]];
    }
  };
  // useEffect(() => {
  //   resumeVideo();
  // }, []);
  // vdocipher here
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<any[""]>([]);

  useEffect(() => {
      // fetch(`https://infinitersinvests.com/ANZA/anza_api?otp=${selectedVdocipher}`, {
        fetch(`https://zetlandsolutions.com/ANZA/anzaApi?otp=${selectedVideoId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
      })
        .then((res) => {
          res.json().then((response) => {
            setVideos(response)
          })
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  return (
    <DashboardLayout>
      <div
        onContextMenu={() => {}}
        className="flex-1 flex flex-col bg-gray-200  md:ml-44 relative min-h-screen py-16 w-full dark:bg-darksec "
      >
              {loading && (
          <div className="flex flex-col h-full w-full justify-center items-center">
            <LoadingComponent color="main" loading={loading} />
            <p className="py-1 text-xs">Your video is loading...</p>
          </div>
        )}


        {/* <div className="flex  items-start justify-start pl-5  md:pl-10">
          <div className="flex text-fuchsia-600 font-black text-xl text-left">
            {lesson == undefined ? "" : lesson.topicName}
          </div>
        </div> */}

        {/* popup questions */}
        {/* {lesson != undefined && showQuiz && (
          <PopupInLessonQuiz
            question={lesson.lessonQuizes[0]}
            showQuiz={showQuiz}
            setShowQuiz={setShowQuiz}
            resumeVideo={resumeVideo}
          />
        )} */}
  {!loading && (
        <div className=" flex justify-center md:justify-around  ">
          <div className="flex flex-1  flex-col md:m-1 md:mt-2">
            {/* <video
              id="video"
              onContextMenu={(e) => e.preventDefault()}
              autoPlay={true}
              onEnded={addVideoView}
              preload="none"
              onTimeUpdate={(e) => {
                if (parseInt(e.currentTarget.currentTime.toString()) > 50) {
                  if (lesson != undefined && lesson.lessonQuizes.length > 0) {
                    if (
                      parseInt(e.currentTarget.currentTime.toString()) ==
                      lesson.lessonQuizes[0].time
                    ) {
                      stopVideo();
                      setShowQuiz(true);
                      return;
                    }
                  }
                  if (
                    parseInt(e.currentTarget.currentTime.toString()) % 30 ==
                    0
                  ) {
                    updateStats(
                      parseInt(e.currentTarget.currentTime.toString()),
                      lesson
                    );
                  }
                }
              }}
              onLoadedMetadata={(e) => {
                console.log(e.currentTarget.duration);
              }}
              controls
              controlsList="nodownload noplaybackrate"
              className="  w-full  aspect-video object-cover   cursor-pointer md:border-2 dark:border-gray-700 border-gray-300 ]  bg-gray-800"
            >
              <source
                src={lesson == undefined ? "" : lesson.videoUrl}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video> */}
  {!loading && (
<div style={{ "paddingTop": "50.73%", "position": "relative" }}>
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videos.otp}&playbackInfo=${videos.playbackInfo}&primaryColor=008080`}
          style={{ "border": "0", "maxWidth": "100%", "position": "absolute", "top": "0", "left": "0", "height": "100%", "width": "100%" }}
          allow="encrypted-media"
          allowFullScreen={true}
          frameBorder={0}
        ></iframe>
      </div>
  )}

      


            <div className=" w-full  flex   items-center px-0 py-1">
              <div className="flex w-full  justify-between ml-1 mr-2">
                    {" "}
                    <p className="text-main text-lg dark:text-white font-black mt-1">
{lesson == undefined ? "" : lesson.title.toLowerCase().replace(/(?:^|\s)\S/g, (res) => {
                          return res.toUpperCase();
                        })}
                    </p>

                    <p className="px-4 text-md cursor-pointer mt-1 text-main dark-text-white">
                      {(videos.duration / 60).toFixed(0)} Mins 
                    </p>
              </div>
              
            </div>

            <div
              className="flex cursor-pointer h-4 mb-1 ml-1 hover:text-white items-center justify-left"
            >
            <p className="text-black text-md capitalize dark:text-white  font-normal mt-1">
            { lesson == undefined ? "" : lesson.chapter.toLowerCase().replace(/(?:^|\s)\S/g, (res) => {
                          return res.toUpperCase();
                        })}{" "}
                    </p>
            </div>


            <div
              className="flex cursor-pointer h-10 hover:text-white bg-gray-400 items-center text-sm justify-center"
              onClick={likeVideo}
            >
              {/* {lesson == undefined ? "" : lesson.likes}  */}
              Was it helpful ? Leave a like{" "}
              <BiLike size={30} className="cursor-pointer ml-2 mt-0" />
              <p className="text-xs ml-2.5"></p>
            </div>

      


            <div className="w-full flex justify-between px-2 md:px-5 mt-0">
              {checkForNextandPreviousLesson()[0] !== undefined ? (
                <div
                  onClick={() => {
                    router.push("/dashboard/videos/topics");
                    setTimeout(() => {
                      setSelectedVideoId(
                        checkForNextandPreviousLesson()[0]?.videoId!
                      );
                      setSelectedVdocipher(
                        checkForNextandPreviousLesson()[0]?.vidCipherId!
                      );
                      router.push("/dashboard/videos/view_lesson");
                    }, 10);
                  }}
                  className={`flex mt-1 w-40  flex-col border-2 rounded-lg p-2 hover:text-main hover:border-main hover:font-semibold hover:dark:border-main border-gray-400  dark:border-gray-700 transition-all cursor-pointer
                ${
                    SubStatus == "Active" ? "" : "hidden"
                } 
                  `}
                >
                  <p className="justify-left  text-main font-normal text-md">
                    {" "}
                    Previous Lesson
                  </p>

                  <p className="text-[12px] font-normal">
                    {checkForNextandPreviousLesson()[0]?.topicName.toLowerCase().replace(/(?:^|\s)\S/g, (res) => {
                          return res.toUpperCase();
                        })}
                  </p>
                </div>
              ) : (
                <div className="flex  w-40"></div>
              )}
              {checkForNextandPreviousLesson()[1] != undefined ? (
                <div

                onClick={() => {
                  router.push("/dashboard/videos/topics");
                  setTimeout(() => {
                    setSelectedVideoId(
                      checkForNextandPreviousLesson()[1]?.videoId!
                    );
                    setSelectedVdocipher(
                      checkForNextandPreviousLesson()[1]?.vidCipherId!
                    );
                    router.push("/dashboard/videos/view_lesson");
                  }, 10);
                }}
                
                  className={`flex  w-40 mt-1 flex-col border-2 rounded-lg p-2 hover:text-main hover:border-main hover:font-semibold hover:dark:border-main border-gray-400  dark:border-gray-700 transition-all cursor-pointer
             ${
                  SubStatus == "Active" ? "" : "hidden"
              } 
                `}
                >
                  <p className="justify-center items-center text-center font-normal text-main text-md">
                    {" "}
                    Next Lesson
                  </p>
                </div>
              ) : (
                <div className="flex  w-40"></div>
              )}
            </div>

            <div className=" w-full  flex  justify-end items-center px-4 mt-2 pb-1">
              {/* <p className="text-xs  ">
                By {lesson == undefined ? "" : lesson.teacherName}
              </p> */}
              {/* <div className="flex space-x-1 text-sm">
                <p>{lesson == undefined ? "" : lesson.totalViews}</p>
                <p className="">Views</p>
              </div> */}
            </div>





            <div className="flex flex-col">
              <div className="h-12  w-full flex items-center">
                <div
                  onClick={() => {
                    if (isBrowser()) {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      });
                    }
                    setCurrentStep(0);
                  }}
                  className={` ${
                    currentStep == 0
                      ? "text-dark bg-main dark:bg-darkmain border-main border-b-4"
                      : ""
                  }  flex justify-center items-center cursor-pointer  transition-all  h-full flex-col  flex-1 `}
                >
                  <p className=" cursor-pointer  text-sm "> Lesson Notes</p>
                </div>
                <div
                  onClick={() => {
                    // if (isBrowser()) {
                    //   window.scrollTo({
                    //     top: 0,
                    //     left: 0,
                    //     behavior: "smooth",
                    //   });
                    // }
                    setCurrentStep(1);
                  }}
                  className={` ${
                    currentStep == 1
                      ? "text-dark bg-main dark:bg-darkmain border-main border-b-4"
                      : ""
                  }  flex justify-center items-center  transition-all cursor-pointer flex-col  h-full flex-1 `}
                >
                  <p className=" cursor-pointer  text-sm ">
                    {" "}
                    Comments / Ask a Quiz
                  </p>
                </div>
              </div>

              <div className="bg-gray-300 dark:bg-gray-700 dark:border-opacity-70  h-0.5 w-full text-main"></div>
              {components[currentStep]}
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center px-5 w-[220px] shadow-2xl overflow-y-auto overflow-x-hidden h-screen ">
            <div className=" flex  justify-center items-center">
              <p className="text-xl font-bold  text-main p-1">NEXT LESSONS</p>
            </div>
            {
              // lessons.filter((e) => e.subjectType === lesson.subjectType)

              lessons.filter(
                (e) =>
                  e.classLevel === selectedForm &&
                  e.subjectType.toLowerCase() === selectedSubject.toLowerCase()
              ).length < 2 && (
                <div className="h-96 flex justify-center items-center flex-col ">
                  <p>No Next Lessons</p>
                </div>
              )
            }
            {lesson != undefined &&
              lessons.filter((e) => e.subjectType === lesson.subjectType)
                .length > 2 &&
              // getsubjectlessons()
              lessons.filter((e) => e.subjectType === lesson.subjectType)
                .map((e, i) => (
                  <motion.div
                    onClick={() => {
                      if(SubStatus == "Ended"){
                      if (i == 0) {
                        if (selectedVideoId == e.videoId) {
                          showToast("Video currently playing.", "success");
                          return;
                        }
                        router.push("/dashboard/videos/topics");
                        setTimeout(() => {
                          setSelectedVideoId(e.videoId);
                          setSelectedVdocipher(e.vidCipherId);
                          router.push("/dashboard/videos/view_lesson");
                        }, 10);
                      } else {
                      MySwal.clickConfirm();
                      setShowPremiumModal(true);
                      }
                      }else if(SubStatus == "Active"){
                        if (selectedVideoId == e.videoId) {
                          showToast("Video currently playing.", "success");
                          return;
                        }
                        router.push("/dashboard/videos/topics");
                        setTimeout(() => {
                          setSelectedVideoId(e.videoId);
                          setSelectedVdocipher(e.vidCipherId);
                          router.push("/dashboard/videos/view_lesson");
                        }, 10);
                      }
                      }}


                    key={i}
                    className={`w-[180px] min-h-28 mb-6 hover:ring-2 shadow-md  bg-white dark:bg-darkmain  cursor-pointer   ${
                      e.videoId == selectedVideoId
                        ? "ring-2 ring-green-800"
                        : ""
                    } `}
                  >
                    {/* <video
                      onContextMenu={(e) => {
                        e.preventDefault();
                      }}
                      preload="metadata"
                      height={96}
                      poster={e.thumbnailUrl}
                      controlsList="nodownload noplaybackrate"
                      className="rounded-lg"
                    >
                      <source src={e.videoUrl} type="video/mp4" />
                    </video> */}
                    <img
                      src={`https://anzaacademy.co/anzaapi/view_thumbnail/lesson/${e.thumbnailUrl.split("view_thumbnail/lesson/")[1]}`}
                      alt="image missing"
                      className="h-24"
                    />
                    <p className="p-2 text-xs font-bold-700 dark:text-white ">
                      {e.title.replace(/(?:^|\s)\S/g, (res) => {
                        return res.toUpperCase();
                      })}
                    </p>
                  </motion.div>
                ))}
          </div>
        </div>
  )}
      </div>
    </DashboardLayout>
  );
};

export default ViewVideoLessonsPage;

const StudyGroups = () => {
  const { lessons, setLessons } = useContext(VideoLessonContext);
  const { selectedVideoId, setSelectedVideoId, selectedSubject, selectedForm } =
    useContext(NavigationContext);
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-96 w-full items-center">
      <div className=" flex  items-center  justify-center ">
        <p className="text-xl font-bold  text-main p-1">Next Lessons</p>
      </div>
      {
        // lessons.filter((e) => e.subjectType === lesson.subjectType)

        lessons.filter(
          (e) =>
            e.classLevel === selectedForm &&
            e.subjectType.toLowerCase() === selectedSubject.toLowerCase()
        ).length < 2 && (
          <div className="h-96 flex  items-center justify-center flex-col ">
            <p>No Next Lessons</p>
          </div>
        )
      }
      {
        // lessons.filter((e) => e.subjectType === lesson.subjectType)
        //   .length > 2 &&
        lessons
          .filter(
            (e) =>
              e.classLevel === selectedForm &&
              e.subjectType.toLowerCase() === selectedSubject.toLowerCase()
          )
          .filter((e) => e.videoId != selectedVideoId)
          .map((e, i) => (
            <div
              onClick={() => {
                router.push("/dashboard/videos/topics");
                setSelectedVideoId(e.videoId);
                router.push("/dashboard/videos/view_lesson");
              }}
              key={i}
              className="w-72  rounded-xl my-3  bg-white   dark:bg-darkmain cursor-pointer  "
            >
              <img
                src={`https://anzaacademy.co/anzaapi/view_thumbnail/lesson/${e.thumbnailUrl.split("view_thumbnail/lesson/")[1]}`}
                alt="image missing"
                className="rounded-lg"
              />
              <p className="p-2 text-sm">{e.title}</p>
            </div>
          ))
      }
    </div>
  );
};

const OverviewComponent = () => {
  const { lessons, setLessons } = useContext(VideoLessonContext);
  const { selectedVideoId, setSelectedVideoId } = useContext(NavigationContext);

  const lesson = lessons.filter((e) => e.videoId === selectedVideoId)[0];

  return (
    <div className="flex  w-full      justify-between  flex-col dark:bg-darksec   dark:bg-opacity-90  ">
      <div className="flex px-3 md:space-x-3 items-center justify-between w-full py-5">
        <img
          src={useravatar.src}
          alt="avatar not found"
          className="w-14 h-14 bg-main rounded-full p-1"
        />

        <div className="flex flex-col m-1">
          <p
            className="font-black text-base"
            style={{ fontFamily: "Montserrat", fontWeight: 900 }}
          >
            Instructor
          </p>
          <p className="text-xs">
            Tr. {lesson == undefined ? "default" : lesson.teacherName}
          </p>
          <p className="text-[10px]"> Anza Academy.</p>
          {/* <p
            className="my-2 text-left pl-4 text-blue-800 cursor-pointer"
            style={{ fontFamily: "Montserrat", fontWeight: 900 }}
          >
            + Follow
          </p> */}
        </div>
        <div className="flex-1"></div>
        <div className="hidden flex-col md:mt-4">
          <div className="flex space-x-3 items-center">
            <p
              className="font-black text-sm"
              style={{ fontFamily: "Montserrat", fontWeight: 900 }}
            >
              Topic Quizzes
            </p>
            <p
              className="font-black text-xs  text-blue-500 cursor-pointer"
              style={{ fontFamily: "Montserrat", fontWeight: 900 }}
            >
              Attempt
            </p>
          </div>
          <div className="hidden md:flex space-x-3 items-center">
            <p
              className="font-black text-sm"
              style={{ fontFamily: "Montserrat", fontWeight: 900 }}
            >
              Lesson resources
            </p>
            <p
              className="font-black  text-xs text-blue-500 cursor-pointer"
              style={{ fontFamily: "Montserrat", fontWeight: 900 }}
            >
              Download
            </p>
          </div>
        </div>
      </div>
      <div className="flex mt-4 flex-col  md:w-[450px]  pb-6 ml-20">
        <p>{lesson == undefined ? "" : lesson.lessonBrief}</p>
      </div>
      {lesson != undefined && lesson.notesId && (
        <PdfNotesComponent notesUrl={lesson.notesId} />
      )}
    </div>
  );
};

const CommentsComponents = (props: PropsWithChildren<{ videoId: string }>) => {
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [comment, setComment] = useState("");
  const { user } = useContext(LoggedInUserContext);
  const [allComments, setAllComments] = useState<CommentModel[]>([]);
  const [commentReplies, setCommentReplies] = useState<CommentModel[]>([]);
  const [showReplies, setShowReplies] = useState(false);
  const [selectedCommentId, setSelectedCommentid] = useState("");
  const getCommentsForThisVideo = async () => {
    setLoading(true);
    try {
      let res = await CommentsRepo.getVideoLessonComments(props.videoId);
      setAllComments(res);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const getCommentReplies = async () => {
    setLoadingReplies(true);
    try {
      let res = await CommentsRepo.getVideoLessonComments(selectedCommentId);
      setCommentReplies(res);
    } catch (e) {
    } finally {
      setLoadingReplies(false);
    }
  };
  useEffect(() => {
    getCommentsForThisVideo();
  }, []);

  const addComment = async () => {
    if (loading) {
      return;
    }
    if (comment === "") {
      showToast("Comment is required ", "error");
      return;
    }

    try {
      setLoading(true);
      const newcomment = new CommentModel(
        "",
        props.videoId,
        user[0].userName === ""
          ? `user${parseInt(String(Math.random() * 1000))}`
          : user[0].userName,
        comment,
        getCurrentDate(),
        user[0].userId,
        false,
        0,
        0,
        0
      );
      let res = await CommentsRepo.addVideoComment(newcomment);
      setAllComments([res, ...allComments]);
      setComment("");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  };
  const openCommentReply = (id: string) => {
    setShowReplies(!showReplies);
    setSelectedCommentid(id);
    getCommentReplies();
  };
  const likeComment = async (id: string, isreply: boolean) => {
    try {
      let res = await VideoLessonRepo.addVideoLike(id);
      if (res) {
        if (isreply) {
          let updatedComments = commentReplies.map((e) => {
            if (e.commentId == id) {
              e.likes += 1;
            }
            return e;
          });
          setCommentReplies(updatedComments);
        } else {
          let updatedComments = allComments.map((e) => {
            if (e.commentId == id) {
              e.likes += 1;
            }
            return e;
          });
          setAllComments(updatedComments);
        }
        showToast("Liked", "success");
      }
    } catch (e) {}
  };
  const dislikeComment = async (id: string, isreply: boolean) => {
    try {
      let res = await VideoLessonRepo.addVideoDisLike(id);
      if (res) {
        if (isreply) {
          let updatedComments = commentReplies.map((e) => {
            if (e.commentId == id) {
              e.dislikes += 1;
            }
            return e;
          });
          setCommentReplies(updatedComments);
        } else {
          let updatedComments = allComments.map((e) => {
            if (e.commentId == id) {
              e.dislikes += 1;
            }
            return e;
          });
          setAllComments(updatedComments);
        }
        showToast("Disliked", "success");
      }
    } catch (e) {}
  };
  return (
    <div className="flex flex-col justify-center transition-all duration-150 pt-3  md:w-[75%]">
      <div className="flex items-start pb-8 ">
        <div className="flex justify-center items-center bg-main text-white font-bold p-3 rounded-full w-10 h-10">
          <p className="text-xl">K</p>
        </div>
        <div className="w-2"></div>

        <div
          onFocus={() => setFocused(true)}
          className="flex flex-col flex-1 m-1 ml-0 mr-2  "
        >
          <div className="mb-5">
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="content"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment or ask a question..."
            ></textarea>
          </div>
          <div
            className={`py-2 flex justify-end text-xs ${
              focused ? "" : "hidden"
            }`}
          >
            <div
              onClick={() => setFocused(false)}
              className="px-4 py-1.5 cursor-pointer bg-gray-300 mr-3 rounded-lg dark:bg-darkmain"
            >
              CANCEL
            </div>
            <div
              onClick={addComment}
              className="px-4 py-1.5 cursor-pointer bg-main text-white rounded-lg "
            >
              COMMENT
            </div>
          </div>
        </div>
      </div>
      {allComments.length < 1 && (
        <div className="flex flex-col ml-10 h-24 items-left justify-left ">
          <p>No Comments Found.</p>
          <p className="text-xs">Be the first to comment or ask a question.</p>
        </div>
      )}
      {allComments.length > 0 &&
        allComments.map((e, i) => {
          return (
            <div key={i} className="fle px-3">
              <div className="flex justify-center items-center bg-main text-white font-bold px-3 rounded-full w-9 h-9">
                <p className="text-lg">{e.userName[0].toUpperCase()}</p>
              </div>
              <div className="w-3"></div>
              <div className="flex flex-col">
                <div className="flex  items-center">
                  <p className="font-black text-sm">{e.userName}</p>
                  <div className="w-3"></div>
                  <p className="text-[10px]">{getTimeAgo(e.createdAt)}</p>
                </div>
                <p className="py-1 tracking-tighter text-sm">{e.comment}</p>
                <div className="flex space-x-4 py-1">
                  <div className="flex">
                    <BiLike
                      className="cursor-pointer hover:bg-white"
                      onClick={() => likeComment(e.commentId, false)}
                    />
                    <p className="text-xs ml-1.5">{e.likes + 1}</p>
                  </div>
                  <div className="flex">
                    <BiDislike
                      className="cursor-pointer hover:bg-white"
                      onClick={() => dislikeComment(e.commentId, false)}
                    />
                    <p className="text-xs ml-1.5">{e.dislikes}</p>
                  </div>
                  <p
                    className="px-4 text-xs cursor-pointer"
                    onClick={() => showToast("Coming soon", "success")}
                  >
                    REPLY
                  </p>
                </div>
                <div
                  className={`pt-1 flex justify-start text-xs ${
                    true ? "" : "hidden"
                  }`}
                >
                  <div
                    onClick={() => {
                      openCommentReply(e.commentId);
                    }}
                    className="px-4  cursor-pointer text-blue-500 text-base rounded-lg font-black flex items-center space-x-2"
                  >
                    {showReplies && selectedCommentId == e.commentId ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6  "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    )}
                    <p style={{ fontFamily: "Montserrat" }}>
                      {" "}
                      {showReplies && selectedCommentId == e.commentId
                        ? "Hide "
                        : "View "}
                      {e.totalReplies > 1
                        ? ` ${e.totalReplies} replies`
                        : " reply"}
                    </p>
                  </div>
                </div>
                `{" "}
                <div
                  className={`min-h-32 flex flex-col  w-full mx-4 py-1 ${
                    showReplies && selectedCommentId == "" ? "" : "hidden"
                  }`}
                >
                  {commentReplies.map((e, i) => {
                    return (
                      <div key={`reply ${i}`} className="flex w-full py-1">
                        <div className="flex justify-center items-center bg-main text-white font-bold p-3 rounded-full w-9 h-9 ">
                          <p className="text-lg">
                            {e.userName[0].toUpperCase()}
                          </p>
                        </div>
                        <div className="w-3"></div>
                        <div className="flex flex-col">
                          <div className="flex  items-center">
                            <p className="font-black text-sm">{e.userName}</p>
                            <div className="w-3"></div>
                            <p className="text-[10px]">
                              {getTimeAgo(e.createdAt)}
                            </p>
                          </div>
                          <p className="py-1 tracking-tighter text-sm">
                            {e.comment}
                          </p>
                          <div className="flex space-x-4 py-2">
                            <div className="flex">
                              <BiLike
                                className="cursor-pointer hover:bg-white"
                                onClick={() => likeComment(e.commentId, true)}
                              />
                              <p className="text-xs ml-1.5">{e.likes + 1}</p>
                            </div>
                            <div className="flex">
                              <BiDislike
                                className="cursor-pointer hover:bg-white"
                                onClick={() =>
                                  dislikeComment(e.commentId, true)
                                }
                              />
                              <p className="text-xs ml-1.5">{e.dislikes}</p>
                            </div>
                            {/* <p
                                className="px-4 text-xs cursor-pointer"
                                onClick={() =>
                                  showToast("comming soon", "success")
                                }
                              >
                                REPLY
                              </p> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

const NextLessonsComponent = () => {
  return (
    <div>
      <p>This is the next lessons component</p>
    </div>
  );
};

const NotesComponent = () => {
  const { lessons, setLessons } = useContext(VideoLessonContext);
  const { selectedVideoId, setSelectedVideoId } = useContext(NavigationContext);

  const lesson = lessons.filter((e) => e.videoId === selectedVideoId)[0];
  const [lessonNotes, setLesssonNotes] = useState<LessonNotes[]>([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loadingNotes, setLoadingNotes] = useState(false);

  const [editorContentHtml, setEditorContentHtml] = useState(
    stateToHTML(editorState.getCurrentContent())
  );
  const getLessonNotes = async () => {
    setLoadingNotes(true);

    try {
      let dbnotes = await VideoLessonRepo.getLessonNotes(
        lesson != undefined ? lesson.videoId : ""
      );

      if (dbnotes.length > 0) {
        setEditorState(
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(dbnotes[0].notes))
          )
        );
      }
      setLesssonNotes(dbnotes);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoadingNotes(false);
    }
  };
  useEffect(() => {
    getLessonNotes();
  }, []);
  return (
    <div>
      {loadingNotes ? (
        <div className="flex h-96 px-2 items-center justify-center">
          <LoadingComponent loading={loadingNotes} color="secondary" />
        </div>
      ) : (
        <p
          className="px-4 "
          dangerouslySetInnerHTML={{
            __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
          }}
        />
      )}
    </div>
  );
};

const PdfNotesComponent = (props: PropsWithChildren<{ notesUrl: string }>) => {
  const { thememode } = useContext(IsDarkThemeContext);

  const renderError = (error: LoadError) => {
    let message = "";
    switch (error.name) {
      case "InvalidPDFException":
        message = "The document is invalid or corrupted";
        break;
      case "MissingPDFException":
        message = "The document is missing";
        break;
      case "UnexpectedResponseException":
        message = "Unexpected server response";
        break;
      default:
        message = "Cannot load the document";
        break;
    }

    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#e53e3e",
            borderRadius: "0.25rem",
            color: "#fff",
            padding: "0.5rem",
          }}
        >
          {message}
        </div>
      </div>
    );
  };
  return (
    <div className="w-full h-full flex  items-center">
      <iframe
        src={`https://anzaacademy.co/anzaapi/notes/pdf_notes/${props.notesUrl}#toolbar=0`}
        // type="application/pdf"
        // frameBorder="0"
        // scrolling="auto"

        height="100%"
        width="100%"
        className="hidden md:flex"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
          height: "750px",
        }}
      ></iframe>

      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js">
        {/* <div className=" flex flex-col bg-gray-200  dark:bg-darksec  relative py-16 items-center "> */}
        {/* <div className="flex h-12 items-center justify-center pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg md:text-2xl">
            {selectedVideoId === "" ? "" : paper.title}
          </div>
        </div> */}

        <div
          className="  w-full z-0 flex md:hidden"
          style={{
            border: "1px solid rgba(0, 0, 0, 0.3)",
            height: "750px",
          }}
        >
          <Viewer
            // onDocumentLoad={async (e) => {
            //   if (pdffile.length < 10) {
            //     let pdfdoc = await e.doc.getData();
            //     setPdffile(pdfdoc);
            //   }
            // }}

            fileUrl={`https://anzaacademy.co/anzaapi/notes/pdf_notes/${props.notesUrl}#toolbar=0`}
            theme={thememode == "light" ? "" : "dark"}
            initialPage={0}
            renderError={renderError}
            // onPageChange={(e) => {
            //   setPaperPage(e.currentPage);
            // }}
          />
          {/* </div> */}
        </div>
      </Worker>
    </div>
  );
};

// https://anzaacademy.co/anzaapi/view_past_paper/2928651b-3f6c-4b3b-b04b-f4d85011a366.pdf
