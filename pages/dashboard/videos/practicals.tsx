/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AiFillStar, AiTwotoneLock } from "react-icons/ai";
import VideoLessonModel from "../../../models/curriculum/video_lesson_model";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { VideoLessonContext } from "../../../presentation/contexts/video_lessons_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import { showToast } from "../../../presentation/utils/helper_functions";
import playbutton from "../../../assets/icons/play.png";
import { LoggedInUserContext } from "../../../presentation/contexts/loggedin_user_controller";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { m } from "framer-motion";
import { ImUnlocked } from "react-icons/im";
const MySwal = withReactContent(Swal);
 

 
const PracticalsVideosPage = () => {
  const router = useRouter();
  const { lessons } = useContext(VideoLessonContext);
  const {setShowPremiumModal, setSelectedForm, setSelectedSubject, setSelectedVideoId, setSelectedVdocipher } =
    useContext(NavigationContext);
  let practicals = lessons.filter((e) => e.isPractical);
  //console.log(practicals);
  const { accountSubscription } = useContext(LoggedInUserContext);
const SubStatus = accountSubscription[0] != undefined
 ? accountSubscription[0].isSubscriptionActive
   ? "Active"
   : "Ended"
 : "";

  const [searchvalue, setSearchvalue] = useState("");
  const [searchResults, setSearchResults] = useState<VideoLessonModel[]>([]);
  const searchLesson = (value: string) => {
    setSearchResults(
      practicals.filter(
        (e) =>
          e.chapter.toLowerCase().includes(value) ||
          e.topicName.toLowerCase().includes(value)
      )
    );
  };

  const getSubjects = (form: string) => {
    let set = new Set(
      practicals
        .filter((e) => e.classLevel === form)
        .map((e) => e.subjectType.toLowerCase())
    );

    return Array.from(set);
  };
  const getClassLevels = () => {
    let set = new Set(practicals.map((e) => e.classLevel));
    return Array.from(set);
  };
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative min-h-screen py-16 w-full items-center ">
        <div className="flex h-10 mb-2  mt-2 items-center justify-center w-full ">
          <input
            className="outline-none p-1  pl-4 w-[90%] md:w-[600px]  bg-white dark:bg-darkmain rounded-md"
            placeholder="Search practical lesson"
            value={searchvalue}
            onChange={(e) => {
              let v = e.target.value.toLowerCase();
              setSearchvalue(v);
              searchLesson(v);
            }}
          />
        </div>
        {practicals.length < 1 && (
          <div className="flex flex-col h-96 justify-center items-center">
            <p className="font-bold">Ooops</p>
            <p>
                  Sorry <span className="text-yellow-500">No practical content found.</span>
                </p>
          </div>
        )}
        
        {searchvalue.length > 0 && (
          <div className="flex flex-wrap w-full h-90%]">
            {searchResults.length < 1 && (
              <div className="h-full w-full flex flex-col items-center justify-center">
                <p>
                  Sorry <span className="text-yellow-500">No result found.</span>
                </p>
              </div>
            )}
            
<div className="holder mx-auto w-12/12 grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 cursor-pointer">
            {searchResults.length > 0 &&
              searchResults.map((e, i) => (
<div 
   key={i}
    className="each mb-10 m-2  relative group transform duration-500  md:hover:-translate-y-1 md:hover:scale-105"  
      onClick={() => {
        if(SubStatus == "Ended"){
        if (i == 0) {
        MySwal.clickConfirm();
        setSelectedForm(e.classLevel);
        setSelectedSubject(e.subjectType);
        setSelectedVideoId(e.videoId);
        setSelectedVdocipher(e.vidCipherId)
        router.push("/dashboard/videos/view_lesson");
        } else {
        MySwal.clickConfirm();
        setShowPremiumModal(true);
        }
        }else if(SubStatus == "Active"){
          setSelectedForm(e.classLevel);
          setSelectedSubject(e.subjectType);
          setSelectedVideoId(e.videoId);
          setSelectedVdocipher(e.vidCipherId)
          router.push("/dashboard/videos/view_lesson");
        }
        }}


      >
<div className="relative">
    <a className="absolute inset-0 z-10 text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
      <h1  className="tracking-wider" > <img style={{"transition" : "5s ease"}} src = {playbutton.src}  /></h1>
      </a>
    <a className="relative group-hover:opacity-100 group-hover:blur-sm">
        <div className="h-48 flex flex-wrap content-center">
        <img className="w-full" src={`https://anzaacademy.co/anzaapi/view_thumbnail/lesson/${e.thumbnailUrl.split("view_thumbnail/lesson/")[1]}`}  alt="img missing" />
        </div>
    </a>

    <div className="badge  bg-gray-100 absolute top-0 right-0 dark:bg-darkmain m-1 p-1 px-2 text-xs font-bold rounded text-main">
                          {SubStatus == "Active" ? (
                            <ImUnlocked color="green" size={21} />
                          ) : SubStatus == "Ended" &&   i > 0 ?  (
                            <AiTwotoneLock color="red" size={21} />
                          ): "PLAY"}
                        </div>

    <div className="desc p-2 mt-4 text-gray-800">
                      <a className="title font-bold block cursor-pointer dark:text-white">
                      {e.chapter.toLowerCase().replace(/(?:^|\s)\S/g,(res)=>{ return res.toUpperCase();})}
                      </a>
                      <span className="description text-sm block  border-gray-400 mb-0 font-normal dark:text-white">
                      {e.title.toLowerCase().replace(/(?:^|\s)\S/g,(res)=>{ return res.toUpperCase();})}
                      </span>
                    </div>    

  </div>

</div>



              ))}
              </div>
          </div>
        )}

        {searchvalue.length < 1 && practicals.length > 0 && (
          <div className="flex flex-col w-full justify-around p-2">
            {getClassLevels().map((e, k) => (
              <div
                key={e}
                className="flex flex-col w-full items-center"
              >
                {getSubjects(e).map((s, i) => (
                  <div key={`${e}${s}`} className="flex flex-col w-full items-center">
                    <p className="text-lg font-xl text-main  font-bold  capitalize  pl-4 ">
                      {s.toUpperCase()}
                    </p>

<div className="holder mx-auto w-12/12 grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 cursor-pointer">   


   {practicals
                        .filter(
                          (p) => p.classLevel === e && p.subjectType === s
                        )
                        .map((l) => (
                          
<div className="each mb-10 m-2  relative dark:text-white group transform duration-500  md:hover:-translate-y-1 md:hover:scale-105"  
 key={l.videoId}       
onClick={() => {
  if(SubStatus == "Ended"){
  if (i == 0 && k == 0) {
  MySwal.clickConfirm();
  setSelectedForm(l.classLevel);
  setSelectedSubject(l.subjectType);
  setSelectedVideoId(l.videoId);
  setSelectedVdocipher(l.vidCipherId)
  router.push("/dashboard/videos/view_lesson");
  } else {
  MySwal.clickConfirm();
  setShowPremiumModal(true);
  }
  }else if(SubStatus == "Active"){
    setSelectedForm(l.classLevel);
    setSelectedSubject(l.subjectType);
    setSelectedVideoId(l.videoId);
    setSelectedVdocipher(l.vidCipherId)
    router.push("/dashboard/videos/view_lesson");
  }
  }}
  >

    <div className="relative mt-3">
    <a className="absolute inset-0 z-10 text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
      <h1  className="tracking-wider" > <img style={{"transition" : "5s ease"}} src = {playbutton.src}  /></h1>
      </a>
    <a className="relative group-hover:opacity-100 group-hover:blur-sm">
        <div className="h-48 flex flex-wrap content-center">
        <img className="w-full" src={`https://anzaacademy.co/anzaapi/view_thumbnail/lesson/${l.thumbnailUrl.split("view_thumbnail/lesson/")[1]}`}  alt="img missing" />
        </div>
    </a>
  </div>


  <div className="badge  bg-gray-100 absolute top-0 right-0 dark:bg-darkmain m-1 p-1 px-2 text-xs font-bold rounded text-main">
                          {SubStatus == "Active" ? (
                            <ImUnlocked color="green" size={21} />
                          ) : SubStatus == "Ended" && i >  0 || k > 0 ?  (
                            <AiTwotoneLock color="red" size={21} />
                          ): "PLAY"}
                        </div>

  <div className="info-box text-xs flex p-1 mt-4 font-semibold text-gray-500 bg-gray-300 justify-around" >
  <span className="mr-1 p-1 px-2  font-bold">{l.classLevel.toUpperCase()}{" "} </span>
      <span className="mr-1 p-1 px-2 font-bold border-l border-gray-400">{l.subjectType.toUpperCase()} </span>
      <span className="mr-1 p-1 px-2 font-bold border-l border-gray-400">{l.totalViews} VIEWS</span>
                    </div>

                    <div className="desc p-2 text-gray-800">
                      <a className="title font-bold block cursor-pointer dark:text-white">
                      {l.chapter.toLowerCase().replace(/(?:^|\s)\S/g,(res)=>{ return res.toUpperCase();})}
                      </a>
                      <span className="description text-sm block  border-gray-400 mb-0 font-normal dark:text-white">
                      {l.title.toLowerCase().replace(/(?:^|\s)\S/g,(res)=>{ return res.toUpperCase();})}
                      </span>
                    </div>    
  </div>
   ))}
  </div>
                  </div>
                
                ))}


              </div>
            ))}



            <div className=" w-52   m-2 "></div>
            <div className=" w-52   m-2"></div>
            <div className=" w-52   m-2"></div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PracticalsVideosPage;
