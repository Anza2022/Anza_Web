import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import ExaminerTalksRepo from "../../../data/repos/examiner_talks_repo";
import ExaminerTalk from "../../../models/curriculum/examiner_talk_model";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { ExaminerTalksContext } from "../../../presentation/contexts/examiner_talks_controller";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import { showToast } from "../../../presentation/utils/helper_functions";

const ExaminerTalksPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { talks, setTalks } = useContext(ExaminerTalksContext);

  async function getExaminerTalks() {
    setLoading(true);
    try {
      let res = await ExaminerTalksRepo.getExaminerTalks();
      setTalks([...talks, ...res]);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  }
  const { setSelectedVideoId } = useContext(NavigationContext);
  useEffect(() => {
    getExaminerTalks();
  }, []);

  const getSubjects = () => {
    let set = new Set(talks.map((e) => e.subjectType));

    return Array.from(set);
  };

  const getSubjectTalks = (subject: string): ExaminerTalk[] => {
    return talks.filter((e) => e.subjectType == subject);
  };

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative  py-16 w-full items-center ">
        <div className="flex h-12 items-center justify-center  pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg md:text-2xl">
            Examiner Talks
          </div>
        </div>
        {loading ? (
          <div className="flex h-96 justify-center items-center">
            <LoadingComponent loading={loading} color="secondary" />
          </div>
        ) : getSubjects().length < 1 ? (
          <div className="h-[500px] w-full flex flex-col justify-center items-center">
            <p className="font-black text-xl">Opps</p>
            <p>No Examiner Talks Available</p>
          </div>
        ) : (
          getSubjects().map((e) => (
            <div key={e} className="flex flex-col w-full">
              <p className="p-3 text-center text-2xl md:text-3xl font-black">
                {e[0].toUpperCase()}
                {e.substring(1)}
              </p>
              <hr className="h-1" />
              <div className="flex flex-wrap w-full justify-around">
                {getSubjectTalks(e).map((e) => (
                  <div
                    key={e.title}
                    className="w-[330px] md:w-[430px]  bg-white  dark:bg-darkmain rounded-lg pb-4 hover:shadow-2xl my-3"
                  >
                    <img
                      src={e.thumbnailUrl}
                      alt="thumbnail not found"
                      className="w-full h-40 rounded-lg object-cover "
                    />
                    <p className="font-bold text-center p-3">{e.title}</p>
                    <div className="flex w-full justify-between px-4">
                      <p>By {e.examinerName}</p>
                      <p>From {e.examinerSchool}</p>
                    </div>
                    <div className="flex justify-between p-1 px-4">
                      <div className="py-1 flex text-amber-500">
                        <p className="text-black mr-2">4.5</p>
                        {Array(5)
                          .fill(0)
                          .map((e, i) => (
                            <AiFillStar
                              key={i}
                              size={20}
                              className={`${i === 4 ? "text-gray-300" : ""}`}
                            />
                          ))}
                      </div>
                      <div className="flex space-x-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-sm"> 7 hrs</p>
                      </div>
                    </div>
                    <div className="flex justify-end  px-4 mt-3">
                      <div
                        onClick={() => {
                          setSelectedVideoId(e.talkId);
                          router.push("/dashboard/examiner_talks/view_talk");
                        }}
                        className="flex px-5 text-xs py-2 rounded-lg text-white cursor-pointer bg-main"
                      >
                        View Talk
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default ExaminerTalksPage;
