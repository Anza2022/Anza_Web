import React from "react";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";

const AdminUpdateUserPage = () => {
  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 min-h-screen py-16 md:ml-52 w-full ">
        <div className="flex h-12 items-center justify-center bg-white pl-5  md:pl-10">
          <div className="flex text-fuchsia-600 font-black text-2xl">
            Update user Details
          </div>
        </div>
        {/* lesson details input */}
        <div className="flex flex-col  items-center w-full">
          <h2> Admin Update users Page</h2>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminUpdateUserPage;
