import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { createRef, useContext, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import GamifiedQuizRepo from "../../../../data/repos/gamified_quiz_repo";
import GamifiedQuizTest, {
  OneQuiz,
} from "../../../../models/curriculum/gamified_quizes_model";
import LoadingComponent from "../../../../presentation/components/others/loading_component";
import { LoggedInUserContext } from "../../../../presentation/contexts/loggedin_user_controller";
import DashboardLayout from "../../../../presentation/layouts/dashboard_layout";
import {
  getCurrentDate,
  showToast,
} from "../../../../presentation/utils/helper_functions";
import Dropzone from "react-dropzone";
import axios from "axios";
import { prodUrl } from "../../../../presentation/utils/constants";

const AddGamifiedQuestions = () => {
  const dropzoneRef: any = createRef();
  const subjectOptions = [
    "Biology",
    "Chemistry",
    "Physics",
    "Mathematics",
    "Geography",
    "History",
    "Kiswahili",
    "English",
  ];
  const classLevelCategories = ["Form 1", "Form 2", "Form 3", "Form 4"];
  let quizCategories = ["Multiple Choice", "Poll", "Check Box"];
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [subjectType, setSubjectType] = useState("");
  const [passPercentage, setPasspercentage] = useState(50);
  const [questions, setQuestions] = useState<OneQuiz[]>([]);
  //one quiz items
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [category, setCategory] = useState("Multiple Choice");
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);
  const [newAnswerOption, setNewAnswerOption] = useState("");
  const [answerExplanation, setAnswerExplanation] = useState("");
  const [points, setPoints] = useState(5);
  const [questionNumber, setQuestionNumber] = useState(question.length + 1);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [isPublished, setIsPublished] = useState(false);
  const [taggedVideoLesson, setTaggedVideoLesson] = useState("");
  const [questionType, setQuestionType] = useState("text");
  const [answerType, setAnswerType] = useState("text");
  const [explanationType, setExplanationType] = useState("text");
  const [questionImage, setQuestionImage] = useState("");
  const [explanationImage, setExplanationImage] = useState("");

  const { user } = useContext(LoggedInUserContext);

  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false); //for all images in a question, to be changed to individual image upload state

  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const handleThumbnailUpload = async (e: any) => {
    if (e.target.files[0] != null) {
      try {
        setUploadingThumbnail(true);
        const formData = new FormData();

        // Update the formData object
        formData.append("lesson", e.target.files[0], e.target.files[0].name);
        formData.append("type", "fun_quizes");
        formData.append("extension", e.target.files[0].name.split(".")[1]);
        let res = await axios.post(
          "https://anzaacademy.co/anzaapi/upload_video/lesson",
          formData
        );
        if (res.status === 206) {
          showToast(`${res.data.message}`, "error");
        } else {
          setThumbnailUrl(res.data.id);
          setUploadingThumbnail(false);
          showToast("Upload success!", "success");
        }
      } catch (e) {
        showToast(`${e}`, "error");
      }
    }
  };
  const addImageAnswerOptionUpload = async (e: any) => {
    if (e.target.files[0] != null) {
      try {
        setUploadingImage(true);
        const formData = new FormData();

        // Update the formData object
        formData.append("lesson", e.target.files[0], e.target.files[0].name);
        formData.append("type", "fun_quizes");
        formData.append("extension", e.target.files[0].name.split(".")[1]);
        let res = await axios.post(
          "https://anzaacademy.co/anzaapi/upload_video/lesson",
          formData
        );
        if (res.status === 206) {
          showToast(`${res.data.message}`, "error");
        } else {
          setAnswerOptions([...answerOptions, `${res.data.id}`]);

          showToast("Upload success!", "success");
        }
      } catch (e) {
        showToast(`${e}`, "error");
      } finally {
        setUploadingImage(false);
      }
    }
  };
  const addImageQuestionPhotoUpload = async (e: any) => {
    if (e.target.files[0] != null) {
      try {
        setUploadingImage(true);
        const formData = new FormData();

        // Update the formData object
        formData.append("lesson", e.target.files[0], e.target.files[0].name);
        formData.append("type", "fun_quizes");
        formData.append("extension", e.target.files[0].name.split(".")[1]);
        let res = await axios.post(
          "https://anzaacademy.co/anzaapi/upload_video/lesson",
          formData
        );
        if (res.status === 206) {
          showToast(`${res.data.message}`, "error");
        } else {
          setQuestionImage(res.data.id);

          showToast("Upload success!", "success");
        }
      } catch (e) {
        showToast(`${e}`, "error");
      } finally {
        setUploadingImage(false);
      }
    }
  };
  const addExplanationImageUpload = async (e: any) => {
    if (e.target.files[0] != null) {
      try {
        setUploadingImage(true);
        const formData = new FormData();

        // Update the formData object
        formData.append("lesson", e.target.files[0], e.target.files[0].name);
        formData.append("type", "fun_quizes");
        formData.append("extension", e.target.files[0].name.split(".")[1]);
        let res = await axios.post(
          "https://anzaacademy.co/anzaapi/upload_video/lesson",
          formData
        );
        if (res.status === 206) {
          showToast(`${res.data.message}`, "error");
        } else {
          setAnswerExplanation(`${res.data.id}`);
          showToast("Upload success!", "success");
        }
      } catch (e) {
        showToast(`${e}`, "error");
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const router = useRouter();
  const saveTest = async () => {
    //do validation
    if (classLevel == "") {
      showToast("Kindly Enter Form level", "error");
      return;
    }
    if (subjectType == "") {
      showToast("Kindly Select Subject Type", "error");
      return;
    }
    if (title == "") {
      showToast("Kindly Enter Test Title", "error");
      return;
    }
    if (thumbnailUrl === "") {
      showToast("Kindly Upload thumbnail ", "error");
      return;
    }

    let newTest = new GamifiedQuizTest(
      "",
      subjectType,
      classLevel,
      title,
      passPercentage,
      getCurrentDate(),
      getCurrentDate(),
      1,
      1,
      1,
      3.0,
      user[0] != undefined ? user[0].userId : "",
      user[0] != undefined ? user[0].userName : "",
      user[0] != undefined ? user[0].schoolName : "",
      thumbnailUrl,
      questions,
      [],
      isPublished,
      taggedVideoLesson
    );

    try {
      await GamifiedQuizRepo.addnewGamifiedQuiz(newTest);
      router.push("dashboard/tcorner/quizes");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  };
  //Todo fun_quizes

  return (
    <DashboardLayout>
      <AnimatePresence>
        <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative min-h-screen py-16 w-full items-center ">
          <div className="flex h-12 items-center justify-start  pl-5  md:pl-10 w-full">
            <div className="flex text-main font-black text-lg md:text-2xl">
              ADD NEW GAMIFIED TEST
            </div>
          </div>
          {/* add one quiz */}
          {showQuizModal && (
            <motion.div
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 h-screen w-screen flex flex-col items-center justify-center bg-black bg-opacity-60 z-[60]"
            >
              <motion.div
                initial={{ translateY: -70, opacity: 0.2 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                exit={{ opacity: 0 }}
                className="md:w-[92vw] md:h-[92vh] mx-5 md:mx-0 bg-gray-300  dark:bg-darksec flex flex-col p-3 rounded-md"
              >
                <div className="flex justify-between items-center pb-3">
                  <p className="font-bold  text-red-500">{""}</p>
                  <p className="font-bold text-xl text-red-500">ADD ONE QUIZ</p>
                  <div
                    onClick={() => {
                      setCategory("Multiple Choice");
                      setAnswerOptions([]);
                      setPoints(5);
                      setQuestion("");
                      setTimerSeconds(30);
                      setAnswerExplanation("");
                      setCorrectAnswer("");
                      setNewAnswerOption("");
                      setShowQuizModal(false);
                    }}
                    className="flex items-center text-white px-3 py-1 bg-red-600 cursor-pointer rounded-md"
                  >
                    Cancel
                  </div>
                </div>
                <div className="flex flex-wrap w-full justify-center md:justify-start flex-1 overflow-y-auto pb-20">
                  {/* test details entry */}
                  <div className="flex flex-col m-1 text-sm text-main">
                    <label htmlFor="questiontype " className="uppercase">
                      Question Type
                    </label>
                    <select
                      name="questiontype"
                      id="questiontype "
                      value={questionType}
                      onChange={(v) => setQuestionType(v.target.value)}
                      className="px-3 py-2 w-80 md:w-60 outline-none bg-white rounded-md dark:bg-darkmain  capitalize  focus:ring-1 focus:ring-main text-black"
                    >
                      {["text", "image", "text+image"].map((e) => (
                        <option key={e} value={e} className="capitalize">
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div className="flex flex-col m-1 text-sm text-main">
                    <label htmlFor="category">CATEGORY</label>
                    <select
                      name="category"
                      id="category "
                      value={category}
                      onChange={(v) => setCategory(v.target.value)}
                      className="px-3 py-2 w-80 md:w-60 outline-none bg-white rounded-md dark:bg-darkmain   focus:ring-1 focus:ring-main text-black"
                    >
                      {["Short Answers", "Long Answers", "Image Answers"].map(
                        (e) => (
                          <option key={e} value={e}>
                            {e}
                          </option>
                        )
                      )}
                    </select>
                  </div> */}
                  <div className="flex flex-col m-1 text-sm text-main">
                    <label htmlFor="title">POINTS</label>
                    <input
                      value={points}
                      type="number"
                      onChange={(e) => setPoints(parseInt(e.target.value))}
                      className="outline-none bg-white rounded-md px-3 py-2 w-80 md:w-40 dark:bg-darkmain focus:ring-1 focus:ring-main text-black"
                    />
                  </div>
                  <div className="flex flex-col m-1 text-sm text-main">
                    <label htmlFor="title">TIMEOUT DURATION (in secs)</label>
                    <input
                      value={timerSeconds}
                      type="number"
                      onChange={(e) =>
                        setTimerSeconds(parseInt(e.target.value))
                      }
                      className="outline-none bg-white rounded-md px-3 py-2 w-80 md:w-40 dark:bg-darkmain focus:ring-1 focus:ring-main text-black"
                    />
                  </div>

                  {questionType != "image" && (
                    <div className="flex flex-col  w-[92%] md:w-[79%] m-1 text-sm text-main">
                      <label htmlFor="title">QUESTION</label>
                      <textarea
                        rows={4}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="outline-none bg-white rounded-md px-3 py-2    dark:bg-darkmain  focus:ring-1 focus:ring-main text-black"
                      />
                    </div>
                  )}
                  {questionType != "text" && (
                    <div className="w-full">
                      <div className="flex flex-col mt-2  w-52 text-main">
                        <label htmlFor="title font-bold">Qestion Image</label>
                        {questionImage == "" ? (
                          uploadingImage ? (
                            <div className="bg-main p-2.5 px-4 cursor-pointer dark:text-white text-lg font-bold rounded-xl flex justify-center items-center text-black">
                              {" "}
                              <LoadingComponent
                                loading={uploadingThumbnail}
                                color="white"
                              />
                              <p className="text-sm">Uploading Image ...</p>
                              <p className="ml-2 text-xs">please wait</p>
                            </div>
                          ) : (
                            <label
                              htmlFor="paper"
                              className="bg-main p-1.5 cursor-pointer text-white text-lg font-bold rounded-md"
                            >
                              Upload Question Photo
                            </label>
                          )
                        ) : (
                          <div className="flex flex-col">
                            <p className="text-sm">Question Photo</p>
                            <img
                              src={`${prodUrl}/view_thumbnail/quizes/${questionImage}`}
                              className="w-full border-l rounded-md border-gray-400 h-28"
                              alt="image not found"
                            />
                          </div>
                        )}
                        <input
                          type="file"
                          id="paper"
                          name="paper"
                          accept="image/*"
                          className="hidden "
                          onChange={addImageQuestionPhotoUpload}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col m-1 text-sm text-main">
                    <label htmlFor="answertype " className="uppercase">
                      Answer Type
                    </label>
                    <select
                      name="answertype"
                      id="answertype "
                      value={answerType}
                      onChange={(v) => setAnswerType(v.target.value)}
                      className="px-3 py-2 w-80 md:w-60 outline-none bg-white rounded-md dark:bg-darkmain  capitalize  focus:ring-1 focus:ring-main text-black"
                    >
                      {["text", "image"].map((e) => (
                        <option key={e} value={e} className="capitalize">
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                  {answerType != "text" && (
                    <div className="w-full">
                      <div className="flex flex-col mt-2  w-52 text-main">
                        <label htmlFor="title font-bold">
                          Add Image Answer Choice
                        </label>
                        {uploadingImage ? (
                          <div className="bg-main p-2.5 px-4 cursor-pointer dark:text-white text-lg font-bold rounded-xl flex justify-center items-center text-black">
                            <LoadingComponent
                              loading={uploadingThumbnail}
                              color="white"
                            />
                            <p className="text-sm">Uploading Image ...</p>
                            <p className="ml-2 text-xs">please wait</p>
                          </div>
                        ) : (
                          <label
                            htmlFor="paper"
                            className="bg-main p-1.5 cursor-pointer text-white text-lg font-bold rounded-md"
                          >
                            Upload Answer Photo
                          </label>
                        )}
                        <input
                          type="file"
                          id="paper"
                          name="paper"
                          accept="image/*"
                          className="hidden "
                          onChange={addImageAnswerOptionUpload}
                        />
                      </div>
                    </div>
                  )}
                  {answerType == "image" && answerOptions.length > 0 && (
                    <div className="flex flex-wrap w-full justify-start space-x-4">
                      {answerOptions.map((e) => (
                        <div key={e} className="flex flex-col ">
                          <img
                            src={`${prodUrl}/view_thumbnail/quizes/${e}`}
                            className="w-full border-l rounded-md border-gray-400 h-28"
                            alt="image not found"
                          />
                          <div
                            onClick={() => setCorrectAnswer(e)}
                            className="flex w-32 py-1 px-3 text-sm  bg-main cursor-pointer "
                          >
                            mark as answer
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {answerType == "text" && (
                    <div className="flex w-[92%] items-center">
                      <div className="flex flex-col m-1 text-sm flex-1 text-main">
                        <label htmlFor="title">ANSWER CHOICE</label>
                        <textarea
                          rows={4}
                          value={newAnswerOption}
                          onChange={(e) => setNewAnswerOption(e.target.value)}
                          className="outline-none bg-white rounded-md px-3 py-2  dark:bg-darkmain w-full focus:ring-1 focus:ring-main text-black"
                        />
                      </div>
                      <div
                        onClick={() => {
                          if (newAnswerOption !== "") {
                            if (answerOptions.length < 4) {
                              setAnswerOptions([
                                ...answerOptions,
                                newAnswerOption,
                              ]);
                              setNewAnswerOption("");
                            } else {
                              showToast(
                                "Maximum Answer Options Reached",
                                "error"
                              );
                            }
                          } else {
                            showToast("Enter New Answer Option", "error");
                          }
                        }}
                        className="mx-5 py-1.5 px-4 text-sm rounded-lg hover:bg-opacity-70 mt-5 bg-main cursor-pointer text-white "
                      >
                        Add Choice
                      </div>
                    </div>
                  )}
                  <div className="flex  flex-col w-full px-1 py-1 mb-2">
                    {answerOptions.length > 0 ? (
                      <p className="text-main pl-3 ">AVAILABLE CHOICES</p>
                    ) : (
                      ""
                    )}

                    {answerType == "image" ? (
                      <img
                        src={`${prodUrl}/view_thumbnail/quizes/${correctAnswer}`}
                        className="w-full border-l rounded-md border-gray-400 h-28"
                        alt="image not found"
                      />
                    ) : (
                      answerOptions.map((e, i) => (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex pl-3 leading-3 text-sm items-center p-1"
                          key={e}
                        >
                          <p className="w-4">{i + 1}: </p>
                          <p> {e}</p>
                          <div className="w-4"></div>
                          <div
                            onClick={() => {
                              let newoptions = answerOptions.filter(
                                (o) => o != e
                              );
                              setAnswerOptions(newoptions);
                            }}
                            className="text-red-500 hover:text-red-700 cursor-pointer p-0.5 rounded-lg"
                          >
                            <FaWindowClose />
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                  <div className="flex flex-col m-1 text-sm md:w-[80%] text-main">
                    <label htmlFor="title">CORRECT ANSWER</label>
                    <select
                      name="category"
                      id="category "
                      value={correctAnswer}
                      onChange={(e) => setCorrectAnswer(e.target.value)}
                      className="px-3 py-2  w-80 md:w-full outline-none bg-white rounded-md dark:bg-darkmain   focus:ring-1 focus:ring-main text-black"
                    >
                      <option value="">SELECT CORRECT ANSWER</option>
                      {answerOptions.map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col m-1 text-sm text-main">
                    <label htmlFor="explanationtype " className="uppercase">
                      Explanation Type
                    </label>
                    <select
                      name="explanationtype"
                      id="explanationtype "
                      value={explanationType}
                      onChange={(v) => setExplanationType(v.target.value)}
                      className="px-3 py-2 w-80 md:w-60 outline-none bg-white rounded-md dark:bg-darkmain  capitalize  focus:ring-1 focus:ring-main text-black"
                    >
                      {["text", "image", "text+image"].map((e) => (
                        <option key={e} value={e} className="capitalize">
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>

                  {explanationType != "text" && (
                    <div className="w-full">
                      <div className="flex flex-col mt-2  w-52 text-main">
                        <label htmlFor="title font-bold">Qestion Image</label>
                        {explanationImage == "" ? (
                          uploadingImage ? (
                            <div className="bg-main p-2.5 px-4 cursor-pointer dark:text-white text-lg font-bold rounded-xl flex justify-center items-center text-black">
                              {" "}
                              <LoadingComponent
                                loading={uploadingThumbnail}
                                color="white"
                              />
                              <p className="text-sm">Uploading Image ...</p>
                              <p className="ml-2 text-xs">please wait</p>
                            </div>
                          ) : (
                            <label
                              htmlFor="paper"
                              className="bg-main p-1.5 cursor-pointer text-white text-sm font-bold rounded-md"
                            >
                              Upload Explanation Photo
                            </label>
                          )
                        ) : (
                          <div className="flex flex-col">
                            <p className="text-sm">Explanation Photo</p>
                            <img
                              src={`${prodUrl}/view_thumbnail/quizes/${explanationImage}`}
                              className="w-full border-l rounded-md border-gray-400 h-28"
                              alt="image not found"
                            />
                          </div>
                        )}
                        <input
                          type="file"
                          id="paper"
                          name="paper"
                          accept="image/*"
                          className="hidden "
                          onChange={addExplanationImageUpload}
                        />
                      </div>
                    </div>
                  )}
                  {explanationType == "text" && (
                    <div className="flex flex-col m-1 text-sm md:w-[80%] text-main">
                      <label htmlFor="title">ANSWER EXPLANATION</label>
                      <textarea
                        rows={4}
                        value={answerExplanation}
                        placeholder="Explanation required"
                        onChange={(e) => setAnswerExplanation(e.target.value)}
                        className="outline-none bg-white rounded-md px-3 py-2 w-80 md:w-full dark:bg-darkmain focus:ring-1 focus:ring-main text-black"
                      />
                    </div>
                  )}
                </div>
                <div className="flex w-full justify-around items-center mt-0 text-xs">
                  <div
                    onClick={() => {
                      if (question === "") {
                        showToast("Kindly Enter New Question", "error");
                        return;
                      }
                      if (correctAnswer === "") {
                        showToast("Kindly Enter Correct Answer", "error");
                        return;
                      }
                      if (answerOptions.length < 2) {
                        showToast("Kindly Fill  Answer Options", "error");
                        return;
                      }
                      if (answerExplanation == "") {
                        showToast("Add answer explanation", "error");
                        return;
                      }
                      let newonequiz = new OneQuiz(
                        "",
                        category,
                        question,
                        "",
                        answerOptions,
                        correctAnswer,
                        answerExplanation,
                        points,
                        timerSeconds,
                        questionNumber,
                        questionType,
                        answerType,
                        explanationType,
                        questionImage
                      );

                      setQuestions([...questions, newonequiz]);
                      setCategory("Multiple Choice");
                      setAnswerOptions([]);
                      setPoints(5);
                      setQuestion("");
                      setTimerSeconds(30);
                      setAnswerExplanation("");
                      setCorrectAnswer("");
                      setNewAnswerOption("");
                      setShowQuizModal(false);
                    }}
                    className="w-44  flex items-center justify-center py-3 rounded-md cursor-pointer bg-main hover:bg-opacity-70 text-white"
                  >
                    Save & Quit
                  </div>
                  <div
                    onClick={() => {
                      if (question === "") {
                        showToast("Kindly Enter New Question", "error");
                        return;
                      }
                      if (correctAnswer === "") {
                        showToast("Kindly Enter Correct Answer", "error");
                        return;
                      }
                      if (answerOptions.length < 2) {
                        showToast("Kindly Enter Answer Options", "error");
                        return;
                      }
                      let newonequiz = new OneQuiz(
                        "",
                        category,
                        question,
                        "",
                        answerOptions,
                        correctAnswer,
                        answerExplanation,
                        points,
                        timerSeconds,
                        questionNumber,
                        questionType,
                        answerType,
                        explanationType,
                        questionImage
                      );

                      setQuestions([...questions, newonequiz]);
                      setCategory("Multiple Choice");
                      setAnswerOptions([]);
                      setPoints(5);
                      setQuestion("");
                      setTimerSeconds(30);
                      setAnswerExplanation("");
                      setCorrectAnswer("");
                      setNewAnswerOption("");
                    }}
                    className="w-44  flex items-center justify-center py-3 rounded-md cursor-pointer bg-main hover:bg-opacity-70 text-white"
                  >
                    Save & Add Another
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
          <div className="flex flex-col  items-center w-full">
            <div className="flex flex-wrap w-full justify-center md:justify-start">
              {/* test details entry */}
              <div className="flex flex-col m-2 text-main">
                <label htmlFor="title font-bold">CLASS LEVEL</label>
                <select
                  name="classlevel"
                  id="classlevel "
                  value={classLevel}
                  onChange={(v) => setClassLevel(v.target.value.toLowerCase())}
                  className="px-3 py-2 w-80 outline-none bg-white rounded-md dark:bg-darkmain  focus:ring-1 focus:ring-main text-black"
                >
                  <option value="">Select level</option>
                  <option value="general">General</option>
                  {classLevelCategories.map((e) => (
                    <option key={e} value={e.toLowerCase()}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col m-2 text-main">
                <label htmlFor="title font-bold">SUBJECT TYPE</label>
                <select
                  name="subject"
                  id="subject "
                  value={subjectType}
                  onChange={(v) => setSubjectType(v.target.value)}
                  className="px-3 py-2 w-80  outline-none bg-white rounded-md dark:bg-darkmain  focus:ring-1 focus:ring-main text-black"
                >
                  <option value="">Select subject type</option>
                  <option value="general">General</option>
                  {subjectOptions.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full"></div>
              <div className="flex flex-col m-2">
                <label htmlFor="title font-bold text-main">TEST TITLE</label>
                <input
                  placeholder="Enter Your Test Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="outline-none bg-white rounded-md px-3 py-2 w-80 dark:bg-darkmain focus:ring-1 focus:ring-main text-black"
                />
              </div>
              <div className="flex flex-col m-2 text-main">
                <label htmlFor="title font-bold">PASS PERCENTAGE (IN %)</label>
                <input
                  value={passPercentage}
                  type="number"
                  min={10}
                  max={100}
                  onChange={(e) => setPasspercentage(parseInt(e.target.value))}
                  className="outline-none bg-white rounded-md px-3 py-2 w-80 dark:bg-darkmain focus:ring-1 focus:ring-main text-black"
                />
              </div>

              <div className="flex flex-col mt-2 text-main">
                <label htmlFor="title font-bold">QUIZ THUMBNAIL</label>
                {thumbnailUrl == "" ? (
                  uploadingThumbnail ? (
                    <div className="bg-main p-2.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl flex justify-center items-center text-black">
                      <LoadingComponent
                        loading={uploadingThumbnail}
                        color="white"
                      />
                      <p className="text-sm">Uploading Thumbnail ...</p>
                      <p className="ml-2 text-xs">please wait</p>
                    </div>
                  ) : (
                    <label
                      htmlFor="paper"
                      className="bg-main p-1.5 cursor-pointer text-white text-lg font-bold rounded-md"
                    >
                      Upload Thumbnail
                    </label>
                  )
                ) : (
                  <div className="flex flex-col">
                    <p className="text-sm">Thumbnail Name</p>
                    <p className="text-sm">{thumbnailUrl}</p>
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
            </div>
            {/*
            <div className="w-full m-2 ">
              <Dropzone  ref={dropzoneRef} onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="flex w-full h-40  border-4 border-dotted border-green-900 flex items-center justify-center cursor-pointer"
                  >
                    <input {...getInputProps()} />
                    <p className="">
                      Drag and drop Your Thumbnail here,
                      <br /> or click to select files
                    </p>
                  </div>
                )}
              </Dropzone>
              {" "}
            </div> */}

            <div className="flex w-full px-5  mb-2 pb-1 mt-1 font-bold text-main text-xl"></div>

            <div className="flex w-full px-2">
              <div
                onClick={() => {
                  setShowQuizModal(true);
                }}
                className="cursor-pointer py-3 px-5 text-sm text-white rounded-md bg-main"
              >
                ADD NEW QUESTION
              </div>
            </div>

            {questions.length > 0 ? (
              <p className="flex w-full px-5  mb-2 pb-1 mt-5 font-bold text-main text-xl">
                Available Questions
              </p>
            ) : (
              ""
            )}

            {/* <div className='delete-button' onClick={() => { window.confirm( 'Are you sure you want to delete this Card?', ) && console.log("deleted")  } } > sss</div> */}

            <div className="flex flex-col w-full">
              {questions.map((e, i) => (
                <motion.div
                  key={e.question}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className=" mx-4 my-2 p-2 w-[90vw] md:w-[60vw] rounded bg-gray-100 dark:bg-darkmain flex flex-col"
                >
                  <div className="flex items-center">
                    <p>{i + 1}: </p>
                    <p className="text-sm pl-1">
                      {e.question}
                      {e.question.endsWith("?") ? "" : "?"}
                    </p>
                    <div className="flex-1"></div>
                    <p>{e.points} points</p>
                    <div
                      onClick={() => {
                        window.confirm(
                          "Are you sure you want to delete this Question?"
                        ) &&
                          setQuestions(
                            questions.filter((q) => q.question != e.question)
                          );
                      }}
                      className="px-2 ml-3 rounded-md text-xs cursor-pointer py-1 text-white bg-red-600"
                    >
                      Delete
                    </div>
                  </div>
                  <div className="py-1 flex flex-col">
                    {e.answerOptions.map((o, i) => (
                      <div
                        className={`flex items-center  px-2 py-1 m-1 bg-gray-200  dark:bg-darksec rounded-md text-xs ${
                          o == e.answer ? "text-main" : ""
                        }`}
                        key={o}
                      >
                        <p className="w-4">{i + 1}:</p> {o}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs pl-2">{e.answerExplanation}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-between w-full mt-24 pr-2 pl-2 text-sm">
              <div
                onClick={saveTest}
                className=" bg-main hover:bg-opacity-60 transition-all cursor-pointer rounded-md px-5 py-3  flex justify-center absolute bottom-20 left-2"
              >
                <LoadingComponent loading={loading} color="white" />
                <p className="text-white">
                  {loading ? "Saving ..." : " SAVE CURRRENT TEST"}
                </p>
              </div>
              <div>{""}</div>
              <div
                onClick={() => {
                  router.push("/dashboard/tcorner/quizes");
                }}
                className=" bg-red-700  text-white hover:bg-opacity-60 transition-all cursor-pointer rounded-md px-5 py-3  flex items-center justify-center text-center absolute bottom-20 right-2"
              >
                <p>CANCEL </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatePresence>
    </DashboardLayout>
  );
};
export default AddGamifiedQuestions;
