import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import CareerTalksRepo from "../../../data/repos/career_talk_repo";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { CareerTalksContext } from "../../../presentation/contexts/career_talks_controller";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";

import {
  getCurrentDate,
  showToast,
} from "../../../presentation/utils/helper_functions";

const UpdatePaper = () => {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { talks, setTalks } = useContext(CareerTalksContext);
  const { selectedVideoId } = useContext(NavigationContext);

  let talk = talks.filter((e) => e.talkId == selectedVideoId)[0];

  //state
  const [title, setTitle] = useState(talk != undefined ? talk.title : "");
  const [guestName, setGuestName] = useState(
    talk != undefined ? talk.guestName : ""
  );
  const [description, setDescription] = useState(
    talk != undefined ? talk.description : ""
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(
    talk != undefined ? talk.thumbnailUrl : ""
  );
  const [videoUrl, setVideoUrl] = useState(
    talk != undefined ? talk.videoUrl : ""
  );

  const updateCareerTalk = async () => {
    if (talk != undefined) {
      if (
        title !== talk.title ||
        guestName !== talk.guestName ||
        thumbnailUrl !== talk.thumbnailUrl ||
        videoUrl !== talk.videoUrl ||
        description !== talk.description
      ) {
        setUpdating(true);
        let updatedTalk = talk;
        updatedTalk.title = title;
        updatedTalk.thumbnailUrl = thumbnailUrl;
        updatedTalk.videoUrl = videoUrl;
        updatedTalk.guestName = guestName;
        updatedTalk.description = description;
        try {
          let res = await CareerTalksRepo.updateCareerTalk(updatedTalk);
          if (res) {
            showToast("updated", "success");
            router.push("/admin/career_talks");
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

  const deleteCareerTalk = async () => {
    if (deleting) {
      return;
    }
    setDeleting(true);
    try {
      let res = await CareerTalksRepo.deleteCareerTalk(selectedVideoId);

      if (res) {
        setTalks(talks.filter((e) => e.talkId !== selectedVideoId));
        showToast("deleted", "success");
        router.push("/admin/career_talks");
      }
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setDeleting(false);
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
        showToast("upload success", "success");
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
            Update Career Talk
          </div>
        </div>

        <div className="flex flex-wrap w-full justify-center md:justify-start ">
          <div className="flex flex-col m-2">
            <label htmlFor="title"> Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2 w-80"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="title"> Guest Name</label>
            <input
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2 w-80"
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
        </div>
        <div className="h-8"></div>
        <p className="mt-3 pb-1 text-main font-black px-7">
          Career Talk File Links
        </p>
        <div className="flex flex-wrap w-full items-center px-4">
          <div className="flex flex-col mx-2 w-80">
            <label htmlFor="title"> Vdocipher ID </label>
            <input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="outline-none bg-white rounded-xl px-3 py-2 dark:bg-darkmain"
            />
          </div>
          <div className="w-96 text-3xl flex justify-center my-3">
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
                <p className="text-sm">Talk Thumbnail</p>
            <img src={`https://anzaacademy.co/anzaapi/view_thumbnail/career/${thumbnailUrl}`} alt="image missing" className="w-[50%] h-[75%]" />
                <label
                  htmlFor="paper"
                  className="bg-main p-1.5 px-4 mt-4 cursor-pointer text-white text-lg font-bold rounded-xl"
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

        <div className="flex flex-wrap justify-around mt-9 w-full">
          <div
            onClick={updateCareerTalk}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-main p-2 text-white"
          >
            {updating && <LoadingComponent loading={updating} color="white" />}
            <p className="font-bold">
              {" "}
              {updating ? "Updating ..." : "Update Talk"}
            </p>
          </div>
          <div
            onClick={() => router.push("/admin/career_talks")}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-amber-600 p-2 text-white"
          >
            Cancel Process
          </div>
          <div
            onClick={deleteCareerTalk}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-red-600 p-2 text-white"
          >
            {deleting && <LoadingComponent loading={deleting} color="white" />}
            <p className="font-bold">
              {" "}
              {deleting ? "Deleting ..." : " Delete Talk"}
            </p>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default UpdatePaper;
