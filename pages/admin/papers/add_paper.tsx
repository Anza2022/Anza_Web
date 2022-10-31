import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import PastPaperRepo from "../../../data/repos/past_paper_repo";
import PastPaperModel from "../../../models/curriculum/past_paper_model";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { LoggedInUserContext } from "../../../presentation/contexts/loggedin_user_controller";
import { PastPapersContext } from "../../../presentation/contexts/past_papers_controller";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  pastpaperCategories,
  papernumberoptions,
  subjectOptions,
} from "../../../presentation/utils/constants";
import {
  getCurrentDate,
  showToast,
} from "../../../presentation/utils/helper_functions";

const AdminAddPastPaperPage = () => {
  const [title, setTitle] = useState("");
  const [paperUrl, setPaperUrl] = useState("");
  const [markingSchemeUrl, setMarkingSchemeUrl] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [paperNumber, setPaperNumber] = useState("");
  const [schoolName, setSchoolName] = useState("Anza Academy");
  const [subjectType, setSubjectType] = useState("");
  const [ownerName, setownerName] = useState("");
  const [year, setYear] = useState(2010);
  const [term, setTerm] = useState("general");

  const [proceedWithoutMs, setProceedWithoutMs] = useState(false);
  const [showMsModal, setShowMsModal] = useState(false);

  //paper upload
  const [uploadingPaper, setUploadingPaper] = useState(false);
  const [uploadingMs, setUploadingMs] = useState(false);
  const [savingPaper, setSavingPaper] = useState(false);

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
          "https://api.thesigurd.com/anzaapi/upload_video/lesson",
          formData
        );
        if (res.status === 206) {
          showToast(`${res.data.message}`, "error");
        } else {
          setPaperUrl(res.data.url);
          showToast("upload success", "success");
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
          "https://api.thesigurd.com/anzaapi/upload_video/lesson",
          formData
        );
        if (res.status === 206) {
          showToast(`${res.data.message}`, "error");
        } else {
          setMarkingSchemeUrl(res.data.url);
          showToast("upload success", "success");
        }
      } catch (e) {
        showToast(`${e}`, "error");
      } finally {
        setUploadingMs(false);
      }
    }
  };
  const router = useRouter();
  const { pastPapers, setPastPapers } = useContext(PastPapersContext);
  const { user } = useContext(LoggedInUserContext);
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

    if (paperUrl == "") {
      showToast("upload past paper", "error");
      return;
    }
    if (markingSchemeUrl == "" && !proceedWithoutMs) {
      showToast("upload marking scheme", "error");
      return;
    }

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
        ownerName,
        getCurrentDate(),
        getCurrentDate(),
        year,
        user === undefined ? "" : user[0].userId,
        term
      );

      let res = await PastPaperRepo.addnewPastPaper(newpaper);
      setPastPapers([res, ...pastPapers]);
      router.push("/admin/papers");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setSavingPaper(false);
    }
  };
  const handleCancelProcess = () => {
    router.push("/admin/papers");

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
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-52 w-full relative">
        <div className="flex h-12 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-fuchsia-600 font-black text-2xl">
            Add New Past Paper
          </div>
        </div>
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
                  className="flex p-2 px-4 rounded-xl cursor-pointer bg-red-500 w-24 justify-center font-bold"
                >
                  Yes
                </div>
                <div
                  onClick={() => {
                    setShowMsModal(false);
                  }}
                  className="flex p-2 px-4 rounded-xl cursor-pointer bg-green-600 w-24 justify-center font-bold"
                >
                  No
                </div>
              </div>
            </div>
          </div>
        )}
        {/* lesson details input */}
        <div className="flex flex-col  items-center w-full">
          <div className="flex flex-wrap w-full justify-center md:justify-start">
            <div className="flex flex-col m-2">
              <label htmlFor="title">Past Paper Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>
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
                {pastpaperCategories.map((e) => (
                  <option key={e} value={e.toLowerCase()}>
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
            <div className="flex flex-col m-2">
              <label htmlFor="title">Paper Number</label>
              <select
                name="paperno"
                id="paperno "
                value={paperNumber}
                onChange={(v) => setPaperNumber(v.target.value)}
                className="px-3 py-2 w-80  outline-none bg-white rounded-xl  dark:bg-darkmain"
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
              <label htmlFor="term">Term</label>
              <select
                name="term"
                id="term "
                value={term}
                onChange={(v) => setTerm(v.target.value)}
                className="px-3 py-2 w-80  outline-none bg-white rounded-xl  dark:bg-darkmain"
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
              <label htmlFor="year"> Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> School Name</label>
              <input
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Uploader Name</label>
              <input
                value={ownerName}
                onChange={(e) => setownerName(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>
          </div>
          <div className="flex flex-col w-full mt-5">
            <p className="pl-5 my-2 text-xl font-bold text-secondary">
              Upload Past Paper Files
            </p>
            <div className="w-full flex flex-wrap justify-center md:justify-around ">
              <div className="w-96 text-3xl flex justify-center my-3">
                {paperUrl == "" ? (
                  uploadingPaper ? (
                    <div className="bg-main p-2.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl flex justify-center items-center">
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
                      className="bg-main p-1.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl"
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
              <div className=" text-2xl justify-center flex my-3">
                {markingSchemeUrl == "" ? (
                  uploadingMs ? (
                    <div className="bg-main p-2.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl flex justify-center items-center">
                      {" "}
                      <LoadingComponent loading={uploadingMs} color="white" />
                      <p className="text-sm">Uploading Marking Scheme ...</p>
                      <p className="ml-2 text-xs">please wait</p>
                    </div>
                  ) : (
                    <label
                      htmlFor="ms"
                      className="bg-main p-1.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl"
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
          <div className="w-full mt-5 flex flex-wrap justify-around">
            <div
              onClick={() => {
                if (markingSchemeUrl == "") {
                  setShowMsModal(true);
                }
                handleSavePaper();
              }}
              className="px-8 py-2  my-2 rounded-xl bg-main text-white shadow-xl cursor-pointer flex items-center"
            >
              <LoadingComponent loading={savingPaper} color="white" />
              <p> {savingPaper ? "saving Paper ..." : "Save Past Paper"}</p>
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

export default AdminAddPastPaperPage;
