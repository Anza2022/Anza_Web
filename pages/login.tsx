import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import UserCrudRepo from "../data/repos/user_crud_repo";
import LoadingComponent from "../presentation/components/others/loading_component";
import { LoggedInUserContext } from "../presentation/contexts/loggedin_user_controller";
import { NavigationContext } from "../presentation/contexts/navigation_state_controller";
import AppLayout from "../presentation/layouts/app_layout";
import {
  showToast,
  validateEmail,
} from "../presentation/utils/helper_functions";
import loginpic from "../assets/images/login2pi.png";
import { AnimatePresence, motion } from "framer-motion";

const LoginPage = () => {
  const { selectedVideoId, setSelectedVideoId } = useContext(NavigationContext);

  let pageComponents = [
    <LoginComponent key="login" />,
    // <ResetPasswordComponent key="resetpassword" />,
  ];
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/signup");
    router.prefetch("/forgot");
    router.prefetch("/dashboard/videos");
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>Anza -Login</title>
        <meta
          name="description"
          content="login to you account and continue expriencing anza academy"
        />

        <meta
          name="keywords"
          content="sign in, anza  academy, anza academy kenya, anza academy"
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

export default LoginPage;

const LoginComponent = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  //user context
  const {
    setUser,
    setAccountSubscription,
    setBonusData,
    setUserStats,
    setIsLoggedIn,
  } = useContext(LoggedInUserContext);
  function isNumeric(val: string) {
    return /^-?\d+$/.test(val);
  }
  const loginUser = async () => {
    if (loading) {
      return;
    }
    // if (phoneNumber == "" || phoneNumber.length < 9 || phoneNumber.length > 9) {
    //   showError("Invalid phonenumber");
    //   return;
    // }
    // if (!isNumeric(phoneNumber)) {
    //   showError("phone number should contain only numbers");
    //   return;
    // }
    if (phoneNumber === "") {
      showError("Kindly enter your phone number!");
      return;
    }

    if (password === "") {
      showError("Kindly input your password!");
      return;
    }
    setLoading(true);

    try {
      let res = await UserCrudRepo.loginUser({
        phoneNumber: `254${phoneNumber}`,
        password,
      });
      setUser([res[0]]);
      setBonusData([res[1]]);
      setAccountSubscription([res[2]]);
      setUserStats([res[3]]);

      setIsLoggedIn(true);

      router.push("/dashboard/videos");
    } catch (e) {
      showError(`${e}`);
    } finally {
      setLoading(false);
    }
  };
  const [showPlainPassword, setShowPlainPassword] = useState(false);

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
          Welcome Back, Login.
        </p>
        {/* <div className="flex flex-col  items-center ">
          <p className="text-sm ">
            Don't have an account ? <br />
          </p>
          <p className="text-sm">
            Click{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-main px-1 cursor-pointer text-md  font-black hover:text-indigo-900 "
            >
              here
            </span>{" "}
            to SignUp
          </p>
        </div> */}
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
      <div className="flex flex-col my-2 relative text-sm">
        <label htmlFor="phonenumber" className="mb-1">
          Phone Number
        </label>
        <input
          type="text"
          name="phonenumber"
          id="phonenumber"
          className="outline-none top-5 p-3 px-3 rounded-lg focus:ring-2 ring-main ring-1  w-[300px] md:w-[420px]  pl-20 dark:bg-darksec "
          placeholder="Enter phone number"
          value={phoneNumber}
          maxLength={9}
          onChange={(e) => setPhoneNumber(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
        />
        <div className="flex absolute top-5 ring-1   text-white rounded-l-lg left-0  px-3 py-3  bg-main mt-1">
          +254
        </div>
      </div>
      <div className="flex flex-col mt-5 relative text-sm">
        <label htmlFor="password " className="mb-1">
          Password
        </label>
        <input
          type={`${showPlainPassword ? "text" : "password"}`}
          // type={`password`}
          id="password"
          className=" w-[300px] md:w-[420px]  outline-none ring-1 ring-main  rounded-md h-10 p-2 bg-gray-50 dark:bg-darksec focus:ring-2 "
          value={password}
          placeholder="Enter password "
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              loginUser();
            }
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

      
      <div className="mt-3 flex w-full justify-end px-7">
        {/* <div className="flex space-x-2 items-center">
          <input
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            type="checkbox"
            className="h-5 w-5 rounded-md "
          />
          <p
            onClick={() => setRememberMe(!rememberMe)}
            className="cursor-pointer"
          >
            remember me
          </p>
        </div> */}
        <p
            onClick={() => router.push("/forgot")}
          className="text-main cursor-pointer underline"
        >
          Forgot password
        </p>
      </div>
      <div className="h-5"></div>
      <div
        onClick={loginUser}
        className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-main hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer mt-0"
      >
        {loading && <LoadingComponent loading={loading} color="white" />}
        <p className="font-bold"> {loading ? "Logging in ..." : "Login"}</p>
      </div>{" "}
      <div className="mt-2">
        <div className="flex">
          <p
          >
        Don&apos;t have an account?{" "}         <span
            onClick={() => router.push("/signup")}
          className="text-main cursor-pointer underline"
        >{" "}
        Register Now.
        </span>
          </p>
        </div>
      </div>
      <div className="h-5"></div>
    </div>
  );
};

// const ResetPasswordComponent = () => {
//   return <div className="w-96 h-96">this is the password reset component</div>;
// };
