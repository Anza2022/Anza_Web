import { useRouter } from "next/router";
import React, { useEffect } from "react";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import { showToast } from "../../../presentation/utils/helper_functions";

const TeachersCornerPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/dashboard/videos");
    router.prefetch("/dashboard/papers/all");
    router.prefetch("/dashboard/quizes");
    router.prefetch("/dashboard/examiner_talks");
    router.prefetch("/dashboard/career_talks/view_talk");
    router.prefetch("/dashboard/scorner");
    router.prefetch("/dashboard/tcorner");
    router.prefetch("/dashboard/profile");
    router.prefetch("/dashboard/billing");
    router.prefetch("/");
  }, []);
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec md:ml-44 relative min-h-screen py-16 w-full items-center ">
        <div className="flex h-12 items-center justify-start pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg md:text-2xl">
            Institution Corner
          </div>
        </div>

        <div className="flex flex-wrap justify-start w-full mt-5 ">
          <SchoolStatistics />
          <SchoolContests />
          <SchoolAccounts />
          <SchoolContent />
          <SchoolStories />
          <div className="flex flex-col  w-80 md:w-[430px] h-40  rounded-xl    relative  justify-between m-3"></div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeachersCornerPage;

const SchoolContests = () => {
  return (
    <div className="flex flex-col   w-[340px] h-40  rounded-xl  bg-main dark:bg-darkmain text-white relative  justify-between m-3">
      <p></p>
      <p className="text-xl text-center md:text-3xl font-bold">Our Contests</p>

      <div
        onClick={() => showToast("coming sooon", "success")}
        className="self-end px-5 py-1 cursor-pointer bg-green-600 rounded-xl m-3"
      >
        See More
      </div>
    </div>
  );
};
const SchoolAccounts = () => {
  return (
    <div className="flex flex-col   w-[340px] h-40  rounded-xl dark:bg-darkmain bg-main text-white relative  justify-between m-3">
      <div></div>
      <p className="text-xl text-center md:text-3xl font-bold">Our Teachers</p>

      <div
        onClick={() => showToast("coming sooon", "success")}
        className="self-end px-5 py-1 cursor-pointer bg-green-600 rounded-xl m-3"
      >
        See More
      </div>
    </div>
  );
};
const SchoolContent = () => {
  return (
    <div className="flex flex-col   w-[340px] h-40  rounded-xl dark:bg-darkmain bg-main text-white relative  justify-between m-3">
      <div></div>
      <p className="text-xl text-center md:text-3xl font-bold">
        Private Lessons
      </p>

      <div
        onClick={() => showToast("coming sooon", "success")}
        className="self-end px-5 py-1 cursor-pointer bg-green-600 rounded-xl m-3"
      >
        See More
      </div>
    </div>
  );
};
const SchoolStories = () => {
  return (
    <div className="flex flex-col   w-[340px] h-40  rounded-xl dark:bg-darkmain  bg-main text-white relative  justify-between m-3">
      <div></div>
      <p className="text-xl text-center md:text-3xl font-bold">
        School Stories
      </p>

      <div
        onClick={() => showToast("coming sooon", "success")}
        className="self-end px-5 py-1 cursor-pointer bg-green-600 rounded-xl m-3"
      >
        See More
      </div>
    </div>
  );
};
const SchoolStatistics = () => {
  return (
    <div className="flex flex-col   w-[340px] h-40  rounded-xl dark:bg-darkmain  bg-main text-white relative   m-3">
      <p className="text-xl text-center md:text-3xl font-bold">Statitics</p>
      <div className="flex w-full justify-between p-1">
        <p>Total Teachers</p>
        <p>6</p>
      </div>
      <div className="flex w-full justify-between p-1">
        <p>Total Students</p>
        <p>800</p>
      </div>
      <div className="flex w-full justify-between p-1">
        <p>Total Subscribed students</p>
        <p>500</p>
      </div>
    </div>
  );
};
