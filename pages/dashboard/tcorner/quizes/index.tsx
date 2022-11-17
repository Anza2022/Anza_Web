import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import GamifiedQuizRepo from "../../../../data/repos/gamified_quiz_repo";
import LoadingComponent from "../../../../presentation/components/others/loading_component";
import { LoggedInUserContext } from "../../../../presentation/contexts/loggedin_user_controller";
import { NavigationContext } from "../../../../presentation/contexts/navigation_state_controller";
import { TeachersAccountContext } from "../../../../presentation/contexts/teachers_account_context";
import DashboardLayout from "../../../../presentation/layouts/dashboard_layout";
import { prodUrl } from "../../../../presentation/utils/constants";
import { showToast } from "../../../../presentation/utils/helper_functions";

const AddGamifiedQuestions = () => {
  const { setSelectedVideoId } = useContext(NavigationContext);
  const { user, isProfileComplete } = useContext(LoggedInUserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { myQuizzes, setMyQuizzes } = useContext(TeachersAccountContext);
  const getTeacherquizes = async () => {
    setLoading(true);
    try {
      let res = await GamifiedQuizRepo.getTeacherQuizes(user[0].userId);
      setMyQuizzes(res);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeacherquizes();
  }, []);
  const [deleting, setDeleting] = useState(false);
  const deleteGamifiedQuiz = async (testid: string) => {
    setDeleting(true);
    try {
      let res = await GamifiedQuizRepo.deleteGamifiedQuiz(testid);
      if (res) {
        setMyQuizzes(myQuizzes.filter((e) => e.testId != testid));
      }
      showToast(`Question deleted!`, "success");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setDeleting(false);
    }
  };
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative min-h-screen py-16 w-full items-center ">
        <div className="flex h-12 items-center justify-start  pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg md:text-2xl dark:text-white">
            My Gamified Quizzes
          </div>
        </div>
        {loading && (
          <div className="flex flex-col justify-center items-center h-96 w-full">
            <LoadingComponent loading={loading} color={"main"} />
            <p className="text-xs mt-1">loading my tests...</p>
          </div>
        )}
        {!loading && myQuizzes.length < 1 && (
          <div className="flex w-full h-[75vh] justify-center items-center flex-col">
            <div
              className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-teal-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold mt-1">Oops! No test found. </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* view_thumbnail/quizes/ */}
        {!loading && myQuizzes.length > 0 && (
          <div className="flex w-full flex-wrap">
            {myQuizzes.map((e) => (
              <div
                key={e.testId}
                className="w-72  rounded-lg flex flex-col justify-around items-center bg-white dark:bg-darkmain cursor-pointer m-1"
              >
                <img
                  className="w-full h-48 rounded-md"
                  src={`${prodUrl}/view_thumbnail/quizes/${e.thumbnailUrl}`}
                  alt="img missing"
                />
                <p className="text-center">{e.title}</p>
                <div className="flex justify-between w-full px-4">
                  <p className="text-sm">{e.questions.length} Questions</p>
                </div>
                <div className="flex justify-between px-2 w-full">
                  <p
                    onClick={() => {
                      window.confirm(
                        "Are you sure you want to delete this Question?"
                      ) && deleteGamifiedQuiz(e.testId);
                    }}
                    className="cursor-pointer text-red-600 px-2 text-sm hover:underline hover:text-red-700 transition-all py-1"
                  >
                    {deleting ? "deleting ..." : "DELETE"}
                  </p>
                  <p
                    onClick={() => {
                      setSelectedVideoId(e.testId);
                      router.push("/dashboard/tcorner/quizes/edit_test");
                    }}
                    className="cursor-pointer text-blue-700 px-2 text-sm hover:underline hover:text-main transition-all py-1"
                  >
                    EDIT
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          onClick={() => {
            if (isProfileComplete()) {
              router.push("/dashboard/tcorner/quizes/add_new_test");
            } else {
              router.push("/dashboard/profile");
            }
          }}
          className="py-2 rounded-xl flex items-center cursor-pointer text-white bg-main w-44 justify-center fixed bottom-3 right-4"
        >
          Add New Test
        </div>
      </div>
    </DashboardLayout>
  );
};
export default AddGamifiedQuestions;
