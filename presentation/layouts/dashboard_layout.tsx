/* eslint-disable @next/next/no-img-element */
import router, { useRouter } from "next/router";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppInternalLink } from "./admin_dashboard_layout";
import { IoNotificationsSharp } from "react-icons/io5";
import { NavigationContext } from "../contexts/navigation_state_controller";
import logo from "../../assets/images/anzalogo.png";
import { NotificationsContext } from "../contexts/notifications_controller";
import { getCurrentDate, showToast } from "../utils/helper_functions";
import NotificationRepo from "../../data/repos/notifications_repo";
import { LoggedInUserContext } from "../contexts/loggedin_user_controller";
import LoadingComponent from "../components/others/loading_component";
import { FaGraduationCap } from "react-icons/fa";
import { GiPapers } from "react-icons/gi";
import { MdArrowDropUp } from "react-icons/md";
import Image from "next/image";

import classicon from "../../assets/icons/classes-icon.png";
import papericon from "../../assets/icons/pastpaper-icon.png";
import quizicon from "../../assets/icons/test-icon.png";
import examinericon from "../../assets/icons/examiner-icon.png";
import careericon from "../../assets/icons/career-icon.png";
import liveicon from "../../assets/icons/live.png";

import teachericon from "../../assets/icons/teacher-icon.png";
import studenticon from "../../assets/icons/student-icon.png";
import schoolicon from "../../assets/icons/school-icon.png";
import videoicon from "../../assets/icons/video.png";
import mkurulogo from "../../assets/icons/logo.png";
import setbooksicon from "../../assets/icons/setbooks.png";
import practicalsicon from "../../assets/icons/practicals.png";
import useravatar from "../../assets/icons/userbg.png";
import ToggleThemeButton from "../components/others/toggle_theme_button";
import { AnimatePresence, motion } from "framer-motion";
import DashboardSidebar from "../components/dashboard/sidebar";
import NotificationModel from "../../models/others/notification_model";
import { deleteFromLocalStorage } from "../../data/services/local_storage_services";
import BackButton from "../components/others/back_button";
import whitelogo from "../../assets/images/anzawhitelogo.png";
import { IsDarkThemeContext } from "../contexts/app_theme_controller";
import { AiOutlineClose } from "react-icons/ai";
import assignment from "../../assets/icons/assignment.png";
import { isBrowser } from "./../utils/helper_functions";
import pastpaper from "../../assets/icons/pastpaper.png";
import timetableicon from "../../assets/icons/timetable.png";
import examgenicon from "../../assets/icons/exam-generator.png";
import workscheme from "../../assets/icons/work-scheme.png";
import studygroupicon from "../../assets/icons/study_group.png";

const SubLinkComponent = (
  props: PropsWithChildren<{
    linkname: string;
    dstUrl: string;
    iconSrc: string;
    isLocked: boolean;
  }>
) => {
  const { currentDashboardLink, setCurrentDashboardLink, setShowPremiumModal } =
    useContext(NavigationContext);
  return (
    <div
      onClick={() => {
        if (props.isLocked) {
          setShowPremiumModal(true);
          return;
        }
        setCurrentDashboardLink(props.linkname);
        router.push(props.dstUrl);
      }}
      className={` px-0 py-0.5 my-0.5  w-full linktext font-normal hover:bg-main flex  rounded-r-xl  hover:text-white
             items-start cursor-pointer  justify-start space-x-3  ${
               currentDashboardLink == props.linkname ? "bg-main font-bold" : ""
             }`}
    >
      <Image src={props.iconSrc} alt="icon not found" width={16} height={16} />
      <p className="pr-2  linktext">{props.linkname}</p>
    </div>
  );
};


const DashboardLayout = (props: PropsWithChildren<{}>) => {
  const router = useRouter();

  let sidebarLinks: AppInternalLink[] = [
    // new AppInternalLink("Overview", () => router.push("/dashboard")),
    // new AppInternalLink(
    //   "Classes",
    //   () => router.push("/dashboard/videos"),
    //   classicon.src
    // ),
    new AppInternalLink(
      "Lessons",
      () => router.push("/dashboard/videos"),
      videoicon.src
    ),
    new AppInternalLink(
      "Practicals",
      () => router.push("/dashboard/videos/practicals"),
      practicalsicon.src
    ),
    new AppInternalLink(
      "Topical Tests",
      () => router.push("/dashboard/quizes"),
      quizicon.src
    ),
    new AppInternalLink(
      "Past Papers",
      () => router.push("/dashboard/papers"),
      papericon.src
    ),
    new AppInternalLink(
      "Set books",
      () => router.push("/dashboard/videos/setbooks"),
      setbooksicon.src
    ),
    new AppInternalLink(
      "Career Talks",
      () => router.push("/dashboard/career_talks"),
      careericon.src
    ),
    // new AppInternalLink(
    //   "Live Classes",
    //   () => router.push("/dashboard/tutions"),
    //   liveicon.src
    // ),

    // new AppInternalLink(
    //   "Student Corner",
    //   () => {
    //     router.push("/dashboard/scorner");
    //   },
    //   studenticon.src
    // ),
    // new AppInternalLink(
    //   "Teachers Corner",
    //   () => {
    //     router.push("/dashboard/tcorner");
    //   },
    //   teachericon.src
    // ),
    // new AppInternalLink(
    //   "Institution  Corner",
    //   () => {
    //     router.push("/dashboard/icorner");
    //   },
    //   schoolicon.src
    // ),

    //todo add teachers corner with  my past papers , exam generator,  my videos,
    //todo add student corner with my assignemtns,  asked questions for discussions
  ];
  //todo navbar contains, photo avatar, darkmode icon, notification bell,

  const [showNotifications, setShowNotifications] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setShowDrawer(false);
  });

  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const { currentDashboardLink, setCurrentDashboardLink } =
    useContext(NavigationContext);

  const [showStudentCorner, setShowStudentCorner] = useState(false);
  const [showTeacherCorner, setTeacherCorner] = useState(false);
  //get and set nofications
  const { notifications, setNotifications } = useContext(NotificationsContext);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const { user, setUser, isLoggedIn, isFirstTimeLogin } =
    useContext(LoggedInUserContext);
  async function getNofitications() {
    try {
      setLoadingNotifications(true);
      let nots = await NotificationRepo.getUserNotifcations(user[0].userId);
      if (isFirstTimeLogin) {
        setNotifications([
          new NotificationModel(
            "regstration",
            "",
            "Signup",
            "Your Account was created Successfully. \n  Enjoy your learning",
            false,
            getCurrentDate(),
            getCurrentDate()
          ),
          ...nots,
        ]);
      } else {
        setNotifications(nots);
      }
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoadingNotifications(false);
    }
  }

  useEffect(() => {
    prefetchRoutes();
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      getNofitications();
    }
  }, []);

  const {
    showClassSublinks,
    setShowClassSublinks,
    showTcornerSublinks,
    setShowTcornerSublinks,
    showIcornerSublinks,
    setShowIcornerSublinks,
    showScornerSublinks,
    setShowScornerSublinks,
    setShowPremiumModal,
    showPremiumModal,
  } = useContext(NavigationContext);

  const closeSublinks = () => {
    setShowClassSublinks(true);
    setShowTcornerSublinks(false);
    setShowIcornerSublinks(false);
    setShowScornerSublinks(false);
  };

  const { thememode } = useContext(IsDarkThemeContext);
  //todo prefetch routes for dashboard
  const prefetchRoutes = () => {
    router.prefetch("/dashboard/videos");
    router.prefetch("/dashboard/videos/topics");
    router.prefetch("/dashboard/videos/view_lesson");
    router.prefetch("/dashboard/videos/setbooks");
    router.prefetch("/dashboard/videos/setbooks/view_book");
    router.prefetch("/dashboard/videos/mkurugenzi");
    router.prefetch("/dashboard/videos/mkurugenzi/view_video");
    router.prefetch("/dashboard/videos/practicals");
    router.prefetch("/dashboard/papers");
    router.prefetch("/dashboard/papers/view_paper");
    router.prefetch("/dashboard/papers/all");
    router.prefetch("/dashboard/quizes");
    router.prefetch("/dashboard/quizes/take_test");
    router.prefetch("/dashboard/quizes/tests");
    router.prefetch("/dashboard/career_talks");
    router.prefetch("/dashboard/career_talks/view_talk");
    router.prefetch("/dashboard/examiner_talks");
    router.prefetch("/dashboard/examiner_talks/view_talk");
    router.prefetch("/dashboard/tutions");
    router.prefetch("/dashboard/profile");
    router.prefetch("/dashboard/billing");
    //student corner
    router.prefetch("/dashboard/scorner");

    //teachers corner routes
    router.prefetch("/dashboard/tcorner");
    router.prefetch("/dashboard/tcorner/papers");
    router.prefetch("/dashboard/tcorner/papers/add_new");
    router.prefetch("/dashboard/tcorner/papers/preview");
    router.prefetch("/dashboard/tcorner/papers/update_paper");
    router.prefetch("/dashboard/tcorner/quizes");
    router.prefetch("/dashboard/tcorner/quizes/add_test");
    router.prefetch("/dashboard/tcorner/live_classes");
    router.prefetch("/dashboard/tcorner/live_classes/add_class");
    router.prefetch("/dashboard/tcorner/work_schemes");
    router.prefetch("/");
    router.prefetch("/login");
    router.prefetch("/admin/videos");

    //institution corner
    router.prefetch("/dashboard/icorner");
  };

  class PricingPlan {
    constructor(
      public title: string,
      public price: string,
      public type: string,
      public toprated: string,
      public features: string[]
    ) {}
  }


    let plans: PricingPlan[] = [
      new PricingPlan("Basic", "2,000.00", "/3 months", "Popular", [
        "Ad-free watching.",
        "Current class revision material.",
        "Revise at anywhere at your own pace.",
        "Test yourself at anytime.",
        "Access subject practicals.",
        "Access to career talks.",
        "Premium support.",
      ]),
      new PricingPlan("Standard", "2,500.00", "/3 months", "Recommended", [
        "Ad-free watching.",
        "Unlimited revision materials.",
        "Revise at anywhere at your own pace.",
        "Test yourself anytime.",
        "Access all our practicals.",
        "Access to career talks.",
        "Live consultation from anza teachers.",
      ]),
      new PricingPlan("Savings", "6,800.00", "/year", "New", [
        "Save 500 on Basic package.",
        "Ad-free watching.",
        "Unlimited revision materials.",
        "Revise at anywhere at your own pace.",
        "Test yourself anytime.",
        "Access all our practicals.",
        "Access to career talks.",
      ]),
    ];


    
  return (
    <div
      className="w-full min-h-screen flex flex-col  scroll-smooth dark:text-white"
      // style={{ fontFamily: "Poppins" }}
      style={{ fontFamily: "Overpass", fontWeight: 600 }}
    >
      {/* premium account subscription */}
      {showPremiumModal && (
        <div className="fixed top-0   left-0 w-full h-[100%]  flex justify-center items-center bg-black bg-opacity-80 dark:bg-opacity-60 z-[2000] ">
          <div
            style={{ fontFamily: "sans-serif" }}
            className="w-100 w-[80%]  rounded-lg flex flex-col  bg-white bg-opacity-0 p-2"
          >
            <div className="flex justify-between  items-center">
              <Image
                src={whitelogo.src}
                alt="logo not found"
                width={100}
                height={25}
              />

              <div
             onClick={() => setShowPremiumModal(false)}
                className="flex px-5 py-1 bg-red-600 text-white cursor-pointer rounded-xl items-center justify-center"
              >
                Close
              </div>
            </div>
            <div className="h-4"></div>
            {/* <div className="flex pl-5 pr-2 flex-col">
              <p className="  font-semibold mb-2">
             You do not have an active subscription.This is available to only Premium Accounts!
              </p>

              <p className="">To upgrade your account kindly subscribe or contact Anza Team:</p>
              <p className="p-0 pl-5 pt-2 font-semibold text-green-900">
              Tel:   +254701020202
              </p>
              <p className="p-0 pl-5 pt-1 font-semibold text-green-900">
           OR
              </p>
              <p className=" p-0 pl-5 pt-1  font-semibold  text-green-900">
               Email: sales@anzaacademy.com
              </p>
              <div
                onClick={() => {
                  setShowPremiumModal(false)
                  router.push("/dashboard/billing/");
                }
                }
                className="px-5  bg-main text-white cursor-pointer text-center self-center mt-6 py-2 rounded-md"
              >
               SUBSCRIBE NOW!
              </div>
            </div> */}

{/* <p
        className="text-2xl mb-0 font-black text-center text-white  pb-1 dark:text-white"
        style={{ fontFamily: "Montserrat" }}
      >

        START IMPROVING YOUR GRADES TODAY.
      </p> */}

      <p
        className="text-xl mb-2 font-black font-normal  text-center text-white dark:text-white"
      >
        Student Pricing Plans      </p>

      <div
className="w-full bg-indigo-800  text-left -mt-2  flex flex-col overflow-y-scroll scroll-touch
p-3 overflow-x-hidden dark:text-main mb-12 " style={{"height":"500px"}}
>
<div className="py-3  md:mt-20 pt-1 flex flex-wrap w-full  justify-around" style={{ fontFamily: "Overpass", fontWeight: 900 }}>
{plans.map((plan) => (
<div className="w-84 -mt-3 rounded-lg mb-5   flex flex-col  bg-white dark:bg-darkmain  pb-6 ">
      <p className="text-center text-white font-bold text-1xl  rounded-t-lg bg-main dark:text-white p-2"           style={{ fontFamily: "Montserrat" }}>
        {plan.title.toUpperCase()}
      </p>
      <div className="flex w-full justify-center my-0 mb-0">
        <p className="text-xs self-center font-bold dark:text-white">KSH</p>
        <p
          className="text-4xl px-2 pr-1 font-bold text-main rounded-full  dark:text-white"
          style={{ fontFamily: "Montserrat" }}
        >
  {plan.price}
        </p>
        <p className="text-xs self-end font-bold dark:text-white"> {plan.type}</p>
      </div>
      {plan.features.map((e) => (
        <div key={e}  className="flex space-x-1 py-1 mx-2 items-center  px-2 dark:text-white">
          <div className="w-3 h-3 rounded-full bg-main flex items-center justify-center text-white">
          <svg aria-hidden="true" className="flex-shrink-0 w-1 h-1 text-white dark:text-blue-500 dark:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
          </div>
          <p className="text-sm font-normal ">{e}</p>
        </div>
       ))}
                       <div
                onClick={() => {
                  setShowPremiumModal(false)
                  router.push("/dashboard/billing/");
                }
                }
                className=" px-5   -mb-4  bg-main text-white cursor-pointer text-center self-center mt-5 py-1.5 rounded-md"
              >
               Join  {plan.title}
              </div>
    </div>
           ))}
      </div>
</div>

          </div>
        </div>
      )}

      {/* navbar component */}
      <div className="text-3xl text-white font-bold h-14 bg-main z-50 flex shadow-md hover:shadow-xl items-center fixed top-0 left-0 w-full justify-between dark:bg-darkmain">
        <div className=" hidden md:flex space-x-3 items-center ">
          {" "}
          {false ? (
            <Image
              src={logo.src}
              alt="logo not found"
              className="hidden md:flex w-24 md:w-32   cursor-pointer"
              width={100}
              height={60}
              onClick={() => {
                router.push("/");
              }}
            />
          ) : (
            <Image
              src={whitelogo.src}
              alt="logo not found"
              className="hidden md:flex w-24 md:w-28  ml-2 cursor-pointer"
              width={100}
              height={30}
              onClick={() => {
                router.push("/");
              }}
            />
          )}
          <BackButton />
        </div>
        {user.length > 0 && user[0].phoneNumber == "254test" && (
          <p className="text-red-500 font-semibold text-xs self-end">
            Most Features are not enabled in test account
          </p>
        )}
        <div className="flex space-x-2 items-center">
          <div className="flex md:hidden space-x-0 items-center">
            <div
              className="pl-3  pr-1 mr-2"
              onClick={() => {
                setShowClassSublinks(true);
                setShowDrawer(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <BackButton />
          </div>
          <p className="text-lg  md:text-2xl hidden">
            <img
              src={useravatar.src}
              alt="logo not found"
              className="flex w-14    cursor-pointer"
            />{" "}
          </p>
        </div>
        <div className="flex mr-2  md:mr-4 items-center">
          <p
            onClick={() => setShowNotifications(true)}
            className="text-lg cursor-pointer mr-1 text-white"
          >
            <IoNotificationsSharp size={22} />
          </p>
          <div
            onClick={() => setShowAvatarMenu(true)}
            className="w-7 h-7 rounded-full  shadow-2xl flex items-center cursor-pointer justify-center bg-green-500 text-white font-bold"
          >
            <img
              src={useravatar.src}
              alt="logo not found"
              className="flex w-14    cursor-pointer  rounded-full"
            />{" "}
          </div>
          <ToggleThemeButton />
        </div>
      </div>
      {/* notification component */}
      <div
        onClick={() => setShowNotifications(false)}
        className={`fixed top-0 left-0 w-full h-screen  bg-gray-900 bg-opacity-60 z-50 ${
          showNotifications ? "" : "hidden"
        }`}
      >
        <div className="absolute top-9 text-white right-20  md:right-[107px] ">
          <MdArrowDropUp size={25} className="" />
        </div>
        <div
          onClick={() => {}}
          className="w-64 md:w-80 z-50 h-96 bg-gray-200 dark:bg-darksec absolute right-1 shadow-2xl top-14 overflow-y-hidden rounded-lg"
        >
          <p className="text-xl font-bold text-green-600 text-center sticky top-0 bg-white dark:bg-darkmain">
            Notifications
          </p>
          {loadingNotifications ? (
            <div className="flex justify-center items-center h-full w-full">
              <LoadingComponent
                loading={loadingNotifications}
                color="green-500"
              />
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((e, i) => (
              <p
                className={` p-2 hover:bg-green-700 hover:text-white cursor-pointer px-5 text-xs  bg-white dark:bg-darkmain m-2  transition-all duration-200 rounded-lg ${
                  e.isRead ? "" : "font-bold"
                } `}
                key={i}
                onMouseOver={(ev) => {
                  if (e.isRead) {
                  } else {
                    let updatedNots = notifications.map((n) => {
                      if (n.notificationId == e.notificationId) {
                        e.isRead = true;
                      }
                      return n;
                    });

                    setNotifications(updatedNots);
                  }
                }}
              >
                {e.message}
              </p>
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center ">
              <p>No New Notifications</p>
            </div>
          )}
        </div>
      </div>
      {/* drawer component */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-gray-900   bg-opacity-60 z-50 ${
          showDrawer ? "" : "hidden"
        }`}
      >
        <div
          ref={wrapperRef}
          className={`${
            showDrawer ? "fixed top-0 left-0 " : "hidden"
          } w-[215px] bg-white h-screen flex flex-col dark:bg-darksec`}
        >
          {" "}
          <div className="w-[53%] h-5  mt-5 ml-3 flex flex-col items-left   text-green-600">
            {thememode == "light" ? (
              <img
                src={logo.src}
                alt="logo not found"
                className=" h-7  cursor-pointer"
              />
            ) : (
              <img
                src={whitelogo.src}
                alt="logo not found"
                className=" h-12 cursor-pointer"
              />
            )}
          </div>
          <div className="h-5"></div>




              {sidebarLinks.map((e) => (
            <div
              key={e.linkname}
              onClick={() => {
                setCurrentDashboardLink(e.linkname);
                setShowDrawer(false);
                e.onPressed();
              }}
              className={`px-3 py-1 my-1  text-lg font-normal hover:bg-main hover:text-white items-center cursor-pointer flex justify-start space-x-2 hover:rounded-r-xl transition-all duration-150  ${
                e.linkname === currentDashboardLink
                  ? "text-green-600"
                  : ""
              } `}
            >
              <img src={e.iconurl} alt="icon not found" className="h-5" />
              <p className="transform hover:translate-x-1 duration-150">
                {e.linkname}
              </p>
            </div>
          ))}


{user[0] !== undefined && user[0].accountType === "student" && (
        <div
          className={`text-sm   items-start cursor-pointer flex flex-col justify-start space-x-2   ${
            showScornerSublinks ? "h-[85px]" : "h-7"
          } `}
        >
          <div
            onClick={() => {
              closeSublinks();
              setCurrentDashboardLink("Student Corner");
              setShowScornerSublinks(!showScornerSublinks);
            }}
            className={` px-2 py-1 my-0.5  w-full text-lg font-normal hover:bg-main  rounded-r-xl  flex hover:text-white items-start cursor-pointer  justify-start space-x-2  ${
              currentDashboardLink == "Student Corner"
                ? "bg-main font-normal"
                : ""
            } `}
          >
            <Image
              src={studenticon.src}
              alt="icon not found"
              className="h-5"
              width={20}
              height={20}
            />
            <p className="pr-2  linktext">Student Corner</p>
          </div>

          <div
            className={`${
              showScornerSublinks ? "flex " : "hidden"
            } flex-col pl-4 `}
          >

<div
        onClick={() => {
          if (isBrowser()) {
            const iframe =
              '<html><head><style>body, html {width: 100%; height: 100%; margin: 0; padding: 0}</style></head><body><iframe src="https://anzaacademy.tawk.help/?utm_source=canva&utm_medium=iframely" style="height:calc(100% - 4px);width:calc(100% - 4px)"></iframe></html></body>';
            const win = window.open(
              "",
              "",
              `width=${screen.width},height=${
                screen.height
              },toolbar=no,menubar=no,resizable=yes top=${50} left=${70}`
            );
            win?.document.write(iframe);
          }
        }}
        className={` py-1 my-1  text-sm hover:bg-main  hover:rounded-r-xl  ${
          currentDashboardLink == "Resource Center"
            ? "text-green-600 font-normal"
            : ""
        } hover:text-white items-center cursor-pointer flex justify-start space-x-3   `}
      >
        {" "}
        <Image
          src={assignment.src}
          alt="icon not found"
          className="h-5"
          width={20}
          height={20}
        />
        <p className="pr-2   linktext font-normal">Resource Center</p>
      </div>


            {/* <SubLinkComponent
              dstUrl="/dashboard/scorner/assignments"
              iconSrc={assignment.src}
              linkname="My Assignments"
              isLocked={false}
            /> */}
            {/* <SubLinkComponent
              dstUrl="/dashboard/scorner/live_classes"
              iconSrc={liveicon.src}
              linkname="My Live Classes"
              isLocked={true}
            /> */}
          </div>
        </div>
      )}


{user[0] !== undefined && user[0].accountType === "teacher" && (
        <div
          className={`text-sm   items-start cursor-pointer flex flex-col justify-start space-x-2   ${
            showTcornerSublinks ? "h-[225px]" : "h-7"
          } ${true ? "" : "hidden"}`}
        >
          <div
            onClick={() => {
              closeSublinks();
              setCurrentDashboardLink("Teachers Corner");
              setShowTcornerSublinks(!showTcornerSublinks);
            }}
            className={` px-2 py-1 my-1.5  w-full text-lg  hover:bg-main  rounded-r-xl  flex hover:text-white items-start cursor-pointer  justify-start space-x-2  ${
              currentDashboardLink == "Teachers Corner"
                ? "bg-main font-bold"
                : ""
            } `}
          >
            <Image
              src={teachericon.src}
              alt="icon not found"
              className="h-5"
              width={20}
              height={20}
            />
            <p
              className="pr-2  linktext"
              style={{ fontFamily: "Overpass", fontWeight: 500 }}
            >
              Teachers Corner
            </p>
          </div>

          <div
            className={`${
              showTcornerSublinks ? "flex " : "hidden"
            } flex-col pl-4 transition-all`}
          >

<div
        onClick={() => {
          if (isBrowser()) {
            const iframe =
              '<html><head><style>body, html {width: 100%; height: 100%; margin: 0; padding: 0}</style></head><body><iframe src="https://anzaacademy.tawk.help/?utm_source=canva&utm_medium=iframely" style="height:calc(100% - 4px);width:calc(100% - 4px)"></iframe></html></body>';
            const win = window.open(
              "",
              "",
              `width=${screen.width},height=${
                screen.height
              },toolbar=no,menubar=no,resizable=yes top=${50} left=${70}`
            );
            win?.document.write(iframe);
          }
        }}
        className={` py-1 my-1  text-sm hover:bg-main  hover:rounded-r-xl  ${
          currentDashboardLink == "Resource Center"
            ? "text-green-600 font-normal"
            : ""
        } hover:text-white items-center cursor-pointer flex justify-start space-x-2   `}
      >
        {" "}
        <Image
          src={assignment.src}
          alt="icon not found"
          className="h-5"
          width={20}
          height={20}
        />
        <p className="pr-2   linktext font-normal">Resource Center</p>
      </div>

      
            <SubLinkComponent
              dstUrl="/dashboard/tcorner/papers"
              iconSrc={pastpaper.src}
              linkname="My Past Papers"
              isLocked={false}
            />
            <SubLinkComponent
              dstUrl="/dashboard/tcorner/work_schemes"
              iconSrc={workscheme.src}
              linkname="Schemes of work"
              isLocked={false}
            />
            <SubLinkComponent
              dstUrl="/dashboard/tcorner/quizes"
              iconSrc={quizicon.src}
              linkname="My Quizzes"
              isLocked={false}
            />
            {/* <SubLinkComponent
              dstUrl="/dashboard/tcorner/live_classes"
              iconSrc={liveicon.src}
              linkname="My Live Classes"
              isLocked={true}
            /> */}
            {/* <SubLinkComponent
              dstUrl="/dashboard/tcorner/assignments"
              iconSrc={assignment.src}
              linkname="Assignments"
              isLocked={true}
            />
            <SubLinkComponent
              dstUrl="/dashboard/tcorner/exam_generator"
              iconSrc={examgenicon.src}
              linkname="Exam Generator"
              isLocked={true}
            /> */}

            {/* <div
              onClick={() => {
                setShowPremiumModal(true);
                // setCurrentDashboardLink("Exam Generator");
                // if (isBrowser()) {
                //   const iframe =
                //     '<html><head><style>body, html {width: 100%; height: 100%; margin: 0; padding: 0}</style></head><body><iframe src="https://questionbank.wjec.co.uk/" style="height:calc(100% - 4px);width:calc(100% - 4px)"></iframe></html></body>';

                //   const win = window.open(
                //     "",
                //     "",
                //     `width=${screen.width - 100},height=${
                //       screen.height - 100
                //     },toolbar=no,menubar=no,resizable=yes top=${50} left=${70}`
                //   );
                //   win?.document.write(iframe);

                //   // window.open(
                //   //   "https://www.labster.com/try/?utm_source=canva&utm_medium=iframely",
                //   //   "_blank",
                //   //   "resizable",

                //   // );
                // }
              }}
              className=" px-2 py-1 my-0  w-full text-xs hover:bg-main  hover:rounded-r-xl  flex  hover:text-white items-start cursor-pointer  justify-start space-x-2  "
            >
              <img src={examgenicon.src} alt="icon not found" className="h-4" />
              <p className="pr-2  linktext">Exam Generator</p>
            </div> */}
            {/* <SubLinkComponent
              dstUrl="/dashboard/tcorner/timetable"
              iconSrc={timetableicon.src}
              linkname="Timetable"
              isLocked={true}
            />
            <SubLinkComponent
              dstUrl="/dashboard/tcorner/study_groups"
              iconSrc={studygroupicon.src}
              linkname="Study Groups"
              isLocked={true}
            /> */}
          </div>
        </div>
      )}


          {/* <div
            className={`text-sm   items-start cursor-pointer flex flex-col justify-start space-x-2 transition-all duration-[300ms]  ${
              showClassSublinks ? "h-38" : "h-9"
            } `}
          >
            <div
              onClick={() => {
                setCurrentDashboardLink("Classes");
                setShowClassSublinks(!showClassSublinks);
              }}
              className={` px-3 py-1 my-1  w-full text-sm  flex items-center cursor-pointer   justify-start space-x-2 transition-all duration-[400ms] ${
                currentDashboardLink == "Classes"
                  ? "text-green-600 font-bold"
                  : ""
              } `}
            >
              <img src={classicon.src} alt="icon not found" className="h-5" />
              <p className="transform hover:translate-x-1 duration-150 text-lg">
                Classes
              </p>
            </div>

            <div
              className={`${
                showClassSublinks ? "flex " : "hidden"
              } flex-col pl-4 transition-all`}
            >
              <div
                onClick={() => {
                  setCurrentDashboardLink("Classes");
                  router.push("/dashboard/videos");
                }}
                className=" px-2 py-1 my-0  w-full  hover:bg-main flex hover:text-white items-center cursor-pointer  justify-start space-x-2 transition-all duration-[100ms] "
              >
                <img src={videoicon.src} alt="icon not found" className="h-4" />
                <p className="transform hover:translate-x-1 duration-150">
                  Lessons
                </p>
              </div>
              <div
                onClick={() => {
                  router.push("/dashboard/videos/practicals");
                }}
                className=" px-2 py-1 my-0  w-full hover:bg-main flex  hover:text-white items-center cursor-pointer  justify-start space-x-2 transition-all duration-[100ms] "
              >
                <img
                  src={practicalsicon.src}
                  alt="icon not found"
                  className="h-4"
                />
                <p className="transform hover:translate-x-1 duration-150">
                  Practicals
                </p>
              </div>
              <div
                onClick={() => {
                  router.push("/dashboard/videos/setbooks");
                }}
                className=" px-2 py-1 my-0  w-full  hover:bg-main flex  hover:text-white items-center cursor-pointer  justify-start space-x-2 transition-all duration-[100ms] "
              >
                <img
                  src={setbooksicon.src}
                  alt="icon not found"
                  className="h-4"
                />
                <p className="transform hover:translate-x-1 duration-150">
                  SetBooks
                </p>
              </div>
              <div
                onClick={() => {
                  router.push("/dashboard/videos/mkurugenzi");
                }}
                className=" px-2 py-1 my-0  w-full  hover:bg-main flex hover:text-white items-center cursor-pointer  justify-start space-x-2 transition-all duration-[100ms] "
              >
                <img src={mkurulogo.src} alt="icon not found" className="h-4" />
                <p className="transform hover:translate-x-1 duration-150">
                  Mkurugenzi
                </p>
              </div>
            </div>
          </div> */}


          <div className="flex-1"></div>
          <div className={`${showClassSublinks ? "h-2" : "h-10"}`}></div>
          {user[0] !== undefined && user[0].isAdmin && (
            <div
              onClick={() => router.push("/admin")}
              className="bg-main px-2 py-2 cursor-pointer text-white text-lg mx-6 rounded-xl flex justify-center  mt-4"
            >
              Admin
            </div>
          )}
          <div
            onClick={() => {
              deleteFromLocalStorage("id");
              router.push("/");
            }}
            className="bg-red-600 px-2 py-2 cursor-pointer text-white text-lg mx-6 rounded-xl flex justify-center  mt-4"
          >
            Logout
          </div>
          <div className="h-10"></div>
        </div>
      </div>
      {/* avatar menu */}
      <div
        onClick={() => setShowAvatarMenu(false)}
        className={`fixed top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-60 z-50 shadow-2xl ${
          showAvatarMenu ? "" : "hidden"
        }`}
      >
        <div className="fixed top-16 right-1 bg-white dark:bg-darksec h-44 w-44 rounded-md mr-0.5 md:mr-2 flex flex-col   ">
          <div className="absolute -top-4 text-white right-8 md:right-12">
            <MdArrowDropUp size={28} className="" />
          </div>
          <div
            onClick={() => router.push("/dashboard/profile")}
            className="w-full p-2 hover:bg-main flex pl-5  items-center cursor-pointer hover:text-white hover:rounded-r-lg  mt-2"
          >
            My Profile
          </div>
          <div
            onClick={() => router.push("/dashboard/billing")}
            className="w-full p-2 hover:bg-main flex pl-5  items-center cursor-pointer hover:text-white hover:rounded-r-lg "
          >
            My Billing
          </div>
          <div
            onClick={() => router.push("/dashboard/profile/anzaTeam")}
            className="w-full p-2 hover:bg-main flex pl-5  items-center cursor-pointer hover:text-white hover:rounded-r-lg "
          >
            My Team
          </div>
          <div
            onClick={() => {
              deleteFromLocalStorage("id");
              router.push("/");
            }}
            className="w-full p-2 hover:bg-main flex  pl-5 items-center cursor-pointer   hover:text-white hover:rounded-r-lg"
          >
            Logout
          </div>
        </div>
      </div>
      {/* sidebar component */}
      <div className="w-full flex">
        <DashboardSidebar />
        {props.children}
      </div>
    </div>
  );
};

export default DashboardLayout;

function useOutsideAlerter(ref: any, closeDrawer: Function) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        closeDrawer();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
