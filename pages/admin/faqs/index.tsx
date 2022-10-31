import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AppDataRepo from "../../../data/repos/app_data_repo";
import FaqModel from "../../../models/appdata/faq_model";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import { showToast } from "../../../presentation/utils/helper_functions";

const AdminFaqsPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [faqs, setFaqs] = useState<FaqModel[]>([]);
  const getFaqs = async () => {
    setLoading(true);
    try {
      let allfaqs = await AppDataRepo.getFaqs();
      setFaqs(allfaqs);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFaqs();
  }, []);
  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-52 w-full ">
        <div className="flex h-10 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-fuchsia-600 font-black text-xl">FAQs</div>
        </div>

        {loading ? (
          <div className="flex w-full h-96 items-center justify-center">
            <LoadingComponent loading={loading} color="secondary" />
          </div>
        ) : faqs.length < 1 ? (

<div className="flex w-full h-[75vh] justify-center items-center flex-col">
<div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div className="flex">
    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p className="font-bold">Oops! No FAQs available. </p>
    </div>
  </div>
</div>
</div>
        ) : (
          <div className="flex  overflow-scroll max-h-screen ">
            <table className="table-fixed text-left p-1 m-2 rounded-lg border-2 border-main text-ellipsis ">
              <thead
                className="flex p-2 bg-main text-white font-black text-xs"
                style={{ fontFamily: "Montserrat" }}
              >
                <th className="w-10">No.</th>
                <th className="w-80 ">Question</th>
                <th className="w-80 ">Answer</th>
              </thead>
              {faqs.map((e, i) => (
                <tr
                  key={e.question}
                  className="flex p-2 hover:bg-main hover:text-white  text-xs cursor-pointer border-b-2 border-gray-50"
                  onDoubleClick={() => {
                    showToast("cannot update testmonial", "success");
                  }}
                >
                  {" "}
                  <td className="w-10 ">{`${i} `}.</td>
                  <td className="w-80 ">{e.question}</td>
                  <td className="w-80 ">{e.answer}</td>
                </tr>
              ))}
            </table>
          </div>
        )}
        <div
          onClick={() => router.push("/admin/faqs/add_faq")}
          className="py-2 rounded-xl flex items-center cursor-pointer text-white bg-main w-44 justify-center absolute bottom-8 right-4"
        >
          Add New FAQ
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminFaqsPage;
