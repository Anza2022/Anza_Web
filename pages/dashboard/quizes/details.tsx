import React from "react";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";

const TestDetails = () => {
  return (
    <DashboardLayout>
      {" "}
      <div className="flex h-12 items-center justify-center bg-white pl-5  md:pl-10 w-full">
        <div className="flex text-main font-black text-lg md:text-2xl">
          Test Details
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TestDetails;
