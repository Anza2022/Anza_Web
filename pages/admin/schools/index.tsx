import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AllSchoolsRepo from "../../../data/repos/all_schools_repo";
import SchoolModel from "../../../models/curriculum/school_model";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  formatDateString,
  showToast,
} from "../../../presentation/utils/helper_functions";

const AdminAppUsersPage = () => {
  const [schools, setSchools] = useState<SchoolModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newSchool, setNewSchool] = useState("");

  const router = useRouter();
  async function getSchools() {
    setLoading(true);
    try {
      let dbschools = await AllSchoolsRepo.getAllSchools();
      setSchools(dbschools);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getSchools();
  }, []);

  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-52 relative h-screen py-16 w-full items-center ">
        <div className="flex h-9 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-xl p-3">
            All REGISTERED SCHOOLS
          </div>
        </div>

        <div
          onClick={() => router.push("/admin/schools/add_school")}
          className="cursor-pointer bg-main px-4 py-2 rounded-md text-white flex justify-center fixed bottom-8 right-4"
        >
       REGISTER NEW SCHOOL
        </div>

        {schools.length < 1 ? (
  <div className="flex w-full h-[75vh] justify-center items-center flex-col">
  <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
    <div className="flex">
      <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
      <div>
        <p className="font-bold">Oops! No SCHOOLS available. </p>
      </div>
    </div>
  </div>
  </div>
        ) : (
          <table className="table-auto overflow-x-scroll mt-2 w-full whitespace-nowrap block ml-4 text-sm">
            <tr className=" bg-gray-50 text-left border-2 border-gray-300 dark:border-gray-400 dark:bg-darkmain ">
              <th className="w-52 text-left p-2 px-4 font-black text-main ">
                School Name
              </th>
              <th className="w-52 text-left p-2 px-4 font-black text-main ">
                School Email
              </th>
              <th className="w-52 text-left p-2 px-4 font-black text-main ">
                Phone Number
              </th>
              <th className="w-52 text-left p-2 px-4 font-black text-main ">
                Is Allowed
              </th>
              <th className="w-52 text-left p-2 px-4 font-black text-main ">
                Date Registered
              </th>
            </tr>
            {schools.map((e, i) => (
              <tr
                key={i}
                className=" bg-gray-50 dark:bg-darkmain text-left text-xs border-[1px] border-gray-300 dark:border-gray-500  hover:bg-main hover:text-white transition-all duration-75 cursor-pointer"
              >
                <td className="w-52 text-left p32 px-4 ">
                  {i + 1}: &nbsp;&nbsp; {e.schoolName}
                </td>
                <td className="w-52 text-left p-2  px-4">{e.schoolEmail}</td>
                <td className="w-52 text-left p-2 px-4 ">+{e.phoneNumber}</td>
                <td className="w-52 text-left p-2 px-4 font-bold text-fuchsia-600 ">
                  {e.isAuthorisedByAdmin ? "Yes" : "No"}
                </td>
                <td className="w-52 text-left p-2  px-4">
                  {formatDateString(e.createdAt)}
                </td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminAppUsersPage;
