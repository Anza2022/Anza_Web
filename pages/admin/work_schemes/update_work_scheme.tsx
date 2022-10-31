import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import WorkSchemesRepo from "../../../data/repos/work_schemes_repo";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { TeachersAccountContext } from "../../../presentation/contexts/teachers_account_context";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  classOptions,
  papernumberoptions,
  pastpaperCategories,
  subjectOptions,
} from "../../../presentation/utils/constants";
import {
  getCurrentDate,
  showToast,
} from "../../../presentation/utils/helper_functions";

const UpdatePaper = () => {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { schemesOfWork, setSchemesOfWork } = useContext(
    TeachersAccountContext
  );
  const { selectedVideoId } = useContext(NavigationContext);

  let scheme = schemesOfWork.filter((e) => e.id == selectedVideoId)[0];

  //state
  const [title, setTitle] = useState(scheme != undefined ? scheme.title : "");
  const [subjectType, setSubjectType] = useState(
    scheme != undefined ? scheme.subjectType : ""
  );
  const [classLevel, setClassLevel] = useState(
    scheme != undefined ? scheme.classLevel : ""
  );

  const [term, setTerm] = useState(scheme != undefined ? scheme.term : "");

  const updateWorkScheme = async () => {
    if (scheme != undefined) {
      if (
        title !== scheme.title ||
        classLevel !== scheme.classLevel ||
        subjectType !== scheme.subjectType ||
        term !== scheme.term
      ) {
        setUpdating(true);
        let updatedscheme = scheme;
        updatedscheme.classLevel = classLevel;
        updatedscheme.term = term;
        updatedscheme.subjectType = subjectType;
        updatedscheme.title = title;
        updatedscheme.updatedAt = getCurrentDate();
        try {
          let res = await WorkSchemesRepo.updateWorkScheme(updatedscheme);
          if (res) {
            showToast("updated", "success");
            router.push("/admin/work_schemes");
          }
        } catch (e) {
          showToast(`${e}`, "error");
        } finally {
          setUpdating(false);
        }
      } else {
        showToast("up to date", "success");
      }
    }
  };

  const deleteWorkScheme = async () => {
    if (deleting) {
      return;
    }
    setDeleting(true);
    try {
      let res = await WorkSchemesRepo.deleteWorkScheme(selectedVideoId);

      if (res) {
        setSchemesOfWork(schemesOfWork.filter((e) => e.id !== selectedVideoId));
        showToast("deleted", "success");
        router.push("/admin/work_schemes");
      }
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-52 w-full ">
        <div className="flex h-12 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-main font-black text-2xl">
            Update Work Scheme
          </div>
        </div>
        <div className="flex flex-col  items-center w-full">
          <div className="flex flex-wrap w-full justify-center md:justify-start ">
            <div className="flex flex-col m-2">
              <label htmlFor="title">Class Level</label>
              <select
                name="classlevel"
                id="classlevel "
                value={classLevel}
                onChange={(v) => setClassLevel(v.target.value.toLowerCase())}
                className="px-3 py-2 w-80 outline-none bg-white rounded-xl  dark:bg-darkmain"
              >
                <option value="">Select Level</option>
                {classOptions.map((e) => (
                  <option key={e} value={e.toLowerCase()}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Subject Type</label>
              <select
                name="subject"
                id="subject "
                value={subjectType}
                onChange={(v) => setSubjectType(v.target.value)}
                className="px-2 py-2 w-80  outline-none bg-white rounded-xl  dark:bg-darkmain"
              >
                {" "}
                <option value="">Select Subject Type</option>
                {subjectOptions.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Term</label>
              <select
                name="subject"
                id="subject "
                value={term}
                onChange={(v) => setTerm(v.target.value)}
                className="px-2 py-2 w-80  outline-none bg-white rounded-xl  dark:bg-darkmain"
              >
                {" "}
                <option value="">Select Term</option>
                {["Term 1", "Term 2", "Term 3"].map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col m-2">
              <label htmlFor="title"> Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-around mt-9">
          <div
            onClick={updateWorkScheme}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-main p-2 text-white"
          >
            {updating && <LoadingComponent loading={updating} color="white" />}
            <p className="font-bold">
              {" "}
              {updating ? "updating ..." : "Update WorkScheme"}
            </p>
          </div>
          <div
            onClick={() => router.push("/admin/work_schemes")}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-amber-600 p-2 text-white"
          >
            Cancel Process
          </div>
          <div
            onClick={deleteWorkScheme}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-red-600 p-2 text-white"
          >
            {deleting && <LoadingComponent loading={deleting} color="white" />}
            <p className="font-bold">
              {" "}
              {deleting ? "deleting ..." : " Delete WorkScheme"}
            </p>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default UpdatePaper;
