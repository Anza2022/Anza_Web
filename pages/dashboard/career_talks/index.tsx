/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AiFillStar, AiTwotoneLock } from "react-icons/ai";
import CareerTalksRepo from "../../../data/repos/career_talk_repo";
import CareerTalk from "../../../models/curriculum/career_talk_model";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { CareerTalksContext } from "../../../presentation/contexts/career_talks_controller";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import { showToast } from "../../../presentation/utils/helper_functions";
import playbutton from "../../../assets/icons/play.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { LoggedInUserContext } from "../../../presentation/contexts/loggedin_user_controller";
import { ImUnlocked } from "react-icons/im";
const MySwal = withReactContent(Swal);

const CareerTalksPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { talks, setTalks, selectedTalkId, setSelectedTalkId } =
    useContext(CareerTalksContext);

  async function getCareerTalks() {
    try {
      setLoading(true);
      let res = await CareerTalksRepo.getCareerTalks();
      setTalks(res);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (talks.length < 1) {
      getCareerTalks();
    }
  }, []);
  const { setShowPremiumModal, setSelectedVideoId } =
    useContext(NavigationContext);
  const { accountSubscription } = useContext(LoggedInUserContext);
  const SubStatus =
    accountSubscription[0] != undefined
      ? accountSubscription[0].isSubscriptionActive
        ? "Active"
        : "Ended"
      : "";
  //todo create a interface for talk and on click set selected id and move to view page
  const getCategories = () => {
    let set = new Set(talks.map((e) => e.category));

    return Array.from(set);
  };

  const getCategoryTalks = (category: string): CareerTalk[] => {
    return talks.filter((e) => e.category == category);
  };
  const handleVideoMounted = (element: any) => {};

  class RLessonsModel {
    constructor(
      public videoId: string,
      public classlevel: string,
      public subjectType: string,
      public title: string,
      public totalViews: string,
      public thumbnailUrl: string
    ) {}
  }

  // let recomendedLessons: RLessonsModel[] = [
  //   new RLessonsModel(
  //     "68252feecdd047549f3d8b18d1347dcf",
  //     "General",
  //     "Engineer",
  //     "Huawei",
  //     "22",
  //     "https://anzaacademy.co/anzaapi/view_thumbnail/career/birir.png",
  //   ),
  //   new RLessonsModel(
  //     "3129552a45ef4633869653f76268336f",
  //     "General",
  //     "Lawyer",
  //     "Advocate",
  //     "12",
  //     "https://anzaacademy.co/anzaapi/view_thumbnail/career/advocate.png"
  //   ),
  //   new RLessonsModel(
  //     "44ae607c48214b80b3cd00fcd2b07439",
  //     "General",
  //     "Prof",
  //     "Agricultural Economist",
  //     "18",
  //     "https://anzaacademy.co/anzaapi/view_thumbnail/career/prof.png",
  //   ),
  // ];

  const [searchvalue, setSearchvalue] = useState("");
  const [searchResults, setSearchResults] = useState<CareerTalk[]>([]);
  const searchLesson = (value: string) => {
    setSearchResults(
      talks.filter((e) => e.title.toLowerCase().includes(value))
    );
  };

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec md:ml-44 relative min-h-screen  py-16 w-full items-center dark:text-white">
        {/* <div className="flex h-10 items-center justify-center pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg md:text-2xl">
            Career Talks
          </div>
        </div> */}
        {loading && (
          <div className="flex flex-col h-full w-full justify-center items-center">
            <LoadingComponent color="main" loading={loading} />
            <p className="py-0 text-xs">Loading career talks ...</p>
          </div>
        )}
        {/* {!loading && (
          <div className="flex h-10 items-center justify-center w-full my-1.5 ">
            <input
              className="outline-none p-1  pl-4 w-[90%] md:w-[600px]  bg-white dark:bg-darkmain rounded-md"
              placeholder="Search career talk"
              value={searchvalue}
              onChange={(e) => {
                let v = e.target.value.toLowerCase();
                setSearchvalue(e.target.value);
              }}
            />
          </div>
        )} */}

        {!loading && searchvalue.length > 0 && (
          <div className="flex flex-wrap w-full h-[90%] mt-5">
            {searchResults.length < 1 && (
              <div className="h-full w-full flex flex-col items-center justify-center">
                <p>
                  Sorry <span className="text-yellow-500">No result found</span>
                </p>
              </div>
            )}
            <div className="holder mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
              {searchResults.length > 0 &&
                searchResults.map((e, i) => (
                  <div
                    className="each mb-10 m-2 relative cursor-pointer rounded-md group transform duration-500  md:hover:-translate-y-1 md:hover:scale-105 border border-gray-300 text-sm font-medium rounded-md "
                    key={e.talkId}
                    onClick={() => {
                      setSelectedVideoId(e.talkId);
                      router.push("/dashboard/quizes/take_test");
                    }}
                  >
                    <div className="relative">
                      <a className="absolute inset-0 z-10 text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
                        <h1 className="tracking-wider">
                          {" "}
                          <img
                            style={{ transition: "5s ease" }}
                            src={playbutton.src}
                          />
                        </h1>
                      </a>
                      <a className="relative group-hover:opacity-100 group-hover:blur-sm ">
                        <img
                          className="w-full border-l rounded-md border-gray-400 h-28"
                          src={e.thumbnailUrl}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="badge absolute top-0 right-0  m-1   text-gray-200 p-1 px-2 text-xs font-bold rounded">
                      {e.totalViews} Views
                    </div>

                    <div className="info-box text-xs flex p-1 font-semibold justify-between text-gray-500">
                      <span className="mr-1 p-1 px-2 font-xs font-bold"></span>
                      <span className="mr-1 font-xs p-1 px-2 font-bold border-l border-gray-400">
                        {e.category.toUpperCase()}
                      </span>
                      <span className="mr-1 font-xs p-1 px-2 font-bold border-l border-gray-400">
                        {e.likes} {" LIKES"}
                      </span>
                    </div>
                    <div className="desc p-2 text-gray-800 ">
                      <a className="title font-bold block cursor-pointer dark:text-main">
                        {e.title.replace(/(?:^|\s)\S/g, (res) => {
                          return res.toUpperCase();
                        })}
                      </a>
                      <a className="text-xs font-normal cursor-pointer dark:text-white">
                        By Tr.{" "}
                        {e.guestName.replace(/(?:^|\s)\S/g, (res) => {
                          return res.toUpperCase();
                        })}
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        {!loading && searchvalue.length < 1 && (
          <div>
            <div className="flex mb-10 -mt-2">
              <div id="scroll_me" className="w-full lg:w-3/3">
                <div className='bg-[url("https://anzaacademy.co/anzaapi/view_thumbnail/career/3.png")] object-cover h-full w-full bg-cover bg-left p-5'>
                  <h2
                    className="text-3xl text-black mt-5 mb-2 pt-5 pb-5 justify-left text-left"
                    style={{ fontFamily: "Montserrat", fontWeight: 900 }}
                  >
                    BUILDING A CONNECTED AND INFORMED SOCIETY
                  </h2>
                  <div className="flex  justify-around w-[100%]">
                    <div className="mb-5 text-black mt-0 w-[77%]  text-2xl justify-left text-left">   
Anza Academy&lsquo;s mission is to  empower young people with life changing and  impactful encounters with professionals and mentors excelling in their Professions. 
Mentorship and guidance is key to shaping a more sustainable future.
                    </div>

                    <div className="bg-  text-white cursor-pointer rounded-lg  p-0 font-black  text-base   px-0  flex  items-center ">
                      {" "}
                    </div>
                  </div>
                  <p
                       onClick={() => {
                        setSelectedVideoId("5a005ba3e9f544ce9188101be438dd58");
                        router.push(
                          "/dashboard/career_talks/view_talk"
                        );
                        }}
                         className="animate-pulse mb-0 mt-2 pt-0 text-gray-800 mt-0 text-xl justify-left text-left">
                    <button className="px-4 py-2 bg-main text-white  rounded-md">
                      Watch Now
                    </button>
                  </p>
                </div>
              </div>
            </div>

            <div className="ml-[9%] text-2xl mt-5 mb-2 text-main">
              More Careers
            </div>

            <div className="holder mx-auto w-[95%] w-12/12 m-5 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 ">
              {talks.map((e, i) => (
                <div
                  className="each mb-10 m-2  relative  cursor-pointer "
                  onClick={() => {
                    MySwal.fire({
                      scrollbarPadding: false,
                      heightAuto: false,
                      html: (
                        <div className="m-0 flex flex-col cursor-pointer">
                          <div className="mt-5 flex justify-between text-sm text-white mb-5">
                            <div className="flex px-4 py-1  cursor-pointer rounded-xl"></div>
                            <div className="flex px-4 py-1  cursor-pointer rounded-xl"></div>
                            <div
                              onClick={() => {
                                MySwal.clickConfirm();
                              }}
                              className="flex px-4 py-1 bg-red-600 cursor-pointer rounded-xl items-center justify-center"
                            >
                              Close
                            </div>
                          </div>

                          <h2 className="py-2 text-main font-bold ">
                            {e.title.toUpperCase()}
                          </h2>

                          <p className="py-2 font-bold ">
                            {e.description.replace(/(?:^|\s)\S/g, (res) => {
                              return res.toUpperCase();
                            })}
                          </p>

                          <div className="mt-5 flex justify-between text-sm text-white">
                            <div
                              onClick={() =>
                                showToast("Coming soon", "success")
                              }
                              className="animate-bounce flex px-4 py-2 bg-main cursor-pointer rounded-md items-center justify-center"
                            >
                              Add to Favourite.
                            </div>
                            <div
                              onClick={() => {
                                if (SubStatus == "Ended") {
                                  if (i == 0) {
                                    MySwal.clickConfirm();
                                    setSelectedVideoId(e.videoUrl);
                                    router.push(
                                      "/dashboard/career_talks/view_talk"
                                    );
                                  } else {
                                    MySwal.clickConfirm();
                                    setShowPremiumModal(true);
                                  }
                                } else if (SubStatus == "Active") {
                                  MySwal.clickConfirm();
                                  setSelectedVideoId(e.videoUrl);
                                  router.push(
                                    "/dashboard/career_talks/view_talk"
                                  );
                                }
                              }}
                              className="animate-bounce flex px-4 py-3 text-sm bg-main cursor-pointer items-center justify-center rounded-md"
                            >
                              Watch Now
                            </div>
                          </div>
                        </div>
                      ),
                      cancelButtonText: "Close",
                      confirmButtonText: "Share",
                      denyButtonText: "Join Class",
                      confirmButtonColor: "#008080",
                      // width: "200px",
                      focusConfirm: false,
                      focusCancel: false,
                      focusDeny: false,
                      customClass: {
                        // htmlContainer: "kenswal",
                        confirmButton: "bg-pink-500",
                      },
                      showConfirmButton: false,
                      buttonsStyling: true,
                      showCloseButton: false,
                    });
                  }}
                  key={e.talkId}
                >
                  <div className="relative flex flex-col  group transform duration-500  md:hover:-translate-y-1 md:hover:scale-105">
                    <div className="relative">
                      <a className="absolute inset-0 z-10 text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
                        <h1 className="tracking-wider">
                          <img
                            style={{ transition: "5s ease" }}
                            src={playbutton.src}
                          />
                        </h1>
                      </a>
                      <a className="relative group-hover:opacity-100 group-hover:blur-sm">
                        <img
                          className="w-full"
                          src={`https://anzaacademy.co/anzaapi/view_thumbnail/career/${e.thumbnailUrl}`}
                          alt="img missing"
                        />
                      </a>
                      <div className="badge  bg-gray-100 absolute top-0 right-0 dark:bg-darkmain m-1 p-1 px-2 text-xs font-bold rounded text-main">
                          {SubStatus == "Active" ? (
                            <ImUnlocked color="green" size={21} />
                          ) : SubStatus == "Ended" && i >  0 ?  (
                            <AiTwotoneLock color="red" size={21} />
                          ): "PLAY"}
                        </div>
                    </div>

                    {/* <div className="info-box text-xs justify-between flex p-1 font-semibold text-gray-500 bg-gray-300">
                      <span className="mr-1 p-1 px-2  font-bold">
                        {e.totalViews} VIEWS
                      </span>
                      <span className="mr-1 p-1 px-2 font-bold">
                        LIKES
                      </span>
                    </div> */}

                    {/* <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex dark:text-white">
                      <div className="w-3 h-3 -mt-0 rotate-45 bg-gray-600"></div>
                      <span className="relative z-10 p-2 text-xs  text-white leading-4 whitespace-no-wrap bg-gray-600 shadow-lg rounded-md dark:text-white">
                        {" "}
                        {e.title}{" "}
                      </span>
                    </div> */}
                    <div className="desc p-2 mt-1 text-gray-800">
                      <a className="title   font-bold block cursor-pointer dark:text-main">
                        {" "}
                        {e.category.replace(/(?:^|\s)\S/g, (res) => {
                          return res.toUpperCase();
                        })}
                      </a>
                      <a className="title  block cursor-pointer dark:text-white">
                        {e.title.replace(/(?:^|\s)\S/g, (res) => {
                          return res.toUpperCase();
                        })}
                      </a>
                      <a className="badge   text-xs font-normal cursor-pointer dark:text-white">
                        {"By  " +
                          e.guestName.replace(/(?:^|\s)\S/g, (res) => {
                            return res.toUpperCase();
                          })}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CareerTalksPage;
