import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import VideoLessonRepo from "../../../data/repos/video_lessons_repo";
import VideoLessonModel, {
  InLessonQuiz,
  LessonNotes,
} from "../../../models/curriculum/video_lesson_model";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { VideoLessonContext } from "../../../presentation/contexts/video_lessons_controller";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  classOptions,
  subjectOptions,
} from "../../../presentation/utils/constants";
import {
  getCurrentDate,
  isBrowser,
  showToast,
} from "../../../presentation/utils/helper_functions";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { EditorProps } from "react-draft-wysiwyg";
import dynamic from "next/dynamic";
const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { stateToHTML } from "draft-js-export-html";
import axiosInstance from "../../../data/services/axios_client";
import { LoggedInUserContext } from "../../../presentation/contexts/loggedin_user_controller";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { BsFillCheckCircleFill } from "react-icons/bs";

const AdminUpdateLessonPage = () => {
  const { selectedVideoId } = useContext(NavigationContext);
  const { lessons, setLessons } = useContext(VideoLessonContext);

  const [lesson, setLesson] = useState<VideoLessonModel>(
    lessons.filter((e) => e.videoId === selectedVideoId)[0]
  );

  // useEffect(() => {
  //   setLesson(lessons.filter((e) => e.videoId === selectedVideoId)[0]);
  // }, []);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(lesson != undefined ? lesson.title : "");
  const [classLevel, setClassLevel] = useState(
    lesson != undefined ? lesson.classLevel : ""
  );
  const [subjectType, setSubjectType] = useState(
    lesson != undefined ? lesson.subjectType : ""
  );
  const [topicName, setTopicName] = useState(
    lesson != undefined ? lesson.topicName : ""
  );
  const [teacherName, setTeacherName] = useState(
    lesson != undefined ? lesson.teacherName : ""
  );
  const [totalViews, setTotalViews] = useState(
    lesson != undefined ? lesson.totalViews : 100
  );
  const [topicPriority, setTopicPriority] = useState(
    lesson != undefined ? lesson.topicPriority : 0
  );
  const [videoPriority, setVideoPriority] = useState(
    lesson != undefined ? lesson.videoPriority : 0
  );
  const [commentsOff, setCommentsOff] = useState(
    lesson != undefined ? lesson.commentsOff : false
  );
  const [isPublished, setIsPublished] = useState(
    lesson != undefined ? lesson.isPublished : false
  );
  const [isPractical, setIsPractical] = useState(
    lesson != undefined ? lesson.isPractical : false
  );
  const [videoUrl, setVideoUrl] = useState(
    lesson != undefined ? lesson.videoUrl : ""
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(
    lesson != undefined ? lesson.thumbnailUrl : ""
  );
  const [notesFileName, setNotesFileName] = useState(
    lesson != undefined ? lesson.notesId : ""
  );

  const [brief, setBrief] = useState(
    lesson != undefined && typeof lesson.lessonBrief === "string"
      ? lesson.lessonBrief
      : ""
  );
  const [chapter, setChapter] = useState(
    lesson != undefined ? lesson.chapter : ""
  );
  const [chapterNumber, setChapterNumber] = useState(
    lesson != undefined ? lesson.chapterNumber : 0
  );
  const [videoLength, setVideoLength] = useState(
    lesson != undefined ? lesson.videoLength : "2:00"
  );
  const [vidCipherid, setVidCipherId] = useState(
    lesson != undefined ? lesson.vidCipherId : ""
  );

  //inlesson quiz state
  const [quizes, setQuizes] = useState<InLessonQuiz[]>(
    lesson != undefined && lesson.lessonQuizes != undefined
      ? lesson.lessonQuizes
      : []
  );
  const [newQuestion, setNewquestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answerOptions, setAnswerOptions] = useState<string>("");
  const [questionTime, setQuestionTime] = useState(60);

  //lesson notes
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [lessonNotes, setLesssonNotes] = useState<LessonNotes[]>([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
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
    if (lessonFiles.length < 1) {
      getVideoLessonFiles();
    }
  }, []);

  const saveEditorNotesToServer = async () => {
    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    try {
      if (lessonNotes.length < 1) {
        let newNotes = new LessonNotes(
          "",
          content,
          lesson != undefined ? lesson.videoId : ""
        );
        let res = await VideoLessonRepo.addLessonNotes(newNotes);
        setLesssonNotes([res]);
      } else {
        let updatedNotes = new LessonNotes(
          lessonNotes[0].notesId,
          content,
          lessonNotes[0].lessonId
        );
        let res = await VideoLessonRepo.updateLessonNotes(updatedNotes);
        if (res) {
          setLesssonNotes([updatedNotes]);
        }
      }
    } catch (e) {
      showToast(`${e}`, "error");
    }
  };

  const editorRef: any = useRef(null);
  const [showPreview, setShowPreview] = useState(true);
  const [quizerror, setQuizerror] = useState("");
  const removequizerror = () => {
    setTimeout(() => {
      setQuizerror("");
    }, 3000);
  };
  const addquizerror = (e: string) => {
    setQuizerror(e);
    removequizerror();
  };

  const addInlessonQuiz = () => {
    if (newQuestion === "") {
      addquizerror("Enter your question");
      return;
    }
    if (answerOptions === "") {
      addquizerror("enter answer options");
      return;
    }
    if (correctAnswer === "") {
      addquizerror("select correct answer");
      return;
    }
    if (questionTime < 50) {
      addquizerror("pop time must be more than 50 secs");
      return;
    }

    let newquiz = new InLessonQuiz(
      newQuestion,
      correctAnswer,
      answerOptions.split(","),
      questionTime
    );
    setNewquestion("");
    setCorrectAnswer("");
    setAnswerOptions("");
    setQuestionTime(0);
    setQuizes([...quizes, newquiz]);
  };
  const deleteInLessonQuiz = (question: string) => {
    setQuizes(quizes.filter((e, i) => question !== e.question));
  };

  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const updateLesson = async () => {
    if (updating) {
      return;
    }
    setUpdating(true);
    // if (
    //   lesson != undefined &&
    //   videoUrl !== "" &&
    //   lesson.videoUrl.split("/").pop() !== videoUrl
    // ) {
    //   try {
    //     let res = await VideoLessonRepo.checkIfLessonFileExist(videoUrl);
    //     if (res) {
    //       setVideoUrl(
    //         `https://api.thesigurd.com/anzaapi/view_video/lesson/${videoUrl}`
    //       );
    //     }
    //   } catch (e) {
    //     showToast(`${e}`, "error");

    //     return;
    //   }
    // }
    // if (
    //   lesson != undefined &&
    //   thumbnailUrl !== "" &&
    //   lesson.thumbnailUrl.split("/").pop() !== thumbnailUrl
    // ) {
    //   try {
    //     let res = await VideoLessonRepo.checkIfLessonFileExist(thumbnailUrl);
    //     if (res) {
    //       setThumbnailUrl(
    //         `https://api.thesigurd.com/anzaapi/view_thumbnail/lesson/${thumbnailUrl}`
    //       );
    //     }
    //   } catch (e) {
    //     showToast(`${e}`, "error");

    //     return;
    //   }
    // }

    try {
      let updatedLesson = new VideoLessonModel(
        lesson.videoId,
        title,
        videoUrl !== ""
          ? videoUrl
          : lesson !== undefined
          ? lesson.videoUrl
          : "",
        thumbnailUrl !== ""
          ? thumbnailUrl
          : lesson != undefined
          ? lesson.thumbnailUrl
          : "",
        topicName,
        classLevel,
        subjectType,
        teacherName,
        totalViews,
        topicPriority,
        videoPriority,
        lesson.createdAt,
        getCurrentDate(),
        commentsOff,
        isPublished,
        "", //teacher school
        notesFileName, //notes id
        quizes, //lesson quizes
        brief, //brief
        chapter,
        chapterNumber,
        1,
        0,
        videoLength,
        isPractical,
        vidCipherid
      );

      let res = await VideoLessonRepo.updateVideoLesson(updatedLesson);

      if (res) {
        setLessons(
          lessons.map((e) => {
            if (e.videoId == updatedLesson.videoId) {
              return updatedLesson;
            }
            return e;
          })
        );
      }
      await saveEditorNotesToServer();
      router.push("/admin/videos");
      showToast("updated", "success");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setUpdating(false);
    }
  };

  const deleteVideoLesson = async () => {
    if (deleting) {
      return;
    }
    setDeleting(true);
    try {
      let res = await VideoLessonRepo.deleteVideoLesson(lesson.videoId);

      if (res) {
        setLessons(lessons.filter((e) => e.videoId !== lesson.videoId));
        router.push("/admin/videos");
        showToast("deleted", "success");
      }
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setDeleting(false);
    }
  };

  const { user } = useContext(LoggedInUserContext);
  //paper upload
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  const handleThumbnailUpload = async (e: any) => {
    if (e.target.files[0] != null) {
      try {
        setUploadingThumbnail(true);
        const formData = new FormData();

        // Update the formData object
        formData.append("photo", e.target.files[0], e.target.files[0].name);
        formData.append("type", "lesson");

        // let res = await axios.post(
        //   "http://localhost:8080/anzaapi/upload_video/lesson",
        //   formData
        // );
        let res = await axios.post(
          "https://api.thesigurd.com/anzaapi/upload_thumbnail/lesson",
          formData
        );
        if (res.status === 206) {
          showToast(`${res.data.message}`, "error");
        } else {
          setThumbnailUrl(res.data.url);
          showToast("upload success", "success");
        }
      } catch (e) {
        showToast(`${e}`, "error");
      } finally {
        setUploadingThumbnail(false);
      }
    }
  };
  //pdf upload
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const handlePDFUpload = async (e: any) => {
    if (e.target.files[0] != null) {
      try {
        setUploadingPdf(true);
        const formData = new FormData();

        // Update the formData object
        formData.append("lesson", e.target.files[0], e.target.files[0].name);
        formData.append("type", "notes");

        // let res = await axios.post(
        //   "http://localhost:8080/anzaapi/upload_video/lesson",
        //   formData
        // );
        let res = await axios.post(
          "https://api.thesigurd.com/anzaapi/upload_video/lesson",
          formData
        );
        if (res.status === 206) {
          showToast(`${res.data.message}`, "error");
        } else {
          setNotesFileName(res.data.id);
          showToast("upload success", "success");
        }
      } catch (e) {
        showToast(`${e}`, "error");
      } finally {
        setUploadingPdf(false);
      }
    }
  };

  //video files
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [lessonFiles, setLessonFiles] = useState<string[]>([]);
  const getVideoLessonFiles = async () => {
    setLoadingFiles(true);
    try {
      const files = await VideoLessonRepo.getLessonFilesOnTheServer();
      setLessonFiles(files);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoadingFiles(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-52 w-full ">
        <div className="flex h-12 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-main font-black text-2xl">
            Update Video Lesson
          </div>
        </div>
        <div className="flex flex-col  items-center w-full p-3">
          <div className="flex flex-wrap w-full justify-start">
            <div className="flex flex-col m-2">
              <label htmlFor="title">Lesson Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Class Level</label>
              <select
                name="classlevel"
                id="classlevel "
                value={classLevel}
                onChange={(v) => setClassLevel(v.target.value.toLowerCase())}
                className="px-3 py-1.5 w-72  outline-none bg-white rounded-xl dark:bg-darkmain "
              >
                {classOptions.map((e) => (
                  <option key={e} value={e.toLowerCase()}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Subject Type Level</label>
              <select
                name="subject"
                id="subject "
                value={subjectType}
                onChange={(v) => setSubjectType(v.target.value)}
                className="px-3 py-1.5 w-72  outline-none bg-white rounded-xl dark:bg-darkmain "
              >
                {subjectOptions.map((e) => (
                  <option key={e} value={e.toLowerCase()}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Chapter Name</label>
              <input
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Topic Name</label>
              <input
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Teacher Name</label>
              <input
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Lesson Brief</label>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2  md:w-[600px] w-[350px]  dark:bg-darkmain"
              />
            </div>
            <div className="flex space-x-2 m-3 items-center w-72 cursor-pointer">
              <input
                checked={isPractical}
                className=" w-5 h-6 rounded-xl "
                type="checkbox"
                onChange={(e) => setIsPractical(e.target.checked)}
              />
              <p className="text-lg">Is Practical Lesson</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap w-full mt-10 px-5 justify-start">
          <div className="flex flex-col m-2">
            <label htmlFor="chapternumber"> Chapter Number</label>
            <input
              value={chapterNumber}
              onChange={(e) => setChapterNumber(parseInt(e.target.value))}
              className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              type="number"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="topicPriority"> Topic Number</label>
            <input
              value={topicPriority}
              onChange={(e) => setTopicPriority(parseInt(e.target.value))}
              className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              type="number"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="topicPriority"> Video Number</label>
            <input
              value={videoPriority}
              onChange={(e) => setVideoPriority(parseInt(e.target.value))}
              className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              type="number"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="topicPriority">Total Views</label>
            <input
              value={totalViews}
              onChange={(e) => setTotalViews(parseInt(e.target.value))}
              className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              type="number"
            />
          </div>
          <div className="flex space-x-2 m-3 items-center w-72 cursor-pointer">
            <input
              checked={commentsOff}
              className=" w-5 h-6 rounded-xl "
              type="checkbox"
              onChange={(e) => setCommentsOff(e.target.checked)}
            />
            <p className="text-lg">Turn Comments Off</p>
          </div>
          <div className="flex space-x-2 m-3 items-center w-72 cursor-pointer">
            <input
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className=" w-5 h-6 rounded-xl "
              type="checkbox"
            />
            <p className="text-lg">Is Published</p>
          </div>
        </div>
        <div className="w-full flex flex-col mt-44 px-5">
          <p className="text-center text-xl text-main font-black">
            In Lesson Quizes
          </p>
          <div className="w-full flex flex-col text-xs">
            <p className="text-amber-600 text-base font-bold">Instructions</p>
            {[
              "we recommend atmost 2 questions per lesson.",
              "use simple questions with simple answers.",
              "each answer choice should be short atmost 8 words.",
              "have atmost 4 answer choices.",
              "answer options are comma separated.",
              "correct answer must be in answer choices.",
              "pop time is in seconds so do correct calculations. ",
            ].map((e) => (
              <div key={e} className="flex items-center py-[1px]">
                <BsFillCheckCircleFill color="green" />
                <p className="pl-1">{e}</p>
              </div>
            ))}
          </div>
          <AnimatePresence>
            <div className="flex flex-wrap w-full justify-start mt-5">
              {quizerror != "" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center w-full"
                >
                  <div className="px-8 py-1 w-80 flex justify-center text-sm  rounded-sm text-white bg-red-700">
                    <span className="font-bold"> ERROR: -- </span>
                    {quizerror}
                  </div>
                </motion.div>
              )}
              <div className="flex flex-col m-2 w-full">
                <label htmlFor="topic"> New Question</label>
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewquestion(e.target.value)}
                  className="outline-none bg-white w-[90%] rounded-xl px-3 py-2 dark:bg-darkmain "
                />
              </div>

              {answerOptions.split(",").length > 1 && (
                <div className="flex flex-col w-full">
                  <p className="text-sm text-amber-600 pl-2">
                    Added Answer Choices
                  </p>
                  <div className="flex w-full flex-wrap  my-2">
                    {answerOptions
                      .split(",")
                      .filter((a) => a != "")
                      .map((e, i) => (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`border-2 dark:border-darkmain border-gray-400 cursor-pointer hover:border-main  transition-all rounded-2xl px-4 py-1 mx-1.5  ${
                            e == correctAnswer ? "bg-main" : ""
                          } `}
                          key={i}
                        >
                          {e}
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col m-2 w-full">
                <label htmlFor="topic"> Answer Choices</label>
                <input
                  value={answerOptions}
                  onChange={(e) => setAnswerOptions(e.target.value)}
                  className="outline-none bg-white w-[90%] rounded-xl px-3 py-2 dark:bg-darkmain "
                />
              </div>
              <div className="flex flex-col m-2">
                <label htmlFor="title">Correct Answer</label>
                <select
                  name="correctanswer"
                  id="correctanswer "
                  value={correctAnswer}
                  onChange={(v) => setCorrectAnswer(v.target.value)}
                  className="px-3 py-1.5 w-72  outline-none bg-white rounded-xl dark:bg-darkmain "
                >
                  <option value={""}>select answer</option>
                  {answerOptions
                    .split(",")
                    .filter((a) => a != "")
                    .map((e) => (
                      <option key={e} value={e.toLowerCase()}>
                        {e}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col m-2">
                <label htmlFor="topic"> Pop Time (secs)</label>
                <input
                  value={questionTime}
                  type="number"
                  onChange={(e) => setQuestionTime(parseInt(e.target.value))}
                  className="outline-none bg-white rounded-xl px-3 py-2  dark:bg-darkmain"
                />
              </div>

              <div className="flex justify-around w-full">
                <div
                  onClick={() => {
                    setNewquestion("");
                    setAnswerOptions("");
                    setCorrectAnswer("");
                    setQuestionTime(60);
                  }}
                  className="flex justify-center items-center w-40 h-9 mt-6 rounded-xl shadow-2xl text-white bg-red-600 hover:bg-red-500 transition-all cursor-pointer self-center"
                >
                  Reset Entries
                </div>
                <div
                  onClick={addInlessonQuiz}
                  className="flex justify-center items-center w-40 h-9 mt-6 rounded-xl shadow-2xl text-white bg-main hover:bg-teal-700 cursor-pointer self-center"
                >
                  Add New Quiz
                </div>
              </div>
            </div>
          </AnimatePresence>
          <p className="mt-10 text-main text-lg font-semibold">
            Available questions
          </p>
          <div className="flex w-full flex-wrap ">
            {quizes.length < 1 && (
              <div className="w-full h-full flex justify-center items-center">
                {" "}
                <p className="text-amber-600 text-sm mt-5 pl-10 w-full">
                  No InLesson Quizes in this lesson
                </p>
              </div>
            )}
            {quizes.length > 0 &&
              quizes.map((e, i) => (
                <div
                  key={e.question}
                  className="w-96 md:w-[430px] flex flex-col p-2 rounded-xl bg-white m-2  dark:bg-darkmain text-xs"
                >
                  <div className="w-full flex items-center ">
                    <p className="text-main font-semibold w-20">Question</p>
                    <p className="p-1 flex-1">{e.question}</p>
                  </div>
                  <div className="flex items-center  my-2">
                    <p className="text-main w-20">Answer Options</p>
                    <p className="p-1 flex-1">{e.answerOptions}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-main w-20">Time (secs)</p>{" "}
                    <p className="p-1 flex-1">{e.time}</p>
                  </div>
                  <div className="flex items-center my-2">
                    <p className="text-main w-20">Correct Answer</p>
                    <p className="p-1 flex-1">{e.correctAnswer}</p>
                  </div>
                  <div className="flex w-full justify-between my-2 px-2">
                    <div
                      onClick={() => showToast("comming soon", "success")}
                      className="px-5 py-1 rounded-lg border-main border-2 hover:bg-main transition-all cursor-pointer"
                    >
                      Edit Quiz
                    </div>
                    <div
                      onClick={() => deleteInLessonQuiz(e.question)}
                      className="px-5 py-1 rounded-lg bg-red-600 cursor-pointer flex items-center"
                    >
                      Delete Quiz
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* <div className="flex flex-col w-full min-h-[400px]">
          <p className="text-main text-xl text-center font-bold">
            Lesson Notes
          </p>

          <div className="flex justify-center space-x-5">
            <div
              onClick={() => setShowPreview(true)}
              className={`px-5 py-1 cursor-pointer bg-gray-400 ${
                showPreview ? "bg-green-500" : ""
              }`}
            >
              Preview
            </div>
            <div
              onClick={() => setShowPreview(false)}
              className={`px-5 py-1 cursor-pointer bg-gray-400 ${
                !showPreview ? "bg-green-500" : ""
              }`}
            >
              Edit Notes
            </div>
          </div>
          <div className="flex p-2 w-full dark:text-black ">
            {showPreview ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: draftToHtml(
                    convertToRaw(editorState.getCurrentContent())
                  ),
                }}
              />
            ) : !isBrowser() ? (
              <div></div>
            ) : (
              <Editor
                // ref={editorRef}
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                editorStyle={{
                  backgroundColor: "white",
                  padding: "5px 5px 5px 5px",
                  paddingLeft: "20px",
                }}
                toolbarStyle={{
                  backgroundColor: "white",
                }}
                onEditorStateChange={(e) => {
                  setEditorState(e);
                  setEditorContentHtml(stateToHTML(e.getCurrentContent()));
                }}
              />
            )}
          </div>
        </div> */}
        <div className="flex flex-col w-full px-5 mt-52 ">
          <p className="text-main text-xl text-center font-bold">
            Lesson Files
          </p>

          <div
            className={`flex flex-wrap justify-around w-full ${
              user.length > 0 && user[0].isSuperAdmin ? "" : "hidden"
            }`}
          >
            {!loadingFiles && (
              <div className="flex flex-col m-2">
                <label htmlFor="chapterName"> Video FileName</label>
                <input
                  className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
                  list="videofiles"
                  id="videofilename"
                  name="videofilename"
                  placeholder="Type video Name"
                  value={videoUrl.split("view_video/lesson/")[1]}
                  onChange={(e) =>
                    setVideoUrl(
                      `https://api.thesigurd.com/anzaapi/view_video/lesson/${e.target.value}`
                    )
                  }
                  autoComplete="off"
                />
                <datalist id="videofiles">
                  {lessonFiles
                    .map((e) => e)
                    .sort()
                    .map((e) => (
                      <option key={e} value={e} />
                    ))}
                </datalist>
              </div>
            )}
            <div className="w-96 text-3xl flex justify-center my-3">
              {thumbnailUrl == "" ? (
                uploadingThumbnail ? (
                  <div className="bg-main p-2.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl flex justify-center items-center">
                    {" "}
                    <LoadingComponent
                      loading={uploadingThumbnail}
                      color="white"
                    />
                    <p className="text-sm">Uploading Thumbanil ...</p>
                    <p className="ml-2 text-xs">please wait</p>
                  </div>
                ) : (
                  <label
                    htmlFor="paper"
                    className="bg-main p-1.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl"
                  >
                    Upload Thumbnail
                  </label>
                )
              ) : (
                <div className="flex flex-col">
                  <p className="text-sm">Thumbnail Name</p>
                  <p className="text-sm">
                    {thumbnailUrl.split("view_thumbnail/lesson/")[1]}
                  </p>
                  <label
                    htmlFor="paper"
                    className="bg-main p-1.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl"
                  >
                    Change Thumbnail
                  </label>
                </div>
              )}
              <input
                type="file"
                id="paper"
                name="paper"
                accept="image/*"
                className="hidden "
                onChange={handleThumbnailUpload}
              />
            </div>
            {/* <div className="w-96 text-3xl flex justify-center my-3 items-center">
              {notesFileName == "" ? (
                uploadingPdf ? (
                  <div className="bg-main p-2.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl flex justify-center items-center">
                    {" "}
                    <LoadingComponent loading={uploadingPdf} color="white" />
                    <p className="text-sm">Uploading Notes Pdf ...</p>
                    <p className="ml-2 text-xs">please wait</p>
                  </div>
                ) : (
                  <label
                    htmlFor="notespdf"
                    className="bg-main p-1.5 px-4 cursor-pointer h-8 text-white text-sm font-bold rounded-xl"
                  >
                    Upload Notes Pdf
                  </label>
                )
              ) : (
                <div className="flex flex-col">
                  <p className="text-sm">Notes Pdf Name</p>
                  <p className="text-sm">{notesFileName}</p>
                  <label
                    htmlFor="notespdf"
                    className="bg-main p-1.5 px-4 cursor-pointer text-white text-sm h-8 font-bold rounded-xl"
                  >
                    Change Notes Pdf
                  </label>
                </div>
              )}
              <input
                type="file"
                id="notespdf"
                name="notespdf"
                accept="application/pdf"
                className="hidden "
                onChange={handlePDFUpload}
              />
            </div> */}

            {/* <div className="flex flex-col m-2">
              <label htmlFor="topic"> Thumbnail Filename </label>
              <input
                value={thumbnailUrl.split("/").pop()}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div> */}
            {/* <div className="flex flex-col m-2">
              <label htmlFor="topic"> Notes Filename </label>
              <input
                value={notesFileName}
                onChange={(e) => setNotesFileName(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div> */}
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Video Cipher Id </label>
              <input
                value={vidCipherid}
                onChange={(e) => setVidCipherId(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Video Duration </label>
              <input
                value={videoLength}
                onChange={(e) => setVideoLength(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="w-80"></div>
            <div className="w-80"></div>
          </div>
        </div>
        <div className="flex flex-wrap justify-around mt-9">
          <div
            onClick={updateLesson}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-main p-2 text-white"
          >
            {updating && <LoadingComponent loading={updating} color="white" />}
            <p className="font-bold">
              {" "}
              {updating ? "updating ..." : "Update Lesson"}
            </p>
          </div>
          <div
            onClick={() => router.push("/admin/videos")}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-amber-600 p-2 text-white"
          >
            Cancel Process
          </div>
          <div
            onClick={deleteVideoLesson}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-red-600 p-2 text-white"
          >
            {deleting && <LoadingComponent loading={deleting} color="white" />}
            <p className="font-bold">
              {" "}
              {deleting ? "deleting ..." : " Delete Lesson"}
            </p>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminUpdateLessonPage;

//todos add videoLength
