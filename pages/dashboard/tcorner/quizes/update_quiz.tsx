import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import GamifiedQuizRepo from "../../../../data/repos/gamified_quiz_repo";
import LoadingComponent from "../../../../presentation/components/others/loading_component";
import { LoggedInUserContext } from "../../../../presentation/contexts/loggedin_user_controller";
import { NavigationContext } from "../../../../presentation/contexts/navigation_state_controller";
import { TeachersAccountContext } from "../../../../presentation/contexts/teachers_account_context";
import DashboardLayout from "../../../../presentation/layouts/dashboard_layout";
import { prodUrl } from "../../../../presentation/utils/constants";
import { showToast } from "../../../../presentation/utils/helper_functions";

const UpdateTest = () => {
  const { setSelectedVideoId } = useContext(NavigationContext);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { myQuizzes, setMyQuizzes } = useContext(TeachersAccountContext);
  const { selectedVideoId } = useContext(NavigationContext);

  let talk = myQuizzes.filter((e) => e.testId == selectedVideoId)[0];
  const [showQuizModal, setShowQuizModal] = useState(false);

  //state
  const [title, setTitle] = useState(talk != undefined ? talk.title : "");
  const [passPercentage, setPasspercentage] = useState(
    talk != undefined ? talk.passPercentage : ""
  );
  const [ClassLevel, setClassLevel] = useState(
    talk != undefined ? talk.classLevel : ""
  );
  const [SubjectType, setSubjectType] = useState(
    talk != undefined ? talk.subjectType : ""
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(
    talk != undefined ? talk.thumbnailUrl : ""
  );
  const [points, setPoints] = useState(
    talk != undefined ? talk.totalPoints : ""
  );

  const updateCareerTalk = async () => {
    if (talk != undefined) {
      if (
        title !== talk.title
        //   title !== talk.title ||
        //   guestName !== talk.guestName ||
        //   thumbnailUrl !== talk.thumbnailUrl ||
        //   videoUrl !== talk.videoUrl ||
        //   description !== talk.description
      ) {
        setUpdating(true);
        let updatedTalk = talk;
        updatedTalk.title = title;
        updatedTalk.thumbnailUrl = thumbnailUrl;
        //   updatedTalk.videoUrl = videoUrl;
        //   updatedTalk.guestName = guestName;
        //   updatedTalk.description = description;
        try {
          let res = await GamifiedQuizRepo.addnewGamifiedQuiz(updatedTalk);
          if (res) {
            showToast("updated", "success");
            router.push("/dashboard/tcorner/quizes/");
          }
        } catch (e) {
          showToast(`${e}`, "error");
        } finally {
          setUpdating(false);
        }
      } else {
        showToast("Quiz Up to date", "success");
      }
    }
  };
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const handleThumbnailUpload = async (e: any) => {
    if (e.target.files[0] != null) {
      try {
        setUploadingThumbnail(true);
        const formData = new FormData();

        // Update the formData object
        formData.append("photo", e.target.files[0], e.target.files[0].name);
        formData.append("type", "career");

        // let res = await axios.post(
        //   "http://localhost:8080/anzaapi/upload_thumbnail/lesson",
        //   formData
        // );
        let res = await axios.post(
          "https://anzaacademy.co/anzaapi/upload_thumbnail/lesson",
          formData
        );
        setUploadingThumbnail(false);

        setThumbnailUrl(res.data.url);
        showToast("Upload success", "success");
      } catch (e) {
        showToast(`${e}`, "error");
      }
    }
  };

  // let books =    [
  //   {
  //     "category": "Multiple Choice",
  //     "question": "Whta is bio?",
  //     "imageUrl": "",
  //     "answerOptions": [
  //       "Bio..",
  //       "Bio 2",
  //       "bio 3",
  //       "bio 4\n"
  //     ],
  //     "answer": "Bio..",
  //     "answerExplanation": "testingg..",
  //     "points": 5,
  //     "timerSeconds": 30,
  //     "questionNumber": 1
  //   }
  // ];

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-52 w-full ">
        <div className="flex h-12 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-main font-black text-2xl">
            Update Gamefied Quiz
          </div>
        </div>

        <div className="flex flex-wrap w-full justify-center md:justify-start ">
          <div className="flex flex-col m-2">
            <label htmlFor="title"> Test Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2 w-80"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="title">Pass Percentage</label>
            <input
              value={passPercentage}
              onChange={(e) => setPasspercentage(e.target.value)}
              className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2 w-80"
            />
          </div>

          <div className="flex flex-col m-2">
            <label htmlFor="title font-bold">CLASS LEVEL</label>
            <select
              name="classlevel"
              id="classlevel "
              value={ClassLevel}
              onChange={(v) => setClassLevel(v.target.value.toLowerCase())}
              className="px-3 py-2 w-80 outline-none bg-white rounded-md dark:bg-darkmain  focus:ring-1 focus:ring-main"
            >
              <option value={ClassLevel}>{ClassLevel}</option>
            </select>
          </div>

          <div className="flex flex-col m-2">
            <label htmlFor="title font-bold">SUBJECT TYPE</label>
            <select
              name="subject"
              id="subject "
              value={SubjectType}
              onChange={(v) => setSubjectType(v.target.value)}
              className="px-3 py-2 w-80  outline-none bg-white rounded-md dark:bg-darkmain  focus:ring-1 focus:ring-main"
            >
              {" "}
              <option value={SubjectType}>{SubjectType}</option>
            </select>
          </div>

          <div className="flex flex-col mt-7">
            <div
              onClick={() => {
                setSelectedVideoId(talk.testId);
                setShowQuizModal(true);
              }}
              className="cursor-pointer py-3 px-5 text-sm text-white rounded-md bg-main"
            >
              SHOW QUESTION&apos;S
            </div>
          </div>
        </div>
        <div className="h-8"></div>
        <div className="flex flex-wrap w-full items-center px-4">
          <div className="w-96 text-3xl flex justify-left my-3">
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
                <p className="text-sm ml-7">Thumbnail Preview</p>

                <img
                  className="w-full h-28 m-2"
                  src={`${prodUrl}/view_thumbnail/quizes/${thumbnailUrl}`}
                  alt={thumbnailUrl}
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
              className="hidden "
              onChange={handleThumbnailUpload}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-between mt-9 pl-3 pr-3 w-full">
          <div
            onClick={updateCareerTalk}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-main p-2 text-white"
          >
            {updating && <LoadingComponent loading={updating} color="white" />}
            <p className="font-bold">
              {" "}
              {updating ? "updating ..." : "Update Quiz"}
            </p>
          </div>
          <div>{""}</div>
          <div
            onClick={() => router.push("/dashboard/tcorner/quizes")}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-amber-600 p-2 text-white"
          >
            Cancel Process
          </div>
        </div>

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
              className="md:w-[94vw] md:h-[94vh] mx-5 md:mx-0 bg-gray-200  dark:bg-darksec flex flex-col p-3 rounded-md"
            >
              <div className="flex justify-between items-center pb-3">
                <p className="font-bold text-red-500">{""}</p>
                <p className="font-bold text-xl text-red-500">UPDATE QUIZ</p>
                <div
                  onClick={() => {
                    setShowQuizModal(false);
                  }}
                  className="flex items-center text-white px-3 py-2 bg-red-600 cursor-pointer rounded-md"
                >
                  Cancel
                </div>
              </div>

              {talk.questions.map((e, i) => (
                <div
                  key={e.imageUrl}
                  className="flex flex-wrap w-full justify-center md:justify-start flex-1 overflow-y-auto pb-20"
                >
                  {/* test details entry */}
                  <div className="flex flex-col m-1 text-sm text-main">
                    <label htmlFor="category">CATEGORY</label>
                    <select
                      name="category"
                      id="category "
                      value={e.category}
                      className="px-3 py-2 w-80 md:w-60 outline-none bg-white rounded-md dark:bg-darkmain   focus:ring-1 focus:ring-main text-black"
                    >
                      {[e.category].map((e) => (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col m-1 text-sm text-main">
                    <label htmlFor="title">POINTS</label>
                    <input
                      value={e.points}
                      type="number"
                      onChange={(e) => setPoints(parseInt(e.target.value))}
                      className="outline-none bg-white rounded-md px-3 py-2 w-80 md:w-40 dark:bg-darkmain focus:ring-1 focus:ring-main text-black"
                    />
                  </div>

                  <div className="flex flex-col m-1 text-sm text-main">
                    <label htmlFor="title">TIMER (Secs)</label>
                    <input
                      value={e.timerSeconds}
                      type="number"
                      // onChange={(e) => setPoints(parseInt(e.target.value))}
                      className="outline-none bg-white rounded-md px-3 py-2 w-80 md:w-40 dark:bg-darkmain focus:ring-1 focus:ring-main text-black"
                    />
                  </div>

                  <div className="flex flex-col m-1 text-sm w-[80%] text-main">
                    <label htmlFor="title">QUESTION</label>

                    <textarea
                      rows={4}
                      value={e.question}
                      className="outline-none bg-white rounded-md px-3 py-2  dark:bg-darkmain w-full focus:ring-1 focus:ring-main text-black"
                    />
                  </div>
                  <div className="flex w-full items-center">
                    <div className="flex flex-col m-1 text-sm flex-1 text-main">
                      <label htmlFor="title">ANSWER CHOICES</label>
                      <textarea
                        rows={4}
                        value={e.answerOptions}
                        className="outline-none bg-white rounded-md px-3 py-2  dark:bg-darkmain w-full focus:ring-1 focus:ring-main md:w-[80%] text-black"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col m-1 text-sm md:w-[80%] text-main">
                    <label htmlFor="title">CORRECT ANSWER</label>
                    <select
                      name="category"
                      id="category "
                      value={""}
                      className="px-3 py-2  w-80 md:w-full outline-none bg-white rounded-md dark:bg-darkmain   focus:ring-1 focus:ring-main text-black"
                    >
                      <option value={e.answer}>{e.answer}</option>
                    </select>
                  </div>
                  <div className="flex flex-col m-1 text-sm md:w-[80%] text-main">
                    <label htmlFor="title">ANSWER EXPLANATION</label>
                    <textarea
                      rows={4}
                      value={e.answerExplanation}
                      placeholder="required"
                      className="outline-none bg-white rounded-md px-3 py-2 w-80 md:w-full dark:bg-darkmain focus:ring-1 focus:ring-main text-black"
                    />
                  </div>
                </div>
              ))}
              <div className="flex w-full justify-around items-center mt-0 text-xs">
                <div className="w-44  flex items-center justify-center py-3 rounded-md cursor-pointer bg-main hover:bg-opacity-70 text-white text-sm">
                  UPDATE
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};
export default UpdateTest;
