import router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import {
  formatDateString,
  showToast,
} from "../../../presentation/utils/helper_functions";
import UserCrudRepo from "../../../data/repos/user_crud_repo";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import UserModel from "../../../models/user_models/user_model";

const AdminAppUsersPage = () => {
  const [loading, setLoading] = useState(false);
  const [userphonenumber, setUserphonenumber] = useState("+254");
  const [users, setUsers] = useState<UserModel[]>([]);

  const GetUsers = async () => {
    if (userphonenumber.length < 10) {
      showToast("invalid phonenumber", "error");
      return;
    }
    setLoading(true);
    try {
      let Allusers = await UserCrudRepo.getAllUsers();
      console.log(Allusers);
      setUsers(Allusers);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (users.length < 1) {
      GetUsers();
    }
  }, []);


  return (
    <AdminDashboardLayout>

<div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-52 relative h-screen py-16 w-full overflow-x-hidden ">
        <div className="flex h-12 items-center justify-center bg-white  dark:bg-darkmain pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-2xl">
   ALL USERS
          </div>
        </div>
        {loading ? (
          <div className="flex w-full flex-col h-full justify-center items-center">
            <LoadingComponent loading={loading} color="white" />
            <p>Loading users</p>
          </div>
        ) : users.length < 1 ? (
<div className="flex w-full h-[75vh] justify-center items-center flex-col">
<div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div className="flex">
    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p className="font-bold">Oops! No users available. </p>
    </div>
  </div>
</div>
</div>
        ) : (
          <div className="flex  overflow-scroll max-h-screen " style={{"scrollbarWidth" : "auto"}}>
            <table className="table-fixed text-left p-1 m-2 rounded-lg border-2 border-main text-ellipsis ">
              <thead
                className="flex p-2 bg-main text-white font-black text-xs"
                style={{ fontFamily: "Montserrat" }}
              >
                <th className="w-10">No.</th>
                <th className="w-80 ">Name</th>
                <th className="w-28 ">School</th>
                <th className="w-44">Account Type</th>
                <th className="w-44">Subscribed</th>
                <th className="w-60">Joined On </th>
              </thead>
              {/* {talks.map((e, i) => ( */}
                <tr
                  // key={e.title}
                  className="flex p-2 hover:bg-main hover:text-white  text-xs cursor-pointer border-b-2 border-gray-50"
                  onDoubleClick={() => {
                    router.push("/admin/users/update_user");
                  }}
                >
                  {" "}
                  <td className="w-10 ">1</td>
                  <td className="w-80 ">dummy data</td>
                  <td className="w-28 ">dummy data</td>
                  <td className="w-44 ">dummy data</td>
                  <td className="w-44 ">dummy data</td>
                  <td className="w-44 ">dummy data</td>
                </tr>
               {/* ))} */}
            </table>
          </div>
        )}
      </div>

      
    </AdminDashboardLayout>
  );
};

export default AdminAppUsersPage;
