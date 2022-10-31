import { useRouter } from "next/router";
import React, { useState } from "react";
import AppDataRepo from "../../../data/repos/app_data_repo";
import FaqModel from "../../../models/appdata/faq_model";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import { showToast } from "../../../presentation/utils/helper_functions";

const AdminAddFaqPage = () => {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(1);

  const handleSaveFaq = async () => {
    if (question == "") {
      showToast("question is required", "error");
      return;
    }
    if (answer == "") {
      showToast("answer is required", "error");
      return;
    }
    setLoading(true);

    try {
      let newfaq = new FaqModel("", question, answer, number);
      let res = await AppDataRepo.addFaq(newfaq);

      router.push("/admin/faqs");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  };
  const handleCancelProcess = () => {
    router.push("/admin/faqs");
  };
  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-52 w-full ">
        <div className="flex h-10 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-fuchsia-600 font-black text-xl">
            ADD NEW FAQ
          </div>
        </div>
        <div className="flex flex-col  items-start w-full text-sm">
          <div className="flex flex-col w-full">
            <div className="flex flex-col m-2">
              <label htmlFor="occupation">Question </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="outline-none bg-white rounded-xl w-full  px-2 py-1.5  dark:bg-darkmain md:w-[650px]"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="occupation">Answer </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="outline-none bg-white rounded-xl dark:bg-darkmain  w-full px-2 py-1.5  md:w-[650px]"
              />
            </div>
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="occupation">Number </label>
            <input
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value))}
              className="outline-none bg-white rounded-xl px-2 py-1.5 dark:bg-darkmain"
            />
          </div>
        </div>

        <div className="w-full mt-5 flex flex-wrap justify-around">
          <div
            onClick={handleSaveFaq}
            className="px-8 py-2  my-2 rounded-xl bg-main text-white shadow-xl cursor-pointer flex items-center"
          >
            <LoadingComponent loading={loading} color="white" />
            <p> {loading ? "saving  ..." : "Save Faq"}</p>
            {loading ? <p className="text-xs">please wait</p> : <p></p>}
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

export default AdminAddFaqPage;
