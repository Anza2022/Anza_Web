import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import VideoLessonRepo from "../../data/repos/video_lessons_repo";
import LoadingComponent from "../../presentation/components/others/loading_component";
import { VideoLessonContext } from "../../presentation/contexts/video_lessons_controller";
import DashboardLayout from "../../presentation/layouts/dashboard_layout";
import { showToast } from "../../presentation/utils/helper_functions";

const UserDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { lessons, setLessons, selectedLessonId, setSelectedLessonId } =
    useContext(VideoLessonContext);

  async function getVideoLessons() {
    try {
      let lessons = await VideoLessonRepo.getAllVideoLessons();
      setLessons(lessons);
    } catch (e) {
      showToast(`${e}`, "error");
    }
  }
  useEffect(() => {
    getVideoLessons();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200  md:ml-52 relative h-screen py-16 w-full items-center justify-center">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <LoadingComponent loading={loading} color="secondary" />
          </div>
        ) : lessons.length < 1 ? (
          <div className="h-full w-full flex items-center justify-center">
            <p>No Lessons Available</p>
          </div>
        ) : (
          lessons.map((e) => <div key={e.title}>{e.title}</div>)
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
