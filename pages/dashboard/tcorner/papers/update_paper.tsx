import axios from "axios";
import router from "next/router";
import React, { useContext, useState } from "react";
import PastPaperRepo from "../../../../data/repos/past_paper_repo";
import PastPaperModel from "../../../../models/curriculum/past_paper_model";
import LoadingComponent from "../../../../presentation/components/others/loading_component";
import { LoggedInUserContext } from "../../../../presentation/contexts/loggedin_user_controller";
import { NavigationContext } from "../../../../presentation/contexts/navigation_state_controller";
import { TeachersAccountContext } from "../../../../presentation/contexts/teachers_account_context";
import DashboardLayout from "../../../../presentation/layouts/dashboard_layout";
import { pastpaperCategories, subjectOptions, papernumberoptions } from "../../../../presentation/utils/constants";
import { getCurrentDate, showToast } from "../../../../presentation/utils/helper_functions";

const TeacherUpdatePastPaper = () => {
  const { user } = useContext(LoggedInUserContext);
  const { myPastPapers } = useContext(TeachersAccountContext);
  const { selectedVideoId } = useContext(NavigationContext); 
  const [showMarkingScheme, setShowMarkingScheme] = useState(false);
  const paper: PastPaperModel = myPastPapers.filter(
    (e) => e.paperId === selectedVideoId
  )[0];


  const [title, setTitle] = useState(
    paper != undefined && typeof paper.title === "string"
    ? paper.title
    : ""
  );

  const [paperUrl, setPaperUrl] = useState(
    paper != undefined && typeof paper.paperUrl === "string"
      ? paper.paperUrl
      : ""
  );
  const [markingSchemeUrl, setMarkingSchemeUrl] = useState(
    paper != undefined && typeof paper.markingSchemeUrl === "string"
    ? paper.markingSchemeUrl
    : ""
  );
  const [classLevel, setClassLevel] = useState(
    paper != undefined && typeof paper.classLevel === "string"
    ? paper.classLevel
    : ""
  );
  const [paperNumber, setPaperNumber] = useState(    paper != undefined && typeof paper.paperNumber === "string"
  ? paper.paperNumber
  : "");
  const [schoolName, setSchoolName] = useState(
    user[0] == undefined ? "" : user[0].schoolName
  );
  const [subjectType, setSubjectType] = useState(    paper != undefined && typeof paper.subjectType === "string"
  ? paper.subjectType
  : "");
  const [year, setYear] = useState(paper != undefined ? paper.year : 0);
  const [term, setTerm] = useState(    paper != undefined && typeof paper.term === "string"
  ? paper.term
  : "");

    //paper upload
    const [uploadingPaper, setUploadingPaper] = useState(false);
    const [uploadingMs, setUploadingMs] = useState(false);
    const [savingPaper, setSavingPaper] = useState(false);
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



    // const handleSavePaper = async () => {
    //   setSavingPaper(true);
    //   try {
    //     let newpaper = new PastPaperModel(
    //       "",
    //       title,
    //       paperUrl,
    //       markingSchemeUrl,
    //       classLevel,
    //       subjectType,
    //       paperNumber,
    //       schoolName.toLowerCase(),
    //       user === undefined ? "" : user[0].userName,
    //       getCurrentDate(),
    //       getCurrentDate(),
    //       year,
    //       user === undefined ? "" : user[0].userId,
    //       term
    //     );
    //     let res = await PastPaperRepo.updatePastPaper(newpaper);
    //     router.push("/dashboard/tcorner/papers");
    //   } catch (e) {
    //     showToast(`${e}`, "error");
    //   } finally {
    //     setSavingPaper(false);
    //   }
    // };


    const handleSavePaper2 = async () => {
      if (paper != undefined) {
        if (
          title !== paper.title ||
          paperUrl !== paper.paperUrl ||
          markingSchemeUrl !== paper.markingSchemeUrl ||
          classLevel !== paper.classLevel ||
          subjectType !== paper.subjectType ||
            paperNumber !== paper.paperNumber ||
            year !== paper.year ||
            term !== paper.term ||          
              schoolName.toLowerCase() !== paper.schoolName.toLowerCase() 
        ) {
          setSavingPaper(true);
          let updatedPaper = paper;
          updatedPaper.paperUrl = paperUrl;
          updatedPaper.markingSchemeUrl = markingSchemeUrl;
          updatedPaper.title = title;
          updatedPaper.classLevel = classLevel;
          updatedPaper.subjectType = subjectType;
          updatedPaper.paperNumber = paperNumber;
          updatedPaper.year = year;
          updatedPaper.term = term;
          updatedPaper.schoolName = schoolName.toLowerCase();
          try {
            let res = await PastPaperRepo.updatePastPaper(updatedPaper);
            if (res) {
              showToast("Paper Updated", "success");
              router.push("/dashboard/tcorner/papers");
            }
          } catch (e) {
            showToast(`${e}`, "error");
          } finally {
            setSavingPaper(false);
          }
        } else {
          showToast("Up to date", "success");
        }
      }
    };




    const handleCancelProcess = () => {
      router.push("/dashboard/tcorner/papers");
      try {
        if (paper.paperUrl != "") {
          //todo send request to delete the paper on the server
        }
        if (paper.markingSchemeUrl != "") {
          //todo send request to delete the marking scheme on the server
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
            UPDATE PAST PAPER
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
                value={
                    paper == undefined
                      ? ""
                      : paper.classLevel
                  }
              
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
                value={
            subjectType
                }
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
                value={
                paperNumber
                }
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
                value={
                 term
                }
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
                value={
                  title
                }
                onChange={(e) => setTitle(e.target.value)}
                className="outline-none bg-white rounded-md px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="year"> YEAR</label>
              <input
                type="number"
                value={
                 year
                }
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="outline-none bg-white rounded-md px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> SCHOOL NAME</label>
              <input
                value={
                 schoolName
                }
               onChange={(e) => setSchoolName(e.target.value)}
                className="outline-none bg-white rounded-md px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>

          </div>
          <div className="flex flex-col w-full mt-5">
            <p className="pl-5 my-2 text-xl font-bold text-secondary">
              CHANGE PAST PAPER PDF FILES
            </p>
            <div className="w-full  flex-wrap ">

              <div className="w-96 text-3xl flex my-3">
                {
                  uploadingPaper ? (
                    <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                    <LoadingComponent loading={uploadingMs} color="white" />
                                      <p className="text-sm">Uploading paper... please wait</p>
                </button>
                  ) : (
                    <div>
                         
                          <p className="text-main text-lg">Past Paper File</p>{" "}
                  <p className="text-sm">
               {paperUrl.split("/")[paperUrl.split("/").length - 1]}
             </p>    
                    <label
                      htmlFor="paper"
                      className="bg-main p-2.5 px-4 cursor-pointer text-white text-sm  rounded-md">
                      Change Past Paper
                    </label>
                    </div>
                  )
              }
                <input
                  type="file"
                  id="paper"
                  accept="application/pdf"
                  className="hidden "
                 onChange={handlePaperUpload}
                />
              </div>





<div className=" text-2xl">
                {
                  uploadingMs ? (
                    <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
    <LoadingComponent loading={uploadingMs} color="white" />
                      <p className="text-sm">Uploading Marking Scheme... please wait</p>
</button>
                  ) : (
                    <div className="">
                    <p className="text-main text-lg">Marking Scheme File</p>{" "}
                    <p className="text-sm">
                      {
                        markingSchemeUrl.split("/")[
                          markingSchemeUrl.split("/").length - 1
                        ]
                      }
                    </p>

                    <label
                      htmlFor="ms"
                      className="bg-main p-2.5 px-4 cursor-pointer text-white text-sm rounded-md"
                    >
                      Change Marking Scheme
                    </label>
                  </div>
                  )
              }
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
                handleSavePaper2();
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

export default TeacherUpdatePastPaper;
