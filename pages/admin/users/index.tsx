import { useRouter } from "next/router";
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
  const searchUser = async () => {
    if (userphonenumber.length < 10) {
      showToast("invalid phonenumber", "error");
      return;
    }
    setLoading(true);
    try {
      let dbschools = await UserCrudRepo.getAllUsers();
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AdminDashboardLayout>
      <div className="flex w-full h-[85vh]   items-center flex-col">
        <div className="flex flex-col mt-40 items-center justify-center">
          <input
            value={userphonenumber}
            onChange={(e) => setUserphonenumber(e.target.value)}
            placeholder="user phone number e.g +2547..."
            className="outline-none bg-gray-200 rounded-md w-80 md:w-[450px] text-sm py-2 px-4 focus:ring-1 focus:ring-main transition-all"
          />
          <div
            onClick={searchUser}
            className="mt-3 rounded-lg py-1 w-60 bg-main flex justify-center cursor-pointer text-white items-center"
          >
            {loading ? "searching ..." : "Search User"}{" "}
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminAppUsersPage;
