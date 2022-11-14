import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import GamifiedQuizRepo from "../../../../../../data/repos/gamified_quiz_repo";
import { OneQuiz } from "../../../../../../models/curriculum/gamified_quizes_model";
import LoadingComponent from "../../../../../../presentation/components/others/loading_component";
import { NavigationContext } from "../../../../../../presentation/contexts/navigation_state_controller";
import { TeachersAccountContext } from "../../../../../../presentation/contexts/teachers_account_context";
import DashboardLayout from "../../../../../../presentation/layouts/dashboard_layout";
import { prodUrl } from "../../../../../../presentation/utils/constants";
import {
  generateUniqueId,
  showToast,
} from "../../../../../../presentation/utils/helper_functions";

const AddQuestionPage = () => {
  const router = useRouter();
  const {
    selectedSubject,
    setSelectedSubject,
    setSelectedVideoId,
    selectedVideoId,
  } = useContext(NavigationContext);

  const { myQuizzes, setMyQuizzes } = useContext(TeachersAccountContext);
  let test = myQuizzes.filter((e) => e.testId == selectedVideoId)[0];
  let editQuiz =
    test != undefined
      ? test.questions.filter((e) => e.quizId == selectedSubject)[0]
      : undefined;
  const [saving, setSaving] = useState(false);
  const [category, setCategory] = useState("Multiple Choice");
  const [quizId, setQuizId] = useState(
    selectedSubject == "addnew"
      ? generateUniqueId()
      : editQuiz == undefined
      ? generateUniqueId()
      : editQuiz.quizId
  );
  const [question, setQuestion] = useState(
    selectedSubject == "addnew"
      ? ""
      : editQuiz == undefined
      ? ""
      : editQuiz.question
  );
  const [correctAnswer, setCorrectAnswer] = useState(
    selectedSubject == "addnew"
      ? ""
      : editQuiz == undefined
      ? ""
      : editQuiz.answer
  );
  const [answerOptions, setAnswerOptions] = useState<string[]>(
    selectedSubject == "addnew"
      ? []
      : editQuiz == undefined
      ? []
      : editQuiz.answerOptions
  );
  const [newAnswerOption, setNewAnswerOption] = useState("");
  const [answerExplanation, setAnswerExplanation] = useState(
    selectedSubject == "addnew"
      ? ""
      : editQuiz == undefined
      ? ""
      : editQuiz.answerExplanation
  );
  const [points, setPoints] = useState(
    selectedSubject == "addnew"
      ? 5
      : editQuiz == undefined
      ? 5
      : editQuiz.points
  );
  const [questionNumber, setQuestionNumber] = useState(question.length + 1);
  const [timerSeconds, setTimerSeconds] = useState(
    selectedSubject == "addnew"
      ? 30
      : editQuiz == undefined
      ? 30
      : editQuiz.timerSeconds
  );
  const [isPublished, setIsPublished] = useState(false);
  const [taggedVideoLesson, setTaggedVideoLesson] = useState("");
  const [questionType, setQuestionType] = useState(
    selectedSubject == "addnew"
      ? "text"
      : editQuiz == undefined
      ? "text"
      : editQuiz.questionType
  );
  const [answerType, setAnswerType] = useState(
    selectedSubject == "addnew"
      ? "text"
      : editQuiz == undefined
      ? "text"
      : editQuiz.answerType
  );
  const [explanationType, setExplanationType] = useState(
    selectedSubject == "addnew"
      ? "text"
      : editQuiz == undefined
      ? "text"
      : editQuiz.explanationType
  );
  const [questionImage, setQuestionImage] = useState(
    selectedSubject == "addnew"
      ? ""
      : editQuiz == undefined
      ? ""
      : editQuiz.questionImage
  );
  // const [explanationImage, setExplanationImage] = useState("");

  //image files state
  const [uploadingquestionPhoto, setUploadingquestionPhoto] = useState(false);
  const [uploadingAnswerphoto, setUploadingAnswerphoto] = useState(false);
  const [uploadingExplanationPhoto, setUploadingExplanationPhoto] =
    useState(false);

  const addImageQuestionPhotoUpload = async (e: any) => {
    if (e.target.files[0] != null) {
      try {
        setUploadingquestionPhoto(true);
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
        setUploadingquestionPhoto(false);
      }
    }
  };
  const addImageAnswerOptionUpload = async (e: any) => {
    if (e.target.files[0] != null) {
      try {
        setUploadingAnswerphoto(true);
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
          answerOptions.push(`${res.data.id}`);
          setAnswerOptions(answerOptions);

          showToast("Upload success!", "success");
        }
      } catch (e) {
        showToast(`${e}`, "error");
      } finally {
        setUploadingAnswerphoto(false);
      }
    }
  };

  const addExplanationImageUpload = async (e: any) => {
    if (e.target.files[0] != null) {
      try {
        setUploadingExplanationPhoto(true);
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
        setUploadingExplanationPhoto(false);
      }
    }
  };

  //saving logic
  const saveQuestion = async () => {
    if (saving) {
      return;
    }
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
      quizId,
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

    setSaving(true);
    try {
      if (selectedSubject == "addnew") {
        let res = await GamifiedQuizRepo.addQuestionToGamifiedQuiz(
          selectedVideoId,
          newonequiz
        );
        if (res) {
          // add question to in memory storage
          let newtests = myQuizzes.map((e) => {
            if (e.testId == selectedVideoId) {
              e.questions.unshift(newonequiz);
            }
            return e;
          });
          setMyQuizzes(newtests);
        }
      } else {
        let res = await GamifiedQuizRepo.UpdateOneQuestionToGamifiedQuiz(
          selectedVideoId,
          newonequiz
        );
        if (res) {
          // add question to in memory storage
          let newtests = myQuizzes.map((e) => {
            if (e.testId == selectedVideoId) {
              e.questions = e.questions.map((o) => {
                if (o.quizId == quizId) {
                  return newonequiz;
                }
                return o;
              });
            }
            return e;
          });
          setMyQuizzes(newtests);
        }
      }
      router.back();
      showToast(
        selectedSubject == "addnew" ? "question saved" : "question updated",
        "success"
      );
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex-1 flex text-sm flex-col font-normal bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-44 w-full ">
        <div className="flex h-9 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-main text-lg">
            {selectedSubject == "addnew"
              ? " Add New Question"
              : "Edit Question"}
          </div>
        </div>
        <div className="flex flex-wrap w-full justify-center md:justify-start ">
          <div className="flex flex-col m-1  w-80 md:w-[400px]">
            <label
              htmlFor="title"
              className="font-semibold text-main leading-4"
            >
              Question Type
            </label>

            <select
              name="subject"
              id="subject "
              value={questionType}
              onChange={(v) => setQuestionType(v.target.value)}
              className="px-3 py-2 w-full capitalize  outline-none bg-white rounded-md dark:bg-darkmain  focus:ring-1 focus:ring-main"
            >
              {["text", "image", "text+image"].map((e) => (
                <option key={e} value={e} className="capitalize">
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col m-1  w-80 md:w-[400px]">
            <label
              htmlFor="title "
              className="font-semibold text-main leading-4"
            >
              Points
            </label>
            <input
              value={points}
              type="number"
              onChange={(e) => setPoints(parseInt(e.target.value))}
              className="outline-none bg-white rounded-md px-3 py-2  w-full dark:bg-darkmain focus:ring-1 focus:ring-main text-black"
            />
          </div>
          <div className="flex flex-col m-1  w-80 md:w-[400px]">
            <label
              htmlFor="title "
              className="font-semibold text-main leading-4"
            >
              Timeout duration <span className="text-xs">(in secs)</span>
            </label>
            <input
              value={timerSeconds}
              type="number"
              onChange={(e) => setTimerSeconds(parseInt(e.target.value))}
              className="outline-none bg-white rounded-md px-3 py-2  w-full dark:bg-darkmain focus:ring-1 focus:ring-main text-black"
            />
          </div>
          <div className="w-full"></div>
          {questionType != "image" && (
            <div className="flex flex-col  w-[92%] md:w-[79%] m-1 text-sm text-main">
              <label
                htmlFor="title "
                className="font-semibold text-main leading-4"
              >
                Question
              </label>
              <textarea
                rows={4}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="outline-none bg-white rounded-md px-3 py-2    dark:bg-darkmain  focus:ring-1 focus:ring-main text-black"
              />
            </div>
          )}
          <div className="w-full"></div>
          {questionType != "text" && (
            <div className="w-full px-2">
              <div className="flex flex-col mt-2  w-52 text-main">
                <label
                  htmlFor="title "
                  className="font-semibold text-main leading-4"
                >
                  Qestion Image
                </label>
                {questionImage == "" ? (
                  uploadingquestionPhoto ? (
                    <div className="bg-main p-2.5 px-4 cursor-pointer dark:text-white text-lg font-bold rounded-xl flex justify-center items-center text-black">
                      {" "}
                      <LoadingComponent
                        loading={uploadingquestionPhoto}
                        color="white"
                      />
                      <p className="text-sm">Uploading Photo ...</p>
                      <p className="ml-2 text-xs">please wait</p>
                    </div>
                  ) : (
                    <label
                      htmlFor="paper"
                      className="bg-main p-1.5 cursor-pointer text-white text-base px-5 font-bold rounded-md"
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
          <div className="w-full"></div>
          <div className="flex flex-col m-1 mt-4  w-80 md:w-[400px]">
            <label
              htmlFor="title"
              className="font-semibold text-main leading-4"
            >
              Answer Type
            </label>

            <select
              name="subject"
              id="subject "
              value={answerType}
              onChange={(v) => {
                setAnswerType(v.target.value);
                setAnswerOptions([]);
              }}
              className="px-3 py-2 w-full capitalize  outline-none bg-white rounded-md dark:bg-darkmain  focus:ring-1 focus:ring-main"
            >
              {["text", "image"].map((e) => (
                <option key={e} value={e} className="capitalize">
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <p className="mt-3 ">Available choices</p>{" "}
          </div>
          <div className="flex flex-col w-full">
            {" "}
            {answerType == "text" &&
              answerOptions.length > 0 &&
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
                      let newoptions = answerOptions.filter((o) => o != e);
                      setAnswerOptions(newoptions);
                    }}
                    className="text-red-500 hover:text-red-700 cursor-pointer p-0.5 rounded-lg"
                  >
                    <FaWindowClose />
                  </div>
                </motion.div>
              ))}
          </div>
          {answerType == "image" && answerOptions.length > 0 && (
            <div className="flex flex-wrap w-full justify-start space-x-4">
              {answerOptions.map((e) => (
                <div key={e} className="flex flex-col ">
                  <img
                    src={`${prodUrl}/view_thumbnail/quizes/${e}`}
                    className="w-full border-l rounded-md border-gray-400 h-28 w-44"
                    alt="image not found"
                  />
                  <div
                    onClick={() => setCorrectAnswer(e)}
                    className={` w-44 flex justify-center rounded-b-md py-1 px-3 text-sm ${
                      correctAnswer == e
                        ? "bg-green-600 text-white"
                        : " bg-main cursor-pointer"
                    } `}
                  >
                    {correctAnswer == e ? "Correct Answer " : "Mark as Answer"}
                  </div>
                </div>
              ))}
            </div>
          )}
          {answerType != "text" && (
            <div className="w-full px-2">
              <div className="flex flex-col mt-2  w-52 text-main">
                <label
                  htmlFor="title "
                  className="font-semibold text-main leading-4"
                >
                  Add Image Answer Choice
                </label>
                {uploadingAnswerphoto ? (
                  <div className="bg-main p-2.5 px-4 cursor-pointer dark:text-white text-lg font-bold rounded-xl flex justify-center items-center text-black">
                    <LoadingComponent
                      loading={uploadingAnswerphoto}
                      color="white"
                    />
                    <p className="text-sm">Uploading Photo ...</p>
                    <p className="ml-2 text-xs">please wait</p>
                  </div>
                ) : (
                  <label
                    htmlFor="paper"
                    className="bg-main p-1.5 cursor-pointer text-white px-5  rounded-md"
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
          {answerType == "text" && (
            <div className="flex w-[92%] md:w-[80%] items-center">
              <div className="flex flex-col m-1 text-sm flex-1 text-main">
                <label
                  htmlFor="title "
                  className="font-semibold text-main leading-4"
                >
                  Answer Choice
                </label>
                <input
                  value={newAnswerOption}
                  onChange={(e) => setNewAnswerOption(e.target.value)}
                  className="outline-none bg-white rounded-md px-3 py-2  w-full dark:bg-darkmain focus:ring-1 focus:ring-main text-black"
                />
              </div>
              <div
                onClick={() => {
                  if (newAnswerOption !== "") {
                    if (answerOptions.length < 4) {
                      setAnswerOptions([...answerOptions, newAnswerOption]);
                      setNewAnswerOption("");
                    } else {
                      showToast("Maximum Answer Options Reached", "error");
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
          <div className="w-full"></div>
          <div className="w-full"></div>
          {answerType == "text" ? (
            <div className="flex flex-col m-1  w-80 md:w-[400px]">
              <label
                htmlFor="title"
                className="font-semibold text-main leading-4"
              >
                Correct Answer
              </label>

              <select
                name="subject"
                id="subject "
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="px-3 py-2 w-full capitalize  outline-none bg-white rounded-md dark:bg-darkmain  focus:ring-1 focus:ring-main"
              >
                <option value="">Select the correct answer</option>
                {answerOptions.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="w-full"></div>
        <div className="flex flex-col m-1  w-80 md:w-[400px]">
          <label htmlFor="title" className="font-semibold text-main leading-4">
            Explanation Type
          </label>

          <select
            name="subject"
            id="subject "
            value={explanationType}
            onChange={(v) => setExplanationType(v.target.value)}
            className="px-3 py-2 w-full capitalize  outline-none bg-white rounded-md dark:bg-darkmain  focus:ring-1 focus:ring-main"
          >
            {["text", "image"].map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
        {explanationType != "text" && (
          <div className="w-full">
            <div className="flex flex-col mt-2  w-52 text-main">
              <label htmlFor="title font-bold">Explanation Image</label>
              {answerExplanation == "" ? (
                uploadingExplanationPhoto ? (
                  <div className="bg-main p-2.5 px-4 cursor-pointer dark:text-white text-lg font-bold rounded-xl flex justify-center items-center text-black">
                    {" "}
                    <LoadingComponent
                      loading={uploadingExplanationPhoto}
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
                    src={`${prodUrl}/view_thumbnail/quizes/${answerExplanation}`}
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
          <div className="flex flex-col m-1  w-80 md:w-[700px]">
            <label
              htmlFor="title"
              className="font-semibold text-main leading-4"
            >
              Answer Explanation
            </label>
            <textarea
              rows={4}
              value={answerExplanation}
              placeholder="Explanation required"
              onChange={(e) => setAnswerExplanation(e.target.value)}
              className="outline-none bg-white rounded-md px-3 py-2 w-full dark:bg-darkmain focus:ring-1 focus:ring-main text-black"
            />
          </div>
        )}

        <div className="mt-5 flex w-full justify-around md:w-[800px]">
          <div
            onClick={() => router.back()}
            className="flex w-40 border-[1px] border-red-700 hover:bg-red-700 hover:text-white transition-all cursor-pointer py-2 justify-center rounded-md "
          >
            Cancel Process
          </div>
          <div
            onClick={saveQuestion}
            className="flex w-40 rounded-md bg-main hover:bg-teal-700 transition-all  justify-center py-2 text-white cursor-pointer"
          >
            {saving ? "Saving ..." : "Save Question"}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddQuestionPage;
