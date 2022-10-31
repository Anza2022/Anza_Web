/* eslint-disable @next/next/no-img-element */
import router from "next/router";
import React, { PropsWithChildren, useContext } from "react";
import { LoggedInUserContext } from "../../contexts/loggedin_user_controller";
import { NavigationContext } from "../../contexts/navigation_state_controller";
import { AppInternalLink } from "../../layouts/admin_dashboard_layout";
import classicon from "../../../assets/icons/classes.png";
import papericon from "../../../assets/icons/pastpaper-icon.png";
import quizicon from "../../../assets/icons/quizzes.png";
import examinericon from "../../../assets/icons/examiner-icon.png";
import careericon from "../../../assets/icons/career-icon.png";

import teachericon from "../../../assets/icons/teacher-icon.png";
import teacher from "../../../assets/icons/teacher.png";
import studenticon from "../../../assets/icons/student-icon.png";
import schoolicon from "../../../assets/icons/school-icon.png";
import videoicon from "../../../assets/icons/video_lessons.png";
import mkurulogo from "../../../assets/icons/logo.png";
import setbooksicon from "../../../assets/icons/setbooks.png";
import practicalsicon from "../../../assets/icons/practicals.png";
import useravatar from "../../../assets/icons/user.png";
//tcorner  icons
import timetableicon from "../../../assets/icons/timetable.png";
import examgenicon from "../../../assets/icons/exam-generator.png";
import workscheme from "../../../assets/icons/work-scheme.png";
import assignementsicon from "../../../assets/icons/assignment_icon.png";
import tutionicon from "../../../assets/icons/tutionsicon.png";
import liveicon from "../../../assets/icons/live.png";
import studygroupicon from "../../../assets/icons/study_group.png";
import website from "../../../assets/icons/website.png";
import bulksms from "../../../assets/icons/sms.png";
import bill from "../../../assets/icons/bill.png";
import stats from "../../../assets/icons/analysis.png";
import pastpaper from "../../../assets/icons/pastpaper.png";
import questions from "../../../assets/icons/questions.png";
import assignment from "../../../assets/icons/assignment.png";

import { isBrowser, showToast } from "../../utils/helper_functions";
import { deleteFromLocalStorage } from "../../../data/services/local_storage_services";
import Image from "next/image";

const DashboardSidebar = () => {
  const { user, setUser, isLoggedIn } = useContext(LoggedInUserContext);
  const {
    showClassSublinks,
    setShowClassSublinks,
    showTcornerSublinks,
    setShowTcornerSublinks,
    showIcornerSublinks,
    setShowIcornerSublinks,
    showScornerSublinks,
    setShowScornerSublinks,
  } = useContext(NavigationContext);
  const { currentDashboardLink, setCurrentDashboardLink } =
    useContext(NavigationContext);

  let sidebarLinks: AppInternalLink[] = [
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

    // new AppInternalLink(
    //   "Examiner Talks",
    //   () => router.push("/dashboard/examiner_talks"),
    //   examinericon.src
    // ),
    new AppInternalLink(
      "SetBooks",
      () => router.push("/dashboard/videos/setbooks"),
      setbooksicon.src
    ),
    new AppInternalLink(
      "Career Talks",
      () => router.push("/dashboard/career_talks"),
      careericon.src
    ),
    // new AppInternalLink(
    //   "Live Classes ",
    //   () => router.push("/dashboard/tutions"),
    //   liveicon.src
    // ),

    //todo add teachers corner with  my past papers , exam generator,  my videos,
    //todo add student corner with my assignemtns,  asked questions for discussions
  ];

  const closeSublinks = () => {
    setShowClassSublinks(true);
    setShowTcornerSublinks(false);
    setShowIcornerSublinks(false);
    setShowScornerSublinks(false);
  };
  const { setShowPremiumModal } = useContext(NavigationContext);
  return (
    <div
      className=" hidden md:flex flex-col  w-44 fixed top-0 left-0  shadow-2xl h-screen  bg-white border-r-2 dark:border-gray-700 border-gray-300 pt-20 dark:bg-darkmain"
      style={{ fontFamily: "Overpass", fontWeight: 500 }}
    >
      <div className="absolute top-14 left-0 w-44 h-2.5 dark:bg-gray-800 bg-gray-100"></div>
      {/* <div
        className={`text-sm   items-start cursor-pointer flex flex-col mb-1  justify-start space-x-2   ${
          showClassSublinks ? "h-28" : "h-7"
        } `}
      >
        <div
          onClick={() => {
            closeSublinks();
            setCurrentDashboardLink("Classes");
            setShowClassSublinks(true);
          }}
          className={` px-2 py-1 my-1  w-full text-sm hover:bg-main rounded-r-xl flex  items-start cursor-pointer  justify-start space-x-2  ${
            currentDashboardLink == "Classes" ? "bg-main font-bold" : ""
          } `}
        >
          <Image
            src={classicon.src}
            alt="icon not found"
            className="h-5"
            width={20}
            height={20}
          />
          <p className="">Classes</p>
        </div>

        <div
          className={`${
            showClassSublinks ? "flex " : "hidden"
          } flex-col pl-4 transition-all`}
        >
          <SubLinkComponent
            dstUrl="/dashboard/videos"
            iconSrc={videoicon.src}
            linkname="Lessons"
            isLocked={false}
          />
          <SubLinkComponent
            dstUrl="/dashboard/videos/practicals"
            iconSrc={practicalsicon.src}
            linkname="Practicals"
            isLocked={false}
          />
          <SubLinkComponent
            dstUrl="/dashboard/videos/setbooks"
            iconSrc={setbooksicon.src}
            linkname="SetBooks"
            isLocked={false}
          />
          <SubLinkComponent
            dstUrl="/dashboard/videos/mkurugenzi"
            iconSrc={mkurulogo.src}
            linkname="Mkurugenzi"
            isLocked={false}
          />
        </div>
      </div> */}
      {sidebarLinks.map((e) => (
        <MainLinkComponent
          key={e.linkname}
          dstUrl=""
          iconSrc={e.iconurl}
          linkname={e.linkname}
          onpressed={e.onPressed}
        />
      ))}

      {/* <div
        onClick={() => {
          if (isBrowser()) {
            const iframe =
              '<html><head><style>body, html {width: 100%; height: 100%; margin: 0; padding: 0}</style></head><body><iframe src="https://www.labster.com/try/?utm_source=canva&utm_medium=iframely" style="height:calc(100% - 4px);width:calc(100% - 4px)"></iframe></html></body>';
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
        className={`px-2 py-1 my-1  text-sm hover:bg-main  hover:rounded-r-xl  ${
          currentDashboardLink == "Virtual Lab"
            ? "text-green-600 font-bold"
            : ""
        } hover:text-white items-center cursor-pointer flex justify-start space-x-2   `}
      >
        {" "}
        <Image
          src={practicalsicon.src}
          alt="icon not found"
          className="h-5"
          width={20}
          height={20}
        />
        <p className="pr-2  linktext">Virtual Lab</p>
      </div> */}

      {/* student corner */}
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
            className={` px-2 py-1 my-0.5  w-full text-sm hover:bg-main  rounded-r-xl  flex hover:text-white items-start cursor-pointer  justify-start space-x-2  ${
              currentDashboardLink == "Student Corner"
                ? "bg-main font-bold"
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
            {/* <SubLinkComponent
              dstUrl="/dashboard/scorner/assignments"
              iconSrc={assignementsicon.src}
              linkname="My Assignments"
              isLocked={true}
            /> */}
            <SubLinkComponent
              dstUrl="/dashboard/scorner/live_classes"
              iconSrc={liveicon.src}
              linkname="My Live Classes"
              isLocked={true}
            />
          </div>
        </div>
      )}

      {/* tcorner */}
      {/* {true && ( */}
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
            className={` px-2 py-1 my-1.5  w-full text-sm  hover:bg-main  rounded-r-xl  flex hover:text-white items-start cursor-pointer  justify-start space-x-2  ${
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
            <SubLinkComponent
              dstUrl="/dashboard/tcorner/live_classes"
              iconSrc={liveicon.src}
              linkname="My Live Classes"
              isLocked={true}
            />
            <SubLinkComponent
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
            />

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
            <SubLinkComponent
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
            />
          </div>
        </div>
      )}

      {/* institution  corner */}
      {/* {true && ( */}
      {user[0] !== undefined && user[0].accountType == "school" && (
        <div
          className={`text-sm mt-5  items-start cursor-pointer flex flex-col justify-start space-x-2  ${
            showIcornerSublinks ? "h-40" : "h-7"
          } `}
        >
          <div
            onClick={() => {
              closeSublinks();
              setCurrentDashboardLink("Institution Corner");
              setShowIcornerSublinks(!showIcornerSublinks);
            }}
            className={` px-2 py-1 my-1.5  w-full text-sm hover:bg-main rounded-r-xl  flex hover:text-white items-start cursor-pointer  justify-start space-x-2  ${
              currentDashboardLink == "Institution Corner"
                ? "bg-main  font-bold"
                : ""
            } `}
          >
            <Image
              src={schoolicon.src}
              alt="icon not found"
              className="h-5"
              width={20}
              height={20}
            />
            <p className="pr-2  linktext">Institution Corner</p>
          </div>

          <div
            className={`${
              showIcornerSublinks ? "flex " : "hidden"
            } flex-col pl-4 `}
          >
            <SubLinkComponent
              dstUrl="/dashboard/icorner/statistics"
              iconSrc={stats.src}
              linkname="Statistics"
              isLocked={false}
            />
            <SubLinkComponent
              dstUrl="/dashboard/icorner/teachers"
              iconSrc={teacher.src}
              linkname="Our Teachers"
              isLocked={true}
            />
            <SubLinkComponent
              dstUrl="/dashboard/icorner/sms"
              iconSrc={bulksms.src}
              linkname="Bulk SMS"
              isLocked={true}
            />
            <SubLinkComponent
              dstUrl="/dashboard/icorner/website"
              iconSrc={website.src}
              linkname="Our Website"
              isLocked={true}
            />
            <SubLinkComponent
              dstUrl="/dashboard/icorner/website"
              iconSrc={bill.src}
              linkname="Fees Manager"
              isLocked={true}
            />
          </div>
        </div>
      )}
      <div className="flex-1"></div>
      {user[0] !== undefined && user[0].isAdmin && (
        <div
          onClick={() => {
            setCurrentDashboardLink("Video Lessons");
            router.push("/admin/videos");
          }}
          className="bg-main px-2 py-1 cursor-pointer text-white text-base mx-6 rounded-xl flex justify-center  mt-2"
        >
          Go To Admin
        </div>
      )}
      <div
        onClick={() => {
          deleteFromLocalStorage("id");
          router.push("/");
        }}
        className="bg-red-600 px-10 py-1 cursor-pointer text-white text-base mx-6 rounded-xl flex justify-center  mt-1"
      >
        Logout
      </div>
      <div className="h-5"></div>
    </div>
  );
};

export default DashboardSidebar;

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
      className={` px-2 py-0.5 my-0.5  w-full text-xs hover:bg-main flex  rounded-r-xl  hover:text-white
             items-start cursor-pointer  justify-start space-x-2  ${
               currentDashboardLink == props.linkname ? "bg-main font-bold" : ""
             }`}
    >
      <Image src={props.iconSrc} alt="icon not found" width={16} height={16} />
      <p className="pr-2  linktext">{props.linkname}</p>
    </div>
  );
};
const MainLinkComponent = (
  props: PropsWithChildren<{
    linkname: string;
    dstUrl: string;
    iconSrc: string;
    onpressed: Function;
  }>
) => {
  const {
    currentDashboardLink,
    setCurrentDashboardLink,
    setShowClassSublinks,
  } = useContext(NavigationContext);
  return (
    <div
      onClick={() => {
        setShowClassSublinks(false);
        setCurrentDashboardLink(props.linkname);
        props.onpressed();
      }}
      className={`px-2 py-1 my-0.5  text-sm hover:bg-main  rounded-r-xl  ${
        currentDashboardLink == props.linkname ? "bg-main font-bold" : ""
      } hover:text-white items-center cursor-pointer flex justify-start space-x-2 `}
    >
      <Image src={props.iconSrc} alt="icon not found" width={20} height={20} />

      <p className="pr-2  linktext">{props.linkname}</p>
    </div>
  );
};
