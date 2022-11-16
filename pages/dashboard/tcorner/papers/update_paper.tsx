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
      </div>
    </DashboardLayout>
  );
};

export default TeacherUpdatePastPaper;
