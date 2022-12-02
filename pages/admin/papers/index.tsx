import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import PastPaperRepo from "../../../data/repos/past_paper_repo";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { PastPapersContext } from "../../../presentation/contexts/past_papers_controller";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import { showToast } from "../../../presentation/utils/helper_functions";

const AdminPastPapersPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { pastPapers, setPastPapers } = useContext(PastPapersContext);
  const { setSelectedVideoId } = useContext(NavigationContext);
  const [deleting, setDeleting] = useState(false);

  async function getPastPapers(silent: boolean) {
    if (!silent) {
      setLoading(true);
    }
    try {
      let papers = await PastPaperRepo.getPastPapers();
      //todo sort the videos by form, subject and video, topic numbers
      setPastPapers(papers);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }
  useEffect(() => {
    if (pastPapers.length < 1) {
      getPastPapers(false);
    } else {
      getPastPapers(true);
    }
  }, []);

  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-52 relative h-screen py-16 w-full overflow-x-hidden ">
        <div className="flex h-12 items-center justify-center bg-white  dark:bg-darkmain pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-2xl">
   ALL PAST PAPER
          </div>
        </div>
        {loading ? (
          <div className="flex w-full h-full justify-center items-center">
            <LoadingComponent loading={loading} color="main" />
          </div>
        ) : pastPapers.length < 1 ? (
<div className="flex w-full h-[75vh] justify-center items-center flex-col">
<div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div className="flex">
    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p className="font-bold">Oops! No PAST PAPERS available. </p>
    </div>
  </div>
</div>
</div>
        ) : (
          <div className="flex  overflow-scroll max-h-screen " style={{"scrollbarWidth" : "auto"}}>
            <table className="table-fixed text-left p-1 m-2 rounded-lg border-2 border-main text-ellipsis ">
              <thead
                className="flex p-2 bg-main text-white font-black text-xs"
                style={{ fontFamily: "Montserrat" }}
              >
                <th className="w-10">No.</th>
                <th className="w-28 ">Class Level</th>
                <th className="w-28 ">Subject</th>
                {/* <th className="w-28 ">Chapter</th> */}
                <th className="w-72">Title</th>
                <th className="w-44 ">School Name</th>
                <th className="w-44">Teacher Name</th>

                <th className="w-60">Paper Id </th>
                <th className="w-60">Ms id</th>
              </thead>
              {pastPapers.map((e, i) => (
                <tr
                  key={e.title}
                  className="flex p-2 hover:bg-main hover:text-white  text-xs cursor-pointer border-b-2 border-gray-50"
                  onDoubleClick={() => {
                    setSelectedVideoId(e.paperId);
                    router.push("/admin/papers/update_paper");
                  }}
                >
                  {" "}
                  <td className="w-10 ">{`${i+1} `}.</td>
                  <td className="w-28 ">{e.classLevel}</td>
                  <td className="w-28 ">{e.subjectType}</td>
                  {/* <td className="w-28 ">{e.chapter}</td> */}
                  <td className="w-72 ">{e.title}</td>
                  <td className="w-44 ">{e.schoolName}</td>
                  <td className="w-44 ">{e.teacherName}</td>
                  {/* <td className="w-24 ">{e.isPublished ? "No" : "Yes"}</td> */}
                  <td className="w-60 ">{e.paperUrl.split("/").pop()}</td>
                  <td className="w-60  text-ellipsis ">
                    {e.markingSchemeUrl.split("/").pop()}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        )}

        
        <div
          onClick={() => router.push("/admin/papers/add_paper")}
          className="py-2 rounded-md flex items-center cursor-pointer text-white bg-main w-44 justify-center absolute bottom-8 right-4"
        >
  ADD NEW PAST PAPER
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminPastPapersPage;
