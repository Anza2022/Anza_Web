import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import SetBooksRepo from "../../../data/repos/setbook_repo";
import SetbookEpisode from "../../../models/curriculum/setbook_episode_model";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { VideoLessonContext } from "../../../presentation/contexts/video_lessons_controller";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  subjectOptions,
  classOptions,
  defaultSetbooks,
} from "../../../presentation/utils/constants";
import {
  getCurrentDate,
  showToast,
} from "../../../presentation/utils/helper_functions";

const AdminAddSetbookEpisodePage = () => {
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("");
  const [book, setBook] = useState("");
  const [description, setDescription] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState(1);

  //file upload
  const [uploadingPaper, setUploadingPaper] = useState(false);

  const [savingEpisode, setSavingEpisode] = useState(false);

  //   const handleDocUpload = async (e: any) => {
  //     if (e.target.files[0] != null) {
  //       try {
  //         setUploadingPaper(true);
  //         const formData = new FormData();

  //         // Update the formData object
  //         formData.append("lesson", e.target.files[0], e.target.files[0].name);
  //         formData.append("type", "work_sheme");
  //         formData.append("extension", e.target.files[0].name.split(".")[1]);

  //         // let res = await axios.post(
  //         //   "http://localhost:8080/anzaapi/upload_video/lesson",
  //         //   formData
  //         // );
  //         let res = await axios.post(
  //           "https://api.thesigurd.com/anzaapi/upload_video/lesson",
  //           formData
  //         );
  //         if (res.status === 206) {
  //           showToast(`${res.data.message}`, "error");
  //         } else {
  //           setFileId(res.data.id);
  //           showToast("upload success", "success");
  //         }
  //       } catch (e) {
  //         showToast(`${e}`, "error");
  //       } finally {
  //         setUploadingPaper(false);
  //       }
  //     }
  //   };

  const router = useRouter();
  const { setbooksEpisodes, setSetbooksEpisodes } =
    useContext(VideoLessonContext);
  const handleSaveEpisode = async () => {
    if (title == "") {
      showToast("enter episode title", "error");
      return;
    }
    if (book == "") {
      showToast("select book name", "error");
      return;
    }

    if (fileName == "") {
      showToast("upload work scheme", "error");
      return;
    }

    setSavingEpisode(true);

    try {
      let newepisode = new SetbookEpisode(
        "",
        title,
        book,
        episodeNumber,
        fileName,
        getCurrentDate(),
        getCurrentDate(),
        1,
        1,
        description
      );

      let res = await SetBooksRepo.addSetbookEpisode(newepisode);
      setSetbooksEpisodes([res, ...setbooksEpisodes]);
      router.push("/admin/setbooks");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setSavingEpisode(false);
    }
  };
  const handleCancelProcess = () => {
    router.push("/admin/setbooks");

    try {
      if (fileName != "") {
        //todo send request to delete the video on the server
      }
    } catch (e) {
      showToast(`${e}`, "error");
    }
  };
  useEffect(() => {
    getSetbookFiles();
  }, []);
  //episode files
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [episodeFiles, setepisodeFiles] = useState<string[]>([]);
  const getSetbookFiles = async () => {
    setLoadingFiles(true);
    try {
      const files = await SetBooksRepo.getEpisodeFilesOnTheServer();
      setepisodeFiles(files);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoadingFiles(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-52 w-full relative">
        <div className="flex h-12 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-fuchsia-600 font-black text-2xl">
ADD NEW SETBOOK EPISODE
          </div>
        </div>

        {/* lesson details input */}
        <div className="flex flex-col  items-center w-full">
          <div className="flex flex-wrap w-full justify-center md:justify-start">
            <div className="flex flex-col m-2">
              <label htmlFor="title">Book</label>
              <select
                name="classlevel"
                id="classlevel "
                value={book}
                onChange={(v) => setBook(v.target.value)}
                className="px-3 py-2 w-80 outline-none bg-white rounded-xl  dark:bg-darkmain"
              >
                <option value="">Select book</option>
                {defaultSetbooks.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col m-2">
              <label htmlFor="title"> Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label> Episode Number</label>
              <input
                value={episodeNumber}
                onChange={(e) => setEpisodeNumber(parseInt(e.target.value))}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-1 w-full h-52">
              <label htmlFor="title">Episode Description</label>
              <textarea
                value={description}
                // maxLength={20}
                onChange={(e) => setDescription(e.target.value)}
                className="outline-none  text-xs bg-white rounded-xl px-3 py-2 h-full   md:w-5/6 dark:bg-darkmain  focus:ring-1 focus:ring-main"
              />
            </div>
            {!loadingFiles && (
              <div className="flex flex-col m-2">
                <label htmlFor="chapterName"> Vdocipher ID</label>
                <input
                  className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
                  list="episodeFiles"
                  id="videofilename"
                  name="videofilename"
                  placeholder="Type video Name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  autoComplete="off"
                />
                <datalist id="episodeFiles">
                  {episodeFiles
                    .map((e) => e)
                    .sort()
                    .map((e) => (
                      <option key={e} value={e} />
                    ))}
                </datalist>
              </div>
            )}
          </div>
          {/* <div className="flex flex-col w-full mt-5">
            <p className="pl-5 my-2 text-xl font-bold text-secondary">
              Upload Scheme File
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
                      <p className="text-sm">Uploading Scheme ...</p>
                      <p className="ml-2 text-xs">please wait</p>
                    </div>
                  ) : (
                    <label
                      htmlFor="paper"
                      className="bg-main p-1.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl"
                    >
                      Upload Scheme
                    </label>
                  )
                ) : (
                  <div className="flex flex-col">
                    <p className="text-main text-sm">Work Scheme </p>
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
          </div> */}
          <div className="w-full mt-5 flex flex-wrap justify-around">
            <div
              onClick={() => {
                handleSaveEpisode();
              }}
              className="px-8 py-2  my-2 rounded-xl bg-main text-white shadow-xl cursor-pointer flex items-center"
            >
              <LoadingComponent loading={savingEpisode} color="white" />
              <p> {savingEpisode ? "saving episode ..." : "Save Episode"}</p>
              {savingEpisode ? <p className="text-xs">please wait</p> : <p></p>}
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

export default AdminAddSetbookEpisodePage;
