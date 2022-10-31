import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { BiTimer, BiTimeFive, BiDollarCircle } from "react-icons/bi";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaUsers, FaSchool } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { MdOutlineVerified } from "react-icons/md";
import LiveClassesRepo from "../../../../data/repos/live_classes_repo";
import LiveClassModel from "../../../../models/curriculum/live_class_model";
import LiveClassComponent, {
  TeacherLiveClassComponent,
} from "../../../../presentation/components/dashboard/live_class_component";
import LoadingComponent from "../../../../presentation/components/others/loading_component";
import { LiveClassesContext } from "../../../../presentation/contexts/live_classes_controller";
import { LoggedInUserContext } from "../../../../presentation/contexts/loggedin_user_controller";
import DashboardLayout from "../../../../presentation/layouts/dashboard_layout";
import {
  formatDateString,
  getCurrentDate,
  showToast,
} from "../../../../presentation/utils/helper_functions";

const TeacherLiveClassesPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(LoggedInUserContext);
  const { teacherClasses, setTeacherClasses } = useContext(LiveClassesContext);
  async function getMyClasses() {
    setLoading(true);

    try {
      let classes = await LiveClassesRepo.getTeacherLiveClasses(
        user[0] != undefined ? user[0].userId : ""
      );
      setTeacherClasses(classes);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (teacherClasses.length < 1) {
      getMyClasses();
    }
  }, []);
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative min-h-screen py-16 w-full items-center ">
        <div className="flex h-12 items-center justify-start  pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg md:text-xl">
            MY LIVE CLASSES
          </div>
        </div>
        <div className="flex flex-wrap w-full  justify-center md:justify-start ">
          {loading && (
            <div className="flex flex-col h-[80vh] w-full justify-center items-center">
              <LoadingComponent color="main" loading={loading} />
              <p className="py-1 text-xs">loading my classes ...</p>
            </div>
          )}
          {!loading &&
            teacherClasses.length <= 0 && (
<div className="flex w-full h-[75vh] justify-center items-center flex-col">
<div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div className="flex">
    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p className="font-bold">Oops! You have not added any Live classes. </p>
    </div>
  </div>
</div>
</div>
            )}


          {!loading &&
            teacherClasses.map((e, i) => {
              return <TeacherLiveClassComponent liveclass={e} key={e.id} />;
            })}
        </div>

        <div
          onClick={() => {
            router.push("/dashboard/tcorner/live_classes/add_class");
          }}
          className="py-2 rounded-md flex items-center cursor-pointer text-white bg-main w-44 justify-center fixed bottom-4 right-4"
        >
          Create New Class
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherLiveClassesPage;
