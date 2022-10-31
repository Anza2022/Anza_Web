import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import PastPaperRepo from "../../../data/repos/past_paper_repo";
import PastPaperModel from "../../../models/curriculum/past_paper_model";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { PastPapersContext } from "../../../presentation/contexts/past_papers_controller";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
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
  const { pastPapers, setPastPapers } = useContext(PastPapersContext);
  const { selectedVideoId } = useContext(NavigationContext);

  let paper = pastPapers.filter((e) => e.paperId == selectedVideoId)[0];

  //state
  const [title, setTitle] = useState(paper != undefined ? paper.title : "");
  const [subjectType, setSubjectType] = useState(
    paper != undefined ? paper.subjectType : ""
  );
  const [classLevel, setClassLevel] = useState(
    paper != undefined ? paper.classLevel : ""
  );
  const [schoolName, setSchoolName] = useState(
    paper != undefined ? paper.schoolName : ""
  );
  const [ownerName, setownerName] = useState(
    paper != undefined ? paper.teacherName : ""
  );
  const [year, setYear] = useState(paper != undefined ? paper.year : 2010);
  const [term, setTerm] = useState(paper != undefined ? paper.term : "general");
  const [paperNumber, setPaperNumber] = useState(
    paper != undefined ? paper.paperNumber : ""
  );

  const updatePaper = async () => {
    if (paper != undefined) {
      if (
        title !== paper.title ||
        classLevel !== paper.classLevel ||
        subjectType !== paper.subjectType ||
        ownerName !== paper.teacherName ||
        year !== paper.year ||
        paperNumber !== paper.paperNumber
      ) {
        setUpdating(true);
        let updatedPaper = new PastPaperModel(
          paper.paperId,
          title,
          paper.paperUrl,
          paper.markingSchemeUrl,
          classLevel,
          subjectType,
          paperNumber,
          schoolName,
          ownerName,
          paper.createdAt,
          getCurrentDate(),
          year,
          paper != undefined ? paper.ownerId : "",
          term
        );
        try {
          let res = await PastPaperRepo.updatePastPaper(updatedPaper);
          if (res) {
            showToast("updated", "success");
            router.push("/admin/papers");
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

  const deletePaper = async () => {
    if (deleting) {
      return;
    }
    setDeleting(true);
    try {
      let res = await PastPaperRepo.deletePastPaper(selectedVideoId);

      if (res) {
        setPastPapers(pastPapers.filter((e) => e.paperId !== selectedVideoId));
        showToast("deleted", "success");
        router.push("/admin/papers");
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
            Update Past Paper
          </div>
        </div>

        <div className="flex flex-wrap w-full justify-center md:justify-start ">
          <div className="flex flex-col m-2">
            <label htmlFor="title"> Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2 w-80"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="title">Class Level</label>
            <select
              name="classlevel"
              id="classlevel "
              value={classLevel}
              onChange={(v) => setClassLevel(v.target.value.toLowerCase())}
              className="px-3 py-2 w-80 outline-none bg-white rounded-xl dark:bg-darkmain "
            >
              <option value="">Select Level</option>
              {pastpaperCategories.map((e) => (
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
              className="px-3 py-2 w-80  outline-none bg-white dark:bg-darkmain rounded-xl "
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
            <label htmlFor="title">Paper Number</label>
            <select
              name="paperno"
              id="paperno "
              value={paperNumber}
              onChange={(v) => setPaperNumber(v.target.value)}
              className="px-3 py-2 w-80  outline-none bg-white dark:bg-darkmain rounded-xl "
            >
              {" "}
              <option value="">Select paper no</option>
              {papernumberoptions.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="year"> Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2 w-80"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="topic"> School Name</label>
            <input
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2 w-80"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="topic"> Teacher Name</label>
            <input
              value={ownerName}
              onChange={(e) => setownerName(e.target.value)}
              className="outline-none bg-white dark:bg-darkmain rounded-xl px-3 py-2 w-80"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-around mt-9">
          <div
            onClick={updatePaper}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-main p-2 text-white"
          >
            {updating && <LoadingComponent loading={updating} color="white" />}
            <p className="font-bold">
              {" "}
              {updating ? "updating ..." : "Update Paper"}
            </p>
          </div>
          <div
            onClick={() => router.push("/admin/papers")}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-amber-600 p-2 text-white"
          >
            Cancel Process
          </div>
          <div
            onClick={deletePaper}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-red-600 p-2 text-white"
          >
            {deleting && <LoadingComponent loading={deleting} color="white" />}
            <p className="font-bold">
              {" "}
              {deleting ? "deleting ..." : " Delete Paper"}
            </p>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default UpdatePaper;
