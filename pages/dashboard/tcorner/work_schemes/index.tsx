import React, { useContext, useEffect, useState } from "react";
import LessonPlanRepo from "../../../../data/repos/lesson_plans_repo";
import WorkSchemesRepo from "../../../../data/repos/work_schemes_repo";
import LoadingComponent from "../../../../presentation/components/others/loading_component";
import { NavigationContext } from "../../../../presentation/contexts/navigation_state_controller";
import { TeachersAccountContext } from "../../../../presentation/contexts/teachers_account_context";
import DashboardLayout from "../../../../presentation/layouts/dashboard_layout";
import { showToast } from "../../../../presentation/utils/helper_functions";
import fileDownload from "js-file-download";
import axios from "axios";
import { prodUrl } from "../../../../presentation/utils/constants";

const WorkSchemePage = () => {
  const [loadingSchemes, setLoadingSchemes] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setLessonPlans, lessonPlans, setSchemesOfWork, schemesOfWork } =
    useContext(TeachersAccountContext);
  const { setShowPremiumModal } = useContext(NavigationContext);
  useEffect(() => {
    if (schemesOfWork.length < 1) {
      getWorkSchemes();
    }
    if (lessonPlans.length < 1) {
      getPlans();
    }
  }, [selectedIndex]);

  const getWorkSchemes = async () => {
    try {
      setLoadingSchemes(true);

      let res = await WorkSchemesRepo.getSchemesOfWork();
      setSchemesOfWork(res);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoadingSchemes(false);
    }
  };
  const getPlans = async () => {
    try {
      setLoadingPlans(true);
      let res = await LessonPlanRepo.getLessonPlans();
      setLessonPlans(res);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoadingPlans(false);
    }
  };

  const getSchemesClassLevels = () => {
    let set = new Set(schemesOfWork.map((e) => e.classLevel));
    return Array.from(set);
  };
  const getPlansClassLevels = () => {
    let set = new Set(lessonPlans.map((e) => e.classLevel));
    return Array.from(set);
  };
  const getPlanSubjects = (form: string) => {
    let set = new Set(
      lessonPlans.filter((e) => e.classLevel === form).map((e) => e.subjectType)
    );

    return Array.from(set);
  };

  const handleDownload = (url: string, filename: string) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative min-h-screen py-16 w-full items-center ">
        <div className="flex h-12 items-center justify-start   w-full ">
          <div
            onClick={() => {
              setSelectedIndex(0);
            }}
            className={`  font-semibold flex-1 h-full flex justify-center cursor-pointer items-center rounded-br-md transition-all ${
              selectedIndex == 0
                ? "bg-main bg-opacity-80 dark:bg-darkmain border-b-2 border-main "
                : "dark:bg-darksec  hover:bg-main hover:bg-opacity-70 "
            }`}
          >
            Work Schemes
          </div>
          <div
            onClick={() => {
              setSelectedIndex(1);
            }}
            className={`  font-semibold flex-1 h-full flex justify-center cursor-pointer items-center rounded-bl-md  transition-all ${
              selectedIndex == 1
                ? "bg-main bg-opacity-80  dark:bg-darkmain border-b-2 border-main "
                : "dark:bg-darksec hover:bg-main hover:bg-opacity-70  "
            }`}
          >
            Lesson Plans
          </div>
        </div>

        {selectedIndex == 0 ? (
          <div className="flex flex-col  p-2 w-full h-full">
            {loadingSchemes && (
              <div className="flex flex-col justify-center items-center w-full h-full">
                <LoadingComponent loading={loadingSchemes} color={"main"} />

                <p className="text-sm">loading schemes of work</p>
              </div>
            )}
            {!loadingSchemes && schemesOfWork.length < 1 && (
   
<div className="flex w-full h-[75vh] justify-center items-center flex-col">
<div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div className="flex">
    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p className="font-bold">Oops! No Work Schemes Available For Now. </p>
    </div>
  </div>
</div>
</div>
            )}
            {!loadingSchemes &&
              schemesOfWork.length > 0 &&
              getSchemesClassLevels().map((e) => (
                <div key={e} className="w-full flex flex-col">
                  <p className="text-main font-black text-lg capitalize pl-2">
                    {e}
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start w-full">
                    {schemesOfWork
                      .filter((s) => s.classLevel == e)
                      .map((s) => (
                        <div
                          onClick={() => {
                            if (true) {
                              handleDownload(
                                `${prodUrl}/teacher/view_scheme/${s.fileId}`,
                                `${s.title}.${s.fileId.split(".")[1]}`
                              );
                            } else {
                              setShowPremiumModal(true);
                            }
                          }}
                          className="w-72 p-1 bg-white rounded-md shadow-sm m-1.5 mx-2 hover:shadow-main cursor-pointer dark:bg-darkmain flex justify-center"
                          key={s.id}
                        >
                          <p>{s.title}</p>
                        </div>
                      ))}
                    <div className="w-72 "></div>
                    <div className="w-72 "></div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col   p-2 w-full h-full">
            {loadingPlans && (
              <div className="flex flex-col justify-center items-center w-full h-full">
                <LoadingComponent loading={loadingPlans} color={"main"} />

                <p className="text-sm">loading lesson plans</p>
              </div>
            )}
            {!loadingPlans && lessonPlans.length < 1 && (

<div className="flex w-full h-[75vh] justify-center items-center flex-col">
<div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div className="flex">
    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p className="font-bold">Oops! No Lesson Plans Available For Now. </p>
    </div>
  </div>
</div>
</div>
            )}

            {!loadingPlans &&
              lessonPlans.length > 0 &&
              getPlansClassLevels().map((e) => (
                <div key={e} className="w-full flex flex-col">
                  <p className="text-main font-semibold text-lg capitalize">
                    {e}
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start w-full">
                    {getPlanSubjects(e).map((s) => (
                      <div
                        key={s}
                        className="flex flex-wrap justify-center md:justify-start w-full"
                      >
                        {lessonPlans
                          .filter(
                            (p) => p.classLevel == e && p.subjectType == s
                          )
                          .map((plan) => (
                            <div
                              onClick={() => {
                                if (true) {
                                  handleDownload(
                                    `${prodUrl}/teacher/view_plan/${plan.fileId}`,
                                    `${plan.title}.${plan.fileId.split(".")[1]}`
                                  );
                                } else {
                                  setShowPremiumModal(true);
                                }
                              }}
                              className="w-72 m-2 p-1 bg-white rounded-md hover:shadow-md hover:shadow-main cursor-pointer dark:bg-darkmain flex justify-center"
                              key={plan.id}
                            >
                              <p>{plan.title}</p>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default WorkSchemePage;
