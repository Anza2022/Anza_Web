import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import PastPaperRepo from "../../../data/repos/past_paper_repo";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { IsDarkThemeContext } from "../../../presentation/contexts/app_theme_controller";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { PastPapersContext } from "../../../presentation/contexts/past_papers_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import { pastpaperCategories } from "../../../presentation/utils/constants";
import { showToast } from "../../../presentation/utils/helper_functions";

const PastPapersPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { pastPapers, setPastPapers, selectedPaperId, setSelectedPaperId } =
    useContext(PastPapersContext);
  const { setSelectedForm, setSelectedVideoId, setSelectedSubject } =
    useContext(NavigationContext);

  async function getPastPapers() {
    setLoading(true);
    try {
      let papers = await PastPaperRepo.getPastPapers();
      setPastPapers(papers);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (pastPapers.length < 1) {
      getPastPapers();
    }
  }, []);
  const getClassLevels = () => {
    let set = new Set(pastPapers.map((e) => e.classLevel));
    return Array.from(set);
  };
  const getSubjects = (form: string) => {
    let set = new Set(
      pastPapers.filter((e) => e.classLevel === form).map((e) => e.subjectType)
    );

    return Array.from(set);
  };
  const getTotalPapersNumber = (form: string, subject: string): number => {
    return pastPapers.filter(
      (e) => e.classLevel == form && e.subjectType == subject
    ).length;
  };
  const getAllSchools = (form: string, subject: string) => {
    let set = new Set(
      pastPapers
        .filter((e) => e.classLevel == form && e.subjectType == subject)
        .map((e) => e.schoolName)
    );
    return Array.from(set).length;
  };
  const { thememode } = useContext(IsDarkThemeContext);
  return (
    <DashboardLayout>
      <div className="flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative py-16 w-full items-center min-h-screen  ">
        {/* <div className="flex h-12 items-center justify-center bg-white pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg md:text-2xl">
            Past Papers
          </div>
        </div> */}

        {loading && (
          <div className="flex flex-col justify-center items-center h-96 w-full">
            <LoadingComponent loading={loading} color={"main"} />
            <p className="text-xs mt-1">loading past papers...</p>
          </div>
        )}
        {!loading && getClassLevels().length < 1 && (
  <div className="flex w-full h-[75vh] justify-center items-center flex-col">
  <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
    <div className="flex">
      <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
      <div>
        <p className="font-bold">Oops! No past papers available. </p>
      </div>
    </div>
  </div>
  </div>
        )}

        {!loading &&
          getClassLevels().length > 0 &&
          getClassLevels().map((e, i) => (
            <div
              key={e}
              className="flex flex-col my-3 text-sm md:mb-10
              "
            >
              <p
                className="text-center ml-5   font-black text-xl mb-2 md:text-2xl text-main"
                style={{ fontFamily: "Montserrat" }}
              >
                {" "}
                {e[0].toUpperCase()}
                {e.substring(1).toUpperCase()} REVISION PAPERS
              </p>
              <div className="flex flex-wrap w-full justify-center md:justify-start ">
                {getSubjects(e).map((l) => (
                  <div
                    key={l}
                    onClick={() => {
                      setSelectedForm(e);
                      setSelectedSubject(l);
                      router.push("/dashboard/papers/all");
                    }}
                    className=" w-full bg-white rounded-md p-3 dark:bg-darkmain hover:bg-gray-200  flex flex-col  m-1.5 shadow-sm transition-all hover:shadow-main  cursor-pointer"
                  >
                    <div className="flex justify-between p-1">
                      <p className=" font-black  p-1 ">
                        {/* {e[0].toUpperCase()}
                        {e.substring(1)} */}
                            {e.toUpperCase()} {" "}
                         {l[0].toUpperCase()}
                        {l.substring(1)}
                      </p>
                      <p className="text-yellow-500  font-black text-lg px-5">
                        {getTotalPapersNumber(e, l)}
                      </p>
                    </div>
                  </div>
                ))}

                <div className=" pb-4 w-80 md:w-[430px]  rounded-2xl  cursor-pointer flex flex-col  lg:mx-10 m-3"></div>
              </div>
            </div>
          ))}
      </div>
    </DashboardLayout>
  );
};

export default PastPapersPage;
