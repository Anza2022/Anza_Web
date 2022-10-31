import { useRouter } from "next/router";
import React, { useState } from "react";
import GamifiedQuizRepo from "../../../data/repos/gamified_quiz_repo";
import GamifiedQuizTest, {
  OneQuiz,
} from "../../../models/curriculum/gamified_quizes_model";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  classOptions,
  subjectOptions,
} from "../../../presentation/utils/constants";
import {
  getCurrentDate,
  showToast,
} from "../../../presentation/utils/helper_functions";

const AdminAddQuizesPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<OneQuiz[]>([]);
  const [teacherName, setTeacherName] = useState("");
  const [schoolName, setSchoolName] = useState("Anza");
  const [classLevel, setClassLevel] = useState("");
  const [subjectType, setSubjectType] = useState("");

  //question
  const [newQuestion, setNewQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answerOptions, setAnswerOptions] = useState("");
  const [points, setPoints] = useState(10);
  const [seconds, setSeconds] = useState(5);
  const [quizNumber, setQuizNumber] = useState(questions.length + 1);

  const getTotalScore = () => {
    let total = 0;
    questions.forEach((e) => {
      total += e.points;
    });
    return total;
  };

  const addTest = async () => {
    if (loading) {
      return;
    }
    if (subjectType == "") {
      showToast("select subject", "error");
      return;
    }
    if (classLevel == "") {
      showToast("select form", "error");
      return;
    }

    try {
      setLoading(true);
      // const newtest = new GamifiedQuizTest(
      //   "",
      //   title,
      //   questions,
      //   getTotalScore(),
      //   getCurrentDate(),
      //   getCurrentDate(),
      //   "anzaadmin",
      //   teacherName,
      //   schoolName,
      //   classLevel,
      //   subjectType,
      //   "",
      //   0,
      //   1
      // );

      // const res = await GamifiedQuizRepo.addnewGamifiedQuiz(newtest);

      showToast("test added", "success");
      router.push("/admin/quizes");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const addOneQuiz = () => {
    if (newQuestion === "") {
      showToast("enter question", "error");
      return;
    }
    if (answerOptions === "") {
      showToast("enter answer options", "error");
      return;
    }
    if (correctAnswer === "") {
      showToast("enter correct answer", "error");
      return;
    }
    if (points === 0) {
      showToast("enter points", "error");
      return;
    }
    // if (!answerOptions.split(",").includes(correctAnswer)) {
    //   showToast("correct answer not in answer options", "error");
    //   return;
    // }
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].question == newQuestion) {
        showToast("question already added", "error");
        return;
      }
    }

    // let newonequiz = new OneQuiz();
    let allquizes = [...questions];
    allquizes.sort((a, b) => b.questionNumber - a.questionNumber);
    setQuestions(allquizes);
    showToast("question added", "success");
    setNewQuestion("");
    setAnswerOptions("");
    setCorrectAnswer("");
    setPoints(5);
    setSeconds(5);
    setQuizNumber(questions.length + 2);
  };
  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200  dark:bg-darksec min-h-screen py-16 md:ml-52 w-full ">
        <div className="flex h-12 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-fuchsia-600 font-black text-2xl">
          ADD NEW TEST QUIZES
          </div>
        </div>
        <p className="text-main text-center font-black text-xl">Test Details</p>
        <div className="flex flex-wrap items-center w-full">
          <div className="flex flex-col m-2">
            <label htmlFor="topic"> School Name</label>
            <input
              value={schoolName}
              readOnly
              onChange={(e) => setSchoolName(e.target.value)}
              className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="title">Class Level</label>
            <select
              name="classlevel"
              id="classlevel "
              value={classLevel}
              onChange={(v) => setClassLevel(v.target.value.toLowerCase())}
              className="px-3 py-3 w-72  outline-none dark:bg-darkmain bg-white rounded-xl "
            >
              {" "}
              <option value={""}>select form</option>
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
              className="px-3 py-3 w-72  outline-none bg-white dark:bg-darkmain rounded-xl "
            >
              {" "}
              <option value={""}>select subject</option>
              {subjectOptions.map((e) => (
                <option key={e} value={e.toLowerCase()}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="topic"> Quiz Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="topic"> Teacher Name</label>
            <input
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2"
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <p className="text-main font-bold text-xl text-center">
            Add new question
          </p>
          <div className="flex flex-wrap w-full justify-start">
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> New Question</label>
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2  w-full md:w-[500px] "
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Answer Options</label>
              <input
                value={answerOptions}
                onChange={(e) => setAnswerOptions(e.target.value)}
                className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2 w-full md:w-[500px] "
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Correct Answer</label>
              <input
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="outline-none bg-white  dark:bg-darkmain rounded-xl px-3 py-2  w-full md:w-[500px] "
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Points</label>
              <input
                value={points}
                type="number"
                onChange={(e) => setPoints(parseInt(e.target.value))}
                className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2  "
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Pop Time (secs)</label>
              <input
                value={seconds}
                type="number"
                onChange={(e) => setSeconds(parseInt(e.target.value))}
                className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2  "
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Question Number</label>
              <input
                value={quizNumber}
                type="number"
                onChange={(e) => setQuizNumber(parseInt(e.target.value))}
                className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2  "
              />
            </div>

            <div
              onClick={addOneQuiz}
              className="flex justify-center items-center w-40 h-9 rounded-xl shadow-2xl mt-5 text-white bg-main cursor-pointer self-center"
            >
              Add Quiz
            </div>
          </div>

          <div className="h-5"></div>
          <p className="text-main font-bold text-xl text-center">
            Available questions
          </p>

          <div className="flex flex-wrap w-full p-2 justify-around">
            {questions.map((e, i) => (
              <div
                key={i}
                className="flex flex-col w-96 md:w-[450px] p-3 bg-white dark:bg-darkmain rounded-xl m-2"
              >
                <p>
                  {e.questionNumber}: {e.question}
                </p>
                <p>{e.answer}</p>
                <p>{e.answerOptions.join(",")}</p>
                <div className="w-full flex justify-between">
                  <p>{e.points} Points</p>
                  <p>{e.timerSeconds} Seconds</p>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    onClick={() => {
                      let newquestions = questions.filter(
                        (q) => q.question !== e.question
                      );
                      newquestions.sort(
                        (a, b) => b.questionNumber - a.questionNumber
                      );
                      setQuestions(newquestions);
                      showToast("deleted", "success");
                    }}
                    className="px-4 py-1 text-sm bg-red-500 cursor-pointer rounded-xl text-white"
                  >
                    Delete
                  </div>
                </div>
              </div>
            ))}
            <div
              className={`flex flex-col w-96 md:w-[450px] p-3  rounded-xl m-2 ${
                questions.length % 2 == 0 ? "hidden" : ""
              }`}
            ></div>
          </div>
        </div>
        <div className="w-full mt-5 flex flex-wrap justify-around">
          <div
            onClick={addTest}
            className="px-8 py-2  my-2 rounded-xl bg-main text-white shadow-xl cursor-pointer flex items-center"
          >
            <LoadingComponent loading={loading} color="white" />
            <p> {loading ? "saving test ..." : "Save Test"}</p>
            {loading ? <p className="text-xs">please wait</p> : <p></p>}
          </div>
          <div
            onClick={() => {
              router.push("/admin/quizes");
            }}
            className="px-8 py-2 rounded-xl my-2 bg-red-600 text-white shadow-xl cursor-pointer"
          >
            Cancel Process
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminAddQuizesPage;
