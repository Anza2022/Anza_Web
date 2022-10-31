import { useRouter } from "next/router";
import React from "react";
import DashboardLayout from "../presentation/layouts/dashboard_layout";

const A404Page = () => {
  const router = useRouter();
  return (
    <DashboardLayout>
      <div className="flex flex-col w-full justify-center items-center">
        <p className="text-2xl p-2">Whoops</p>

        <div
          onClick={() => {
            router.push("/");
          }}
          className="m-3 px-6 py-1 5 bg-main cursor-pointer text-white"
        >
          Return to Homepage
        </div>
      </div>
    </DashboardLayout>
  );
};

export default A404Page;
