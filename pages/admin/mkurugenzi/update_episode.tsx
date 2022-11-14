import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import MkurugenziRepo from "../../../data/repos/mkurugenzi_repo";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { VideoLessonContext } from "../../../presentation/contexts/video_lessons_controller";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  classOptions,
  defaultSetbooks,
  papernumberoptions,
  pastpaperCategories,
  subjectOptions,
} from "../../../presentation/utils/constants";
import {
  getCurrentDate,
  showToast,
} from "../../../presentation/utils/helper_functions";

const AdminUpdateSetbookEpisodePage = () => {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { mkuruLessons, setMkuruLessons } = useContext(VideoLessonContext);
  const { selectedVideoId } = useContext(NavigationContext);

  let episode = mkuruLessons.filter((e) => e.id == selectedVideoId)[0];

  //state
  const [title, setTitle] = useState(episode != undefined ? episode.title : "");
  const [thumbnailUrl, setThumbnailUrl] = useState(
    episode != undefined ? episode.thumbnailUrl : ""
  );
  const [description, setDescription] = useState(
    episode != undefined ? episode.description : ""
  );

  const [fileName, setFileName] = useState(
    episode != undefined ? episode.fileName : ""
  );

  const [episodeNumber, setEpisodeNumber] = useState(
    episode != undefined ? episode.episodeNumber : 1
  );

  const updateEpisode = async () => {
    if (episode != undefined) {
      if (
        title !== episode.title ||
        thumbnailUrl !== episode.thumbnailUrl ||
        episodeNumber !== episode.episodeNumber ||
        fileName !== episode.fileName ||
        description !== episode.description
      ) {
        setUpdating(true);
        let newepisode = episode;

        newepisode.title = title;
        newepisode.thumbnailUrl = thumbnailUrl;
        newepisode.episodeNumber = episodeNumber;
        newepisode.fileName = fileName;
        newepisode.description = description;
        newepisode.updatedAt = getCurrentDate();
        try {
          let res = await MkurugenziRepo.updateMkurugenziEpisode(newepisode);
          if (res) {
            showToast("updated", "success");
            router.push("/admin/mkurugenzi");
          }
        } catch (e) {
          showToast(`${e}`, "error");
        } finally {
          setUpdating(false);
        }
      } else {
        showToast("up to date", "success");
      }
    }
  };

  const deleteEpisode = async () => {
    if (deleting) {
      return;
    }
    setDeleting(true);
    try {
      let res = await MkurugenziRepo.deleteMkurugenziEpisode(selectedVideoId);

      if (res) {
        setMkuruLessons(mkuruLessons.filter((e) => e.id !== selectedVideoId));
        showToast("deleted", "success");
        router.push("/admin/mkurugenzi");
      }
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    getmkurugenziFiles();
  }, []);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [episodeFiles, setepisodeFiles] = useState<string[]>([]);
  const getmkurugenziFiles = async () => {
    setLoadingFiles(true);
    try {
      const files = await MkurugenziRepo.getEpisodeFilesOnTheServer();
      setepisodeFiles(files);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoadingFiles(false);
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
        formData.append("type", "mkurugenzi");

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
      } catch (e) {
        showToast(`${e}`, "error");
      }
    }
  };
  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-52 w-full ">
        <div className="flex h-12 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-main font-black text-2xl">
            Update Mkurugenzi Episode
          </div>
        </div>
        <div className="flex flex-col  items-center w-full">
          <div className="flex flex-wrap w-full justify-center md:justify-start ">
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
            <div className="flex flex-col m-1 text-xs w-full h-52">
              <label htmlFor="title">Episode Description</label>
              <textarea
                value={description}
                // maxLength={20}
                onChange={(e) => setDescription(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 h-full   md:w-5/6 dark:bg-darkmain  focus:ring-1 focus:ring-main"
              />
            </div>
          </div>
          <div className="flex flex-wrap w-full justify-center md:justify-start items-center  ">
            <div className="flex flex-col m-2">
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
                    className="bg-main p-1.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl mt-5"
                  >
                    Upload Thumbnail
                  </label>
                )
              ) : (
                <div className="flex flex-col">
                  <p className="text-sm">Thumbnail Name</p>
                  <p className="text-xs">{thumbnailUrl}</p>
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
            {!loadingFiles && (
              <div className="flex flex-col m-2">
                <label htmlFor="chapterName"> Video FileName</label>
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

          <div className="flex flex-wrap justify-around mt-9 w-full">
            <div
              onClick={updateEpisode}
              className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-main p-2 text-white"
            >
              {updating && (
                <LoadingComponent loading={updating} color="white" />
              )}
              <p className="font-bold">
                {" "}
                {updating ? "updating ..." : "Update Episode"}
              </p>
            </div>
            <div
              onClick={() => router.push("/admin/setbooks")}
              className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-amber-600 p-2 text-white"
            >
              Cancel Process
            </div>
            <div
              onClick={deleteEpisode}
              className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-red-600 p-2 text-white"
            >
              {deleting && (
                <LoadingComponent loading={deleting} color="white" />
              )}
              <p className="font-bold">
                {" "}
                {deleting ? "deleting ..." : " Delete Episode"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminUpdateSetbookEpisodePage;
