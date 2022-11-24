import router from "next/router";
import React, { useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  classOptions,
  subjectOptions,
} from "../../../presentation/utils/constants";

const AdminUpdateUserPage = () => {

  const [updating, setUpdating] = useState(false);
const [deleting, setDeleting] = useState(false);
  return (
    <AdminDashboardLayout>
<div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-52 w-full ">
        <div className="flex h-12 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-main font-black text-2xl">
            Update Users
          </div>
        </div>
        <div className="flex flex-col  items-center w-full p-3">
          <div className="flex flex-wrap w-full justify-start">
            <div className="flex flex-col m-2">
              <label htmlFor="title">Name</label>
              <input
               // value={title}
               // onChange={(e) => setTitle(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Class Level</label>
              <select
                name="classlevel"
                id="classlevel "
              //  value={classLevel}
                //onChange={(v) => setClassLevel(v.target.value.toLowerCase())}
                className="px-3 py-1.5 w-72  outline-none bg-white rounded-xl dark:bg-darkmain "
              >
                {classOptions.map((e) => (
                  <option key={e} value={e.toLowerCase()}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Subject Type Level</label>
              <select
                name="subject"
                id="subject "
              //  value={subjectType}
              // onChange={(v) => setSubjectType(v.target.value)}
                className="px-3 py-1.5 w-72  outline-none bg-white rounded-xl dark:bg-darkmain "
              >
                {subjectOptions.map((e) => (
                  <option key={e} value={e.toLowerCase()}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Chapter Name</label>
              <input
              //  value={chapter}
                // onChange={(e) => setChapter(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Topic Name</label>
              <input
               // value={topicName}
                // onChange={(e) => setTopicName(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Teacher Name</label>
              <input
               // value={teacherName}
                // onChange={(e) => setTeacherName(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Lesson Brief</label>
              <textarea
               // value={brief}
                 // onChange={(e) => setBrief(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2  md:w-[600px] w-[350px]  dark:bg-darkmain"
              />
            </div>
            <div className="flex space-x-2 m-3 items-center w-72 cursor-pointer">
              <input
              //  checked={isPractical}
                className=" w-5 h-6 rounded-xl "
                type="checkbox"
              //  onChange={(e) => setIsPractical(e.target.checked)}
              />
              <p className="text-lg">Is Practical Lesson</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap w-full mt-10 px-5 justify-start">
          <div className="flex flex-col m-2">
            <label htmlFor="chapternumber"> Chapter Number</label>
            <input
              //value={chapterNumber}
              // onChange={(e) => setChapterNumber(parseInt(e.target.value))}
              className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              type="number"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="topicPriority"> Topic Number</label>
            <input
             // value={topicPriority}
              // onChange={(e) => setTopicPriority(parseInt(e.target.value))}
              className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              type="number"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="topicPriority"> Video Number</label>
            <input
             // value={videoPriority}
              // onChange={(e) => setVideoPriority(parseInt(e.target.value))}
              className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              type="number"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="topicPriority">Total Views</label>
            <input
             // value={totalViews}
              // onChange={(e) => setTotalViews(parseInt(e.target.value))}
              className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              type="number"
            />
          </div>
          <div className="flex space-x-2 m-3 items-center w-72 cursor-pointer">
            <input
           //   checked={commentsOff}
              className=" w-5 h-6 rounded-xl "
              type="checkbox"
           //   onChange={(e) => setCommentsOff(e.target.checked)}
            />
            <p className="text-lg">Turn Comments Off</p>
          </div>
          <div className="flex space-x-2 m-3 items-center w-72 cursor-pointer">
            <input
            //  checked={isPublished}
              //onChange={(e) => setIsPublished(e.target.checked)}
              className=" w-5 h-6 rounded-xl "
              type="checkbox"
            />
            <p className="text-lg">Is Published</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-around mt-9">
          <div
           // onClick={updateLesson}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-main p-2 text-white"
          >
            {/* {updating && <LoadingComponent loading={updating} color="white" />} */}
            <p className="font-bold">
              {" "}
              {updating ? "updating ..." : "Update User"}
            </p>
          </div>
          <div
            onClick={() => router.push("/admin/users")}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-amber-600 p-2 text-white"
          >
            Cancel Process
          </div>
          <div
            //onClick={deleteVideoLesson}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-red-600 p-2 text-white"
          >
            {/* {deleting && <LoadingComponent loading={deleting} color="white" />} */}
            <p className="font-bold">
              {" "}
              {deleting ? "deleting ..." : " Delete User"}
            </p>
          </div>
        </div>
      </div>


    </AdminDashboardLayout>
  );
};

export default AdminUpdateUserPage;
