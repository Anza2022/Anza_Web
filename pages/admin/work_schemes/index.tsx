import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import WorkSchemesRepo from "../../../data/repos/work_schemes_repo";

import LoadingComponent from "../../../presentation/components/others/loading_component";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { TeachersAccountContext } from "../../../presentation/contexts/teachers_account_context";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  formatDateString,
  showToast,
} from "../../../presentation/utils/helper_functions";

const AdminSchemesOfWorkPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { schemesOfWork, setSchemesOfWork } = useContext(
    TeachersAccountContext
  );
  const { setSelectedVideoId } = useContext(NavigationContext);
  const [deleting, setDeleting] = useState(false);

  async function getSchemesOfWork() {
    setLoading(true);

    try {
      let schemes = await WorkSchemesRepo.getSchemesOfWork();
      setSchemesOfWork(schemes);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (schemesOfWork.length < 1) {
      getSchemesOfWork();
    }
  }, []);

  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-52 relative h-screen py-16 w-full overflow-x-hidden ">
        <div className="flex h-12 items-center justify-center bg-white  dark:bg-darkmain pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-2xl">
    SCHEMES OF WORK
          </div>
        </div>
        {loading ? (
          <div className="flex w-full h-full justify-center items-center">
            <LoadingComponent loading={loading} color="main" />
          </div>
        ) : schemesOfWork.length < 1 ? (
          <div className="flex w-full h-[75vh] justify-center items-center flex-col">
          <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
            <div className="flex">
              <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
              <div>
                <p className="font-bold">Oops! No SCHEMES OF WORK available. </p>
              </div>
            </div>
          </div>
          </div>
        ) : (
          <div className="flex  overflow-scroll max-h-screen ">
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
                <th className="w-72 ">File Name</th>
                <th className="w-44">Added On</th>
              </thead>
              {schemesOfWork.map((e, i) => (
                <tr
                  key={e.id}
                  className="flex p-2 hover:bg-main hover:text-white  text-xs cursor-pointer border-b-2 border-gray-50"
                  onDoubleClick={() => {
                    setSelectedVideoId(e.id);
                    router.push("/admin/work_schemes/update_work_scheme");
                  }}
                >
                  {" "}
                  <td className="w-10 ">{`${i} `}.</td>
                  <td className="w-28 ">{e.classLevel}</td>
                  <td className="w-28 ">{e.subjectType}</td>
                  {/* <td className="w-28 ">{e.chapter}</td> */}
                  <td className="w-72 ">{e.title}</td>
                  <td className="w-72 text-[9px]">{e.fileId}</td>
                  <td className="w-44 ">{formatDateString(e.createdAt)}</td>
                </tr>
              ))}
            </table>
          </div>
        )}
        <div
          onClick={() => router.push("/admin/work_schemes/add_work_scheme")}
          className="py-2 rounded-xl flex items-center cursor-pointer text-white bg-main w-44 justify-center absolute bottom-8 right-4"
        >
          Add Work Scheme
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminSchemesOfWorkPage;
