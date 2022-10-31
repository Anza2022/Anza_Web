import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import PastPaperRepo from "../../../../data/repos/past_paper_repo";
import LoadingComponent from "../../../../presentation/components/others/loading_component";
import { LoggedInUserContext } from "../../../../presentation/contexts/loggedin_user_controller";
import { NavigationContext } from "../../../../presentation/contexts/navigation_state_controller";
import { TeachersAccountContext } from "../../../../presentation/contexts/teachers_account_context";
import DashboardLayout from "../../../../presentation/layouts/dashboard_layout";
import { showToast } from "../../../../presentation/utils/helper_functions";

const TeacherPastPapers = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { user, isProfileComplete } = useContext(LoggedInUserContext);
  const { setSelectedVideoId } = useContext(NavigationContext);
  const { myPastPapers, setMyPastPapers } = useContext(TeachersAccountContext);
  const getTeachersPastPapers = async () => {
    setLoading(true);
    try {
      let res = await PastPaperRepo.getTeacherPastPapers(user[0].userId);
      setMyPastPapers(res);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTeachersPastPapers();
  }, []);

  const [deleteId, setDeleteId] = useState("");
  const [deleteName, setDeleteName] = useState("");
  const deletePaper = async () => {
    if (deleting) {
      return;
    }
    setDeleting(true);
    try {
      let res = await PastPaperRepo.deletePastPaper(deleteId);

      if (res) {
        setMyPastPapers(myPastPapers.filter((e) => e.paperId !== deleteId));
        showToast("Deleted", "success");
      }
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setDeleting(false);
    }
  };

  //delete popup
  const [showPopup, setShowPopup] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative min-h-screen py-16 w-full items-center ">
        <div className="flex h-12 items-center justify-start  pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg md:text-2xl dark:text-white">
            MY PAST PAPERS
          </div>
        </div>
        {/* confirm delete popup */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              onClick={() => setShowPopup(false)}
              className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                onClick={() => {}}
                className=" rounded-xl shadow-xs bg-white dark:bg-darksec flex flex-col p-4 w-80 md:w-96 "
              >
                <p className="font-bol">
                  Are you sure you want to delete this paper?
                </p>
                <p className="text-xl font-bold p-2 ">{deleteName.toUpperCase()} </p>
                <div className="h-8"></div>
                <div className="flex justify-between text-white">
                  <div
                    onClick={deletePaper}
                    className="px-3 py-1 bg-red-600 cursor-pointer rounded-md text-xs"
                  >
                    {deleting && (
                      <LoadingComponent loading={deleting} color="white" />
                    )}
                    <p> {deleting ? "Deleting..." : "Confirm "}</p>
                  </div>
                  <div
                    onClick={() => setShowPopup(false)}
                    className="px-3 py-1 bg-main cursor-pointer rounded-md text-xs"
                  >
                    <p> Cancel</p>
                  </div>
                </div>
                <div className="h-4"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {loading ? (
          <div className="flex flex-col justify-center h-96 items-center w-full mt-5 ">
            <LoadingComponent loading={loading} color="secondary" />
          </div>
        ) : myPastPapers.length < 1 ? (

<div className="flex w-full h-[75vh] justify-center items-center flex-col">
<div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div className="flex">
    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p className="font-bold">You have not added a past paper </p>
    </div>
  </div>
</div>
</div>


        ) : (
          <div className="flex flex-wrap justify-around min-h-screen w-full">
            {myPastPapers.map((e) => (
              <div
                key={e.paperId}
                className="flex w-80 rounded-lg bg-white m-2 dark:bg-darkmain p-2 flex-col "
              >
                <p className="text-sm font-bold">{e.title.toUpperCase()}</p>
                <div className="flex-1"></div>
                <div className="h-2"></div>
                <div className="flex justify-between text-white">
                  <div
                    onClick={() => {
                      setSelectedVideoId(e.paperId);
                      router.push("/dashboard/tcorner/papers/preview");
                    }}
                    className="px-3 py-1 bg-main cursor-pointer rounded-md text-xs"
                  >
                    Preview
                  </div>
                  <div
                    onClick={() => {
                      setDeleteId(e.paperId);
                      setDeleteName(e.title);
                      setShowPopup(true);
                    }}
                    className="px-3 py-1 bg-red-600 cursor-pointer rounded-md text-xs"
                  >
                    {deleting && (
                      <LoadingComponent loading={deleting} color="white" />
                    )}
                    <p> {deleting ? "Deleting..." : "Delete"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div
          onClick={() => {
            if (isProfileComplete()) {
              router.push("/dashboard/tcorner/papers/add_new");
            } else {
              router.push("/dashboard/profile");
            }
          }}
          className="py-2 rounded-md flex items-center cursor-pointer text-white bg-main w-44 justify-center fixed bottom-3 right-4"
        >
          Add New Past Paper
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherPastPapers;
