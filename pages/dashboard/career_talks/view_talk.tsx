import axios from "axios";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiLike, BiDislike } from "react-icons/bi";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { CareerTalksContext } from "../../../presentation/contexts/career_talks_controller";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import { prodUrl } from "../../../presentation/utils/constants";
import { getTimeAgo, showToast } from "../../../presentation/utils/helper_functions";
import CareerTalksRepo from "../../../data/repos/career_talk_repo";

const ViewCareerTalkPage = () => {
  const router = useRouter();
  const { talks } = useContext(CareerTalksContext);
  const { selectedVideoId, setShowPremiumModal } =
    useContext(NavigationContext);
  let talk = talks.find((e) => e.videoUrl == selectedVideoId);
  const { setSelectedVideoId } = useContext(NavigationContext);
  // vdocipher here
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<any[""]>([]);
  useEffect(() => {
  // get directly from my api
      fetch(`https://infinitersinvests.com/ANZA/anza_api?otp=${selectedVideoId}`, {
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

  const [currentStep, setCurrentStep] = useState(0);
  const components = [
    <ArticlesComponents key="overview" 
    articleId={videos == undefined ? "" : videos.description}
    articlePic={videos['posters'] == undefined ? "" : videos['posters'][2]['url'] } />,
    <CommentsComponents
      key="comments"
    />,
    <SuggestTalks
    key="comments"
  />,
  ];

  return (
    <DashboardLayout>

      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative min-h-screen py-16 w-full items-center ">

      {loading && (
          <div className="flex flex-col h-full w-full justify-center items-center">
            <LoadingComponent color="main" loading={loading} />
            <p className="py-1 text-xs">Your video is loading...</p>
          </div>
        )}

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


    <div className="flex justify-between pt-2">
    <p className="px-4  cursor-pointer mt-1 text-main dark-text-white text-lg">
                      {talk?.title.replace(/(?:^|\s)\S/g,(res)=>{ return res.toUpperCase();})}
                    </p>

<p className="px-4 text-md cursor-pointer mt-1  dark-text-white">
                      {(videos.duration / 60).toFixed(0)} Mins 
                    </p>

    </div>
    <div className="flex justify-between p-0">
    <p className="px-4  cursor-pointer mt-1  dark-text-white font-normal text-md">
                      {talk?.category.replace(/(?:^|\s)\S/g,(res)=>{ return res.toUpperCase();})}
                    </p>
    </div>

            <div className="flex flex-col">
              <div className="h-12  w-full flex items-center">
                <div
                  onClick={() => {
                    setCurrentStep(0);
                  }}
                  className={` ${
                    currentStep == 0
                      ? " dark:bg-darkmain border-main border-b-4 text-dark bg-main"
                      : ""
                  }  flex justify-center items-center cursor-pointer   transition-all  h-full flex-col  flex-1 `}
                >
                  <p className=" cursor-pointer  text-sm font-normal"> Article</p>
                </div>
                <div
                  onClick={() => {
                    setCurrentStep(1);
                  }}
                  className={` ${
                    currentStep == 1
                      ? " dark:bg-darkmain border-main border-b-4 text-dark bg-main"
                      : ""
                  }  flex justify-center items-center   transition-all cursor-pointer flex-col  h-full flex-1 `}
                >
                  <p className=" cursor-pointer  text-sm font-normal">
                    {" "}
                    Comment
                  </p>
                </div>

                <div
                  onClick={() => {
                    setCurrentStep(2);
                  }}
                  className={` ${
                    currentStep == 2
                      ? "  dark:bg-darkmain border-main border-b-4 text-dark bg-main"
                      : ""
                  }  flex justify-center items-center  transition-all cursor-pointer flex-col  h-full flex-1 `}
                >
                  <p className=" cursor-pointer  text-sm font-normal ">
                    {" "}
                   Suggest A Career Talk
                  </p>
                </div>
              </div>

              <div className="bg-gray-300 dark:bg-gray-700 dark:border-opacity-70  h-0.5 w-full text-main"></div>
              {components[currentStep]}
            </div>
          </div>


          <div className="w-52 xl:w-52   dark:bg-darkmain  hidden md:flex flex-col  max-h-[70vh] overflow-y-auto ">
      <div className=" flex items-center justify-center">
        <p className="text-xl font-bold  text-main ">CAREER TALKS</p>
      </div>
            {talks.map((k: any, i: any) => (
                   <div
              onClick={() => {
                if (k.talkId == selectedVideoId) {
                  showToast(
                    "You are currently watching this career talk.",
                    "success"
                  );
                } else {
                  router.push("/dashboard/career_talks");
                  setTimeout(() => {
                    router.push("/dashboard/career_talks/view_talk");
                    setSelectedVideoId(k.videoUrl);
                  }, 10);
                }
              }}
              key={k.talkId}
              className="w-52      dark:bg-darkmain cursor-pointer "
            >
              <img
                src={`https://api.thesigurd.com/anzaapi/view_thumbnail/career/${k.thumbnailUrl}`} 
                alt="thumbnail not found"
                className="rounded-md p-2"
              />
              <p className="title pl-2 pr-2 text-sm font-normal ">{k.title}</p>            </div>
            ))}
          </div>

          
        </div>
            )}
      </div>
    </DashboardLayout>
  );
};
export default ViewCareerTalkPage;
const ArticlesComponents = (props: PropsWithChildren<{ articleId: string,  articlePic: string  }>) => {
  return (

<div
className="w-full h-96 bg-white dark:bg-darksec text-left mt-4  flex flex-col overflow-y-scroll scroll-touch
p-3 overflow-x-hidden dark:text-main"
>
<p className="text-indigo-700 mb-2 pb-0 text-lg md:text-xl  font-bold">
{/* {talk?.title.toUpperCase()} */}
</p>
<br />
<textarea
            rows={10}
            value={props.articleId}
            className="outline-none bg-white rounded-md px-3 py-2  dark:bg-darkmain dark:text-white w-full focus:ring-1 focus:ring-main "
          />


</div>


  );
};

const CommentsComponents = () => {
  return (
    <div className="flex flex-col justify-center transition-all duration-150 pt-3  md:w-[75%]">
      <div className="flex items-start pb-8 ">
        <div className="flex justify-center items-center bg-main text-white font-bold p-3 rounded-full w-10 h-10">
          <p className="text-xl">K</p>
        </div>
        <div className="w-2"></div>

        <div
          className="flex flex-col flex-1 m-1 ml-0 mr-2  "
        >
          <div className="mb-5">
            <textarea
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="content"
              rows={4}
              placeholder="Add a comment or ask a question..."
            ></textarea>
          </div>
          <div
            className={`py-2 flex justify-end text-xs`}
          >
            <div
              className="px-4 py-1.5 cursor-pointer bg-gray-300 mr-3 rounded-lg dark:bg-darkmain"
            >
              CANCEL
            </div>
            <div
              className="px-4 py-1.5 cursor-pointer bg-main text-white rounded-lg "
            >
              COMMENT
            </div>
          </div>
        </div>
      </div>
        <div className="flex flex-col ml-10 h-24 items-left justify-left ">
          <p>No Comments Found.</p>
          <p className="text-xs">Be the first to comment or ask a question.</p>
        </div>
    </div>
  );
};

const SuggestTalks = () => {
  return (
    <div className="flex flex-col justify-center transition-all duration-150 pt-3  md:w-[75%]">
      <div className="flex items-start pb-8 ">
        <div className="flex justify-center items-center bg-main text-white font-bold p-3 rounded-full w-10 h-10">
          <p className="text-xl">K</p>
        </div>
        <div className="w-2"></div>

        <div
          className="flex flex-col flex-1 m-1 ml-0 mr-2  "
        >
          <div className="mb-5">
            <textarea
              className="block p-2.5 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="content"
              rows={4}
              placeholder="Suggest a career talk you  like..."
            ></textarea>
          </div>
          <div
            className={`py-2 flex justify-end text-xs`}
          >
            <div
              className="px-4 py-1.5 cursor-pointer bg-gray-300 mr-3 rounded-lg dark:bg-darkmain"
            >
              CANCEL
            </div>
            <div
              className="px-4 py-1.5 cursor-pointer bg-main text-white rounded-lg "
            >
              SUGGEST
            </div>
          </div>
        </div>
      </div>
        <div className="flex flex-col ml-10 h-24 items-left justify-left ">
          <p>No Suggestions Found.</p>
          <p className="text-xs">Be the first to suggest a career talk of your interest</p>
        </div>
    </div>
  );
};

//  `https://api.thesigurd.com/anzaapi/view_thumbnail/career/${res.data.url}`
