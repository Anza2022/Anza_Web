import router from "next/router";
import React, { useContext, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import UserCrudRepo from "../../../data/repos/user_crud_repo";
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
const [activating, setActivating] = useState(false);
const [revoking, setRevoking] = useState(false);
const { selectedVideoId } = useContext(NavigationContext);
const { userContext, SetUserContext } = useContext(userModelContext);
let user = userContext.filter((e) => e.userId == selectedVideoId)[0];

//state
const [userName, setUsername] = useState(user != undefined ? user.userName : "");

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

const [mpackage, setPackage] = useState("");


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
        let res = await UserCrudRepo.updateUser(updatedUser);
        if (res) {
          showToast("User info Updated", "success");
          router.push("/admin/users/update_user");
        } 
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

let packages = ["Termly", "Termly Plus", "Savings"];
//let packageDurations = ["1 Month", "2 Months", "3 Months", "4 Months", "5 Months", "6 Months", "7 Months"];


const deleteUser = async () => {
  if (deleting) {
    return;
  }
  setDeleting(true);
  try {
  let res = await UserCrudRepo.deleteUser(selectedVideoId);
   if (res) {
    SetUserContext(userContext.filter((e) => e.userId !== selectedVideoId));
    showToast("Deleted", "success");
    router.push("/admin/users");
  }
  } catch (e) {
    showToast(`${e}`, "error");
  } finally {
    setDeleting(false);
  }
};


const activatePackage = async () => {
  if (mpackage == "") {
    showToast("Kindly choose a package to activate", "error");
    return;
  }
  if (activating) {
    return;
  }
  setActivating(true);
  try {
  let res = await UserCrudRepo.activatePackage(selectedVideoId, mpackage);
   if (res) {
    SetUserContext(userContext.filter((e) => e.userId !== selectedVideoId));
    showToast("Package activated", "success");
    router.push("/admin/users");
  }
  } catch (e) {
    showToast(`${e}`, "error");
  } finally {
    setActivating(false);
  }
};


const revokePackage = async () => {
  if (revoking) {
    return;
  }
  setRevoking(true);
  showToast(`Package revoking coming Soon`, "error");
};


  return (
    <AdminDashboardLayout>
<div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-52 w-full ">
        <div className="flex h-12 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-main font-black text-2xl">
            {userName.toUpperCase()} DETAILS.
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

            {accountType == "student" &&(
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
            )}

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


        <div className="flex flex-wrap justify-around mt-4">
          <div
            onClick={updateUser}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-main p-2 mt-2 text-white"
          >
            {updating && <LoadingComponent loading={updating} color="white" />}
            <p className="font-bold">
              {" "}
              {updating ? "updating ..." : "Update User"}
            </p>
          </div>
          <div
            onClick={() => router.push("/admin/users")}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-amber-600 p-2 mt-2 text-white"
          >
            Cancel Process
          </div>
          <div
            onClick={deleteUser}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-red-600 p-2 mt-2 text-white"
          >
            {deleting && <LoadingComponent loading={deleting} color="white" />}
            <p className="font-bold">
              {" "}
              {deleting ? "deleting ..." : " Delete User"}
            </p>
          </div>
        </div>





        <div className="flex flex-col  items-center w-full p-2 mt-5">
        <div className="flex text-main font-black text-2xl mb-2">
           Current Subscription Details
          </div>
          <div className="flex flex-wrap w-full justify-start">
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Package Name</label>
              <input
              //  value={schoolName}
              //    onChange={(e) => setSchool(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>

            <div className="flex flex-col m-2">
            <label htmlFor="chapternumber">Subscription Start Date</label>
            <input
              // value={createdAt}
              //  onChange={(e) => setCreatedAt(e.target.value)}
              className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              type="text"
            />
          </div>

          <div className="flex flex-col m-2">
            <label htmlFor="chapternumber">Subscription End Date</label>
            <input
              // value={createdAt}
              //  onChange={(e) => setCreatedAt(e.target.value)}
              className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              type="text"
            />
          </div>

          <div className="flex flex-col m-2">
            <label htmlFor="chapternumber">Resubscriptions Times</label>
            <input
              // value={createdAt}
              //  onChange={(e) => setCreatedAt(e.target.value)}
              className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              type="text"
            />
          </div>

          </div>
        </div>



        <div className="flex flex-col  items-center w-full p-4">
        <div className="flex text-main font-black text-2xl mb-2">
          Activate Package
          </div>
          <div className="flex flex-wrap w-full justify-start">
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Choose Package Name</label>
              <select
                        name="mpackage"
                        id="mpackage"
                        className="w-[300px]  focus:ring-2 ring-main ring-1 bg-white  md:w-96 outline-none  rounded-lg p-2 dark:bg-darksec"
                        onChange={(e) =>
                          setPackage(e.target.value)
                        }
                      >
                        <option value={""}>Choose Package Name</option>
                        {packages.map((e) => (
                          <option value={e} key={e}>
                            {e}
                          </option>
                        ))}
                      </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-around mt-0">
          <div
            onClick={activatePackage}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-main p-2 mt-2 text-white"
          >
            {updating && <LoadingComponent loading={activating} color="white" />}
            <p className="font-bold">
              {" "}
              {updating ? "activating ..." : "ACTIVATE PACKAGE"}
            </p>
          </div>

          {/* <div
            onClick={revokePackage}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-red-600 p-2 mt-2 text-white"
          >
            {deleting && <LoadingComponent loading={revoking} color="white" />}
            <p className="font-bold">
              {" "}
              {deleting ? "revoking..." : "REVOKE PACKAGE"}
            </p>
          </div> */}

          <div>
              {""}
            </div>
            <div>
              {""}
            </div>

            


        </div>


      </div>


    </AdminDashboardLayout>
  );
};

export default AdminUpdateUserPage;
