import { useRouter } from "next/router";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { GiPapers } from "react-icons/gi";
import { NavigationContext } from "../contexts/navigation_state_controller";
import { PastPapersContext } from "../contexts/past_papers_controller";
import classicon from "../../assets/icons/classes-icon.png";
import papericon from "../../assets/icons/pastpaper-icon.png";
import quizicon from "../../assets/icons/test-icon.png";
import examinericon from "../../assets/icons/examiner-icon.png";
import careericon from "../../assets/icons/career-icon.png";

import teachericon from "../../assets/icons/teacher-icon.png";
import studenticon from "../../assets/icons/student-icon.png";
import schoolicon from "../../assets/icons/school-icon.png";
import ToggleThemeButton from "../components/others/toggle_theme_button";
import { LoggedInUserContext } from "../contexts/loggedin_user_controller";

const AdminDashboardLayout = (props: PropsWithChildren<{}>) => {
  const router = useRouter();

  let sidebarLinks: AppInternalLink[] = [
    new AppInternalLink("Statistics", () => router.push("/admin"), ""),
    new AppInternalLink(
      "Video Lessons",
      () => router.push("/admin/videos"),
      classicon.src
    ),
    new AppInternalLink(
      "Past Papers",
      () => router.push("/admin/papers"),
      papericon.src
    ),
    new AppInternalLink(
      "Gamified Quizes",
      () => router.push("/admin/quizes"),
      quizicon.src
    ),
    new AppInternalLink(
      "Examiner Talks",
      () => router.push("/admin/examiner_talks"),
      examinericon.src
    ),
    new AppInternalLink(
      "Career Talks",
      () => router.push("/admin/career_talks"),
      careericon.src
    ),
    new AppInternalLink(
      "Set Books",
      () => router.push("/admin/setbooks"),
      careericon.src
    ),
    new AppInternalLink(
      "Mkurugenzi",
      () => router.push("/admin/mkurugenzi"),
      careericon.src
    ),
    new AppInternalLink(
      "Schemes Of Work",
      () => router.push("/admin/work_schemes"),
      careericon.src
    ),
    new AppInternalLink(
      "Lesson Plans",
      () => router.push("/admin/lesson_plans"),
      careericon.src
    ),
    new AppInternalLink(
      "Live Classes",
      () => router.push("/admin/live_classes"),
      careericon.src
    ),
    new AppInternalLink(
      "Users",
      () => router.push("/admin/users"),
      studenticon.src
    ),
    new AppInternalLink(
      "Schools",
      () => router.push("/admin/schools"),
      schoolicon.src
    ),
    new AppInternalLink(
      "Testmonials",
      () => router.push("/admin/testmonials"),
      studenticon.src
    ),
    new AppInternalLink(
      "FAQs",
      () => router.push("/admin/faqs"),
      studenticon.src
    ),
  ];
  const [showDrawer, setShowDrawer] = useState(false);
  const { currentDashboardLink, setCurrentDashboardLink } =
    useContext(NavigationContext);
  const { setPastPapers } = useContext(PastPapersContext);

  const exitAdmin = () => {
    setPastPapers([]);
    setCurrentDashboardLink("Video Lessons");
    router.push("/dashboard/videos");
  };
  const { user, setUser, isLoggedIn, isFirstTimeLogin } =
    useContext(LoggedInUserContext);
  useEffect(() => {
    prefetchRoutes();
    if (user[0] != undefined) {
      if (user[0].isAdmin) {
      } else if (user[0].isSuperAdmin) {
      } else {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, []);

  const prefetchRoutes = () => {
    router.prefetch("/dashboard/videos");
  };
  useEffect(() => {
    if (window != undefined) {
      window.Tawk_API.hideWidget();
    }
  });

  return (
    <div
      className="w-full min-h-screen flex flex-col scroll-smooth dark:text-white "
      style={{ fontFamily: "Poppins" }}
    >
      <div className="text-3xl text-white font-bold h-16 bg-main dark:bg-darkmain z-50 flex items-center  justify-between pr-5 fixed top-0 left-0 w-full">
        <div className="flex space-x-2 items-center">
          <div className="pl-3 md:hidden" onClick={() => setShowDrawer(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>{" "}
          <p className="text-base"> Admin Dashboard</p>
        </div>
        <div className="flex space-x-4 items-center">
          {" "}
          <div
            onClick={exitAdmin}
            className="bg-red-600 px-5 py-1 cursor-pointer text-white text-sm rounded-md flex justify-center"
          >
            Exit Admin
          </div>
          <ToggleThemeButton />
        </div>
      </div>
      <div
        onClick={() => setShowDrawer(false)}
        className={`absolute top-0 left-0 w-full min-h-screen bg-gray-900 bg-opacity-60 z-50 ${
          showDrawer ? "" : "hidden"
        }`}
      >
        <div
          className={`${
            showDrawer ? "fixed top-0 left-0 " : "hidden"
          } w-52 bg-white h-screen dark:bg-darkmain`}
        >
          {" "}
          <div className="w-full h-12 flex flex-col items-center  text-green-600">
            <p className="font-black text-3xl">Anza</p>
            <p className="font-black text-xl">Academy</p>
          </div>
          <div className="h-5"></div>
          {sidebarLinks.map((e) => (
            <div
              key={e.linkname}
              onClick={() => {
                setShowDrawer(false);
                setCurrentDashboardLink(e.linkname);
                e.onPressed();
              }}
              className={`px-5 py-1 my-1  text-base hover:bg-main hover:text-white items-center cursor-pointer flex justify-between hover:rounded-r-xl transition-all duration-150  ${
                e.linkname === currentDashboardLink
                  ? "text-green-600 font-bold"
                  : ""
              }`}
            >
              <p className="transform hover:translate-x-1 duration-1">
                {" "}
                {e.linkname}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ))}
          <div
            onClick={() => {
              setCurrentDashboardLink("Overview");
              router.push("/dashboard/videos");
            }}
            className="bg-red-600 px-5 py-2 cursor-pointer text-white text-lg mx-6 rounded-xl flex justify-center  mt-10"
          >
            Exit Admin
          </div>
        </div>
      </div>
      <div className="w-full flex">
        <div className=" hidden md:flex flex-col w-52 fixed top-0 left-0  shadow-2xl h-screen bg-white dark:bg-darkmain pt-20  overflow-y-auto  ">
          {sidebarLinks.map((e) => (
            <div
              key={e.linkname}
              onClick={() => {
                setCurrentDashboardLink(e.linkname);
                e.onPressed();
              }}
              className={`px-5 py-1 my-0.5  text-sm hover:bg-main rounded-r-xl hover:text-white cursor-pointer flex justify-between items-center  ${
                e.linkname === currentDashboardLink
                  ? "text-green-600 font-bold"
                  : ""
              }`}
            >
              <p> {e.linkname}</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ))}

          <div
            onClick={exitAdmin}
            className="bg-red-600 px-5 mt-5 py-2 cursor-pointer text-white text-lg mx-6 rounded-xl flex justify-center mb-10 "
          >
            Exit Admin
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default AdminDashboardLayout;

export class AppInternalLink {
  constructor(
    public linkname: string,
    public onPressed: Function,
    public iconurl: string
  ) {}
}
