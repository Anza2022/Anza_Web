import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import PastPaperModel from "../../../models/curriculum/past_paper_model";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { PastPapersContext } from "../../../presentation/contexts/past_papers_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import { showToast } from "../../../presentation/utils/helper_functions";
import { LoggedInUserContext } from "../../../presentation/contexts/loggedin_user_controller";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);


const SelectedPastPapersCategory = () => {
  const router = useRouter();
  const { accountSubscription } = useContext(LoggedInUserContext);
const SubStatus = accountSubscription[0] != undefined
 ? accountSubscription[0].isSubscriptionActive
   ? "Active"
   : "Ended"
 : "";
  const { setShowPremiumModal, selectedForm, selectedSubject, setSelectedVideoId } =
    useContext(NavigationContext);
  const { pastPapers } = useContext(PastPapersContext);

  const getSelectedCategories = (): PastPaperModel[] => {
    let papers = pastPapers.filter(
      (e) => e.classLevel == selectedForm && e.subjectType == selectedSubject
    );
    return papers;
  };

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative min-h-screen py-16 w-full ">
        <div className="flex  pl-5  md:pl-10 w-full  items-center  justify-center text-center ">
          <div className="flex text-fuchsia-600 font-black text-lg  pb-2 pt-5  ">
            { selectedForm.toUpperCase()}{" "}
            {selectedSubject.toUpperCase()}{" "}
          </div>
        </div>
        <div className="flex flex-wrap w-full justify-left md:justify-start">
          {getSelectedCategories().map((e, i) => {
            return (
              <div
                key={e.title}
                onClick={() => {
                  if(SubStatus == "Ended"){
                  if (i == 0) {
                  MySwal.clickConfirm();
                  setSelectedVideoId(e.paperId);
                  router.push("/dashboard/papers/view_paper");
                  } else {
                  MySwal.clickConfirm();
                  setShowPremiumModal(true);
                  }
                  }else if(SubStatus == "Active"){
                    setSelectedVideoId(e.paperId);
                    router.push("/dashboard/papers/view_paper");
                  }
                  }}


                className="w-full p-5 cursor-pointer m-2 rounded-md  hover:bg-gray-200 justify-between shadow-sm transition-all hover:shadow-main rounded-md bg-white flex dark:bg-darkmain "
              >
                <div className="flex flex-col">
                  <p className="font-bold text-left text-main text-sm  p-1  pb-0">
                 {e.title.toUpperCase()}
                  </p>
                  <p className="font-bold text-left text-[11px]  p-1  pb-1">
                    {e.year.toString().length > 4
                      ? `${e.year.toString().substring(0, 4)}-${e.year
                          .toString()
                          .substring(4)}`
                      : e.year}
                  </p>
                </div>
                <div className="flex flex-col  px-2 text-sm py-1 font-bold">
                  <p className="capitalize">{e.schoolName}</p>
                  <div className=" flex text-sm">
                    <p
                      className={` ${
                        e.markingSchemeUrl ? "text-green-600" : "text-red-400"
                      } text-[13px]`}
                    >
                      {e.markingSchemeUrl !== ""
                        ? "Has M.scheme"
                        : "No M.scheme"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {getSelectedCategories().length > 0 &&
            getSelectedCategories().length % 2 != 0 && (
              <div className="w-[300px] md:w-[360px] flex flex-col rounded-xl p-3"></div>
            )}
          <div className="w-[330px] "></div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SelectedPastPapersCategory;
