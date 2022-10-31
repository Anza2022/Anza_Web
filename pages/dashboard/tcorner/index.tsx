import { useRouter } from "next/router";
import React, { useEffect } from "react";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import { showToast } from "../../../presentation/utils/helper_functions";

const TeachersCornerPage = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative min-h-screen py-16 w-full items-center ">
        <div className="flex h-12 items-center justify-start  pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg md:text-2xl">
            Teachers Corner
          </div>
        </div>

        <div className="flex flex-wrap justify-start w-full mt-5 ">
          <MyPastPapers />
          <ExamGenerator />
          <IssuedAssignments />
          <MyTestQuizes />
          <MyHolidayTutions />
          <StudyGroups />
          <TimeTable />
          <div className="flex flex-col  w-80 md:w-[430px] h-40  rounded-xl   text-white relative  justify-between m-3"></div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeachersCornerPage;

const ExamGenerator = () => {
  return (
    <div className="flex flex-col  w-[340px]  h-40  dark:bg-darkmain rounded-xl  bg-main text-white relative  justify-between m-3">
      <p></p>
      <p className="text-xl text-center md:text-2xl font-bold">
        Exam Generator
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
const IssuedAssignments = () => {
  return (
    <div className="flex flex-col  w-[340px] h-40  rounded-xl dark:bg-darkmain   bg-main text-white relative  justify-between m-3">
      <div></div>
      <p className="text-xl text-center md:text-2xl font-bold">
        Student Assignments
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
const MyTestQuizes = () => {
  return (
    <div className="flex flex-col   w-[340px] h-40  rounded-xl dark:bg-darkmain bg-main text-white relative  justify-between m-3">
      <div></div>
      <p className="text-xl text-center md:text-3xl font-bold">
        My Test Quizes
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
const MyPastPapers = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col  w-[340px] h-40  rounded-xl dark:bg-darkmain  bg-main text-white relative  justify-between m-3">
      <div></div>
      <p className="text-xl text-center md:text-2xl font-bold">
        My Past Papers
      </p>

      <div
        onClick={() => router.push("/dashboard/tcorner/papers")}
        className="self-end px-5 py-1 cursor-pointer bg-green-600 rounded-xl m-3"
      >
        See More
      </div>
    </div>
  );
};
const MyHolidayTutions = () => {
  return (
    <div className="flex flex-col  w-[340px] h-40  rounded-xl dark:bg-darkmain  bg-main text-white relative  justify-between m-3">
      <div></div>
      <p className="text-xl text-center md:text-3xl font-bold">My Tutions</p>

      <div
        onClick={() => showToast("coming sooon", "success")}
        className="self-end px-5 py-1 cursor-pointer bg-green-600 rounded-xl m-3"
      >
        See More
      </div>
    </div>
  );
};
const StudyGroups = () => {
  return (
    <div className="flex flex-col  w-[340px] h-40  rounded-xl dark:bg-darkmain  bg-main text-white relative  justify-between m-3">
      <div></div>
      <p className="text-xl text-center md:text-3xl font-bold">Study Groups</p>

      <div
        onClick={() => showToast("coming sooon", "success")}
        className="self-end px-5 py-1 cursor-pointer bg-green-600 rounded-xl m-3"
      >
        See More
      </div>
    </div>
  );
};

const TimeTable = () => {
  return (
    <div className="flex flex-col  w-[340px] h-40  rounded-xl dark:bg-darkmain  bg-main text-white relative  justify-between m-3">
      <div></div>
      <p className="text-xl text-center md:text-3xl font-bold">Timetable</p>

      <div
        onClick={() => showToast("coming sooon", "success")}
        className="self-end px-5 py-1 cursor-pointer bg-green-600 rounded-xl m-3"
      >
        See More
      </div>
    </div>
  );
};
