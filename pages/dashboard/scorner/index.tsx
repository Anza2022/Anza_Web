import { useRouter } from "next/router";
import React, { useEffect } from "react";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import { showToast } from "../../../presentation/utils/helper_functions";

const StudentCornerPage = () => {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative h-screen py-16 w-full items-center ">
        <div className="flex h-12 items-center justify-start pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg md:text-2xl">
            Student Corner
          </div>
        </div>

        <div className="flex flex-wrap justify-around w-full mt-5 space-y-6 md:space-y-0">
          <MyAssignmentsComponent />
          <MyAssignmentHelper />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentCornerPage;

const MyAssignmentsComponent = () => {
  return (
    <div className="flex flex-col  w-80 md:w-[430px] h-40  rounded-xl  bg-main dark:bg-darkmain text-white relative  justify-between">
      <div className="abosulte top-0 right-0 -translate-x-2 w-10 h-10 rounded-full flex items-center justify-center bg-red-600 text-white self-end transform -translate-y-3">
        3
      </div>
      <p className="text-xl text-center md:text-3xl font-bold">
        My Assignments
      </p>

      <div
        onClick={() => showToast("coming sooon", "success")}
        className="self-end px-5 py-1 cursor-pointer bg-green-600 dark:bg-black rounded-xl m-3"
      >
        View Assignments
      </div>
    </div>
  );
};
const MyAssignmentHelper = () => {
  return (
    <div className="flex flex-col  w-80 md:w-[430px] h-40  rounded-xl  bg-main dark:bg-darkmain text-white relative  justify-between">
      <div className="abosulte top-0 right-0 -translate-x-2 w-10 h-10 rounded-full flex items-center justify-center bg-red-600 text-white self-end transform -translate-y-3">
        10
      </div>
      <p className="text-xl text-center md:text-3xl font-bold">
        Assignment Helper
      </p>

      <div
        onClick={() => showToast("coming sooon", "success")}
        className="self-end px-5 py-1 cursor-pointer bg-green-600 rounded-xl m-3 dark:bg-black"
      >
        View questions
      </div>
    </div>
  );
};
