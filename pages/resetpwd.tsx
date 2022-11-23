import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import LoadingComponent from "../presentation/components/others/loading_component";
import { NavigationContext } from "../presentation/contexts/navigation_state_controller";
import AppLayout from "../presentation/layouts/app_layout";
import {
  showToast,
  validateEmail,
} from "../presentation/utils/helper_functions";
import loginpic from "../assets/images/login2pi.png";
import { AnimatePresence, motion } from "framer-motion";
import UserCrudRepo from "../data/repos/user_crud_repo";
const ForgotPasswordPage = () => {
  const { selectedVideoId, setSelectedVideoId } = useContext(NavigationContext);

  let pageComponents = [
    <ResetPasswordComponent key="resetpassword" />,
  ];
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/login");
    router.prefetch("/forgot");
  }, []);


  return (
    <AppLayout>
      <Head>
        <title>Anza -Reset Password</title>
        <meta
          name="description"
          content="Reset password to you account and continue expriencing anza academy"
        />

<meta
          name="keywords"
          content="Past papers, KCSE, revision papers, form 1, form 2 form 4, free revision past papers, revision papers with answers, kcse past papers with answers pdf, free revision papers with answers. Tuition, private tuition centers in Nairobi, tuition centers near me, tuition centers in south c, tutors in nairobi, kcse, tuition centers in nairobi,online tutors in kenya, physics and maths tutor, physics and maths tutor, chemistry, physics past papers. Career guidance and counselling, career guidance for highschool students, career guidance in kenya,list of career chioces for highschool students, how do I choose a career path for students KCSE revision materials, Form 1,2,3,4 revision papers, free past papers and marking schemes,"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="login" href="http://anzaacademy.com/login" />
        <link rel="signup" href="http://anzaacademy.com/register" />
      </Head>
      <div className="w-full flex flex-col justify-center items-center h-screen  md:mt-10 relative bg-gray-200 dark:bg-darksec">
        {/* <img
          src={loginpic.src}
          alt="icon not found"
          className="w-full h-full  absolute  top-5 left-0 z-0  dark:hidden "
        /> */}
        {/* <div className="w-full h-full  absolute  top-0 left-0 z-0 bg-black bg-opacity-30 dark:hidden"></div> */}

        {pageComponents[currentPage]}

        <div className="h-20 md:hidden"></div>
      </div>
    </AppLayout>
  );
};

export default ForgotPasswordPage;

const ResetPasswordComponent = () => {
  const router = useRouter();
  const [newpassword, setPassword] = useState("");
  const [resettoken, setResetToken] = useState("bf818b1bde4d3cd2cdb50f98ba270fa20ee4883b");
  const [repeatpassword, setRepeatedPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPlainPassword, setShowPlainPassword] = useState(false);
  const [showPlainPassword2, setShowPlainPassword2] = useState(false);

  const resetPassword = async () => {
    if (newpassword === "") {
        showError("Your password is required");
        return;
      }
      if (repeatpassword === "") {
        showError("Repeat password is required");
        return;
      }
      if (newpassword != repeatpassword) {
        showError("The two passwords does not match");
        return;
      }

    setLoading(true);
    try {
      let res = await UserCrudRepo.changePassword(newpassword, resettoken);
      showToast(`Success`, "success");
      setLoading(false);
    } catch (e) {
      showError(`${e}`);
    } finally {
     
    }
    
  };



  //backend error handling
  const [error, setError] = useState("");
  const showError = (e: string) => {
    setError(e);
    setTimeout(() => {
      setError("");
    }, 3000);
  };
  return (
    <div className=" min-h-[320px]  bg-gray-50 dark:bg-darkmain z-10 shadow-sm shadow-gray-400 dark:shadow-gray-700 px-4 md:p-3  rounded-xl  hover:shadow-xl transition-all  ">
      <div className="flex flex-col  items-center    ">
        <p
          className="text-xl md:text-2xl  mt-2  font-black"
          style={{ fontFamily: "Montserrat" }}
        >
          RESET PASSWORD
        </p>
      </div>
      <AnimatePresence>
        {error !== "" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {/* <p className="font-bold text-sm">Oops Error</p> */}
            <p className="font-bold text-sm text-white rounded-md">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

              <div className="flex flex-col mt-5 relative text-sm">
              <label htmlFor="password" className="mb-1">New Password</label>
        <input
          type={`${showPlainPassword ? "text" : "password"}`}
          // type={`password`}
          id="password"
          className=" w-[300px] md:w-[420px]  outline-none ring-1 ring-main  rounded-md h-10 p-2 bg-gray-50 dark:bg-darksec focus:ring-2 "
          value={newpassword}
          placeholder="Enter New Password "
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => {
          }}
        />
<div
          onClick={() => setShowPlainPassword(!showPlainPassword)}
          className="absolute top-7 right-3 cursor-pointer"
        >
          {showPlainPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mt-1 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mt-1 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </div>
</div>


<div className="flex flex-col mt-5 relative text-sm">
<label htmlFor="repeat_password" className="mb-1">Repeat New Password</label>
        <input
          type={`${showPlainPassword2 ? "text" : "password"}`}
          // type={`password`}
          id="repeat_password"
          className=" w-[300px] md:w-[420px]  outline-none ring-1 ring-main  rounded-md h-10 p-2 bg-gray-50 dark:bg-darksec focus:ring-2 "
          value={repeatpassword}
          placeholder="Repeat New password "
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          onChange={(e) => setRepeatedPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              resetPassword();
            }
          }}
        />
<div
          onClick={() => setShowPlainPassword2(!showPlainPassword2)}
          className="absolute top-7 right-3 cursor-pointer"
        >
          {showPlainPassword2 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mt-1 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mt-1 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </div>
</div>


        <div className="">
        <div className="flex">

          <p
          >
          Remember Your password?{" "}
          </p>
        </div>
        <p
            onClick={() => router.push("/login")}
          className="text-main cursor-pointer underline"
        >
         {" "}Login Now
        </p>
      </div>


      <div className="h-5"></div>
      <div
        onClick={resetPassword}
        className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-main hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer "
      >
        {loading && <LoadingComponent loading={loading} color="white" />}
        <p className="font-bold"> {loading ? "Loading...." : "CHANGE PASSWORD"}</p>
      </div>{" "}
      <div className="h-5"></div>
    </div>
  );
};