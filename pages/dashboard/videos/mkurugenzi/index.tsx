/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { ReactNode } from "react";
import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../../../presentation/layouts/dashboard_layout";
import {
  isBrowser,
  showToast,
} from "../../../../presentation/utils/helper_functions";
import nores from "../../../../assets/icons/nores.png";
import { AiFillStar, AiOutlineEye } from "react-icons/ai";
import { NavigationContext } from "../../../../presentation/contexts/navigation_state_controller";
import { VideoLessonContext } from "../../../../presentation/contexts/video_lessons_controller";
import MkurugenziEpisode from "../../../../models/curriculum/mkurugenzi_episode_model";

const MkurugenziVideosPage = () => {
  const router = useRouter();

  //hold the videos in state so as to improve search
  const { setSelectedVideoId } = useContext(NavigationContext);
  // const { mkuruLessons } = useContext(VideoLessonContext);
  let mkuruLessons = [
    {
      title: "Wangari Maathai (The Legacy Of A Forester)",
      link: "https://www.youtube.com/embed/p8p0QpdkSUk?autoplay=1",
      id: "p8p0QpdkSUk",
      description:
        "In this Episode, I tell the story of Professor Wangari Maathai. The Nobel Peace Price winner who was willing to lay down her own life for the sake of Kenya's Forests.",
    },
    {
      title: "Bertha B (The Mother Of The Motorwagen)",
      link: "https://www.youtube.com/embed/DuaTBzqdI1k?autoplay=1",
      id: "DuaTBzqdI1k",
      description:
        "In this Episode, I tell the story of a mother of invention whe made it possible for the creation of one of the world's first motor vehicles.",
    },
    {
      title: "Silencing A Statesman - J.M. Kariuki",
      link: "https://www.youtube.com/embed/r9-_MF0mJRo?autoplay=1",
      id: "r9-_MF0mJRo",
      description:
        "In this Episode, I tell the story of the final days of J.M. Kariuki. One of the most prominent politicians of the Kenyan government in the 70s.",
    },
    {
      title: "Ellen Johnson & The Women Of Liberia",
      link: "https://www.youtube.com/embed/p0Awsbx0eV8?autoplay=1",
      id: "p0Awsbx0eV8",
      description:
        "In this Episode, I tell the story of Ellen Johnson, The First African Female to be elected president in the war torn country of Liberia and the women of Liberia who fought for peace",
    },
    {
      title: "Titanic - The Key Error",
      link: "https://www.youtube.com/embed/8BnQkdXTRpg?autoplay=1",
      id: "8BnQkdXTRpg",
      description:
        "In this Episode, I tell the story of how a set of keys ended up changing world history on one cold April night in 1912.",
    },
    {
      title: "Garrisa University College Execution",
      link: "https://www.youtube.com/embed/6zPg9Uf5hqk?autoplay=1",
      id: "6zPg9Uf5hqk",
      description:
        " In this Episode, I tell the story of the horrible attack at Garrisa University College perpetrated by the Al-Shabaab militia on April 2nd 2015",
    },
  ];
  const [videos, setVideos] = useState(mkuruLessons);

  const [searchvalue, setSearchvalue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchLesson = (value: string) => {
    setSearchResults(
      mkuruLessons.filter((e) => e.title.toLowerCase().includes(value))
    );
  };


  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec md:ml-44 relative min-h-screen py-16 w-full items-center ">
        <div className="flex h-12 mt-1.5 items-center justify-center w-full ">
          <input
            className="outline-none p-2 md:p-3 pl-4 w-[100%] md:w-[600px]  bg-white dark:bg-darkmain"
            placeholder="Search mkurugenzi episode"
            value={searchvalue}
            onChange={(e) => {
              let v = e.target.value.toLowerCase();
              let filteredVideos = mkuruLessons.filter((e) =>
                e.title.toLowerCase().includes(v)
              );
              setSearchvalue(e.target.value);
              setVideos(filteredVideos);
            }}
          />
        </div>

        {/* <div className="flex flex-col h-96 justify-center items-center">
          <p className="font-bold">Opps</p>
          <p>No Mkurugenzi Content for now</p>
        </div> */}

        <div
          className={`flex flex-wrap  w-full h-full  justify-around ${
            videos.length < 1 ? "justify-center items-center" : ""
          }`}
        >
          {videos.length < 1 && (
            <div className="flex flex-col justify-center items-center w-80 md:w-96">
              <p className="font-bold text-2xl">Oops</p>
              <p className="">No episodes found.</p>
              {searchvalue.length < 1 && (
                <p className="text-[10px] text-main">Please come back later</p>
              )}
            </div>
          )}

<div className="holder mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
{videos.map((e) => (    

                  <div className="each mb-10 m-2  relative hover:shadow-main  hover:bg-indigo-400 hover:shadow-main shadow-lg hover:bg-indigo-400 transform duration-500  md:hover:-translate-y-1 md:hover:scale-105"   
                   key={e.title}       onClick={() => {
                    setSelectedVideoId(e.link);
                    router.push("/dashboard/videos/mkurugenzi/view_video");
                  }}
                   >
                                        <div className="relative flex flex-col items-center group">
                    <img className="w-full cursor-pointer"  src={`http://img.youtube.com/vi/${e.id}/mqdefault.jpg`} alt="" />
                    <div className="badge absolute top-0 right-0  m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded bg-red-500">Live</div>
                    <div className="info-box text-xs flex p-1 font-semibold text-gray-500 justify-center bg-gray-300">
                      <span className="mr-1 p-1 px-2 font-bold">406K VIEWS</span>
                    </div>


<div className="absolute bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
<div className="w-3 h-3 -mt-0 rotate-45 bg-gray-600"></div>
  <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md"> {e.description}</span>
</div>
                    <div className="desc p-4 text-gray-800 cursor-pointer">
                      <a   className="title font-bold block cursor-pointer dark:text-main">{e.title}</a>
                      </div>
                      </div>
                  </div> 
          ))}
                 
         </div>   



        </div>
      </div>
    </DashboardLayout>
  );
};

export default MkurugenziVideosPage;
