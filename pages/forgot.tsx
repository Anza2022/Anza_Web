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
        <title>Anza -Forgot Password</title>
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
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);



  const SendInstructions = async () => {
    if (email === "") {
      showError("Your email is required");
      return;
    }
setLoading(true);
try {
  let res = await UserCrudRepo.resetPassword(email);
   showToast(`Success`, "success");
  setLoading(false);
} catch (e) {
  showError(`${e}`);
} finally {
  setLoading(false);
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
          FORGOT PASSWORD
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


      <div className="flex flex-col text-sm my-2">
        <p>Enter your email address below and we will <br/> send further instructions to you.</p>
      </div>
      <div className="flex flex-col my-2">
                <label htmlFor="email" className="mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="outline-none p-2 rounded-lg focus:ring-2 ring-main ring-1  w-[300px]  md:w-96 "
                  placeholder=" Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  autoCorrect="off"
                />
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
        onClick={SendInstructions}
        className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-main hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer "
      >
            <LoadingComponent loading={loading} color="white" />
        <p className="font-bold"> {loading ? "Sending...." : "EMAIL INSTRUCTIONS"}</p>
      </div>{" "}
      <div className="h-5"></div>
    </div>
  );
};