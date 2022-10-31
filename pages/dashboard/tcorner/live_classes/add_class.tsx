import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import LiveClassesRepo from "../../../../data/repos/live_classes_repo";
import LiveClassModel from "../../../../models/curriculum/live_class_model";
import LoadingComponent from "../../../../presentation/components/others/loading_component";
import { LiveClassesContext } from "../../../../presentation/contexts/live_classes_controller";
import { LoggedInUserContext } from "../../../../presentation/contexts/loggedin_user_controller";
import DashboardLayout from "../../../../presentation/layouts/dashboard_layout";
import {
  getCurrentDate,
  showToast,
} from "../../../../presentation/utils/helper_functions";

const AddNewLiveClassPage = () => {
  const { user } = useContext(LoggedInUserContext);
  const [title, setTitle] = useState("");
  const [dayDate, setDayDate] = useState("2022-07-10");
  const [dayTime, setDayTime] = useState("10:00 am");
  const [duration, setDuration] = useState(60);
  const [price, setPrice] = useState(500);
  const [teacherName, setTeacherName] = useState(
    user[0] != undefined ? user[0].userName : ""
  );
  const [teacherSchool, setTeacherSchool] = useState(
    user[0] != undefined ? user[0].schoolName : ""
  );

  const [savingClass, setSavingClass] = useState(false);

  const router = useRouter();
  const { teacherClasses, setTeacherClasses } = useContext(LiveClassesContext);
  const handleSaveClass = async () => {
    if (title == "") {
      showToast("Kindly Enter Class Title", "error");
      return;
    }

    setSavingClass(true);

    try {
      let newclass = new LiveClassModel(
        "",
        title,
        dayDate,
        dayTime,
        duration,
        price,
        getCurrentDate(),
        getCurrentDate(),
        false,
        user[0].userId,
        teacherName,
        teacherSchool,
        "",
        []
      );

      let res = await LiveClassesRepo.addLiveClass(newclass);
      setTeacherClasses([res, ...teacherClasses]);
      showToast("Class Created Successfully", "success");
      router.push("/dashboard/tcorner/live_classes");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setSavingClass(false);
    }
  };
  const handleCancelProcess = () => {
    router.push("/dashboard/tcorner/live_classes");
  };
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative min-h-screen py-16 w-full items-center ">
        <div className="flex h-12 items-center justify-center  pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg text-xl md:text-xl items-center justify-center text-center">
            ADD NEW LIVE CLASS
          </div>
        </div>
        <div className="flex flex-wrap w-full justify-around ">
          <div className="flex flex-col m-2">
            <label htmlFor="title">CLASS TITLE</label>
            <input
              value={title}
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              className="outline-none bg-white rounded-md px-3 py-2 w-80 dark:bg-darkmain"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="title">CLASS DATE</label>
            <input
              value={dayDate}
              onChange={(e) => setDayDate(e.target.value)}
              className="outline-none bg-white rounded-md px-3 py-2 w-80 dark:bg-darkmain"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="title">CLASS TIME</label>
            <input
              value={dayTime}
              onChange={(e) => setDayTime(e.target.value)}
              className="outline-none bg-white rounded-md px-3 py-2 w-80 dark:bg-darkmain"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="title">
              CLASS DURATION <span className="text-sm">(in minutes)</span>
            </label>
            <input
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="outline-none bg-white rounded-md px-3 py-2 w-80 dark:bg-darkmain"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="title">PRICE PER STUDENT</label>
            <input
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="outline-none bg-white rounded-md px-3 py-2 w-80 dark:bg-darkmain"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="title">TEACHER NAME</label>
            <input
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="outline-none bg-white rounded-md px-3 py-2 w-80 dark:bg-darkmain"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="title">TEACHER SCHOOL</label>
            <input
              value={teacherSchool}
              onChange={(e) => setTeacherSchool(e.target.value)}
              className="outline-none bg-white rounded-md px-3 py-2 w-80 dark:bg-darkmain"
            />
          </div>
          <div className="w-80"></div>
        </div>
        <div className="w-full mt-5 flex flex-wrap justify-around">
          <div
            onClick={handleSaveClass}
            className="px-8 py-2  my-2 rounded-md bg-main text-white shadow-xl cursor-pointer flex items-center"
          >
            <LoadingComponent loading={savingClass} color="main" />
            <p> {savingClass ? "saving class ..." : "SAVE CLASS"}</p>
            {savingClass ? <p className="text-xs">please wait</p> : <p></p>}
          </div>
          <div
            onClick={handleCancelProcess}
            className="px-8 py-2 rounded-md my-2 bg-red-600 text-white shadow-xl cursor-pointer"
          >
            CANCEL
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddNewLiveClassPage;
