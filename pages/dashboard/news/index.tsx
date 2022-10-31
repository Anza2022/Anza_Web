import { useRouter } from "next/router";
import React from "react";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";

const UserNewsFeedPage = () => {
  const router = useRouter();
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200  md:ml-52 relative h-screen py-16 w-full items-center justify-center">
        <h1 className=" text-gray-900 p-10">
          This is the user Personalized news feed. contains blog , schools
          gossips and other important events
        </h1>
      </div>
    </DashboardLayout>
  );
};

export default UserNewsFeedPage;
