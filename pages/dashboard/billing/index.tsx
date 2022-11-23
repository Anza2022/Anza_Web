import moment from "moment";
import router, { useRouter } from "next/router";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  MdDateRange,
  MdGroupWork,
  MdNextPlan,
  MdTimelapse,
} from "react-icons/md";
import AccountSubscription from "../../../models/user_models/account_subscription";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import { LoggedInUserContext } from "../../../presentation/contexts/loggedin_user_controller";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import { websProdUrl } from "../../../presentation/utils/constants";
import {
  addMonthsToDate,
  formatDateString,
  formatStringToMoney,
  getCurrentDate,
  getRemainigTimeToStableVersion,
  isBrowser,
  showToast,
} from "../../../presentation/utils/helper_functions";

const UserBillingPage = () => {
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
    router.prefetch("/dashboard/profile");
    router.prefetch("/");
  }, []);

  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  mt-10   md:ml-44 relative min-h-screen  w-full items-center">
        <p
          className="py-5 text-center font-black text-2xl mb-3  mt-5  text-main dark:text-indigo-400"
          style={{ fontFamily: "Montserrat" }}
        >
          HOW TO MAKE YOUR PAYMENT
        </p>

        <div className="flex justify-between mb-10 text-2sm p-2 bg-white dark:bg-darkmain font-normal">
          <p className=" mr-5">1. Choose A Plan</p>
          <p className="mr-5 text-main">{">>>"}</p>
          <p className=" mr-5 ">2. Confirm the number to pay with</p>
          <p className=" mr-5 text-main">{">>>"}</p>
          <p className=" mr-5">
            3. Then Click &ldquo;CLICK HERE TO PAY&ldquo;&ldquo; button
          </p>
        </div>

        <div className="flex flex-wrap-reverse mx-2 w-full justify-around mb-10 md:mb-20">
          <BillingDetailsComponent />
          <RealtimePaymentComponent />
        </div>
        {/* <SchoolPricingComponent /> */}
        <StudentPricingComponent />
        {/* <h1 className=" text-gray-900 p-10 dark:text-white">
          This is the user Billing page, shows the next payments date, provides
          realtime payments system , shows a timer to next payment and to
          account lock
        </h1> */}
      </div>
    </DashboardLayout>
  );
};

export default UserBillingPage;

const BillingDetailsComponent = () => {
  const { accountSubscription } = useContext(LoggedInUserContext);
  const [remaingTime, setRemaingTime] = useState(
    getRemainigTimeToStableVersion()
  );

  useEffect(() => {
    let interval = setInterval(() => {
      setRemaingTime(getRemainigTimeToStableVersion());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [remaingTime]);

  return (
    <div className="flex flex-col w-96 md:w-[350px]  bg-white dark:bg-darkmain rounded-lg mt-16 md:mt-0">
      <div className="p-4 max-w-md bg-white rounded-lg  sm:p-8 dark:bg-darkmain ">
        <div className="flex justify-between items-center mb-4">
          <h5
            className="text-xl font-bold leading-none text-main dark:text-indigo-400 "
            style={{ fontFamily: "Montserrat" }}
          >
            YOUR BILLING DETAILS
          </h5>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <MdNextPlan size={"22px"} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Subscription Status{" "}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-main dark:text-main">
                  {accountSubscription[0] != undefined
                    ? accountSubscription[0].isSubscriptionActive
                      ? "Active"
                      : "Ended"
                    : ""}
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <MdNextPlan size={"22px"} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Current Plan
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-main dark:text-main">
                  {accountSubscription[0] != undefined
                    ? accountSubscription[0].currentSubscriptionPlan
                    : ""}
                </div>
              </div>
            </li>

            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <MdDateRange size={"23px"} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Ending
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-main dark:text-main">
                  {formatDateString(
                    accountSubscription[0] != undefined
                      ? accountSubscription[0].subscriptionEndDate
                      : ""
                  )}
                </div>
              </div>
            </li>

            {/* <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                <MdDateRange size={"23px"}/>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Last Payment Date
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-main dark:text-main">
                    {formatDateString("2022-10-01")}
                    </div>
                </div>
            </li> */}

            <li className="py-3 sm:py-4">
              {/* <div className="flex items-center space-x-4">
                <MdTimelapse size={"23px"} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Remaining Time
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-main dark:text-main">
                  {remaingTime}
                </div>
              </div> */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
const RealtimePaymentComponent = () => {
  const { accountSubscription, setAccountSubscription, user, setUser } =
    useContext(LoggedInUserContext);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [terms, setTerms] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState(
    `+${user[0] == undefined ? "+254" : user[0].phoneNumber}`
  );

  const getTotalPay = () => {
     if (selectedPlan == "Basic") {
      //return 1;
       return 2000;
    } else if (selectedPlan == "Standard") {
      //return 2;
       return 2500;
    } else {
      //return 3;
       return 6800;
    }
  };
  const getNextPaymentDate = () => {
    return moment(Date.now())
      .add(moment.duration(3 * terms, "months"))
      .format("LL");
  };

  // const [details, setDetails] = useState<any[""]>([]);
  // const [feedbackData, setFeedbackData] = useState<string[]>(["Loading .."]);
  // const [datarecieved, setDatarecieved] = useState(false);
  // const isMounted = useRef(false);
  // let timer = setInterval(() => {}, 500);

  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState<boolean>(false);
 const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [paymentFailed, setPaymentFailed] = useState<boolean>(false);
  const [stkData, STKResponse] =  useState<any[""]>([]);

  
  // function handleIncomingmMessage(msg: MessageEvent) {
  //   feedbackData.push(msg.data);
  //   setFeedbackData((c) => feedbackData);
  //   console.log(msg.data);
  //   if (msg.data == "payment success") {
  //     setPaymentSuccess(true);
  //     setProcessingPayment(false);
  //     accountSubscription[0].subscriptionStartDate = getCurrentDate();
  //     accountSubscription[0].subscriptionEndDate = addMonthsToDate(3);
  //     accountSubscription[0].accountLockDate = addMonthsToDate(3);
  //     accountSubscription[0].currentSubscriptionPlan = selectedPlan;
  //     accountSubscription[0].resubscriptions =
  //       accountSubscription[0].resubscriptions += 1;
  //     setAccountSubscription(accountSubscription);

  //     return;
  //   }
  //   if (msg.data == "payment failed") {
  //     setPaymentFailed(true);
  //     setProcessingPayment(false);
  //     return;
  //   }
  //   setDatarecieved((v) => !v);
  // }

  // let wsInstance: any;
  const startProcessingPayment = () => {
    if (selectedPlan == "") {
      showToast("Please confirm/select Your preferred plan before initiating payment", "success");
      return;
    } 
    if (!phoneNumber.startsWith("+254")) {
      showToast("Phone number should start with +254", "error");
      return;
    }
    if (phoneNumber.length != 13) {
      showToast("Invalid phone number", "error");
      return;
    }
    let url =`${websProdUrl}?amount=${getTotalPay()}&phoneNumber=${phoneNumber
              .split("")
              .splice(1)
              .join(
                ""
              )}&time=${Date.now()}&months=${3}&plan=${selectedPlan}&userId=${
              user[0].userId
            }`;

      setProcessingPayment(true);
      setLoading(true);
      fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', },
      })
      .then((res) => {
        res.json().then((response) => {
          STKResponse(response)
          console.log(response);
          setPaymentSuccess(true);
        })
        setProcessingPayment(false);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
       setPaymentFailed(true)
       setProcessingPayment(false);
       setLoading(false)
      });


    // wsInstance = isBrowser()
    //   ? new WebSocket(
    //       `${websProdUrl}?amount=${getTotalPay()}&phoneNumber=${phoneNumber
    //         .split("")
    //         .splice(1)
    //         .join(
    //           ""
    //         )}&time=${Date.now()}&months=${3}&plan=${selectedPlan}&userId=${
    //         user[0].userId
    //       }`
    //     )
    //   : null;
    // if (wsInstance !== null) {
    //   wsInstance.onmessage = handleIncomingmMessage;
    // }
  };

  // const closeWebsocket = () => {
  //   setFeedbackData(() => []);
  //   isMounted.current = false;
  //   wsInstance?.send("close");
  //   wsInstance?.close();
  // };
  return (
    <div className="flex flex-col w-96 md:w-[550px] bg-white dark:bg-darkmain  rounded-lg  md:mt-0">
      <p
        className="text-center font-black text-lg text-main dark:text-indigo-400 pt-3 mb-4"
        style={{ fontFamily: "Montserrat" }}
      >
        PAY USING M-PESA
      </p>


      {processingPayment && (
      <div className="flex flex-col w-full h-52 items-center">
      <div className="flex flex-col h-20 bg-black bg-opacity-70 w-full p-2">
   <p className="text-white">Initiating....</p> 
      </div>
      <div className="h-5"></div>
        <LoadingComponent color="main" loading={processingPayment} />
    </div>
      )}

      
      {!processingPayment && paymentSuccess && (
        <div className="flex flex-col w-full h-52 items-center">
          <div className="flex flex-col h-32 justify-center items-left bg-green-600 w-full p-2">
    
       <p className="text-white font-normal text-sm">1: ResponseDesc: {stkData.ResponseDescription} </p> 
       <p className="text-white font-normal text-sm ">2: CheckoutRequestID : {stkData.CheckoutRequestID} </p> 
              <p className="text-black mt-2">STK PUSH INITIATED. Enter M-PESA PIN to complete transactions.</p>
          </div>
          <div className="h-5">   <LoadingComponent color="main" loading={processingPayment} /></div>
       
          <div
                    onClick={() => {
                      setProcessingPayment(false);
                      setPaymentFailed(false);
                      setPaymentSuccess(false);
                      router.push("/dashboard/videos");
                      setTimeout(() => {
                        router.push("/dashboard/billing");
                      }, 1000);
                      // closeWebsocket();
                    }}
            className="flex w-36 justify-center text-sm rounded-md bg-indigo-600 cursor-pointer py-2 text-white"
          >
            Close Process
          </div>
        </div>
      )}

      
      {!processingPayment && paymentFailed &&(
        <div className="flex flex-col w-full h-52 items-center">
          <div className="flex flex-col h-32 justify-center items-center text-white bg-red-600 w-full p-2">
            <p className="text-xl">STK FAILED. TRY AGAIN</p>
            {/* <p className="text-xs">{feedbackData[feedbackData.length - 2]}</p> */}
          </div>
          <div className="h-5"></div>
          <LoadingComponent color="main" loading={processingPayment} />
          <div
               onClick={() => {
                setProcessingPayment(false);
                setPaymentFailed(false);
                setPaymentSuccess(false);
                router.push("/dashboard/videos");
                setTimeout(() => {
                  router.push("/dashboard/billing");
                }, 1000);
                // closeWebsocket();
              }}
            className="flex w-36 text-sm justify-center rounded-md bg-indigo-600 cursor-pointer py-2 text-white"
          >
            Close Process
          </div>
        </div>
      )}

      {!processingPayment && (
        <div className="flex flex-col pb-4 px-5">
          <p className="font-normal mt-2 mb-2">Choose Your Preferred Plan</p>
          <div className="flex justify-between font-normal  mb-3">
            {["Basic", "Standard", "Savings"].map((e, i) => (
              <div
                key={e}
                onClick={() => {
                  console.log(e);
                  console.log(accountSubscription[0] != undefined
                    ? accountSubscription[0].currentSubscriptionPlan
                    : "");
                  if(e == (accountSubscription[0] != undefined
                    ? accountSubscription[0].currentSubscriptionPlan
                    : "" ) ) {
                      showToast("You are already subscribed to this package!", "error")
                    }else{
                      showToast(`You are about to subscribe to ${e}`, "success")
                              setSelectedPlan(e);     
                    }
                       
                }}
                className={`w-32 h-10 mr-2 flex items-center justify-center cursor-pointer rounded-md transition-all
                ${
                  selectedPlan == e
                    ? "bg-main text-white"
                    : "bg-gray-200 dark:bg-darksec"
                }                

                `}
              >
                <p className="">{e}</p>
              </div>
            ))}
          </div>
          {/* <div className="flex justify-between  mb-2 items-center">
          <p className="font-bold">Choose Number of terms</p>
          <input
            type={"number"}
            value={terms}
            min={1}
            onChange={(e) => {
              if (parseInt(e.target.value) >= 1) {
                setTerms(parseInt(e.target.value));
              }
            }}
            className=" px-3 py-0.5 w-16 bg-gray-200 dark:bg-darksec outline-none ring-0 rounded-sm ring-main focus:ring-2 transition-all"
          />
          <div className="hidden md:flex"></div>
        </div> */}
          <div className="flex justify-between  mb-2 items-center">
            <p className="font-normal">M-pesa Number</p>
            <input
              type={"text"}
              value={phoneNumber}
              min={1}
              autoFocus={false}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              className=" px-3 py-0.5 w-52 bg-gray-200 dark:bg-darksec outline-none ring-0 rounded-sm ring-main focus:ring-2 transition-all font-bold tracking-wider "
              style={{ fontFamily: "Montserrat" }}
            />
          </div>
          <div className="flex justify-between  mb-2 items-center">
            <p className="font-normal">Amount To Pay</p>
            <p
              className="font-bold text-main"
              style={{ fontFamily: "Montserrat" }}
            >
              {" "}
              <span className="text-sm px-2 ">KSH</span>
              {formatStringToMoney(getTotalPay())}
            </p>
          </div>
          <div className="flex justify-between  mb-2 items-center">
            <p className="font-normal">Next Payment Date </p>
            <p
              className="font-bold text-main"
              style={{ fontFamily: "Montserrat" }}
            >
              {formatDateString(
                accountSubscription[0] != undefined
                  ? accountSubscription[0].subscriptionEndDate
                  : ""
              )}
            </p>
          </div>
          {loading && (
            <div className="w-full  flex items-center justify-center mb-5">
              <LoadingComponent color="main" loading={loading} />
            </div>
          )}
          <div
            onClick={startProcessingPayment}
            className="w-full flex items-center justify-center cursor-pointer bg-green-600 rounded-lg h-9 text-white font-bold"
            style={{ fontFamily: "Montserrat" }}
          >
            CLICK HERE TO PAY
          </div>
        </div>
      )}
    </div>
  );
};

const StudentPricingComponent = () => {
  let plans: PricingPlan[] = [
    new PricingPlan("Basic", "2,000.00", "/3 months", "", [
      "Ad-free watching.",
      "Current class revision material.",
      "Revise at anywhere at your own pace.",
      "Test yourself at anytime.",
      "Access subject practicals.",
      "Access to career talks.",
      "Premium support.",
    ]),
    new PricingPlan("Standard", "2,500.00", "/3 months", "Recommended", [
      "Ad-free watching.",
      "Unlimited revision materials.",
      "Revise at anywhere at your own pace.",
      "Test yourself anytime.",
      "Access all our practicals.",
      "Access to career talks.",
      "Live consultation from anza teachers.",
    ]),
    new PricingPlan("Savings", "5,500.00", "/year", "", [
      "Save 500 on Basic package.",
      "Ad-free watching.",
      "Unlimited revision materials.",
      "Revise at anywhere at your own pace.",
      "Test yourself anytime.",
      "Access all our practicals.",
      "Access to career talks.",
    ]),
  ];
  return (
    <div className="w-full p-2 flex flex-col  ">
      {/* <p
        className="text-2xl font-black text-center text-main dark:text-indigo-400"
        style={{ fontFamily: "Montserrat" }}
      >
        STUDENT PRICING PLANS
      </p>
      <div className="py-3  pt-1 flex flex-wrap w-full justify-around" >
        {plans.map((e) => (
          <OnePricingComponent key={e.title} plan={e} />
        ))}
        <div className="w-80"></div>
      </div> */}
    </div>
  );
};
const SchoolPricingComponent = () => {
  // let plans: PricingPlan[] = [
  //   new PricingPlan("Basic", "10,000.00", "per/term", [
  //     "One form video lessons",
  //     "All setbooks",
  //     "Gamfied questions",
  //     "Career Talks",
  //     "Past papers",
  //   ]),
  //   new PricingPlan("Standard", "15,000.00", "per/term", [
  //     "All video lessons",
  //     "All setbooks",
  //     "Gamfied questions",
  //     "Past papers",
  //     "Virtual Labs",
  //     "Examiner and Career talks",
  //     "Mkurugenzi",
  //     "2 Schools Videos Lessons",
  //   ]),
  //   new PricingPlan("Premium", "20,000.00", "per/year", [
  //     "All video lessons",
  //     "All setbooks",
  //     "Gamfied questions",
  //     "Past papers",
  //     "Virtual Labs",
  //     "Mkurugenzi",
  //     "Examiner and Career talks",
  //     "All Schools Content",
  //     "Live Lessons",
  //   ]),
  // ];
  // return (
  //   <div className="w-full p-2 flex flex-col  ">
  //     <p
  //       className="text-2xl font-black text-center text-main dark:text-indigo-400"
  //       style={{ fontFamily: "Montserrat" }}
  //     >
  //       SCHOOL PRICING PLANS
  //     </p>
  //     <div className="py-3  pt-1 flex flex-wrap w-full justify-around">
  //       {plans.map((e) => (
  //         <OnePricingComponent key={e.title} plan={e} />
  //       ))}
  //       <div className="w-80"></div>
  //     </div>
  //   </div>
  // );
};

const OnePricingComponent = (
  props: PropsWithChildren<{ plan: PricingPlan }>
) => {
  return (
    <div className="w-80 rounded-lg   flex flex-col my-5 bg-white dark:bg-darkmain  pb-8">
      <p
        className="text-center text-white p-2  rounded-t-lg bg-main mb-1-"
        style={{ fontFamily: "Montserrat" }}
      >
        {props.plan.title.toUpperCase()}

        {props.plan.toprated == "" ? (
          ""
        ) : (
          <div className="badge absolute  bg-main mb-2  text-gray-200 p-1 px-2 text-xs font-bold">
            {props.plan.toprated}
          </div>
        )}
      </p>
      <div className="flex w-full justify-center my-3">
        <p className="text-xs self-center font-bold">KSH</p>
        <p
          className="text-4xl px-2 pr-1 font-bold text-main rounded-full "
          style={{ fontFamily: "Montserrat" }}
        >
          {props.plan.price}
        </p>
        <p className="text-xs self-end font-bold"> {props.plan.type}</p>
      </div>

      {props.plan.features.map((e) => (
        <div key={e} className="flex space-x-1 py-1 mx-2 items-center  px-2">
          <div className="w-5 h-5 rounded-full bg-main flex items-center justify-center text-white">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-white dark:text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <p className="text-sm font-normal">{e}</p>
        </div>
      ))}
    </div>
  );
};

class PricingPlan {
  constructor(
    public title: string,
    public price: string,
    public type: string,
    public toprated: string,
    public features: string[]
  ) {}
}
