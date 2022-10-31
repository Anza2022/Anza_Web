import React from "react";
import DashboardLayout from "../../../../presentation/layouts/dashboard_layout";
import { showToast } from "../../../../presentation/utils/helper_functions";

const TeacherUpdatePastPaper = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative min-h-screen py-16 w-full items-center ">
        <div className="flex h-12 items-center justify-start  pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg md:text-2xl">
            Update Past Paper
          </div>
        </div>

        <div className="flex flex-wrap justify-center h-96 items-center w-full mt-5 ">
          <p>Hello there from teachers update papers</p>

          <div className="flex flex-col  w-80 md:w-[430px] h-40  rounded-xl   text-white relative  justify-between m-3"></div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherUpdatePastPaper;
