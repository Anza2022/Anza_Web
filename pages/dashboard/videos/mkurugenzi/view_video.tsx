import React, { useContext } from "react";
import { NavigationContext } from "../../../../presentation/contexts/navigation_state_controller";
import { VideoLessonContext } from "../../../../presentation/contexts/video_lessons_controller";
import AppLayout from "../../../../presentation/layouts/app_layout";
import DashboardLayout from "../../../../presentation/layouts/dashboard_layout";
import { prodUrl } from "../../../../presentation/utils/constants";

const ViewMkurugenziLesson = () => {
  const { selectedVideoId } = useContext(NavigationContext);
  // const { mkuruLessons } = useContext(VideoLessonContext);
  // let lesson = mkuruLessons.filter((e) => e.id == selectedVideoId)[0];
  return (
    <DashboardLayout>
      <div className="flex flex-col w-full md:ml-44 md:px-5 pt-20 min-h-screen dark:bg-darksec aspect-w-16 aspect-h-9">
        {/* <iframe
          src={selectedVideoId}
          className="aspect-video mt-0.5 drop-shadow-lg"
          allow="autoplay"
        ></iframe> */}
        <iframe
          src={selectedVideoId}
          title="YouTube video player"
          
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video mt-0 drop-shadow-lg m-4"
        ></iframe>
      </div>
    </DashboardLayout>
  );
};

export default ViewMkurugenziLesson;
