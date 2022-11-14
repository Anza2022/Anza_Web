import axios from "axios";
import router from "next/router";
import React, { useContext, useState } from "react";
import PastPaperRepo from "../../../../data/repos/past_paper_repo";
import PastPaperModel from "../../../../models/curriculum/past_paper_model";
import LoadingComponent from "../../../../presentation/components/others/loading_component";
import { LoggedInUserContext } from "../../../../presentation/contexts/loggedin_user_controller";
import { TeachersAccountContext } from "../../../../presentation/contexts/teachers_account_context";
import DashboardLayout from "../../../../presentation/layouts/dashboard_layout";
import {
  papernumberoptions,
  pastpaperCategories,
  subjectOptions,
} from "../../../../presentation/utils/constants";
import {
  getCurrentDate,
  showToast,
} from "../../../../presentation/utils/helper_functions";

const TeacherPastPapers = () => {
  const { user } = useContext(LoggedInUserContext);
  const { setMyPastPapers, myPastPapers } = useContext(TeachersAccountContext);
  const [title, setTitle] = useState("");
  const [paperUrl, setPaperUrl] = useState("");
  const [markingSchemeUrl, setMarkingSchemeUrl] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [paperNumber, setPaperNumber] = useState("");
  const [schoolName, setSchoolName] = useState(
    user[0] == undefined ? "" : user[0].schoolName
  );
  const [subjectType, setSubjectType] = useState("");
  const [ownerName, setownerName] = useState("");
  const [year, setYear] = useState(2010);

  //paper upload
  const [uploadingPaper, setUploadingPaper] = useState(false);
  const [uploadingMs, setUploadingMs] = useState(false);
  const [savingPaper, setSavingPaper] = useState(false);
  const [term, setTerm] = useState("general");
  const [proceedWithoutMs, setProceedWithoutMs] = useState(false);
  const [showMsModal, setShowMsModal] = useState(false);
  const handlePaperUpload = async (e: any) => {
    if (e.target.files[0] != null) {
      try {
        setUploadingPaper(true);
        const formData = new FormData();

        // Update the formData object
        formData.append("lesson", e.target.files[0], e.target.files[0].name);
        formData.append("type", "paper");

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
          setPaperUrl(res.data.url);
          showToast("Upload success!", "success");
        }
      } catch (e) {
        showToast(`${e}`, "error");
      } finally {
        setUploadingPaper(false);
      }
    }
  };
  const handleMsUpload = async (e: any) => {
    if (e.target.files[0] != null) {
      try {
        setUploadingMs(true);
        const formData = new FormData();

        // Update the formData object
        formData.append("lesson", e.target.files[0], e.target.files[0].name);
        formData.append("type", "ms");

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
          setMarkingSchemeUrl(res.data.url);
          showToast("Upload success", "success");
        }
      } catch (e) {
        showToast(`${e}`, "error");
      } finally {
        setUploadingMs(false);
      }
    }
  };

  const handleSavePaper = async () => {
    if (title == "") {
      showToast("Kindly Enter Past Paper Title", "error");
      return;
    }
    if (classLevel == "") {
      showToast("Kindly Enter Class Level", "error");
      return;
    }
    if (subjectType == "") {
      showToast("Kindly Enter Subject Type", "error");
      return;
    }

    if (paperUrl == "") {
      showToast("Kindly Upload/Attach Past Paper File", "error");
      return;
    }
    // if (markingSchemeUrl == "") {
    //   showToast("upload marking scheme", "error");
    //   return;
    // }

    setSavingPaper(true);

    try {
      let newpaper = new PastPaperModel(
        "",
        title,
        paperUrl,
        markingSchemeUrl,
        classLevel,
        subjectType,
        paperNumber,
        schoolName.toLowerCase(),
        user === undefined ? "" : user[0].userName,
        getCurrentDate(),
        getCurrentDate(),
        year,
        user === undefined ? "" : user[0].userId,
        term
      );

      let res = await PastPaperRepo.addnewPastPaper(newpaper);
      setMyPastPapers([res, ...myPastPapers]);
      router.push("/dashboard/tcorner/papers");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setSavingPaper(false);
    }
  };
  const handleCancelProcess = () => {
    router.push("/dashboard/tcorner/papers");

    try {
      if (paperUrl != "") {
        //todo send request to delete the video on the server
      }
      if (markingSchemeUrl != "") {
        //todo send request to delete the thumbnail on the server
      }
    } catch (e) {
      showToast(`${e}`, "error");
    }
  };
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative min-h-screen py-16 w-full items-center ">
        <div className="flex h-12 items-center justify-start  pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg md:text-2xl">
            ADD NEW PAST PAPER
          </div>
        </div>{" "}
        {showMsModal && (
          <div className="flex fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 justify-center items-center">
            <div className="bg-white w-96 h-44 rounded-xl flex flex-col justify-around p-3 dark:bg-black dark:bg-opacity-80">
              <p className="text-lg font-bold dark:text-white text-black pl-4">
                Are you sure you want to proceed without marking scheme ?
              </p>

              <div className="flex w-full  justify-around">
                <div
                  onClick={() => {
                    setProceedWithoutMs(true);
                    setShowMsModal(false);
                  }}
                  className="flex p-2 px-4 rounded-md cursor-pointer bg-red-500 w-24 justify-center font-bold"
                >
                  Yes
                </div>
                <div
                  onClick={() => {
                    setShowMsModal(false);
                  }}
                  className="flex p-2 px-4 rounded-md cursor-pointer bg-green-600 w-24 justify-center font-bold"
                >
                  No
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col  items-center w-full">
          <div className="flex flex-wrap w-full justify-center md:justify-start">
            <div className="flex flex-col m-2">
              <label htmlFor="title">CLASS LEVEL</label>
              <select
                name="classlevel"
                id="classlevel "
                value={classLevel}
                onChange={(v) => setClassLevel(v.target.value.toLowerCase())}
                className="px-3 py-2 w-80 outline-none bg-white rounded-md dark:bg-darkmain "
              >
                <option value="">Select Level</option>
                {pastpaperCategories.map((e) => (
                  <option key={e} value={e.toLowerCase()}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">SUBJECT TYPE</label>
              <select
                name="subject"
                id="subject "
                value={subjectType}
                onChange={(v) => setSubjectType(v.target.value)}
                className="px-3 py-2 w-80  outline-none bg-white rounded-md dark:bg-darkmain "
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
            <div className="flex flex-col m-2">
              <label htmlFor="title">PAPER NUMBER</label>
              <select
                name="paperno"
                id="paperno "
                value={paperNumber}
                onChange={(v) => setPaperNumber(v.target.value)}
                className="px-3 py-2 w-80  outline-none bg-white rounded-md dark:bg-darkmain"
              >
                {" "}
                <option value="">Select paper no</option>
                {papernumberoptions.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="term">TERM</label>
              <select
                name="term"
                id="term "
                value={term}
                onChange={(v) => setTerm(v.target.value)}
                className="px-3 py-2 w-80  outline-none bg-white rounded-md  dark:bg-darkmain"
              >
                {" "}
                <option value="">Select Term</option>
                {["Term 1", "Term 2", "Term 3", "General"].map((e) => (
                  <option key={e.toLowerCase()} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">PAST PAPER TITLE</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="outline-none bg-white rounded-md px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="year"> YEAR</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="outline-none bg-white rounded-md px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> SCHOOL NAME</label>
              <input
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="outline-none bg-white rounded-md px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>

            {/* <div className="flex flex-col m-2">
              <label htmlFor="topic"> Teacher Name</label>
              <input
                value={ownerName}
                onChange={(e) => setownerName(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div> */}
          </div>
          <div className="flex flex-col w-full mt-5">
            <p className="pl-5 my-2 text-xl font-bold text-secondary">
              UPLOAD PAST PAPER PDF FILES
            </p>
            <div className="w-full  flex-wrap ">
              <div className="w-96 text-3xl flex my-3">
                {paperUrl == "" ? (
                  uploadingPaper ? (
                    <div className="bg-main p-2.5 px-4 cursor-pointer text-white text-lg font-bold rounded-md  ">
                      {" "}
                      <LoadingComponent
                        loading={uploadingPaper}
                        color="white"
                      />
                      <p className="text-sm">Uploading Paper ...</p>
                      <p className="ml-2 text-xs">please wait</p>
                    </div>
                  ) : (
                    <label
                      htmlFor="paper"
                      className="bg-main p-2.5 px-4 cursor-pointer text-white text-sm  rounded-md"
                    >
                      Upload Paper
                    </label>
                  )
                ) : (
                  <div className="flex flex-col">
                    <p className="text-main font-lg">Past Paper</p>
                    <p className="text-sm">
                      {paperUrl.split("/")[paperUrl.split("/").length - 1]}
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  id="paper"
                  accept="application/pdf"
                  className="hidden "
                  onChange={handlePaperUpload}
                />
              </div>

              <div className=" text-2xl">
                {markingSchemeUrl == "" ? (
                  uploadingMs ? (
                    <div className="bg-main p-2.5 px-4 cursor-pointer text-white text-lg font-bold rounded-md flex justify-center items-center">
                      {" "}
                      <LoadingComponent loading={uploadingMs} color="white" />
                      <p className="text-sm">Uploading Marking Scheme ...</p>
                      <p className="ml-2 text-xs">please wait</p>
                    </div>
                  ) : (
                    <label
                      htmlFor="ms"
                      className="bg-main p-2.5 px-4 cursor-pointer text-white text-sm rounded-md"
                    >
                      Upload Marking Scheme
                    </label>
                  )
                ) : (
                  <div className="flex flex-col">
                    <p className="text-main text-lg">Marking scheme</p>{" "}
                    <p className="text-sm">
                      {
                        markingSchemeUrl.split("/")[
                          markingSchemeUrl.split("/").length - 1
                        ]
                      }
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  id="ms"
                  accept="application/pdf"
                  className="hidden "
                  onChange={handleMsUpload}
                />
              </div>

            </div>
          </div>
          <div className="w-full mt-5 flex flex-wrap flex  justify-between">
            <div
              onClick={handleCancelProcess}
              className="px-8 py-2 rounded-md my-2 bg-red-600 text-white justify-between shadow-xl  cursor-pointer 
              "
            >
              Cancel Process
            </div>
            <div
              onClick={() => {
                if (markingSchemeUrl == "") {
                  setShowMsModal(true);
                }
                handleSavePaper();
              }}
              className="px-8 py-2  my-2 rounded-md bg-main text-white shadow-xl cursor-pointer flex items-center"
            >
              <LoadingComponent loading={savingPaper} color="white" />
              <p> {savingPaper ? "saving Paper ..." : "Save Past Paper"}</p>
              {savingPaper ? <p className="text-xs">please wait</p> : <p></p>}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherPastPapers;
