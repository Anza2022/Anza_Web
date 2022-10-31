import React, { useContext } from "react";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";

const CategoryTests = () => {
  const { selectedSubject, setSelectedVideoId } = useContext(NavigationContext);
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col dark:bg-darksec bg-gray-200  md:ml-44 relative min-h-screen py-16 w-full items-center ">
        <div className="flex h-12 items-center justify-center  pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg md:text-2xl">
            {selectedSubject[0].toUpperCase()}
            {selectedSubject.substring(1)} Gamified quizzes
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CategoryTests;
