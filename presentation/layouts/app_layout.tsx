/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from "framer-motion";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import AppDataRepo from "../../data/repos/app_data_repo";
import NavbarComponent from "../components/navbar";
import { AppDataContext } from "../contexts/app_data_context";
import { NavigationContext } from "../contexts/navigation_state_controller";
import { RiseLoader } from "react-spinners";
import anzalogo from "../../assets/images/anzawhitelogo.png";
import UserCrudRepo from "../../data/repos/user_crud_repo";
import { isBrowser, showToast } from "../utils/helper_functions";
import { retrieveFromLocalStorage } from "../../data/services/local_storage_services";
import { useRouter } from "next/router";
import { LoggedInUserContext } from "../contexts/loggedin_user_controller";
import whitelogo from "../../assets/images/anzawhitelogo.png";
import logo from "../../assets/images/anzalogo.png";
import { IsDarkThemeContext } from "../contexts/app_theme_controller";

const AppLayout = (props: PropsWithChildren<{}>) => {
  const { lock, setLock } = useContext(NavigationContext);
  const { schools, setSchools } = useContext(AppDataContext);
  const router = useRouter();
  const {
    setBonusData,
    setAccountSubscription,
    setIsLoggedIn,
    setUser,
    setUserStats,
  } = useContext(LoggedInUserContext);
  useEffect(() => {
    if (router.pathname == "google26a4a08c7beeaae6.html") {
    } else {
      if (isBrowser() && retrieveFromLocalStorage("id") !== null) {
        refreshUser();
      }
      if (schools.length < 1) {
        getAppData();
      }

      var Tawk_API: any = Tawk_API || {},
        Tawk_LoadStart = new Date();
      (function () {
        var s1 = document.createElement("script"),
          s0: any = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = "https://embed.tawk.to/620b4189a34c245641264ae0/1frtvg17s";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        s0.parentNode.insertBefore(s1, s0);
      })();
    }
  }, []);

  const getAppData = async () => {
    try {
      let res = await AppDataRepo.getAppData();
      setSchools(res.schools);
    } catch (e) {}
  };
  const [loading, setLoading] = useState(false);
  const refreshUser = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      let res = await UserCrudRepo.refreshUser();
      setUser([res[0]]);
      setBonusData([res[1]]);
      setAccountSubscription([res[2]]);
      setUserStats([res[3]]);

      setIsLoggedIn(true);

      router.push("/dashboard/videos");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/login");
    router.prefetch("/signup");
    router.prefetch("/dashboard/videos");
  });
  const { thememode } = useContext(IsDarkThemeContext);
  return (
    <AnimatePresence>
      <div
        className="flex flex-col w-full bg-gray-200 dark:bg-darksec dark:bg-opacity-50 dark:text-white min-h-screen  scroll-smooth relative"
        style={{ fontFamily: "Poppins" }}
      >
        {loading && (
          <div className="flex fixed top-0 left-0   w-full h-full justify-center items-center bg-black bg-opacity-80">
            {" "}
            <div className="flex flex-col items-center">
              <img
                src={anzalogo.src}
                alt="logo not found"
                className="w-40   cursor-pointer"
              />
              <p className="text-base">Learn at Ease</p>
              <div className="h-10"></div>
              <RiseLoader color="white" />
              <div className="h-8"></div>
              <p className="text-2xl text-center text-main">
                Refreshing ... <br />{" "}
                <span className="text-base text-white">please wait ...</span>
              </p>
            </div>
          </div>
        )}
        {lock && !loading && (
          <div className="w-screen h-screen fixed z-50 top-0 left-0 flex flex-col items-center justify-center bg-gray-200   dark:bg-slate-800">
            <motion.div
              initial={{
                opacity: 0.3,
              }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
              }}
              className="h-64 md:h-[270px] w-80 md:w-[450px] rounded-xl  bg-white mb-28 md:mb-8 flex flex-col justify-start items-center p-2 dark:bg-slate-600   shadow-sm hover:shadow-2xl shadow-gray-400  dark:shadow-slate-900  "
            >
              <div className="flex w-full">
                {" "}
                {thememode == "light" ? (
                  <img
                    src={logo.src}
                    alt="logo not found"
                    className="flex w-20 md:w-24   cursor-pointer"
                  />
                ) : (
                  <img
                    src={whitelogo.src}
                    alt="logo not found"
                    className="flex w-20 md:w-24  cursor-pointer"
                  />
                )}
              </div>
              <div className="h-8"></div>
              <p className="text-xl md:text-[22px]  font-black  text-center leading-4 font-sans">
                Welcome to <br className="" />
              </p>
              <p className="text-main text-xs md:text-sm  animate-pulse leading-4 font-sans font-semibold">
                Anza Academy
              </p>
              <p className="text-[11px] text-indigo-900 dark:text-indigo-700 ">
                Learn at Ease
              </p>

              <input
                type="password"
                name="lockcode"
                id="lockcode"
                autoComplete="new-password"
                className="outline-none p-2 md:p-3 text-sm shadow-xl dark:bg-slate-800   rounded-md focus:ring-2 ring-main ring-1   md:w-72  my-5 "
                placeholder="Enter site password"
                onChange={(e) => {
                  if (e.target.value.toLowerCase() == "temp@22#") {
                    setLock(false);
                  }
                }}
              />
            </motion.div>
          </div>
        )}

        {!lock && !loading && (
          <>
            <div className="fixed bg-white shadow-2xl right-0 top-80 h-80  w-20  flex-col p-4 hidden"></div>
            <NavbarComponent />
            <div className="w-full overflow-x-hidden bg-gray-200 dark:bg-darksec ">
              {props.children}
            </div>
          </>
        )}
      </div>
    </AnimatePresence>
  );
};

export default AppLayout;
