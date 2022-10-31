import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import LessonPlanRepo from "../../../data/repos/lesson_plans_repo";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { TeachersAccountContext } from "../../../presentation/contexts/teachers_account_context";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  classOptions,
  subjectOptions,
} from "../../../presentation/utils/constants";
import {
  getCurrentDate,
  showToast,
} from "../../../presentation/utils/helper_functions";

const UpdateLessonPlan = () => {
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const { lessonPlans, setLessonPlans } = useContext(TeachersAccountContext);
  const { selectedVideoId } = useContext(NavigationContext);

  let plan = lessonPlans.filter((e) => e.id == selectedVideoId)[0];

  //state
  const [title, setTitle] = useState(plan != undefined ? plan.title : "");
  const [subjectType, setSubjectType] = useState(
    plan != undefined ? plan.subjectType : ""
  );
  const [classLevel, setClassLevel] = useState(
    plan != undefined ? plan.classLevel : ""
  );
  const [chapter, setChapter] = useState(plan != undefined ? plan.chapter : "");
  const [chapterNumber, setChapterNumber] = useState(
    plan != undefined ? plan.chapterNumber : 1
  );
  const [topic, setTopic] = useState(plan != undefined ? plan.topic : "");
  const [topicNumber, setTopicNumber] = useState(
    plan != undefined ? plan.topicNumber : 1
  );

  const [term, setTerm] = useState(plan != undefined ? plan.term : "");

  const updateLessonPlan = async () => {
    if (plan != undefined) {
      if (
        title !== plan.title ||
        classLevel !== plan.classLevel ||
        subjectType !== plan.subjectType ||
        topic !== plan.topic ||
        topicNumber !== plan.topicNumber ||
        term !== plan.term
      ) {
        setUpdating(true);
        let updatedplan = plan;
        updatedplan.classLevel = classLevel;
        updatedplan.term = term;
        updatedplan.subjectType = subjectType;
        updatedplan.title = title;
        updatedplan.updatedAt = getCurrentDate();
        try {
          let res = await LessonPlanRepo.updateLessonPlan(updatedplan);
          if (res) {
            showToast("updated", "success");
            router.push("/admin/lesson_plans");
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

  const deleteLessonPlan = async () => {
    if (deleting) {
      return;
    }
    setDeleting(true);
    try {
      let res = await LessonPlanRepo.deleteLessonPlan(selectedVideoId);

      if (res) {
        setLessonPlans(lessonPlans.filter((e) => e.id !== selectedVideoId));
        showToast("deleted", "success");
        router.push("/admin/lesson_plans");
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
            Update Lesson Plan
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
            {/* <div className="flex flex-col m-2">
              <label htmlFor="title">Chapter</label>
              <input
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Chapter Number</label>
              <input
                type={"number"}
                value={chapterNumber}
                onChange={(e) => setChapterNumber(parseInt(e.target.value))}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div> */}
            <div className="flex flex-col m-2">
              <label htmlFor="title">Topic</label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Topic Number</label>
              <input
                type={"number"}
                value={topicNumber}
                onChange={(e) => setTopicNumber(parseInt(e.target.value))}
                className="outline-none bg-white rounded-xl px-3 py-2 w-80 dark:bg-darkmain"
              />
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
            onClick={updateLessonPlan}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-main p-2 text-white"
          >
            {updating && <LoadingComponent loading={updating} color="white" />}
            <p className="font-bold">
              {" "}
              {updating ? "updating ..." : "Update LessonPlan"}
            </p>
          </div>
          <div
            onClick={() => router.push("/admin/lesson_plans")}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-amber-600 p-2 text-white"
          >
            Cancel Process
          </div>
          <div
            onClick={deleteLessonPlan}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-red-600 p-2 text-white"
          >
            {deleting && <LoadingComponent loading={deleting} color="white" />}
            <p className="font-bold">
              {" "}
              {deleting ? "deleting ..." : " Delete LessonPlan"}
            </p>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default UpdateLessonPlan;
