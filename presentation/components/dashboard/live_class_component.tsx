import React, { PropsWithChildren, useContext } from "react";
import { BiTimer, BiTimeFive, BiDollarCircle } from "react-icons/bi";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaUsers, FaSchool } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { MdOutlineVerified } from "react-icons/md";
import LiveClassModel from "../../../models/curriculum/live_class_model";
import { LoggedInUserContext } from "../../contexts/loggedin_user_controller";
import { formatDateString, showToast } from "../../utils/helper_functions";

const LiveClassComponent = (
  props: PropsWithChildren<{ liveclass: LiveClassModel }>
) => {
  const { user } = useContext(LoggedInUserContext);
  return (
    <div className="w-80 bg-gray-50 transition-all shadow-md hover:shadow-main dark:bg-darkmain flex flex-col justify-between items-center p-2 rounded-lg m-2 mx-3 px-3 text-sm">
      <div className="flex w-full justify-between">
        <p className=" flex-1 font-semibold text-main text-left mb-1 text-[12px]">
          {props.liveclass.title}
        </p>
        <MdOutlineVerified size={20} color="darkgreen" />
      </div>
      <div className="flex space-x-4 items-center justify-between w-full">
        <div className="flex space-x-1 items-center">
          <BiTimer size={17} />
          <p className="font-bold text-amber-400 text-xs">
            {props.liveclass.duration} mins
          </p>
        </div>
        <div className="flex space-x-1 items-center">
          <FaUsers size={17} />
          <p className="font-semibold text-amber-400 text-xs">
            {props.liveclass.studentsIds.length} students
          </p>
        </div>
      </div>{" "}
      <div className="flex  items-center w-full justify-between my-2">
        <div className="flex space-x-1 items-center">
          <BsFillCalendarDateFill size={15} />
          <p className="text-xs">{formatDateString(props.liveclass.dayDate)}</p>
        </div>
        <div className="flex space-x-1 items-center">
          <BiTimeFive size={20} />

          <p className="text-xs">{props.liveclass.dayTime}</p>
        </div>
      </div>
      <div className="flex  items-center w-full justify-between">
        <div className="flex space-x-1 items-center">
          <GiTeacher size={15} />
          <p className="text-xs">Tr {props.liveclass.teacherName}</p>
        </div>
        <div className="flex space-x-1 items-center">
          <FaSchool size={15} />

          <p className="text-xs">{props.liveclass.teacherSchool}</p>
        </div>
      </div>
      <div className="h-3"></div>
      <div className="flex  items-center w-full justify-between mt-2 mb-5">
        <div className="flex space-x-1 items-center">
          <BiDollarCircle size={20} />
          <p className="text-xs text-amber-700">Ksh {props.liveclass.price}</p>
        </div>

        <div
          onClick={() => {
            showToast("comming soon", "success");
          }}
          className="flex px-3 py-1 cursor-pointer self-center text-xs bg-main rounded-lg shadow-2xl text-white "
        >
          Book Now
        </div>
      </div>
    </div>
  );
};
export const TeacherLiveClassComponent = (
  props: PropsWithChildren<{ liveclass: LiveClassModel }>
) => {
  const { user } = useContext(LoggedInUserContext);
  return (
    <div className="w-80 bg-gray-50 transition-all shadow-md hover:shadow-main dark:bg-darkmain flex flex-col justify-between items-center p-2 rounded-lg m-2 mx-3 px-3 text-sm">
      <div className="flex w-full justify-between">
        <p className=" flex-1 font-semibold text-main text-left mb-1 text-[12px]">
          {props.liveclass.title}
        </p>
        <MdOutlineVerified size={20} color="darkgreen" />
      </div>
      <div className="flex space-x-4 items-center justify-between w-full">
        <div className="flex space-x-1 items-center">
          <BiTimer size={17} />
          <p className="font-bold text-amber-400 text-xs">
            {props.liveclass.duration} mins
          </p>
        </div>
        <div className="flex space-x-1 items-center">
          <FaUsers size={17} />
          <p className="font-semibold text-amber-400 text-xs">
            {props.liveclass.studentsIds.length} students
          </p>
        </div>
      </div>{" "}
      <div className="flex  items-center w-full justify-between my-2">
        <div className="flex space-x-1 items-center">
          <BsFillCalendarDateFill size={15} />
          <p className="text-xs">{formatDateString(props.liveclass.dayDate)}</p>
        </div>
        <div className="flex space-x-1 items-center">
          <BiTimeFive size={20} />

          <p className="text-xs">{props.liveclass.dayTime}</p>
        </div>
      </div>
      <div className="flex  items-center w-full justify-between">
        <div className="flex space-x-1 items-center">
          <GiTeacher size={15} />
          <p className="text-xs">Tr {props.liveclass.teacherName}</p>
        </div>
        <div className="flex space-x-1 items-center">
          <FaSchool size={15} />

          <p className="text-xs">{props.liveclass.teacherSchool}</p>
        </div>
      </div>
      <div className="h-3"></div>
      <div className="flex  items-center w-full justify-between mt-2 mb-5">
        <div className="flex space-x-1 items-center">
          <BiDollarCircle size={20} />
          <p className="text-xs text-amber-700">Ksh {props.liveclass.price}</p>
        </div>

        <div
          onClick={() => {
            showToast("comming soon", "success");
          }}
          className="flex px-3 py-1 cursor-pointer self-center text-xs bg-red-600 rounded-lg shadow-2xl text-white "
        >
          Delete Class
        </div>
      </div>
    </div>
  );
};

export default LiveClassComponent;
