import React, { useContext, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiDislike, BiLike } from "react-icons/bi";
import { NavigationContext } from "../../../../presentation/contexts/navigation_state_controller";
import { VideoLessonContext } from "../../../../presentation/contexts/video_lessons_controller";
import DashboardLayout from "../../../../presentation/layouts/dashboard_layout";
import { prodUrl } from "../../../../presentation/utils/constants";
import { showToast } from "../../../../presentation/utils/helper_functions";

const ViewSetbookPage = () => {
  const { setShowPremiumModal, selectedVideoId } =
    useContext(NavigationContext);
  const { setbooksEpisodes } = useContext(VideoLessonContext);
  let episodes = setbooksEpisodes.filter((e) => e.fileName == selectedVideoId);
  const [currentIndex, setCurrentIndex] = useState(0);
  // vdocipher here
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<any[""]>([]);
  useEffect(() => {
      // get directly from my api
       fetch(`https://davee.co.ke/ANZA/anzaApi?otp=${selectedVideoId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
      })
        .then((res) => {
          res.json().then((response) => {
           // console.log(response);
            setVideos(response)
          })
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);


  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative min-h-screen py-16 w-full items-center ">


      {!loading && (
        <div className="flex w-full ">
          <div className="flex-1 flex-flex-col    items-center p-1">

          {!loading && (
          <div style={{ "paddingTop": "50.73%", "position": "relative" }}>
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videos.otp}&playbackInfo=${videos.playbackInfo}&primaryColor=008080`}
          style={{ "border": "0", "maxWidth": "100%", "position": "absolute", "top": "0", "left": "0", "height": "100%", "width": "100%" }}
          allow="encrypted-media"
          allowFullScreen={true}
          frameBorder={0}
        ></iframe>
      </div>
          )}

          
            <div className="flex w-full ">
              <div className="flex flex-col flex-1 mx-0 w-full">
                {/* <div className="flex w-full justify-around">
                  <div className="flex space-x-4 py-2 text-center">
                            <div className="flex cursor-pointer hover:text-main"      onClick={() =>
                                showToast("Coming soon", "success")
                              }>
                              LIKE {" "}
                              <BiLike
                                className="cursor-pointer  mt-1"
                              />
                              <p className="text-xs ml-2.5"></p>
                            </div>
                            <div className="flex cursor-pointer hover:text-main "      onClick={() =>
                                showToast("Coming soon", "success")
                              }>
                              DISLIKE {" "}
                              <BiDislike
                                className="cursor-pointer hover:bg-white mt-1"
                              />
                              <p className="text-xs ml-1.5"></p>
                            </div>
                            <p
                                className="px-4 text-sm cursor-pointer mt-0"
                              >
                                100 VIEWS
                              </p>
                          </div>

                </div> */}

<div className="w-full xl:w-72  m-1  md:hidden flex-col  max-h-[87vh] overflow-y-auto ">
<label className="block mb-2 mt-2 text-base text-center font-medium text-gray-900 dark:text-gray-400">Choose Episode</label>
            {Array(episodes.length)
              .fill(1)
              .map((e, i) => (
<select 
       key={i}
                   id="large" className="block py-3 px-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option 
                    onClick={() => {
                      if (i == currentIndex) {
                        showToast("You are currently watching this setbook", "success");
                      } else {
                        setShowPremiumModal(true);
                      }
                    }}
                    >  Episode {i + 1}</option>
</select>



              ))}
          </div>


                <p className="text-amber-700 ml-9 md:text-md text-2xl font-bold mt-3 ">
                  {episodes.length > 0 ? episodes[currentIndex].title : ""}
                </p>
       

                <div className="holder mx-auto mt-2 w-11/12 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                  <div>
                  <p className="mr-4 mt-0 md:mr-5 mr-5 font-bold  cursor-pointer" 
                  > DURATION :      <span className="font-normal">  {(videos.duration / 60).toFixed(0)} Mins </span> </p>
                              <p className="mr-4 mt-0 md:mr-5 mr-5 font-bold  cursor-pointer" 
                  > CREATED AT :      <span className="font-normal">                   {episodes.length > 0 ? episodes[currentIndex].createdAt : ""} </span> </p>
                     <p className="mr-4 mt-0 md:mr-5 mr-5 font-bold cursor-pointer" 
                  >  EPISODE :   <span className="font-normal">                     {episodes.length > 0 ? episodes[currentIndex].title : ""} </span> </p>
                                 <p className="mr-4 mt-0 md:mr-5 mr-5 font-bold cursor-pointer" 
                  >  DESCRIPTIONS </p>

      
                  <p className="mr-4 mt-0 md:mr-5 mr-5 font-normal  cursor-pointer" 
                  >                   {episodes.length > 0 ? episodes[currentIndex].description : ""} </p>

                  </div>
                  <p className="text-main mt-0 ml-0 text-blue-800 font-bold capitalize pb-0 mr-10 text-lg md:text-1xl font-bold">
                  

                  <div className="each mb-10 m-0  relative">
                    <img className="w-full" src={videos['posters'] == undefined ? "" : videos['posters'][2]['url'] } alt="img missing" />
                  </div>
                  
                  
                  
                                    </p>
                </div>

              </div>
              {/* <div className="hidden md:flex w-52 xl:w-72  m-1"></div> */}
            </div>
          </div>
          <div className="w-52 xl:w-72  m-1   hidden md:flex flex-col  max-h-[87vh] overflow-y-auto ">
            {Array(episodes.length)
              .fill(1)
              .map((e, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (i == currentIndex) {
                      showToast("You are currently watching this setbook", "success");
                    } else {
                      setShowPremiumModal(true);
                    }
                  }}
                  className={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white  rounded-lg group bg-gradient-to-br from-main to-darksec group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200  cursor-pointer ${
                    i + 1 == currentIndex + 1 ? "border-2 border-main" : " "
                  }`}
                >
  <span className={`relative px-5 py-2.5 transition-all ease-in duration-75  cursor-pointer   rounded-md group-hover:bg-opacity-0`}>
  Episode {i + 1}
  </span>
</button>
              ))}
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  );
};

export default ViewSetbookPage;
