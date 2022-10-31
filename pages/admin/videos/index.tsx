import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import VideoLessonRepo from "../../../data/repos/video_lessons_repo";
import { fakeLessons } from "../../../data/services/fake_data";
import VideoLessonModel from "../../../models/curriculum/video_lesson_model";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { VideoLessonContext } from "../../../presentation/contexts/video_lessons_controller";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  isDevMode,
  subjectOptions,
} from "../../../presentation/utils/constants";
import { showToast } from "../../../presentation/utils/helper_functions";

const AdminVideoLessons = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  let { lessons, setLessons } = useContext(VideoLessonContext);
  const { setSelectedVideoId } = useContext(NavigationContext);
  const [selectedClass, setSelectedClass] = useState("form 3");
  const [filterdSubject, setFilteredSubject] = useState("chemistry");

  async function getVideoLessons() {
    setLoading(true);
    try {
      let lessons = await VideoLessonRepo.getAllVideoLessons();
      //todo sort the videos by form, subject and video, topic numbers

      setLessons(lessons);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getVideoLessons();
  }, []);
  lessons = lessons.filter(
    (e) =>
      e.classLevel.toLowerCase() == selectedClass &&
      e.subjectType.toLowerCase() == filterdSubject
  );

  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-52 relative h-screen py-16 w-full overflow-x-hidden ">
        <div className="flex h-12 items-center justify-between px-4 bg-white dark:bg-darkmain pl-5  md:pl-10 w-full">
          <div></div>
          <div className="flex text-main font-black text-2xl">
         ALL VIDEO LESSONS
          </div>

          <div className="flex space-x-2">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="outline-none px-2 bg-green-50 dark:bg-darksec"
            >
              {["form 1", "form 2", "form 3", "form 4"].map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
            <select
              value={filterdSubject}
              onChange={(e) => setFilteredSubject(e.target.value)}
              className="outline-none px-2 bg-green-50 dark:bg-darksec"
            >
              {subjectOptions.map((e) => (
                <option key={e} value={e.toLowerCase()}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="w-full flex items-center justify-center h-96">
            <LoadingComponent loading={loading} color="secondary" />
          </div>
        ) : lessons.length < 1 ? (
          <div className="flex w-full h-[75vh] justify-center items-center flex-col">
          <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
            <div className="flex">
              <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
              <div>
                <p className="font-bold">Oops! No VIDEO LESSONS available. </p>
              </div>
            </div>
          </div>
          </div>
        ) : (
          <div className="flex overflow-scroll  max-h-screen " style={{"scrollbarWidth" : "auto"}}>
            <table className="table-fixed text-left p-1 m-2 rounded-lg border-2 border-main text-ellipsis ">
              <thead
                className="flex p-2 bg-main text-white font-black text-xs"
                style={{ fontFamily: "Montserrat" }}
              >
                <th className="w-10">No.</th>
                <th className="w-28 ">Class Level</th>
                <th className="w-28 ">Subject</th>
                <th className="w-28 ">Chapter</th>
                <th className="w-40 ">Topic</th>
                <th className="w-60">Title</th>
                <th className="w-24 ">Chapter No.</th>
                <th className="w-24 ">Topic No.</th>
                <th className="w-24">Video No.</th>
                <th className="w-24 ">Comments</th>
                <th className="w-24 ">Published</th>

                <th className="w-52">Video Id </th>
                <th className="w-52">Thumbnail id</th>
              </thead>
              {lessons.map((e, i) => (
                <tr
                  key={e.title}
                  className="flex p-2 hover:bg-main hover:text-white  text-[11px] cursor-pointer border-b-2 border-gray-50 "
                  onDoubleClick={() => {
                    setSelectedVideoId(e.videoId);
                    router.push("/admin/videos/update_lesson");
                  }}
                >
                  {" "}
                  <td className="w-10 ">{`${i+1} `}.</td>
                  <td className="w-28 ">{e.classLevel}</td>
                  <td className="w-28 ">{e.subjectType}</td>
                  <td className="w-28 ">{e.chapter}</td>
                  <td className="w-40 ">{e.topicName}</td>
                  <td className="w-60 ">{e.title}</td>
                  <td className="w-24 ">{e.chapterNumber}</td>
                  <td className="w-24 ">{e.topicPriority}</td>
                  <td className="w-24 ">{e.videoPriority}</td>
                  <td className="w-24 ">{e.commentsOff ? "No" : "Yes"}</td>
                  <td className="w-24 ">{e.isPublished ? "No" : "Yes"}</td>
                  <td className="w-52 ">{e.videoUrl.split("/").pop()}</td>
                  <td className="w-52  text-ellipsis ">
                    {e.thumbnailUrl.split("/").pop()}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        )}
        <div
          onClick={() => router.push("/admin/videos/add_lesson")}
          className="py-2 rounded-md flex items-center cursor-pointer text-white bg-main w-44 justify-center absolute bottom-8 right-4"
        >
ADD NEW LESSON
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminVideoLessons;
