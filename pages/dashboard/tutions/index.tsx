import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BiDollarCircle, BiTimeFive, BiTimer } from "react-icons/bi";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaSchool, FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { GoVerified } from "react-icons/go";
import { MdOutlineVerified } from "react-icons/md";
import LiveClassesRepo from "../../../data/repos/live_classes_repo";
import LiveClassComponent from "../../../presentation/components/dashboard/live_class_component";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { LiveClassesContext } from "../../../presentation/contexts/live_classes_controller";
import { LoggedInUserContext } from "../../../presentation/contexts/loggedin_user_controller";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import {
  formatDateString,
  isBrowser,
  showToast,
} from "../../../presentation/utils/helper_functions";

const LiveTutionsPage = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const { user } = useContext(LoggedInUserContext);
  const { setShowPremiumModal } = useContext(NavigationContext);

  const [loading, setLoading] = useState(false);

  const { liveclasses, setLiveclasses } = useContext(LiveClassesContext);
  async function getLiveClasses() {
    setLoading(true);

    try {
      let classes = await LiveClassesRepo.getLiveClasses();
      setLiveclasses(classes);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (liveclasses.length < 1) {
      getLiveClasses();
    }
  }, []);
  let myclasses = liveclasses.filter((e) =>
    e.studentsIds.includes(user[0] != undefined ? user[0].userId : "noid")
  );
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative min-h-screen py-16 w-full items-center ">
        <div className="flex h-11 items-center justify-start w-full">
          <div
            onClick={() => setCurrentTab(0)}
            className={`flex flex-1 justify-center   font-black  h-full items-center  cursor-pointer pb-1 border-main transition-all hover:border-b-2  ${
              currentTab == 0
                ? "border-main border-b-2 bg-blue-500 text-white text-sm font-bold "
                : ""
            }`}
          >
            UPCOMING <span className="hidden md:block pl-1">CLASSES</span>
          </div>
          <div
            onClick={() => setCurrentTab(2)}
            className={`flex flex-1 justify-center  font-black  h-full items-center  cursor-pointer pb-1 border-main transition-all hover:border-b-2  ${
              currentTab == 2
                ? " bg-blue-500 text-white text-sm font-bold"
                : ""
            }`}
          >
            LIVE NOW
          </div>

          <div
            onClick={() => setCurrentTab(1)}
            className={`flex flex-1 justify-center font-black  cursor-pointer pb-1 border-main transition-all hover:border-b-2 h-full items-center ${
              currentTab == 1
                ? "border-main border-b-2 bg-blue-500 text-white text-sm font-bold"
                : ""
            }`}
          >
            <span className="hidden md:block pr-1">MY</span> BOOKED{" "}
            <span className="hidden md:block pl-1">CLASSES</span>
          </div>
        </div>
        {loading && (
          <div className="flex flex-col h-[80vh] w-full justify-center items-center">
            <LoadingComponent color="main" loading={loading} />
            <p className="py-1 text-xs">loading live classes ...</p>
          </div>
        )}

        {!loading && currentTab == 2 && (
          // <div className="flex w-full h-full justify-center items-center flex-col">
          //   <p className="text-xl">Ooops!</p>
          //   <p className="text-sm">No lessons are live right now.</p>
          //   <p className="text-xs text-main">Please come back later</p>
          // </div>

<div className="flex w-full h-[75vh] justify-center items-center flex-col">
<div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div className="flex">
    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p className="font-bold">Oops! No lessons are live right now. </p>
      <p className="text-sm"> Please come back later. </p>
    </div>
  </div>
</div>
</div>

        )}
        {!loading && currentTab == 1 && (
          <div className="flex flex-wrap w-full justify-center md:justify-center ">
            {myclasses.length < 1 && (
              // <div className="flex w-full h-[75vh] justify-center items-center flex-col">
              //   <p className="text-xl">Ooops!</p>
              //  <p className="text-sm">You have not booked any class.</p>
              //  <p className="text-xs text-main">Please book a class and refresh.</p>
              // </div>
<div className="flex w-full h-[75vh] justify-center items-center flex-col">
<div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div className="flex">
    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p className="font-bold">Oops! You have not booked any class. </p>
      <p className="text-sm"> Please book a class and refresh. </p>
    </div>
  </div>
</div>
</div>

            )}
            {myclasses.length > 0 &&
              myclasses.map((e, i) => {
                return <LiveClassComponent key={e.id} liveclass={e} />;
              })}
          </div>
        )}

        {!loading && currentTab == 0 && (
          <div className="flex flex-wrap w-full justify-center md:justify-start ">
            {liveclasses.length < 1 && (
              // <div className="flex w-full h-[75vh] justify-center items-center flex-col">
              //             <p className="text-xl">Ooops!</p>
              //  <p className="text-sm">No upcoming classes found.</p>
              //  <p className="text-xs text-main">Please come back later.</p>
              // </div>


              <div className="flex w-full h-[75vh] justify-center items-center flex-col">
<div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div className="flex">
    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p className="font-bold">Oops! No upcoming classes found. </p>
      <p className="text-sm"> Please come back later. </p>
    </div>
  </div>
</div>
</div>


            )}
            {liveclasses.length > 0 &&
              liveclasses.map((e, i) => {
                return <LiveClassComponent key={e.id} liveclass={e} />;
              })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
export default LiveTutionsPage;

const MyLiveLessons = () => {
  const { setShowPremiumModal } = useContext(NavigationContext);
  return (
    <div className="flex flex-wrap w-full justify-center md:justify-start">
      {Array(1)
        .fill(1)
        .map((e, i) => {
          return (
            <div
              key={i}
              className="w-80 bg-gray-50 transition-all shadow-md hover:shadow-main dark:bg-darkmain flex flex-col justify-between items-center p-2 rounded-lg m-2 mx-3 px-3 text-sm"
            >
              <div className="flex w-full justify-between">
                <p className=" flex-1 font-semibold text-main text-left mb-1 text-[12px]">
                  Form 3 Mathematics Vectors Live Tution
                </p>
                <MdOutlineVerified size={20} color="darkgreen" />
              </div>
              <div className="flex space-x-4 items-center justify-between w-full">
                <div className="flex space-x-1 items-center">
                  <BiTimer size={17} />
                  <p className="font-bold text-amber-400 text-xs">2hrs</p>
                </div>
                <div className="flex space-x-1 items-center">
                  <FaUsers size={17} />
                  <p className="font-bold text-amber-400 text-xs">
                    30 students
                  </p>
                </div>
              </div>{" "}
              <div className="flex  items-center w-full justify-between my-2">
                <div className="flex space-x-1 items-center">
                  <BsFillCalendarDateFill size={15} />
                  <p className="text-xs">{formatDateString("2022-04-10")}</p>
                </div>
                <div className="flex space-x-1 items-center">
                  <BiTimeFive size={20} />

                  <p className="text-xs">09:00 am</p>
                </div>
              </div>
              <div className="flex  items-center w-full justify-between">
                <div className="flex space-x-1 items-center">
                  <GiTeacher size={15} />
                  <p className="text-xs">Tr Brian Omache</p>
                </div>
                <div className="flex space-x-1 items-center">
                  <FaSchool size={15} />

                  <p className="text-xs">Anza Academy</p>
                </div>
              </div>
              <div className="h-3"></div>
              <div className="flex  items-center w-full justify-between mt-2 mb-5">
                <div className="flex space-x-1 items-center">
                  <BiDollarCircle size={20} />
                  <p className="text-xs text-amber-700">Ksh 400</p>
                </div>

                <div
                  onClick={() => setShowPremiumModal(true)}
                  className="flex px-3 py-1 cursor-pointer self-center text-xs bg-main rounded-lg shadow-2xl text-white "
                >
                  Join Now
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
