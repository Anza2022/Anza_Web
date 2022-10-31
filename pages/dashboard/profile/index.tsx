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
            MY PROFILE</div>
        </div>
        {isLoggedIn && (
          <div className="flex flex-wrap w-full justify-around ">
            {!isProfileComplete() && (

<div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div className="flex">
    <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p className="font-bold">Hi there {user[0].userName.toUpperCase()} </p>
      <p className="text-sm"> Kindly Update Your Email And Confirm Your NAME! </p>
    </div>
  </div>
</div>
            )
            }
                  <div className="flex w-full  rounded-lg  dark:text-main items-center justify-center text-sm p-2 mb-2 md:md-0">
<ProfilePic/>
</div>
            <PersonalDetailsComponent />
            <BonusDetailsComponent />
            <ChangePasswordComponent />
            <UserSettingsComponent />
            {/* <div className="flex w-[300px] md:w-[330px] flex-col rounded-2xl m-1 md:m-5">
              {" "}
              <p>user stats, settings, subscription details</p>
              <p>
           
              </p>
            </div> */}
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
        {/* <div className="flex mt-4 space-x-3 lg:mt-6 ">
            <input className="" id="small_size" type="file"/>
        </div>
        <div className="flex mt-4 space-x-3 lg:mt-6 ">
            <a  className="inline-flex items-center py-1 px-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">UPDATE PROFILE</a>
        </div> */}
    </div>
</div>
  );
}

const PersonalDetailsComponent = () => {
  const { user, setUser, isEditing, setIsEditing } =
    useContext(LoggedInUserContext);
    
  const [updating, setUpdating] = useState(false);

  //editable fields
  const [userName, setUserName] = useState(
    user.length > 0 ? user[0].userName : ""
  );
  const [email, setEmail] = useState(
    user.length > 0 ? user[0].email : "");

  const updateUserProfile = async () => {
    if (updating) {
      return;
    }
    if (email != user[0].email || userName != user[0].userName) {
      setUpdating(true);
      try {
        let newuser = user[0];
        newuser.email = email;
        newuser.userName = userName;
        let res = await UserCrudRepo.updateUser(newuser);
        if (res) {
          setUser([newuser]);
          showToast("Email Address and Name Updated!", "success");
          setIsEditing(false);
        }
      } catch (e) {
        showToast(`${e}`, "error");
      } finally {
        setUpdating(false);
      }
    } else {
      showToast("Your Info Are Upto date!", "success");
    }
  };

  return (

      <div className="flex w-[390px] md:w-[475px] flex-col rounded-md dark:bg-darkmain bg-white m-2 md:m-5">
    <div className="p-4 max-w-md bg-white rounded-lg  sm:p-8 dark:bg-darkmain ">  
  <div className="flex justify-between items-center mb-4">


  <p className="text-center font-black text-main text-xl  dark:text-indigo-400 mt-2"        style={{ fontFamily: "Montserrat" }}>
         PERSONAL DETAILS
      </p>
<span
className="cursor-pointer"
onClick={() => setIsEditing(!isEditing)}
>
{isEditing ? (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-red-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
) : (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 "
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
)}
</span>


  </div>
  <div className="flow-root">    
       <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">

       <li className="py-3 sm:py-4">
               <div className="flex items-center space-x-4">
               <div className="flex-shrink-0">
               <MdPerson size={"22px"}/>
                   </div>
                   <div className="flex-1 min-w-0">
                       <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                           FULL NAME
                       </p>
                   </div>
                   <div className="inline-flex items-center text-base font-semibold text-main dark:text-main">
                         {isEditing ? (
          <AnimatePresence>
          <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            type="text"
            value={userName}
            autoFocus={true}
            onChange={(e) => setUserName(e.target.value)}
            className="outline-none ring-1 bg-gray-200 ring-main w-52 md:w-64 focus:ring-2 p-1 px-2 rounded-md dark:bg-darksec dark:text-white"
          />
        </AnimatePresence>
      ) : (
        <p>{user[0].userName.toUpperCase()}</p>
      )}
                  </div>
              </div>
          </li>


          <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
              <MdGroupWork size={"22px"}/>
                  </div>
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          ACCOUNT TYPE
                      </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-main dark:text-main">
                      {user[0].accountType.toUpperCase()}
                  </div>
              </div>
          </li>

          <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
              <MdEmail size={"23px"}/>
                  </div>
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
       EMAIL
                      </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-main  dark:text-main ">
                  {isEditing ? (
          <AnimatePresence>
          <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none ring-1 bg-gray-200 ring-main w-52 md:w-64 focus:ring-2 p-1 px-2 rounded-md dark:bg-darksec dark:text-white mr-2"
          />

<div 
        onClick={updateUserProfile}
className="flex mt-1 space-x-3 lg:mt-1 cursor-pointer">
            <a  className="inline-flex items-center py-1 px-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">UPDATE</a>
        </div>
        </AnimatePresence>
      ) : (
        <p>{email.toUpperCase()}</p>
      )}
                  </div>
              </div>
          </li>


        

          <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
              <MdPhone size={"23px"}/>
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
PHONE
                      </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-main dark:text-main">
                  {false ? (
          <input
          type="text"
          className="outline-none ring-1 bg-gray-200 ring-main w-52 md:w-64 focus:ring-2 p-1 px-2 rounded-xl dark:bg-darksec dark:text-white"
        />
      ) : (
        <p>+{user[0].phoneNumber}</p>
      )}
                  </div>
              </div>
          </li>


          <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
              <MdDateRange size={"23px"}/>
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        MEMBER SINCE
                      </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-main dark:text-main">
           {formatDateString(user[0].createdAt).toUpperCase()}
                  </div>
              </div>
          </li>

      </ul>
 </div>
</div>
  </div>
  );
};

const BonusDetailsComponent = () => {
  const { bonusData } = useContext(LoggedInUserContext);

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

const ChangePasswordComponent = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmNew, setConfirmNew] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(LoggedInUserContext);
  const changepassword = async () => {
    if (loading) {
      return;
    }
    if (oldPassword === "" || newpassword === "" || confirmNew === "") {
      showToast("Kindly Enter All Fields", "error");
      return;
    }
    if (newpassword !== confirmNew) {
      showToast("The Two Passwords Do Not Match!", "error");
      return;
    }

    setLoading(true);
    try {
      let res = await UserCrudRepo.changePassword(user[0].userId, {
        newPassword: newpassword,
        oldPassword: oldPassword,
      });
      if (res) {
        showToast("Success! Your Password Has Been Updated.", "success");
      }
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex w-[390px] md:w-[475px] flex-col rounded-md dark:bg-darkmain bg-white m-1 md:m-5">
      <p className="text-center text-xl font-black text-main dark:text-indigo-400 m-4" 
        style={{ fontFamily: "Montserrat" }}>
        CHANGE PASSWORD
      </p>
      <input
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder="Enter Your Old Password"
        className="rounded-md p-1.5 outline-none bg-gray-100 dark:bg-darksec m-2 text-base px-4 "
      />
      <input
        placeholder="Enter Your New Password"
        value={newpassword}
        onChange={(e) => setNewpassword(e.target.value)}
        className="rounded-md p-1.5 outline-none bg-gray-100 dark:bg-darksec  m-2  text-base px-4"
      />
      <input
        value={confirmNew}
        onChange={(e) => setConfirmNew(e.target.value)}
        placeholder="Confirm Your New Password"
        className="rounded-lg p-1.5 outline-none bg-gray-100 dark:bg-darksec  m-2 text-base px-4 "
      />

      <div
        onClick={changepassword}
        className="bg-red-600 rounded-md p-2 px-4 cursor-pointer self-center flex h-8 items-center text-white font-bold mt-5"
      >
        {loading && <LoadingComponent color="white" loading={loading} />}
        <p>{loading ? "Updating..." : " UPDATE PASSWORD"}</p>
      </div>
      <div className="h-8"></div>
    </div>
  );
};
const UserSettingsComponent = () => {
  const { thememode, toggleTheme } = useContext(IsDarkThemeContext);
  const [allowNots, setAllowNots] = useState(false);
  return (
    <div className="flex w-[390px] md:w-[475px]  flex-col rounded-md bg-white m-1 md:m-5 p-1 dark:bg-darkmain">
      <p className="text-center text-xl font-black  text-main dark:text-indigo-400 m-2"   style={{ fontFamily: "Montserrat" }}>SETTINGS</p>

      <div
        onClick={() => toggleTheme()}
        className="flex p-2  my-2  cursor-pointer items-center justify-between"
      >
        <p>Enable Dark Mode</p>
        <input
          type="checkbox"
          className="w-5 h-5 rounded-md mx-2"
          checked={thememode !== "light"}
          onChange={(e) => toggleTheme()}
        />
      </div>
      <div
        onClick={() => setAllowNots(!allowNots)}
        className="flex p-2 my-2 cursor-pointer  items-center justify-between"
      >
        <p>Allow Notifications</p>
        <input
          type="checkbox"
          className="w-5 h-5 rounded-md mx-2"
          checked={allowNots}
          onChange={(e) => setAllowNots(!allowNots)}
        />
      </div>

      <div className="h-8"></div>
    </div>
  );
};
