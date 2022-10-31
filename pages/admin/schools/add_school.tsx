import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import AllSchoolsRepo from "../../../data/repos/all_schools_repo";
import SchoolModel from "../../../models/curriculum/school_model";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  getCurrentDate,
  showToast,
} from "../../../presentation/utils/helper_functions";

const AdminRegisterSchoolPage = () => {
  const router = useRouter();
  const [schoolName, setSchoolName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthorisedByAdmin, setIsAuthorisedByAdmin] = useState(true);
  const [loading, setLoading] = useState(false);

  async function addNewSchool() {
    setLoading(true);
    try {
      let newSchool = new SchoolModel(
        "",
        schoolName,
        email,
        phoneNumber,
        isAuthorisedByAdmin,
        getCurrentDate()
      );
      let saved = await AllSchoolsRepo.addNewSchool(newSchool);
      router.push("/admin/schools");
    } catch (e) {
      showToast(`${e}`, "success");
    } finally {
      setLoading(false);
    }
  }
  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-52 w-full ">
        <div className="flex h-12 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-main font-black text-2xl">
           REGISTER A NEW SCHOOL
          </div>
        </div>
        {/* lesson details input */}
        <div className="flex flex-col  items-center w-full">
          <div className="flex flex-wrap w-full justify-around md:justify-start">
            <div className="flex flex-col m-2 ">
              <label htmlFor="schoolname" className="pl-1">
                School Name
              </label>
              <input
                id="schoolname"
                className="bg-white p-1 px-2 w-72 rounded-xl shadow-xl outline-none focus:ring-1 ring-main dark:bg-darkmain"
                // placeholder="school name"
                value={schoolName}
                autoFocus
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="email" className="pl-1">
                School Email
              </label>
              <input
                id="email"
                className="bg-white p-1 px-2 w-72 rounded-xl shadow-xl outline-none focus:ring-1 ring-main dark:bg-darkmain"
                // placeholder="school name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="phone" className="pl-1">
                School Phone Number
              </label>
              <input
                id="phone"
                className="bg-white p-1 px-2 w-72 rounded-xl shadow-xl outline-none focus:ring-1 ring-main dark:bg-darkmain"
                // placeholder="school name"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap  justify-start mt-3 p-1 px-2 w-72">
            <div className="flex space-x-2 cursor-pointer">
              <input
                type={"checkbox"}
                checked={isAuthorisedByAdmin}
                className="w-7 h-7  "
                onChange={(e) => setIsAuthorisedByAdmin(e.target.checked)}
              />
              <p onClick={() => setIsAuthorisedByAdmin(!isAuthorisedByAdmin)}>
                Is Authorised By Admin
              </p>
            </div>
            <div className="w-96"></div>
            <div></div>
          </div>
          <div className="mt-10 flex w-full justify-around">
            {" "}
            <div
              onClick={addNewSchool}
              className="bg-main px-5 py-2 rounded-xl cursor-pointer text-white flex space-x-1  items-center"
            >
              <LoadingComponent color="white" loading={loading} />
              <p>{loading ? "Saving..." : " Save School"}</p>
            </div>{" "}
            <div
              onClick={() => router.push("/admin/schools")}
              className="bg-red-600 px-5 py-2 rounded-xl cursor-pointer text-white"
            >
              Cancel Process
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminRegisterSchoolPage;
