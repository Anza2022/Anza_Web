import React, { useState } from "react";
import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import router from "next/router";

const FaqsComponent = () => {
  let allfaqs: FaqModel[] = [
    new FaqModel(
      "Is Anza Academy a school?",
      "Anza Academy is a learning platform that offers aid to students using a wide variety of Science based animated lessons, quizzes and revision materials on internet-connected devices. You can learn as much as you want, whenever you want without interruption. There's always something new with new lessons added every week! "
    ),
    new FaqModel(
      " How can I access Anza Academy? ",
      "You can access Anza Academy anytime, anywhere using either a phone, tablet or a laptop.  "
    ),
    new FaqModel(
      "What classes can I access?",
      "You can access hundreds of lessons and learning material from Form 1 to Form 4."
    ),
    new FaqModel(
      "What Subjects do you tackle?",
      "We have specialized in Chemistry, Biology, Physics and Mathematics."
    ),
    new FaqModel(
      "What time are the lessons?",
      "The lessons are accessible anytime, both day and night as long as you log in."
    ),
    new FaqModel(
      "    How many times can I access or repeat a lesson?",
      "    You can repeat as many times as possible."
    ),
    new FaqModel(
"Can I ask class questions ",
"Yes, we provide several avenues for engagement. Starting with the “Ask a Quiz button to providing scheduled aid to students with challenges in specific areas"
    ),
    new FaqModel(
      "     Can I download the questions?",
      "No you can’t. However, the Anza platform is optimized to adopt a player that corresponds your broadbands strength. This ensures that irrespective of the internet speed in your area, you can quite comfortably stream our animated video completely hustle free. "
    ),


    new FaqModel(
      "How much does Anza Cost?",
      "Learn from your smartphone, tablet, Smart TV or laptop all from Ksh. 2000 per term. No extra costs."
    ),
    new FaqModel(
      "How do I make payment?",
      "Payment is available through an STK push of a Credit/Debit card on the platform. Anza does not accept cash or personal MPesa deposits."
    ),

    new FaqModel(
      " What are the benefits of using Anza?",
      "You will develop a problem-solving mindset focused on building skills and and understanding of solution to problems rather than a right or wrong answer. The lessons are built on the foundation of real life applications that helps the helps the student learn in a visual, interactive and fun ways."
    ),
    

    
  ];
  const [openStates, setOpenStates] = useState(
    Array(allfaqs.length).fill(false)
  );
  function openFaq(i: number) {
    let newstates = openStates.map((s, index) => {
      if (index == i) {
        return !openStates[i];
      }
      return false;
    });
    setOpenStates(newstates);
  }
  return (
    <div className="w-full flex flex-col py-16 md:py-24 dark:bg-darksec ">
      <p
        className="text-xl md:text-3xl font-black text-center py-5"
        style={{ fontWeight: 900, fontFamily: "Montserrat" }}
      >
        Frequently Asked Questions
      </p>
      <div className="flex flex-col justify-center items-center mb-4 dark:text-main"   style={{ fontFamily: "Overpass", fontWeight: 500 }}>
        {allfaqs.map((e, i) => (
          <OneQuestionComponent
            faq={e}
            key={e.question}
            isOpen={openStates[i]}
            index={i}
            toggleOpen={() => openFaq(i)}
          />
        ))}
      </div>









      <div className="flex flex-col justify-center items-center mb-4 mt-4"   style={{ fontFamily: "Overpass", fontWeight: 500 }}>
<div className="p-10  max-w-md bg-white dark:bg-darksec rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <svg className="mb-2 w-10 h-10 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clip-rule="evenodd"></path><path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path> </svg>

    Need a help, Call Us / Contact Us ? 

    <a href="login">
        <h5 className="mb-2 mt-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">CUSTOMER SUPPORT:</h5>
    </a>

    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
      <strong>MOBILE:</strong> +254701020202
    </p>

    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
      <strong>WHATSAPP:</strong>  +254701020202
    </p>

    <a href="login">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ENROLLING</h5>
    </a>


    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
      <strong> </strong> +254702010101
    </p>

    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
      <strong>EMAIL:</strong> wecare@anzaacademy.com
     </p>
    <a     onClick={() => router.push("/signup")} className="inline-flex items-center text-blue-600 hover:underline cursor-pointer">
        Get started Now.
        <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
    </a>
</div>
</div>


      
    </div>
  );
};

export default FaqsComponent;

class FaqModel {
  constructor(public question: string, public answer: string) {}
}

const OneQuestionComponent = (
  props: PropsWithChildren<{
    faq: FaqModel;
    isOpen: boolean;
    index: number;
    toggleOpen: () => void;
  }>
) => {
  return (
    <div
      className={`transition-all  duration-500 w-11/12  ${
        props.isOpen ? " h-72 md:h-40 " : "h-16 md:h-16"
      } ${
        props.index == 0
          ? "  border-t-2 border-gray-300 dark:border-gray-500"
          : ""
      }
      border-b-2 border-gray-300 dark:border-gray-500
     `}
    >
      <div
        onClick={props.toggleOpen}
        className={`flex justify-between items-center cursor-pointer ${
          "light" == "light" ? " hover:bg-gray-300" : " hover:bg-gray-800"
        }  ${props.isOpen ? "bg-gray-300 dark:bg-gray-800" : ""}`}
      >
        <p
          className=" text-lg md:text-xl font-black p-3 py-4 flex-1 text-opacity-90 text-gray-800 dark:text-gray-200"
          // style={{ fontFamily: "Montserrat" }}
        >
          {props.faq.question}
        </p>
        {props.isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" h-5 w-5 md:h-9 md:w-9"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-9 md:w-9"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>
      {props.isOpen && (
        <motion.div
          className={` text-sm   md:text-lg px-4`}
          transition={{
            duration: 0.7,
          }}
          initial={{
            opacity: 0.2,
          }}
          animate={{
            opacity: 1,
          }}
        >
          {`${props.faq.answer} \t`}
        </motion.div>
      )}
    </div>
  );
};
