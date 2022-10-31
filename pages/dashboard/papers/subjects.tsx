import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { PastPapersContext } from "../../../presentation/contexts/past_papers_controller";
import { VideoLessonContext } from "../../../presentation/contexts/video_lessons_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";

const PastPapersSubjectsPage = () => {
  const router = useRouter();

  const { selectedForm, setSelectedSubject } = useContext(NavigationContext);
  const { pastPapers } = useContext(PastPapersContext);
  const getSubjects = (): string[] => {
    const set = new Set(
      pastPapers
        .filter((e) => e.classLevel == selectedForm)
        .map((v) => v.subjectType)
    );
    return Array.from(set);
  };
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200  md:ml-52 relative min-h-screen py-16 w-full items-center ">
        <div className="flex  items-center justify-center bg-white pl-5  md:pl-10 w-full h-12 ">
          <div className="flex text-fuchsia-600 font-black text-lg">
            {selectedForm[0].toUpperCase() + selectedForm.substring(1)} Revision
            Papers
          </div>
        </div>
        <div className="flex flex-wrap w-full justify-around mt-3">
          {getSubjects().length < 1 ? (
            <div className="flex flex-col justify-center items-center h-96">
              <p className="font-black">Opps</p>
              <p
                onClick={() => {
                  setSelectedSubject("biology");
                  router.push("/dashboard/papers/all");
                }}
              >
                No {selectedForm} revison papers
              </p>
            </div>
          ) : (
            getSubjects().map((e) => (
              <div
                key={e}
                className="w-[300px] md:w-[430px] flex flex-col bg-white rounded-xl   p-3"
              >
                <p className="text-center font-bold text-xl p-1">
                  {e[0].toUpperCase() + e.substring(1)} Revision Papers
                </p>
                <hr />
                <div className="flex justify-between px-4 py-2">
                  <div className="flex space-x-2">
                    <p className=""> Total Papers</p>
                    <p className="text-yellow-500  font-bold">100</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className=""> All Lessons</p>
                    <p className="text-yellow-500  font-bold">
                      {/* {lessons.filter((l) => l.classLevel === e.toLowerCase())}  */}
                      100
                    </p>
                  </div>
                </div>
                <div className="flex justify-between px-4">
                  <div className="flex space-x-2">
                    <p className=""> Teacher</p>
                    <p className="text-yellow-500  font-bold">Anza</p>
                  </div>
                  <div className="flex space-x-2">
                    <p className="text-xs"> From Anza</p>
                  </div>
                </div>
                <div className="flex justify-end px-4 mt-3">
                  <div
                    onClick={() => {
                      setSelectedSubject(e);
                      router.push("/dashboard/papers/all");
                    }}
                    className="flex px-4 text-xs py-1 rounded-lg text-white cursor-pointer bg-main"
                  >
                    See Papers
                  </div>
                </div>
              </div>
            ))
          )}
          {getSubjects().length > 0 && getSubjects().length % 2 != 0 && (
            <div className="w-[300px] md:w-[430px] flex flex-col rounded-xl   p-3"></div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PastPapersSubjectsPage;
