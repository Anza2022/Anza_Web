import router from "next/router";
import React, { useContext, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { userModelContext } from "../../../presentation/contexts/userModelContext";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  classOptions,
  subjectOptions,
} from "../../../presentation/utils/constants";
import { showToast } from "../../../presentation/utils/helper_functions";

const AdminUpdateUserPage = () => {
const [updating, setUpdating] = useState(false);
const [deleting, setDeleting] = useState(false);
const { selectedVideoId } = useContext(NavigationContext);
const { userContext, SetUserContext } = useContext(userModelContext);
let user = userContext.filter((e) => e.userId == selectedVideoId)[0];

//state
const [userName, setUsername] = useState(user != undefined ? user.schoolName : "");

const [email, setEmail] = useState(
  user != undefined ? user.email : ""
);
const [classLevel, setClassLevel] = useState(
  user != undefined ? user.classLevel : ""
);
const [phoneNumber, setPhoneNumber] = useState(
  user != undefined ? user.phoneNumber : ""
);
const [isAdmin, setIsAdmin] = useState(
  user != undefined ? user.isAdmin : false
);
const [accountType, setAccountType] = useState(
  user != undefined ? user.accountType : ""
);
const [createdAt, setCreatedAt] = useState(
  user != undefined ? user.createdAt : ""
);

const [primarySubject, setPrimarySubjects] = useState(
  user != undefined ? user.primarySubject : ""
);
const [schoolName, setSchool] = useState(
  user != undefined ? user.schoolName : ""
);
const [secondarySubject, setsecondarySubject] = useState(
  user != undefined ? user.secondarySubject : ""
);

const updateUser = async () => {
  if (user != undefined) {
    if (
      userName !== user.userName ||
      schoolName !== user.schoolName ||
      phoneNumber !== user.phoneNumber ||
      isAdmin !== user.isAdmin ||
      createdAt !== user.createdAt ||
      primarySubject !== user.primarySubject ||
      email !== user.email 
    ) {
      setUpdating(true);
      let updatedUser = user;
      updatedUser.email = email;
      updatedUser.primarySubject = primarySubject;
      updatedUser.schoolName = schoolName;
      updatedUser.email = email;
      updatedUser.secondarySubject = secondarySubject;
      updatedUser.accountType = accountType;
      updatedUser.phoneNumber = phoneNumber;
      updatedUser.isAdmin = isAdmin;
      try {
          showToast("Coming soon", "success");        
      } catch (e) {
        showToast(`${e}`, "error");
      } finally {
        setUpdating(false);
      }
    } else {
      showToast("Data up to date", "success");
    }
  }
};

const deleteUser = async () => {
  if (deleting) {
    return;
  }
  setDeleting(true);
  try {
  showToast("Coming sooon", "success");
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
            Update Users
          </div>
        </div>
        <div className="flex flex-col  items-center w-full p-3">
          <div className="flex flex-wrap w-full justify-start">
            <div className="flex flex-col m-2">
              <label htmlFor="title">Name</label>
              <input
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Class Level</label>
              <select
                name="classlevel"
                id="classlevel "
               value={classLevel}
                onChange={(v) => setClassLevel(v.target.value.toLowerCase())}
                className="px-3 py-1.5 w-72  outline-none bg-white rounded-xl dark:bg-darkmain "
              >
                {classOptions.map((e) => (
                  <option key={e} value={e.toLowerCase()}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Account Type</label>
              <input
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Phone Number</label>
              <input
                value={phoneNumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Email Address</label>
              <input
                value={email}
                 onChange={(e) => setEmail(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> School</label>
              <input
               value={schoolName}
                 onChange={(e) => setSchool(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex space-x-2 m-3 items-center w-72 cursor-pointer">
              <input
                checked={isAdmin}
                className=" w-5 h-6 rounded-xl "
                type="checkbox"
               onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <p className="text-lg">Is Admin</p>
            </div>
            <div className="flex flex-col m-2">
            <label htmlFor="chapternumber"> Joined On</label>
            <input
              value={createdAt}
               onChange={(e) => setCreatedAt(e.target.value)}
              className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              type="text"
            />
          </div>

          
          </div>
        </div>

        <div className="flex flex-wrap justify-around mt-9">
          <div
            onClick={updateUser}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-main p-2 text-white"
          >
            {updating && <LoadingComponent loading={updating} color="white" />}
            <p className="font-bold">
              {" "}
              {updating ? "updating ..." : "Update User"}
            </p>
          </div>
          <div
            onClick={() => router.push("/admin/users")}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-amber-600 p-2 text-white"
          >
            Cancel Process
          </div>
          <div
            onClick={deleteUser}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-red-600 p-2 text-white"
          >
            {deleting && <LoadingComponent loading={deleting} color="white" />}
            <p className="font-bold">
              {" "}
              {deleting ? "deleting ..." : " Delete User"}
            </p>
          </div>
        </div>
      </div>


    </AdminDashboardLayout>
  );
};

export default AdminUpdateUserPage;
