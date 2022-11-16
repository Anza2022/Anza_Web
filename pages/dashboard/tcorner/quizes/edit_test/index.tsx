import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import GamifiedQuizRepo from "../../../../../data/repos/gamified_quiz_repo";
import { OneQuiz } from "../../../../../models/curriculum/gamified_quizes_model";
import LoadingComponent from "../../../../../presentation/components/others/loading_component";
import { NavigationContext } from "../../../../../presentation/contexts/navigation_state_controller";
import { TeachersAccountContext } from "../../../../../presentation/contexts/teachers_account_context";
import DashboardLayout from "../../../../../presentation/layouts/dashboard_layout";
import {
  prodUrl,
  subjectOptions,
} from "../../../../../presentation/utils/constants";
import { showToast } from "../../../../../presentation/utils/helper_functions";

const EditTestPage = () => {
  const { selectedVideoId, setSelectedVideoId, setSelectedSubject } =
    useContext(NavigationContext);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { myQuizzes, setMyQuizzes } = useContext(TeachersAccountContext);
  let test = myQuizzes.filter((e) => e.testId == selectedVideoId)[0];

  //state
  const [title, setTitle] = useState(test != undefined ? test.title : "");

  const [passPercentage, setPasspercentage] = useState(     test != undefined ? test.passPercentage : "" );
  const [ClassLevel, setClassLevel] = useState(
    test != undefined ? test.classLevel : ""
  );
  const [SubjectType, setSubjectType] = useState(
    test != undefined ? test.subjectType : ""
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(
    test != undefined ? test.thumbnailUrl : ""
  );
  const [points, setPoints] = useState(
    test != undefined ? test.totalPoints : ""
  );
  const [Tquestions, setTquestions] = useState( test != undefined ? test.questions : ""
  );
  //other states
  const [uploadingPaper, setUploadingPaper] = useState(false);
  const [showAvailableQuizes, setShowAvailableQuizes] = useState(true);
  const [deletingQuestion, setDeletingQuestion] = useState(false);
  const deleteOneQuestion = async (question: string) => {
    setDeletingQuestion(true);
    try {
      let res = await GamifiedQuizRepo.deleteOneQuestionInTest(
        test.testId,
        question
      );
      if (res) {
        let newtests = myQuizzes.map((e) => {
          if (e.testId == selectedVideoId) {
            e.questions = e.questions.filter(
              (o) => o.question.toLowerCase() != question.toLowerCase()
            );
          }
          return e;
        });
        setMyQuizzes(newtests);
        showToast("Question deleted", "success");
      }
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setDeletingQuestion(false);
    }
  };

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

     const [saving, setSaving] = useState(false);

  const handleUpdateQuiz = async () => {
    if (test != undefined) {
      if (
        title !== test.title ||
        SubjectType !== test.subjectType ||
        ClassLevel !== test.classLevel ||
          thumbnailUrl !== test.thumbnailUrl ||
          points !== test.totalPoints     || 
          passPercentage !== test.passPercentage 
      ) {
        setSaving(true);
        let  updatedQuiz = test;
        updatedQuiz.title = title;
        updatedQuiz.subjectType = SubjectType;
        updatedQuiz.classLevel = ClassLevel;
        updatedQuiz.thumbnailUrl = thumbnailUrl;
        try {
          let res = await GamifiedQuizRepo.updateGamifiedQuiz(updatedQuiz);
          if (res) {
            showToast("Quize Updated", "success");
            router.push("/dashboard/tcorner/quizes/");
          }
        } catch (e) {
          showToast(`${e}`, "error");
        } finally {
          setSaving(false);
        }
      } else {
        showToast("Up to date", "success");
      }
    }
  };


  


  return (
    <DashboardLayout>
      <div className="flex-1 flex text-sm flex-col font-normal bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-44 w-full ">
        <div className="flex h-9 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-main text-lg">Update Gamefied Quiz</div>
        </div>
        <div className="flex flex-wrap w-full justify-center md:justify-start ">
          <div className="flex flex-col m-2  w-80 md:w-[400px]">
            <label
              htmlFor="title"
              className="font-semibold text-main leading-4"
            >
              {" "}
              Test Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2 w-full"
            />
          </div>
          <div className="flex flex-col m-2  w-80 md:w-[400px]">
            <label
              htmlFor="title"
              className="font-semibold text-main leading-4"
            >
              Pass Percentage <span className="text-xs">(%)</span>
            </label>
            <input
              value={passPercentage}
              onChange={(e) => setPasspercentage(e.target.value)}
              className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2 w-full"
            />
          </div>


          <div className="flex flex-col m-2  w-80 md:w-[400px]">
            <label
              htmlFor="title"
              className="font-semibold text-main leading-4"
            >
              Quiz Thumbnail 
            </label>

            <div className="w-96 text-3xl flex my-3">
                {
                  uploadingPaper ? (
                    <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                    <LoadingComponent loading={uploadingPaper} color="white" />
                                      <p className="text-sm">Uploading Thumbnail... please wait</p>
                </button>
                  ) : (
                    <div>
                        
               <img src={`${prodUrl}/view_thumbnail/quizes/${thumbnailUrl}`} alt="img missing" className="text-sm" />   
                    <label
                      htmlFor="paper"
                      className="bg-main p-2.5 px-4 cursor-pointer text-white text-sm  rounded-md">
                      Change Thumbnail
                    </label>
                    </div>
                  )
              }
                <input
                  type="file"
                  id="paper"
                  accept="image/*"
                  className="hidden "
                onChange={handleThumbnailUpload}
                />
              </div>

          </div>


          <div className="flex flex-col m-2  w-80 md:w-[400px]">
            <label
              htmlFor="title"
              className="font-semibold text-main leading-4"
            >
              Subject Type
            </label>

            <select
              name="subject"
              id="subject "
              value={SubjectType}
              onChange={(v) => setSubjectType(v.target.value)}
              className="px-3 py-2 w-full  outline-none bg-white rounded-md dark:bg-darkmain  focus:ring-1 focus:ring-main"
            >
              {" "}
              <option value={SubjectType}>{SubjectType}</option>
              {subjectOptions.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>


        </div>
        <div className="flex flex-col">
          <p className="text-center text-main flex self-center font-bold text-lg mt-5">
            Available Questions{" "}
            <span
              onClick={() => setShowAvailableQuizes(!showAvailableQuizes)}
              className="pl-3 cursor-pointer"
            >
              {showAvailableQuizes ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </span>
          </p>
          <div className="flex w-full justify-end pr-5">
            <div
              onClick={() => {
                setSelectedSubject("addnew");
                router.push(
                  "/dashboard/tcorner/quizes/edit_test/questions/add_question"
                );
                // setTimeout(() => {
                // }, 100);
              }}
              className="flex px-6 py-1 border-[1px] border-main rounded-md cursor-pointer hover:bg-main hover:text-white transition-all"
            >
              Add New Question
            </div>
          </div>
          {test != undefined && test.questions.length < 1 && (
            <div className="w-full justify-center flex flex-col items-center h-60">
              <p>No questions in this test</p>
              <p className="text-xs">
                You can add a question with above button
              </p>
            </div>
          )}
          {test != undefined && test.questions.length > 0 && (
            <div className="flex flex-col w-full p-2">
              {test.questions.map((e, i) => (
                <motion.div
                  key={e.question}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className=" mx-4 my-2 p-2 w-[90vw] md:w-[70vw] rounded bg-gray-100 dark:bg-darkmain flex flex-col"
                >
                  <div className="flex items-start">
                    <p>{i + 1}: </p>
                    <div className="flex flex-col">
                      {e.questionType != "image" ? (
                        <p className="text-sm pl-1">
                          {e.question}
                          {e.question.endsWith("?") ? "" : "?"}
                        </p>
                      ) : (
                        <img
                          src={`${prodUrl}/view_thumbnail/quizes/${e.questionImage}`}
                          className="w-full border-l rounded-md border-gray-400 h-28"
                          alt="image missing"
                        />
                      )}
                      {e.questionType == "text+image" && (
                        <img
                          src={`${prodUrl}/view_thumbnail/quizes/${e.questionImage}`}
                          className="w-full border-l rounded-md object-contain border-gray-400 h-28"
                          alt="image  missing"
                        />
                      )}
                    </div>
                    <div className="flex-1"></div>
                    <p>{e.points} points</p>
                    <div
                      onClick={() => {
                        if (e.quizId == "") {
                          showToast(
                            "Cannot edit this question, delete and add it again",
                            "error"
                          );
                          return;
                        }
                        setSelectedSubject(e.quizId);
                        router.push(
                          "/dashboard/tcorner/quizes/edit_test/questions/add_question"
                        );
                      }}
                      className="px-4 ml-3 rounded-md text-xs cursor-pointer py-1 text-white bg-green-600"
                    >
                      Edit
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
                        {e.answerType == "text" ? (
                          <p className="">
                            {i + 1}: {o}
                          </p>
                        ) : (
                          <img
                            src={`${prodUrl}/view_thumbnail/quizes/${o}`}
                            className="w-full border-l rounded-md object-contain border-gray-400 h-20"
                            alt="image missing"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between w-full">
                    {e.explanationType == "text" ? (
                      <p className="text-xs pl-2">{e.answerExplanation}</p>
                    ) : (
                      <div className="flex flex-col">
                        <p>Explaination Image</p>
                        <img
                          src={`${prodUrl}/view_thumbnail/quizes/${e.answerExplanation}`}
                          className="w-full border-l rounded-md object-contain border-gray-400 h-20"
                          alt="image missing"
                        />
                      </div>
                    )}
                    <div
                      onClick={() => {
                        let confirm = window.confirm(
                          "Are you sure you want to delete this Question?"
                        );
                        if (confirm) {
                          deleteOneQuestion(e.question);
                        }
                      }}
                      className="px-4 ml-3 rounded-md text-xs cursor-pointer py-1 text-white bg-red-600"
                    >
                      {deletingQuestion ? "deleting ..." : "Delete"}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-5 flex w-full justify-between md:w-[900px]">
          <div></div>
          <div
            onClick={() => router.push("/dashboard/tcorner/quizes")}
            className="flex w-40 border-[1px] border-red-700 hover:bg-red-700 hover:text-white transition-all cursor-pointer py-2 justify-center rounded-md "
          >
            Cancel Process
          </div>
          <div
             onClick={handleUpdateQuiz}
            //onClick={() => router.push("/dashboard/tcorner/quizes")}
            className="flex w-40 rounded-md bg-main hover:bg-teal-700 transition-all  justify-center py-2 text-white cursor-pointer"
          >
            {saving ? "Saving ..." : "Save Test"}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditTestPage;
