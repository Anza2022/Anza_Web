import router, { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import AllSchoolsRepo from "../../../data/repos/all_schools_repo";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { AppDataContext } from "../../../presentation/contexts/app_data_context";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  classOptions,
  subjectOptions,
} from "../../../presentation/utils/constants";
import { showToast } from "../../../presentation/utils/helper_functions";

const AdminUpdateUserPage = () => {
const [updating, setUpdating] = useState(false);
const [deleting, setDeleting] = useState(false);
const router = useRouter();
const { selectedVideoId } = useContext(NavigationContext);
const { schools, setSchools } = useContext(AppDataContext);
// console.log(schools)
let school = schools.filter((e) => e.schoolId == selectedVideoId)[0];

//state
const [schoolName, setschoolName] = useState(school != undefined ? school.schoolName : "");

const [schoolEmail, setschoolEmail] = useState(
  school != undefined ? school.schoolEmail : ""
);
const [schoolPhoneNumber, setschoolPhoneNumber] = useState(
  school != undefined ? school.phoneNumber : ""
);
const [schoolIsAuthorized, setschoolIsAuthorized] = useState(
  school != undefined ? school.isAuthorisedByAdmin : false
);
const [schoolCreatedAt, setschoolCreatedAt] = useState(
  school != undefined ? school.createdAt : ""
);


const updateSchool = async () => {
  if (school != undefined) {
    if (
      schoolName !== school.schoolName ||
      schoolEmail !== school.schoolEmail ||
      schoolPhoneNumber !== school.phoneNumber ||
      schoolIsAuthorized !== school.isAuthorisedByAdmin ||
      schoolCreatedAt !== school.createdAt
    ) {
      setUpdating(true);
      let updatedTalk = school;
      updatedTalk.schoolName = schoolName;
      updatedTalk.schoolEmail = schoolEmail;
      updatedTalk.phoneNumber = schoolPhoneNumber;
      updatedTalk.isAuthorisedByAdmin = schoolIsAuthorized;
      updatedTalk.createdAt = schoolCreatedAt;
      try {
          showToast("Coming soon", "success");        
      } catch (e) {
        showToast(`${e}`, "error");
      } finally {
        setUpdating(false);
      }
    } else {
      showToast("Data Upto date", "success");
    }
  }
};

const deleteSchool = async () => {
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
            Update Schools
          </div>
        </div>
        <div className="flex flex-col  items-center w-full p-3">
          <div className="flex flex-wrap w-full justify-start">
            <div className="flex flex-col m-2">
              <label htmlFor="title">School Name</label>
              <input
               value={schoolName}
               onChange={(e) => setschoolName(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">School Email</label>
              <select
                name="classlevel"
                id="classlevel "
               value={schoolEmail}
                onChange={(v) => setschoolEmail(v.target.value.toLowerCase())}
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
              <label htmlFor="title">School Phone Number</label>
              <select
                name="subject"
                id="subject "
               value={schoolPhoneNumber}
              onChange={(v) => setschoolPhoneNumber(v.target.value)}
                className="px-3 py-1.5 w-72  outline-none bg-white rounded-xl dark:bg-darkmain "
              >
                {subjectOptions.map((e) => (
                  <option key={e} value={e.toLowerCase()}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col m-2">
              <label htmlFor="topic">Created At</label>
              <input
               value={schoolCreatedAt}
                onChange={(e) => setschoolCreatedAt(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>

            <div className="flex space-x-2 m-3 items-center w-72 cursor-pointer">
              <input
                checked={schoolIsAuthorized}
                className=" w-5 h-6 rounded-xl "
                type="checkbox"
                onChange={(e) => setschoolIsAuthorized(e.target.checked)}
              />
              <p className="text-lg">IsAuthorized By Admin</p>
            </div>
          </div>
        </div>


        <div className="flex flex-wrap justify-around mt-9">
          <div
           onClick={updateSchool}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-main p-2 text-white"
          >
            {updating && <LoadingComponent loading={updating} color="white" />}
            <p className="font-bold">
              {" "}
              {updating ? "updating ..." : "Update School"}
            </p>
          </div>
          <div
            onClick={() => router.push("/admin/schools")}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-amber-600 p-2 text-white"
          >
            Cancel Process
          </div>
          <div
            onClick={deleteSchool}
            className="w-60 flex justify-center items-center cursor-pointer rounded-xl bg-red-600 p-2 text-white"
          >
            {/* {deleting && <LoadingComponent loading={deleting} color="white" />} */}
            <p className="font-bold">
              {" "}
              {deleting ? "deleting ..." : " Delete School"}
            </p>
          </div>
        </div>
      </div>


    </AdminDashboardLayout>
  );
};

export default AdminUpdateUserPage;
