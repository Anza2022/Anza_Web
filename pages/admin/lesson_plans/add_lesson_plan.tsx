import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import LessonPlanRepo from "../../../data/repos/lesson_plans_repo";
import LessonPlanModel from "../../../models/teacher/lesson_plan_model";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { TeachersAccountContext } from "../../../presentation/contexts/teachers_account_context";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  pastpaperCategories,
  papernumberoptions,
  subjectOptions,
  classOptions,
} from "../../../presentation/utils/constants";
import {
  getCurrentDate,
  showToast,
} from "../../../presentation/utils/helper_functions";

const AdminAddLessonPlanPage = () => {
  const [title, setTitle] = useState("");
  const [fileId, setFileId] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [subjectType, setSubjectType] = useState("");
  const [chapter, setChapter] = useState("");
  const [chapterNumber, setChapterNumber] = useState(1);
  const [topic, setTopic] = useState("");
  const [topicNumber, setTopicNumber] = useState(1);
  const [term, setTerm] = useState("");
  //file upload
  const [uploadingPaper, setUploadingPaper] = useState(false);
  const [uploadingMs, setUploadingMs] = useState(false);
  const [savingPaper, setSavingPaper] = useState(false);

  const handleDocUpload = async (e: any) => {
    if (e.target.files[0] != null) {
      try {
        setUploadingPaper(true);
        const formData = new FormData();

        // Update the formData object
        formData.append("lesson", e.target.files[0], e.target.files[0].name);
        formData.append("type", "lesson_plan");
        formData.append("extension", e.target.files[0].name.split(".")[1]);

        // let res = await axios.post(
        //   "http://localhost:8080/anzaapi/upload_video/lesson",
        //   formData
        // );
        let res = await axios.post(
          "https://anzaacademy.co/anzaapi/upload_video/lesson",
          formData
        );
        if (res.status === 206) {
          showToast(`${res.data.message}`, "error");
        } else {
          setFileId(res.data.id);
          showToast("upload success", "success");
        }
      } catch (e) {
        showToast(`${e}`, "error");
      } finally {
        setUploadingPaper(false);
      }
    }
  };

  const router = useRouter();
  const { lessonPlans, setLessonPlans } = useContext(TeachersAccountContext);
  const handleSavePaper = async () => {
    if (title == "") {
      showToast("enter past paper title", "error");
      return;
    }
    if (classLevel == "") {
      showToast("enter class Level", "error");
      return;
    }
    if (subjectType == "") {
      showToast("enter subject type", "error");
      return;
    }

    if (fileId == "") {
      showToast("upload lesson plan file", "error");
      return;
    }

    setSavingPaper(true);

    try {
      let newplan = new LessonPlanModel(
        "",
        title,
        fileId,

        classLevel,
        subjectType,
        "n/a",
        1,
        topic,
        topicNumber,

        getCurrentDate(),
        getCurrentDate(),
        term
      );

      let res = await LessonPlanRepo.addLessonPlan(newplan);
      setLessonPlans([res, ...lessonPlans]);
      router.push("/admin/lesson_plans");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setSavingPaper(false);
    }
  };
  const handleCancelProcess = () => {
    router.push("/admin/lesson_plans");

    try {
      if (fileId != "") {
        //todo send request to delete the video on the server
      }
    } catch (e) {
      showToast(`${e}`, "error");
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-52 w-full relative">
        <div className="flex h-12 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-fuchsia-600 font-black text-2xl">
       ADD NEW LESSON PLAN
          </div>
        </div>

        {/* lesson details input */}
        <div className="flex flex-col  items-center w-full">
          <div className="flex flex-wrap w-full justify-center md:justify-start">
            <div className="flex flex-col m-2">
              <label htmlFor="title">Class Level</label>
              <select
                name="classlevel"
                id="classlevel "
                value={classLevel}
                onChange={(v) => setClassLevel(v.target.value.toLowerCase())}
                className="px-3 py-2 w-80 outline-none bg-white rounded-xl  dark:bg-darkmain"
              >
                <option value="">Select Level</option>
                {classOptions.map((e) => (
                  <option key={e} value={e.toLowerCase()}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Term</label>
              <select
                name="subject"
                id="subject "
                value={term}
                onChange={(v) => setTerm(v.target.value)}
                className="px-2 py-2 w-80  outline-none bg-white rounded-xl  dark:bg-darkmain"
              >
                {" "}
                <option value="">Select Term</option>
                {["Term 1", "Term 2", "Term 3"].map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Subject Type</label>
              <select
                name="subject"
                id="subject "
                value={subjectType}
                onChange={(v) => setSubjectType(v.target.value)}
                className="px-2 py-2 w-80  outline-none bg-white rounded-xl  dark:bg-darkmain"
              >
                {" "}
                <option value="">Select Subject Type</option>
                {subjectOptions.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="flex flex-col m-2">
              <label htmlFor="title">Chapter</label>
              <input
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Chapter Number</label>
              <input
                type={"number"}
                value={chapterNumber}
                onChange={(e) => setChapterNumber(parseInt(e.target.value))}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div> */}
            <div className="flex flex-col m-2">
              <label htmlFor="title">Topic</label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Topic Number</label>
              <input
                type={"number"}
                value={topicNumber}
                onChange={(e) => setTopicNumber(parseInt(e.target.value))}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>

            <div className="flex flex-col m-2">
              <label htmlFor="title"> Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>
          </div>
          <div className="flex flex-col w-full mt-5">
            <p className="pl-5 my-2 text-xl font-bold text-secondary">
              Upload Plan File
            </p>
            <div className="w-full flex flex-wrap justify-start ">
              <div className="w-96 text-3xl flex justify-center my-3">
                {fileId == "" ? (
                  uploadingPaper ? (
                    <div className="bg-main p-2.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl flex justify-center items-center">
                      {" "}
                      <LoadingComponent
                        loading={uploadingPaper}
                        color="white"
                      />
                      <p className="text-sm">Uploading plan ...</p>
                      <p className="ml-2 text-xs">please wait</p>
                    </div>
                  ) : (
                    <label
                      htmlFor="paper"
                      className="bg-main p-1.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl"
                    >
                      Upload Plan
                    </label>
                  )
                ) : (
                  <div className="flex flex-col">
                    <p className="text-main text-sm">Lesson Plan</p>
                    <p className="text-xs">{fileId}</p>
                  </div>
                )}
                <input
                  type="file"
                  id="paper"
                  accept=".doc,.docx"
                  className="hidden "
                  onChange={handleDocUpload}
                />
              </div>
            </div>
          </div>
          <div className="w-full mt-5 flex flex-wrap justify-around">
            <div
              onClick={() => {
                handleSavePaper();
              }}
              className="px-8 py-2  my-2 rounded-xl bg-main text-white shadow-xl cursor-pointer flex items-center"
            >
              <LoadingComponent loading={savingPaper} color="white" />
              <p> {savingPaper ? "saving plan ..." : "Save Lesson Plan"}</p>
              {savingPaper ? <p className="text-xs">please wait</p> : <p></p>}
            </div>
            <div
              onClick={handleCancelProcess}
              className="px-8 py-2 rounded-xl my-2 bg-red-600 text-white shadow-xl cursor-pointer"
            >
              Cancel Process
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminAddLessonPlanPage;
