/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContext } from "../presentation/contexts/navigation_state_controller";
import AppLayout from "../presentation/layouts/app_layout";

import {
  getCurrentDate,
  showToast,
} from "../presentation/utils/helper_functions";
import UserModel from "../models/user_models/user_model";
import LoadingComponent from "../presentation/components/others/loading_component";
import UserCrudRepo from "../data/repos/user_crud_repo";
import { LoggedInUserContext } from "../presentation/contexts/loggedin_user_controller";
import Head from "next/head";

import student from "../assets/icons/students.png";
import teacher from "../assets/icons/teacher.png";
// import school from "../assets/images/school.png";
import { classOptions } from "../presentation/utils/constants";
import { AppDataContext } from "../presentation/contexts/app_data_context";
const SignUpPage = () => {
  const { selectedVideoId, setSelectedVideoId } = useContext(NavigationContext);
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/forgot");
    router.prefetch("/login");
    router.prefetch("/dashboard/videos");
  }, []);

  let forms = ["Form 1", "Form 2", "Form 3", "Form 4"];
  //user details
  const [accountType, setAccountType] = useState("student");
  const [schoolname, setSchoolname] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState("");

  const [tscid, setTscid] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [regNo, setRegNo] = useState("");
  const [instutionName, setInstutionName] = useState("");
  const [primarySubject, setPrimarySubject] = useState("");
  const [secondarySubject, setSecondarySubject] = useState("");

  let subjects = [
    "Mathematics",
    "Biology",
    "Chemistry",
    "Physics",
    "History",
    "Geography",
    "Kiswahili",
    "English",
    "Computer",
  ];

  //user context
  const {
    setUser,
    setAccountSubscription,
    setBonusData,
    setUserStats,
    setIsLoggedIn,
  } = useContext(LoggedInUserContext);
  const { inviteCode, setInviteCode, setUserName, userName } =
    useContext(NavigationContext);
  function isNumeric(val: string) {
    return /^-?\d+$/.test(val);
  }
  const handleSignup = async () => {
    if (loading) {
      return;
    }
    if (userName == "") {
      showToast("Kindly enter your name", "error");
      return;
    }
    if (phoneNumber == "" || phoneNumber.length < 9 || phoneNumber.length > 9) {
      showToast("Invalid phone number", "error");
      return;
    }
    if (!isNumeric(phoneNumber)) {
      showToast("Phone Number should only contain  numbers", "error");
      return;
    }
    if (password == "") {
      showToast("Kindly enter a password", "error");
      return;
    }

    if (password !== confirmPassword) {
      showToast("The two passwords you have entered do not match!", "error");
      return;
    }

    try {
      setLoading(true);
      const newuser = new UserModel(
        "",
        accountType,
        accountType == "school" ? instutionName : schoolname,
        classLevel,
        userName,
        email,
        `254${phoneNumber}`,
        password,
        "", //profile pic
        false, // is admin
        "", //admin type
        false, // super admin
        false, //phonenumber verification
        false, //email verification
        false, //is first time login --for tour
        false, //is google signup
        true, //is logged in
        getCurrentDate(),
        getCurrentDate(),
        tscid,
        primarySubject,
        secondarySubject
      );

      let res = await UserCrudRepo.registerUser(newuser, inviteCode);
      setUser([res[0]]);
      setBonusData([res[1]]);
      setAccountSubscription([res[2]]);
      setUserStats([res[3]]);
      showError("Registration successful. Now redirecting!");
      showToast("Registration successful. Now redirecting", "success");
      router.push("/dashboard/videos");
      setIsLoggedIn(true);
      console.log(res);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  };

  //get the invite code and add it

  const [currentStep, setCurrentStep] = useState(0);
  const validateFirstStep = (): boolean => {
    if (accountType == "student") {
      if (schoolname == "") {
        showToast("Kindly enter your school name", "error");
        return false;
      }
      if (classLevel == "") {
        showToast("Kindly select your class level", "error");
        return false;
      }
      if (terms == "") {
        showToast("Kindly Read and Acccept ANZA ACADEMY terms and policies", "error");
        return false;
      }
    }
    if (accountType == "teacher") {
      // if (tscid == "") {
      //   showToast("enter tscid", "error");
      //   return false;
      // }
      if (schoolname == "") {
        showToast("Kindly enter your school", "error");
        return false;
      }
      if (primarySubject == "" || secondarySubject == "") {
        showToast("Kindly select subjects", "error");
        return false;
      }
    }
    if (accountType == "school") {
      if (schoolname == "") {
        showToast("Kindly type your school name", "error");
        return false;
      }
      if (regNo == "") {
        showToast("Kindly enter your student registration number.", "error");
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (router.asPath != "/signup") {
      let path = router.asPath;
      let invitestring = path.split("?")[1].split("=")[1];
      setInviteCode(invitestring);
    }
  });

  const { schools } = useContext(AppDataContext);
  useEffect(() => {
    if (window != undefined) {
      window.Tawk_API?.hideWidget();
    }
    return () => {
      window.Tawk_API?.showWidget();
    };
  });
  return (
    <AppLayout>
      <Head>
        <title>Anza -Sign up</title>
        <meta
          name="description"
          content="Create new account and get a learning exprience you will live to remember "
        />
                <meta
          name="keywords"
          content="Past papers, KCSE, revision papers, form 1, form 2 form 4, free revision past papers, revision papers with answers, kcse past papers with answers pdf, free revision papers with answers. Tuition, private tuition centers in Nairobi, tuition centers near me, tuition centers in south c, tutors in nairobi, kcse, tuition centers in nairobi,online tutors in kenya, physics and maths tutor, physics and maths tutor, chemistry, physics past papers. Career guidance and counselling, career guidance for highschool students, career guidance in kenya,list of career chioces for highschool students, how do I choose a career path for students KCSE revision materials, Form 1,2,3,4 revision papers, free past papers and marking schemes,"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="login" href="http://anzaacademy.com/login" />
        <link rel="signup" href="http://anzaacademy.com/register" />
      </Head>
      <div className="w-screen min-h-screen flex flex-col justify-start items-center mt-12 md:mt-16  leading-5 ">
        <div className="flex flex-col  items-center pb-1">
          <p className="text-xl md:text-2xl leading-loose font-black mt-3 mb-3">
            Create New Account
          </p>
          {/* <p className="text-sm leading-3">Already have an account?.</p>
          <p className="text-xs leading-3">
            Click{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-main px-1 cursor-pointer text-base font-mono font-bold hover:text-indigo-900"
            >
              here
            </span>{" "}
            to login
          </p> */}
        </div>

        <div className="mb-10 p-4 rounded-lg md:px-8 w-[330px] md:w-[430px] h-[500px] flex flex-col bg-white shadow-sm shadow-gray-300 dark:shadow-gray-700 dark:bg-black dark:bg-opacity-50">
          <div className="w-full h-12  flex items-center justify-center text-black mb-3">
            <div
              onClick={() => setCurrentStep(0)}
              className={`flex items-center space-x-1 font-bold cursor-pointer  `}
            >
              <div
                className={` flex w-10 h-10 rounded-full  justify-center  items-center transition-all ${
                  currentStep === 0
                    ? "bg-main text-white"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                1
              </div>
              <p
                className={`text-xs transition-all ${
                  currentStep === 0 ? " flex text-main " : "dark:text-white"
                }`}
              >
                Account <br /> Details
              </p>
            </div>
            <hr className="w-24 md:w-24 mx-4  h-0.5 bg-black" />
            <div className="flex items-center space-x-1 font-bold cursor-pointer">
              <div
                className={`w-10 h-10 rounded-full  flex justify-center items-center transition-all ${
                  currentStep === 1
                    ? "bg-main text-white "
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                2
              </div>
              <p
                className={`text-xs  transition-all ${
                  currentStep === 1 ? "flex  text-main" : "dark:text-white"
                }`}
              >
                Personal <br /> Details
              </p>
            </div>
          </div>

          {currentStep == 0 ? (
            <div className="flex flex-col justify-center ">
              <div className="h-96 w-full flex flex-col ">
                <div className="flex justify-around space-x-2">
                  <div
                    onClick={() => setAccountType("student")}
                    className={`flex flex-col h-32 w-[130px] md:w-40 rounded-lg cursor-pointer items-center justify-around  transition-all ${
                      accountType == "student"
                        ? "bg-main text-white "
                        : "bg-gray-300 dark:bg-darksec"
                    }`}
                  >
                    <img
                      src={student.src}
                      alt="icon not found"
                      className="w-20 h-20"
                    />
                    <p className={`text-lg font-semibold`}>Student</p>
                  </div>
                  <a href="https://forms.gle/WZyFdZUFyfJNJWJdA" rel="noreferrer" target="_blank">
                  <div
                    //onClick={() => setAccountType("teacher")}
                    className={`flex flex-col h-32 w-[130px] md:w-40 rounded-lg cursor-pointer items-center justify-around  transition-all   ${
                      accountType == "teacher"
                        ? "bg-main text-white"
                        : "bg-gray-300 dark:bg-darksec"
                    }
                    `}
                  >
                    <img
                      src={teacher.src}
                      alt="icon not found"
                      className="w-20 h-20"
                    />
                    <p className={`text-lg font-semibold`}>Teacher</p>
                  
                  </div> 
                   </a>
                  {/* <div
                    onClick={() => setAccountType("school")}
                    className={`flex flex-col h-32 w-[100px] md:w-36 rounded-lg cursor-pointer items-center justify-around  ${
                      accountType == "school" ? "bg-main " : "bg-gray-400"
                    }`}
                  >
                    <img
                      src={school.src}
                      alt="icon not found"
                      className="w-20 h-20"
                    />
                    <p className={`text-lg`}>Institution</p>
                  </div> */}
                </div>
                {accountType === "student" ? (
                  <div className="flex justify-center  flex-col self-center ">
                    <div className="flex flex-col m-2">
                      <label htmlFor="chapterName" className="mb-1">
                        {" "}
                        School Name
                      </label>
                      <input
                        className="w-[300px]  md:w-96 outline-none focus:ring-2 ring-main ring-1   rounded-lg p-2 dark:bg-darksec"
                        list="allschools"
                        id="schoolname"
                        name="schoolname"
                        placeholder="Enter or select school name"
                        value={schoolname}
                        onChange={(e) => setSchoolname(e.target.value)}
                        autoComplete="off"
                      />
                      <datalist id="allschools" className="">
                        {schools
                          .map((e) => e.schoolName)
                          .sort()
                          .map((e) => (
                            <option key={e} value={e} />
                          ))}
                        <option value={"Anza Academy"} />
                      </datalist>
                    </div>
                    <div className="flex justify-center  flex-col self-center">
                      <label htmlFor="classlevel" className="text-sm  mb-1">
                        Class Level
                      </label>
                      <select
                        name="classlevel"
                        id="classlevel"
                        className="w-[300px]  focus:ring-2 ring-main ring-1 bg-white  md:w-96 outline-none  rounded-lg p-2 dark:bg-darksec"
                        onChange={(e) =>
                          setClassLevel(e.target.value.toLowerCase())
                        }
                      >
                        <option value={""}>Select Form</option>
                        {forms.map((e) => (
                          <option value={e.toLowerCase()} key={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : accountType === "teacher" ? (
                  <div className="flex justify-center  flex-col self-center  ">
                    {/* <div className="flex flex-col my-3">
                      <label htmlFor="tscid">Tsc Id</label>
                      <input
                        type="text"
                        name="tscid"
                        id="tscid"
                        className="outline-none p-2 rounded-lg focus:ring-2 ring-main ring-1  w-[300px]  md:w-96 dark:bg-darksec "
                        placeholder="Enter TSC number"
                        value={tscid}
                        onChange={(e) => setTscid(e.target.value)}
                        autoComplete="off"
                        autoCorrect="off"
                      />
                    </div> */}
                    <div className="flex flex-col m-2">
                      <label htmlFor="chapterName" className="mb-1">
                        {" "}
                        School Name
                      </label>
                      <input
                        className="w-[300px]  focus:ring-2 ring-main ring-1  md:w-96 outline-none  rounded-lg p-2 dark:bg-darksec"
                        list="allschools"
                        id="schoolname"
                        name="schoolname"
                        placeholder="Type school name"
                        value={schoolname}
                        onChange={(e) =>
                          setSchoolname(e.target.value.toLowerCase())
                        }
                        autoComplete="off"
                      />
                      <datalist id="allschools">
                        {schools
                          .map((e) => e.schoolName)
                          .sort()
                          .map((e) => (
                            <option key={e} value={e} />
                          ))}
                      </datalist>
                    </div>
                    <div className="flex justify-between mx-2">
                      <div className="flex flex-col">
                        <label htmlFor="primarysub" className="mb-1">
                          Primary Subject
                        </label>
                        <select
                          name="primarysub"
                          id="primarysub"
                          value={primarySubject}
                          className="outline-none p-1.5 rounded-lg focus:ring-2 bg-white ring-main ring-1  min-w-32 md:w-40 dark:bg-darksec  "
                          onChange={(e) => setPrimarySubject(e.target.value)}
                        >
                          <option value="">Select Subject</option>
                          {subjects.map((e, i) => (
                            <option key={i} value={e.toLowerCase()}>
                              {e}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="secondarysub" className="mb-1">
                          Secondary Subject
                        </label>
                        <select
                          name="secondarysub"
                          id="secondarysub"
                          value={secondarySubject}
                          className="outline-none p-1.5 rounded-lg focus:ring-2  bg-white ring-main ring-1 min-w-32 md:w-40  dark:bg-darksec ml-2 md:ml-0"
                          onChange={(e) => setSecondarySubject(e.target.value)}
                        >
                          <option value="">Select Subject</option>
                          {subjects.map((e, i) => (
                            <option key={i} value={e.toLowerCase()}>
                              {e}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center  flex-col self-center ">
                    <div className="flex flex-col mt-3">
                      <label htmlFor="institution" className="mb-1">
                        School Name
                      </label>
                      <input
                        type="text"
                        name="institution"
                        id="institution"
                        className="outline-none p-2 rounded-lg focus:ring-2 ring-main ring-1  w-[300px]  md:w-96 dark:bg-darksec"
                        placeholder="enter school name"
                        value={instutionName}
                        onChange={(e) => setInstutionName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col mt-3">
                      <label htmlFor="registration" className="mb-1">
                        Registration Number
                      </label>
                      <input
                        type="text"
                        name="registration"
                        id="registration"
                        className="outline-none p-2 rounded-lg focus:ring-2 ring-main ring-1  w-[300px]  md:w-96 dark:bg-darksec"
                        placeholder="enter registration number"
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value)}
                      />
                    </div>
                  </div>
                )}
                <div className="flex flex-col self-center my-3">
                  <label htmlFor="invitecode" className="text-left mb-1">
                    {" "}
                    Bonus Code
                  </label>
                  <input
                    type="text"
                    name="invitecode"
                    id="invitecode"
                    className="outline-none p-2 rounded-lg focus:ring-2 ring-main ring-1  w-[300px]  md:w-96 dark:bg-darksec "
                    placeholder="Optional"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                  />
                </div>


<div className="flex items-center mb-4">
<label className="ml-0 text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">
By registering you agree to the <strong>ANZA ACADEMY</strong> 
<a href="https://www.dropbox.com/s/aqlc5hx7pxk3wc3/ANZA%20ACADEMY%20PRIVACY%20POLICY_TERMS%20OF%20USE%20%282%29.docx?dl=0" rel="noopener noreferrer" target={"_blank"}  className="text-blue-400 underline">  Terms of Use And Privacy Policy </a>
</label>
    <input id="default-checkbox" type="checkbox"  required={true} className="w-6 h-6 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mb-2"
     value={"terms"}
     onChange={(e) => setTerms(e.target.value)}
     />
</div>



              </div>

              <div className="flex w-[300px] md:w-96 self-center justify-end mt-2">
                <div
                  onClick={() => {
                    if (validateFirstStep()) {
                      setCurrentStep(1);
                    }
                  }}
                  className="flex items-center mt-0 bg-main rounded-md text-white cursor-pointer px-7 py-2 hover:dark:bg-indigo-700 hover:bg-indigo-700 focus:outline-none "
                >
                  Continue
                </div>
              </div>

              <div className="flex w-[300px] md:w-96  justify-left mt-3">
                <div className="">
                  <div className="flex">
                    <p>
                      Already Have an account?{" "}
                      <span
                        className="text-main cursor-pointer underline"
                        onClick={() => router.push("/login")}
                      >
                        {" "}
                        Login Now.{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : currentStep == 1 ? (
            <div className="flex flex-col h-96  items-center">
              <div className="flex flex-col">
                <label htmlFor="username" className="mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="outline-none p-2 rounded-lg focus:ring-2 ring-main ring-1 w-[300px]  md:w-96 dark:bg-darksec"
                  placeholder="Enter Your Full Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  autoComplete="off"
                  autoCorrect="off"
                />
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="outline-none p-2 rounded-lg focus:ring-2 ring-main ring-1  w-[300px]  md:w-96 "
                  placeholder="Enter Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  autoCorrect="off"
                />
              </div>
              <div className="flex flex-col my-2 relative">
                <label htmlFor="phonenumber" className="mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phonenumber"
                  id="phonenumber"
                  className="outline-none p-2 rounded-lg focus:ring-2 ring-main ring-1  w-[300px]  md:w-96 pl-20 dark:bg-darksec"
                  placeholder="Enter Your Phone Number"
                  value={phoneNumber}
                  maxLength={9}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  autoComplete="off"
                  autoCorrect="off"
                />
                <div className="flex absolute top-4 rounded-l-lg left-0 px-3 py-3 bg-main mt-1 text-white">
                  +254
                </div>
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="password" className="mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="outline-none p-2 rounded-lg focus:ring-2 ring-main ring-1  w-[300px] md:w-96 dark:bg-darksec "
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  autoCorrect="off"
                />
              </div>
              <div className="flex flex-col my-2">
                <label htmlFor="confirmpassword" className="mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  className="outline-none p-2 rounded-lg focus:ring-2 ring-main ring-1  w-[300px] md:w-96 dark:bg-darksec "
                  placeholder="Re-enter Your Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="off"
                  autoCorrect="off"
                />
              </div>

              <div className="flex w-[330px] md:w-96 self-center justify-between mt-0">
                <div
                  onClick={() => setCurrentStep(0)}
                  className="flex items-center border-2 border-main rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-main transition-all cursor-pointer px-7 py-2"
                >
                  Go Back
                </div>
                <div
                  onClick={() => {
                    if (true) {
                      handleSignup();
                    } else {
                      showToast("Registration locked: Contact admin:", "info");
                    }
                  }}
                  className=" mx-4 cursor-pointer p-2 px-8 rounded-md bg-main flex items-center justify-center text-white font-bold hover:dark:bg-indigo-700 hover:bg-indigo-700 focus:outline-none "
                >
                  <LoadingComponent loading={loading} color="white" />
                  <p> {loading ? "Signing up .." : "Sign Up"}</p>
                </div>
              </div>
            </div>
          ) : (
            <div>verification</div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default SignUpPage;
function showError(arg0: string) {
  throw new Error("Function not implemented.");
}

