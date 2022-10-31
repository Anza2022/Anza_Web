import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import ExaminerTalksRepo from "../../../data/repos/examiner_talks_repo";
import ExaminerTalk from "../../../models/curriculum/examiner_talk_model";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { ExaminerTalksContext } from "../../../presentation/contexts/examiner_talks_controller";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import { subjectOptions } from "../../../presentation/utils/constants";
import {
  getCurrentDate,
  showToast,
} from "../../../presentation/utils/helper_functions";

const AdminAddExaminerTalkPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [subjectType, setSubjectType] = useState("");
  const [examinerName, setExaminerName] = useState("");
  const [examinerSchool, setExaminerSchool] = useState("");
  const [examinerDescription, setExaminerDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { talks, setTalks } = useContext(ExaminerTalksContext);
  const saveExaminerTalk = async () => {
    if (title === "") {
      showToast("enter title", "error");
      return;
    }
    if (examinerName === "") {
      showToast("enter examiner name", "error");
      return;
    }
    if (examinerSchool === "") {
      showToast("enter examiner school", "error");
      return;
    }
    if (examinerDescription === "") {
      showToast("enter examiner description", "error");
      return;
    }
    if (subjectType === "") {
      showToast("enter subject type", "error");
      return;
    }
    if (videoUrl === "") {
      showToast("enter video link", "error");
      return;
    }
    if (thumbnailUrl === "") {
      showToast("enter thumbnail link", "error");
      return;
    }
    try {
      setLoading(true);

      let newtalk = new ExaminerTalk(
        "",
        title,
        videoUrl,
        thumbnailUrl,
        getCurrentDate(),
        getCurrentDate(),
        1,
        1,
        subjectType,
        examinerSchool,
        examinerName,
        examinerDescription
      );

      let res = await ExaminerTalksRepo.addExaminerTalk(newtalk);
      setTalks([res, ...talks]);
      showToast(`added successfully`, "success");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-52 w-full ">
        <div className="flex h-12 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-main font-black text-2xl">
            Add New Examiner Talk
          </div>
        </div>

        <div className="flex flex-col  w-full ">
          <div className="flex flex-wrap w-full px-4">
            <div className="flex flex-col m-2">
              <label htmlFor="title">Subject Type</label>
              <select
                name="subject"
                id="subject "
                value={subjectType}
                onChange={(v) => setSubjectType(v.target.value)}
                className="px-3 py-2 dark:bg-darkmain w-72  outline-none bg-white rounded-xl "
              >
                {" "}
                <option value="">Select Subject </option>
                {subjectOptions.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title"> Talk Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Examiner Name </label>
              <input
                value={examinerName}
                onChange={(e) => setExaminerName(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Examiner School </label>
              <input
                value={examinerSchool}
                onChange={(e) => setExaminerSchool(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Talk Description </label>
              <input
                value={examinerDescription}
                onChange={(e) => setExaminerDescription(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 dark:bg-darkmain"
              />
            </div>
          </div>
          <p className="mt-3 pb-1 text-main font-black px-7">Talk File Links</p>
          <div className="flex flex-wrap w-full items-center px-4">
            <div className="flex flex-col mx-2 md:w-[480px]">
              <label htmlFor="title"> Talk Video Link </label>
              <input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2 md:w-[480px]">
              <label htmlFor="title"> Talk Thumbnail Link</label>
              <input
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 dark:bg-darkmain"
              />
            </div>
          </div>

          <div className="w-full mt-5 flex flex-wrap justify-around">
            <div
              onClick={saveExaminerTalk}
              className="px-8 py-2  my-2 rounded-xl bg-main text-white shadow-xl cursor-pointer flex items-center"
            >
              <LoadingComponent loading={loading} color="white" />
              <p> {loading ? "saving Talk ..." : "Save Examiner Talk"}</p>
              {loading ? <p className="text-xs">please wait</p> : <p></p>}
            </div>
            <div
              onClick={() => router.push("/admin/examiner_talks")}
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

export default AdminAddExaminerTalkPage;
