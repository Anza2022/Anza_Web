/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { createRef, useContext, useState } from "react";
import GamifiedQuizRepo from "../../../../data/repos/gamified_quiz_repo";
import GamifiedQuizTest, {
  OneQuiz,
} from "../../../../models/curriculum/gamified_quizes_model";
import LoadingComponent from "../../../../presentation/components/others/loading_component";
import { LoggedInUserContext } from "../../../../presentation/contexts/loggedin_user_controller";
import DashboardLayout from "../../../../presentation/layouts/dashboard_layout";
import {
  prodUrl,
  subjectOptions,
} from "../../../../presentation/utils/constants";
import {
  getCurrentDate,
  showToast,
} from "../../../../presentation/utils/helper_functions";
const AddNewGamifiedQuestions = () => {
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
      false,
      ""
    );

    try {
      await GamifiedQuizRepo.addnewGamifiedQuiz(newTest);
      router.back();
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 font-normal dark:bg-darksec  md:ml-44 relative min-h-screen py-16 w-full items-center ">
        <div className="flex h-12 items-center justify-start  pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg capitalize md:text-2xl">
            Add new Gamified Test
          </div>
        </div>
        <div className="flex flex-col  items-center w-full">
          <div className="flex flex-wrap w-full justify-center md:justify-start">
            {/* test details entry */}
            <div className="flex flex-col m-2 text-main w-80 md:w-[500px]">
              <label htmlFor="title " className="font-bold">
                Class Level
              </label>
              <select
                name="classlevel"
                id="classlevel "
                value={classLevel}
                onChange={(v) => setClassLevel(v.target.value.toLowerCase())}
                className="px-3 py-2.5 text-lg w-full outline-none bg-white rounded-md dark:bg-darkmain  focus:ring-1 focus:ring-main text-black"
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
            <div className="flex flex-col m-2 text-main w-80 md:w-[500px]">
              <label htmlFor="title " className="font-bold">
                Subject Type
              </label>
              <select
                name="subject"
                id="subject"
                value={subjectType}
                onChange={(v) => setSubjectType(v.target.value)}
                className="px-3 py-2.5 text-lg w-full  outline-none bg-white rounded-md dark:bg-darkmain  focus:ring-1 focus:ring-main text-black"
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
            <div className="flex flex-col m-2  w-80 md:w-[500px]">
              <label htmlFor="title " className="text-main font-bold">
                Test Title
              </label>
              <input
                placeholder="Enter Your Test Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="outline-none bg-white rounded-md px-3 py-2.5  w-full dark:bg-darkmain focus:ring-1 focus:ring-main text-black"
              />
            </div>
            <div className="flex flex-col m-2 text-main w-80 md:w-[500px]">
              <label htmlFor="title" className="font-bold">
                Pass Percentage(in %)
              </label>
              <input
                value={passPercentage}
                type="number"
                min={10}
                max={100}
                onChange={(e) => setPasspercentage(parseInt(e.target.value))}
                className="outline-none bg-white rounded-md px-3 py-2.5 w-full dark:bg-darkmain focus:ring-1 focus:ring-main text-black"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full px-4">
          <div className="flex flex-col items-start mt-2 text-main">
            <label htmlFor="title font-bold">Test Thumbnail</label>
            {thumbnailUrl == "" ? (
              uploadingThumbnail ? (
                <div className="bg-main p-2.5 px-4 cursor-pointer  text-white text-lg font-bold rounded-xl flex justify-center items-center text-black">
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
                  className="bg-main p-1.5 cursor-pointer px-10 text-white text-lg rounded-md"
                >
                  Upload Thumbnail
                </label>
              )
            ) : (
              <div className="flex flex-col">
                <p className="text-sm">Thumbnail Photo</p>
                <img
                  src={`${prodUrl}/view_thumbnail/quizes/${thumbnailUrl}`}
                  className="w-full border-l rounded-md border-gray-400 h-28"
                  alt="image not found"
                />
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
              className="hidden"
              onChange={handleThumbnailUpload}
            />
          </div>
        </div>

        <div className="flex  w-full md:w-[800px] justify-between px-5 md:px-12 self-start mt-24  text-base">
          <div
            onClick={() => {
              router.push("/dashboard/tcorner/quizes");
            }}
            className=" bg-red-700  w-44  text-white hover:bg-red-500 transition-all cursor-pointer rounded-md px-5 py-3   text-center"
          >
            <p>Cancel Process </p>
          </div>

          <div
            onClick={saveTest}
            className=" bg-main  w-44 hover:bg-teal-800   transition-all cursor-pointer rounded-md px-5 py-3  flex justify-center "
          >
            <LoadingComponent loading={loading} color="white" />
            <p className="text-white">
              {loading ? "Saving ..." : " Save Test"}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddNewGamifiedQuestions;
