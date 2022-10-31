import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import CareerTalksRepo from "../../../data/repos/career_talk_repo";
import CareerTalk from "../../../models/curriculum/career_talk_model";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { CareerTalksContext } from "../../../presentation/contexts/career_talks_controller";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  getCurrentDate,
  showToast,
} from "../../../presentation/utils/helper_functions";

const AdminAddCareerTalkPage = () => {
  const router = useRouter();
  const { talks, setTalks } = useContext(CareerTalksContext);
  const [title, setTitle] = useState("");
  const [guestName, setGuestName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const saveExaminerTalk = async () => {
    if (title === "") {
      showToast("Kindly Enter Title", "error");
      return;
    }
    if (videoUrl === "") {
      showToast("Kindly Enter video link", "error");
      return;
    }
    if (thumbnailUrl === "") {
      showToast("Kindly Upload Thumbnail", "error");
      return;
    }
    try {
      setLoading(true);
      let newtalk = new CareerTalk(
        "",
        title,
        videoUrl,
        thumbnailUrl,
        1,
        getCurrentDate(),
        getCurrentDate(),
        1,
        category,
        guestName,
        description
      );
      let res = await CareerTalksRepo.addCareerTalk(newtalk);
      setTalks([res, ...talks]);
      showToast(`Added successfully`, "success");
      router.push("/admin/career_talks");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
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
          "https://api.thesigurd.com/anzaapi/upload_thumbnail/lesson",
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
      <div className="flex-1 flex flex-col bg-gray-200  dark:bg-darksec min-h-screen py-16 md:ml-52 w-full ">
        <div className="flex h-12 items-center justify-center dark:bg-darkmain bg-white pl-5  md:pl-10">
          <div className="flex text-fuchsia-600 font-black text-2xl">
  ADD NEW CAREER TALK
          </div>
        </div>

        <div className="flex flex-col  w-full ">
          <div className="flex flex-wrap w-full px-4">
            <div className="flex flex-col m-2">
              <label htmlFor="title"> Talk Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                className="outline-none bg-white rounded-xl px-3 py-2 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title"> Guest Name</label>
              <input
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Category</label>
              <select
                name="subject"
                id="subject "
                value={category}
                onChange={(v) => setCategory(v.target.value)}
                className="px-3 py-1.5 w-72  outline-none bg-white rounded-xl  dark:bg-darkmain"
              >
                <option value="">Select Category</option>

{[
"Agriculture Food, and Natural Resources",
"Architecture and Construction",
"Arts, Audio/Video Technology, and Communication",
"Business and Finance",
"Education and Training",
"Government and Public Administration",
"Health Science",
"Information Technology",
"Law, Public Safety, Corrections, and Security",
"Marketing",
"Science, Technology, Engineering, and Math"
].map(
                  (e) => (
                    <option key={e} value={e.toLowerCase()}>
                      {e}
                    </option>
                  )
                )}
              </select>
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


            <div className="w-96 text-xl flex justify-center my-3">
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
                  <p className="text-sm">Thumbnail Name</p>
                  <p className="text-sm">{thumbnailUrl}</p>
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

          <div className="w-full mt-5 flex flex-wrap justify-around">
            <div
              onClick={saveExaminerTalk}
              className="px-8 py-2  my-2 rounded-xl bg-main text-white shadow-xl cursor-pointer flex items-center"
            >
              <LoadingComponent loading={loading} color="white" />
              <p> {loading ? "saving Talk ..." : "Save Career Talk"}</p>
              {loading ? <p className="text-xs">please wait</p> : <p></p>}
            </div>
            <div
              onClick={() => router.push("/admin/career_talks")}
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

export default AdminAddCareerTalkPage;
