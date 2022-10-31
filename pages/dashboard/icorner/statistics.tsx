import React from "react";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";

const SchoolStatisticsPage = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative  py-16 w-full items-center min-h-screen">
        <div className="flex h-12 items-center justify-center  pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg md:text-2xl">
            SCHOOL STATISTICS
          </div>
        </div>
        <div className="flex w-full h-[75vh] justify-center items-center flex-col">
<div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div className="flex">
    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p className="font-bold mt-1">Feature Coming Soon! </p>
    </div>
  </div>
</div>
</div>
      </div>
    </DashboardLayout>
  );
};

export default SchoolStatisticsPage;
