import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { MdCode, MdDateRange, MdDownload, MdEmail, MdGroupWork, MdInsertLink, MdMoney, MdPerson, MdPhone } from "react-icons/md";
import UserCrudRepo from "../../../data/repos/user_crud_repo";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { IsDarkThemeContext } from "../../../presentation/contexts/app_theme_controller";
import { LoggedInUserContext } from "../../../presentation/contexts/loggedin_user_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import {
  formatDateString,
  formatStringToMoney,
  showToast,
} from "../../../presentation/utils/helper_functions";
import Avatar from 'react-avatar';

const UserProfilePage = () => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/dashboard/videos");
    router.prefetch("/dashboard/papers/all");
    router.prefetch("/dashboard/quizes");
    router.prefetch("/dashboard/examiner_talks");
    router.prefetch("/dashboard/career_talks");
    router.prefetch("/dashboard/scorner");
    router.prefetch("/dashboard/tcorner");
    router.prefetch("/dashboard/icorner");
    router.prefetch("/dashboard/billing");
    router.prefetch("/");
  }, []);
  const { isLoggedIn, isProfileComplete } = useContext(LoggedInUserContext);
  const { user, setUser, isEditing, setIsEditing } =
  useContext(LoggedInUserContext);
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200  dark:bg-darksec md:ml-44 relative min-h-screen py-16 w-full space-y-4 md:space-y-0 ">
        <div className="flex h-15 items-center justify-center bg-white p-5 dark:bg-darksec shadow-xl md:pl-10 ">
          <div className="flex text-main dark:text-indigo-400  font-black text-3xl"    style={{ fontFamily: "Montserrat" }}>
            MY TEAM</div>
        </div>
        {isLoggedIn && (
          <div className="flex flex-wrap w-full justify-around ">
            <BonusDetailsComponent />
            <ChangePasswordComponent />
            <UserTableComponent />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserProfilePage;



const ProfilePic=()=>{
  const { user, setUser, isEditing, setIsEditing } =
  useContext(LoggedInUserContext);

  return(
    
    <div className="max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-end px-4 pt-4">


        <div id="dropdown" className=" z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-500 block" style={{"position": "absolute", "inset": "0px auto auto 0px", "margin": "0px", "transform": "translate(281px, 83px)"}} data-popper-reference-hidden={""} data-popper-escaped={""} data-popper-placement={"bottom"}>
        </div>
    </div>
    <div className="flex flex-col  items-center pb-10">
        {/* <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src="" alt ={user[0].userName.toLowerCase() + " dp here"}  /> */}


        <Avatar size={"150"} round="20px" name={user[0].userName} />

        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user[0].userName.toUpperCase()}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{user[0].accountType.toUpperCase()}</span>
    </div>
</div>
  );
}


const ChangePasswordComponent = () => {
  const [amount_w, setAmountW] = useState("");
  const [amount_a, setAmountA] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(LoggedInUserContext);

  const withdraw_now = async () => {
    if (loading) {
      return;
    }
    if (amount_w === "") {
      showToast("Kindly amount to withdraw", "error");
      return;
    }
    setLoading(true);
    try {
        showToast("Feature coming soon!", "success");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex w-[390px] md:w-[475px] flex-col rounded-md dark:bg-darkmain bg-white m-1 md:m-5 p-10">
      <p className="text-center text-xl font-black text-main dark:text-indigo-400 m-6" 
        style={{ fontFamily: "Montserrat" }}>
        MAKE WITHDRAWALS
      </p>

      <label htmlFor="bal" className="mt-6 ml-3">AVAILABLE BALANCES</label>

      <input
      readOnly={true}
        value={amount_a}
        onChange={(e) => setAmountA(e.target.value)}
        placeholder="Available balances"
        className="rounded-md p-1.5 outline-none bg-gray-100 dark:bg-darksec m-2 text-base px-4 "
      />
      <input
        placeholder="Enter amount to withdraw i.e 1000"
        value={amount_w}
        onChange={(e) => setAmountW(e.target.value)}
        className="rounded-md p-1.5 outline-none bg-gray-100 dark:bg-darksec  m-2  text-base px-4"
      />
      <div
        onClick={withdraw_now}
        className="bg-red-600 rounded-md p-2 px-4 cursor-pointer self-center flex h-8 items-center text-white font-bold mt-5"
      >
        {loading && <LoadingComponent color="white" loading={loading} />}
        <p>{loading ? "Processing..." : "WITHDRAW NOW"}</p>
      </div>
      <div className="h-8"></div>
    </div>
  );
};



const BonusDetailsComponent = () => {
  const { bonusData } = useContext(LoggedInUserContext);
  console.log(bonusData);
  return (


  <div className="flex w-[390px] md:w-[475px] flex-col rounded-md dark:bg-darkmain bg-white m-1 md:m-5">

    <div className="p-4 max-w-md bg-white rounded-lg  sm:p-8 dark:bg-darkmain ">
  <div className="flex justify-between items-center mb-4">
      <h5 className="text-xl font-bold leading-none text-main dark:text-indigo-400 " 
         style={{ fontFamily: "Montserrat" }}>BILLING DETAILS</h5>

 </div>
 <div className="flow-root">
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">

      <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
              <MdCode size={"22px"}/>
                  </div>
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          BONUS CODE
                      </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-main dark:text-main">
                  <p>{bonusData[0].bonusCode}</p>
                  </div>
              </div>
          </li>


          <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
              <MdMoney size={"22px"}/>
                  </div>
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          TOTAL EARNINGS
                      </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-main dark:text-main">
                  {formatStringToMoney(bonusData[0].amountEarned)}
                  </div>
              </div>
          </li>

          <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
              <MdDownload size={"23px"}/>
                  </div>
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          TOTAL WITHDRAWALS
                      </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-main dark:text-main">
                  {formatStringToMoney(bonusData[0].withdrawnAmout)}
                  </div>
              </div>
          </li>

          <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
              <MdMoney size={"23px"}/>
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          AVAILABLE AMOUNT
                      </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-main dark:text-main">
                  {formatStringToMoney(bonusData[0].availableAmount)}
                  </div>
              </div>
          </li>


          <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
              <MdInsertLink size={"23px"}/>
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        INVITE LINK
                      </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-blue-600  dark:text-blue-600">
                  <p
            onClick={() => {
              navigator.clipboard.writeText(
                `https://anzaacademy.com/signup?code=${bonusData[0].bonusCode}`
              );
              showToast("copied", "success");
            }}
            className=" cursor-pointer text-[8px] md:text-[9px] "
          >
            https://anzaacademy.com/signup?code={bonusData[0].bonusCode}
          </p>
          <svg
            onClick={() => {
              navigator.clipboard.writeText(
                `https://anzaacademy.com/signup?code=${bonusData[0].bonusCode}`
              );
              showToast("Link Copied", "success");
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5   transform -translate-y-1 translate-x-2 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
            />
          </svg>
                  </div>
              </div>
          </li>

      </ul>
 </div>
</div>
  </div>
  );
};


const UserTableComponent = () => {
  return (
    <div className="flex flex-wrap overflow-x-auto relative  sm:rounded-lg">
      <p className=" flex text-center text-xl font-black  text-main dark:text-indigo-400 m-2"   style={{ fontFamily: "Montserrat" }}>MY TEAM</p>

    <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">
                    #
                </th>
                <th scope="col" className="py-3 px-6">
                    FULL NAME
                </th>
                <th scope="col" className="py-3 px-6">
                    EMAIL
                </th>
                <th scope="col" className="py-3 px-6">
                    PHONE
                </th>
                <th scope="col" className="py-3 px-6">
                    PACKAGE
                </th>
                <th scope="col" className="py-3 px-6">
                    STATUS
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  1
                </th>
                <td className="py-4 px-6">
                    TESTER ANZA
                </td>
                <td className="py-4 px-6">
                    TEST@GMAIL.COM
                </td>
                <td className="py-4 px-6">
                    254745682815
                </td>
                <th scope="col" className="py-3 px-6">
                    BASIC
                </th>
                <td className="py-4 px-6">
                    <a href="#" className="font-medium text-green-600 dark:text-blue-500 hover:underline">
                      ACTIVE
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
  );
};