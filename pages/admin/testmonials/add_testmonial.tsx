import { useRouter } from "next/router";
import React, { useState } from "react";
import AppDataRepo from "../../../data/repos/app_data_repo";
import TestmonialModel from "../../../models/appdata/testimonial_model";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import {
  getCurrentDate,
  showToast,
} from "../../../presentation/utils/helper_functions";

const AdminAddTestmonial = () => {
  const router = useRouter();
  const [clientName, setClientName] = useState("");
  const [message, setMessage] = useState("");
  const [occupation, setOccupation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [number, setNumber] = useState(1);
  const [savingTestmonial, setSavingTestimonial] = useState(false);

  const handleSaveTestmonial = async () => {
    if (clientName == "") {
      showToast("name is required", "error");
      return;
    }
    if (category == "") {
      showToast("category is required", "error");
      return;
    }
    if (occupation == "") {
      showToast("occupation is required", "error");
      return;
    }
    if (message == "") {
      showToast("message is required", "error");
      return;
    }
    setSavingTestimonial(true);

    let newTestmonial = new TestmonialModel(
      "",
      clientName,
      message,
      occupation,
      imageUrl,
      category,
      getCurrentDate(),
      number
    );
    try {
      let res = await AppDataRepo.addTestmonial(newTestmonial);

      router.push("/admin/testmonials");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setSavingTestimonial(false);
    }
  };
  const handleCancelProcess = () => {
    if (imageUrl !== "") {
    }
    router.push("/admin/testmonials");
  };

  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-52 w-full ">
        <div className="flex h-10 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-fuchsia-600 font-black text-xl">
            ADD NEW TESTIMONIAL
          </div>
        </div>

        <div className="flex flex-col  items-center w-full text-sm">
          <div className="flex flex-wrap w-full">
            <div className="flex flex-col m-2">
              <label htmlFor="title">Full Name </label>
              <input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="outline-none bg-white rounded-xl px-2 py-1.5 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="occupation">Occupation </label>
              <input
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="outline-none bg-white rounded-xl px-2 py-1.5 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Class Level</label>
              <select
                name="classlevel"
                id="classlevel "
                value={category}
                onChange={(v) => setCategory(v.target.value.toLowerCase())}
                className="px-2 py-1.5 w-72  outline-none bg-white rounded-xl dark:bg-darkmain"
              >
                <option value="">Select Category</option>
                {["Student", "Teacher", "Parent", "Category"].map((e) => (
                  <option key={e} value={e.toLowerCase()}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="occupation">Number </label>
              <input
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
                className="outline-none bg-white rounded-xl px-2 py-1.5 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="occupation">Message </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="outline-none bg-white rounded-xl px-2 py-1.5 dark:bg-darkmain"
              />
            </div>
          </div>
        </div>
        <div className="w-full mt-5 flex flex-wrap justify-around">
          <div
            onClick={handleSaveTestmonial}
            className="px-8 py-2  my-2 rounded-xl bg-main text-white shadow-xl cursor-pointer flex items-center"
          >
            <LoadingComponent loading={savingTestmonial} color="white" />
            <p> {savingTestmonial ? "saving  ..." : "Save Testmonial"}</p>
            {savingTestmonial ? (
              <p className="text-xs">please wait</p>
            ) : (
              <p></p>
            )}
          </div>
          <div
            onClick={handleCancelProcess}
            className="px-8 py-2 rounded-xl my-2 bg-red-600 text-white shadow-xl cursor-pointer"
          >
            Cancel Process
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminAddTestmonial;
