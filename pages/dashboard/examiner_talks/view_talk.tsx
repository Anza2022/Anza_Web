import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import { ExaminerTalksContext } from "../../../presentation/contexts/examiner_talks_controller";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";

const ViewExaminerTalk = () => {
  const router = useRouter();

  const { talks } = useContext(ExaminerTalksContext);
  const { selectedVideoId } = useContext(NavigationContext);
  let talk = talks.find((e) => e.talkId == selectedVideoId);

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec md:ml-44 relative min-h-screen py-16 w-full items-center justify-center">
        <video
          onContextMenu={(e) => e.preventDefault()}
          autoPlay
          onChange={(e) => {}}
          onChangeCapture={(e) => {}}
          poster={talk?.thumbnailUrl}
          // onClick={() => alert("helllo there")}
          onDurationChange={(e) => {
            // console.log(e.timeStamp);
          }}
          controls
          id="myVideo"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
          className="  shadow-xl hover:shadow-2xl cursor-pointer  drop-shadow-2xl  bg-gray-800 object-cover "
        >
          <source
            src={
              "https://flutter.github.io/assets-for-api-docs/assets/videos/bee.mp4"
            }
            type="video/mp4"
          />
          <track
            src="/captions_file.vtt"
            label="English"
            kind="captions"
            srcLang="en-us"
            default
          ></track>
          {/* <source src="movie.ogg" type="video/ogg /"> */}
          Your browser does not support the video tag.
        </video>
        <div className="h-screen w-full flex-col px-5 py-3">
          <div className="flex justify-between">
            <p className="text-2xl font-bold">{talk?.title}</p>

            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <BiLike
                  size={22}
                  className="cursor-pointer hover:bg-white "
                  // onClick={likeVideo}
                />
                <p className="text-xs ml-0.5">
                  {" "}
                  <p>{talk?.likes}</p>
                </p>
              </div>
              <div className="flex text-sm space-x-1">
                <p>{talk?.totalViews}</p>
                <p className="">Views</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewExaminerTalk;
// "https://flutter.github.io/assets-for-api-docs/assets/videos/bee.mp4";
