/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import card from "../../../../assets/images/explorer.png";
import math from "../../../../assets/images/home/maths.png";
import bio from "../../../../assets/images/home/bio.png";
import career from "../../../../assets/images/home/career.png";
import chem from "../../../../assets/images/home/chem.png";
import geo from "../../../../assets/images/home/geo.png";
import pastpapers from "../../../../assets/images/home/pastpapers.png";
import physics from "../../../../assets/images/home/physics.png";
import schoolstories from "../../../../assets/images/home/skoolstories.png";
import funquiz from "../../../../assets/images/home/funquiz.png";
import { AnimatePresence, motion } from "framer-motion";

const SExplorer = () => {
  let explorerLinks: ExploreLink[] = [
    new ExploreLink("Biology", bio.src, "Classification II", 20, 1000),
    new ExploreLink(
      "Mathematics",
      math.src,
      "Math & Quandratic Expressions",
      20,
      1000
    ),
    new ExploreLink("Physics", physics.src, "Energy ", 5, 1000),
    new ExploreLink("Chemistry", chem.src, "States Of Matter", 10, 8500),
    new ExploreLink(
      "Fun Quizzes",
      funquiz.src,
      "Most Interactive quizzes",
      10,
      2000
    ),
    new ExploreLink(
      "Past Papers",
      pastpapers.src,
      "Math & Quandratic Expressions",
      20,
      1000
    ),
    new ExploreLink(
      "Career Guidance",
      career.src,
      "Career Master Class",
      150,
      10000
    ),
    new ExploreLink("Fun", schoolstories.src, "No books!", 10, 900),
  ];
  const [selectedButton, setSelectedButton] = useState<ExploreLink>(
    explorerLinks[0]
  );

  const changeSelected = async () => {};
  const [showCards, setShowCards] = useState(true);

  useEffect(() => {
    let interval = setInterval(() => {
      setShowCards(false);
      let index = explorerLinks.findIndex(
        (v) => v.linkname == selectedButton.linkname
      );

      if (index < 7) {
        setSelectedButton(explorerLinks[index + 1]);
      } else {
        setSelectedButton(explorerLinks[0]);
      }
      setTimeout(() => {
        setShowCards(true);
      }, 300);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [selectedButton]);

  return (
    <div  className="flex flex-col w-full pb-0 mt-20 ">
      <p  className="text-2xl md:text-3xl font-black  text-left pl-5 md:text-center leading-7 "
         style={{
          fontFamily: "Montserrat",
          fontWeight: "bold",
        }}>
        What would you love to explore today?
      </p>
      <div  className="flex  flex-wrap-reverse justify-around w-full mt-10">
        {/* <div className="w-10 hidden md:flex"></div> */}
        <div className="flex flex-wrap w-full md:w-[500px] justify-center md:justify-between ">
          {explorerLinks.map((e, i) => (
            <div key={i} className="flex  m-2 md:my-5">
              <div
                onClick={() => setSelectedButton(e)}
                className={` px-1 py-3 items-center w-64 md:w-52 cursor-pointer  md:text-lg dark:bg-black dark:bg-opacity-50  rounded-lg shadow-2xl flex justify-center font-bold transition-all duration-150 ${
                  selectedButton.linkname === e.linkname
                    ? "bg-main text-white dark:bg-main"
                    : "bg-gray-100 "
                } hover:bg-amber-500 dark:hover:bg-amber-500`}
                style={{ fontFamily: "Montserrat", fontWeight: 900 }}
              >
                {e.linkname}
              </div>
            </div>
          ))}
        </div>
        <div className="flex   h-80  ml-10 md:ml-0 justify-start  md:w-[300px] w-96 py-6 mb-10 ">
          <AnimatePresence>
            {showCards && (
              <motion.div
                animate={{ zoom: "100%", opacity: 1 }}
                exit={{ opacity: 0, zoom: "20%" }}
                initial={{
                  zoom: "10%",
                  opacity: 0,
                  // transformOrigin: "bottom, center",
                }}
                transition={{ duration: 0.4 }}
                className="flex relative  "
              >
                <motion.div
                  animate={{ rotate: -10 }}
                  // initial={{ transformOrigin: "bottom, center" }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex flex-col w-60 rounded-xl shadow-2xl absolute top-0 left-0  dark:bg-black dark:bg-opacity-50"
                >
                  <div className="h-44">
                    <img
                      src={explorerLinks[1].imageurl}
                      alt="cards not found"
                      className="rounded-2xl absolute top-0 left-0 w-full h-44"
                    />
                  </div>
                  <div className="flex justify-around -translate-y-4 text-xl">
                    <div className="flex bg-gray-300 px-5 py-1 font-bold shadow-2xl rounded-xl">
                      {/* 15Q */}
                    </div>
                    <div className="flex bg-gray-300 px-5 py-1 font-bold shadow-2xl rounded-xl ">
                      {/* 1k plays */}
                    </div>
                  </div>

                  <p className="text-2xl px-4 text-center">
                    {/* Brief Description Of Card */}
                  </p>
                  <div className="h-16"></div>
                </motion.div>
                <motion.div
                  animate={{ rotate: 10 }}
                  initial={{ transformOrigin: "bottom, center" }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex flex-col w-60 rounded-xl shadow-2xl absolute top-0 left-0 rotate-6 bg-transparent dark:bg-black dark:bg-opacity-50"
                >
                  <div className="h-44">
                    <img
                      src={explorerLinks[2].imageurl}
                      alt="cards not found"
                      className="rounded-2xl absolute top-0 left-0 w-full h-44"
                    />
                  </div>
                  <div className="flex justify-around -translate-y-4 text-xl">
                    <div className="flex h-12 px-5 py-1 font-bold shadow-2xl rounded-xl">
                      {/* 15Q */}
                    </div>
                    <div className="flex h-12 px-5 py-1 font-bold shadow-2xl rounded-xl ">
                      {/* 1k plays */}
                    </div>
                  </div>

                  <p className="text-2xl px-4 text-center">
                    {/* Brief Description Of Card */}
                  </p>
                  <div className="h-16"></div>
                </motion.div>
                <motion.div
                  animate={{ zoom: 1 }}
                  initial={{ zoom: 0.4, transformOrigin: "bottom, center" }}
                  transition={{ duration: 2 }}
                  className="flex flex-col w-60 rounded-xl shadow-2xl absolute top-0 left-0 z-0 bg-gray-200 dark:bg-black dark:bg-opacity-90"
                >
                  <div className="h-40">
                    <img
                      src={selectedButton.imageurl}
                      alt="cards not found"
                      className="rounded-2xl absolute top-0 left-0 w-full h-40"
                    />
                  </div>
                  <div className="flex justify-around -translate-y-4 text-xs">
                    <div
                      className="flex bg-gray-300 px-5 py-1 font-bold shadow-2xl rounded-xl"
                      style={{ fontFamily: "Montserrat", fontWeight: 900 }}
                    >
                      {selectedButton.likes} lessons
                    </div>
                    <div
                      className="flex bg-gray-300 px-5 py-1 font-bold shadow-2xl rounded-xl text-main "
                      style={{ fontFamily: "Montserrat", fontWeight: 900 }}
                    >
                      {selectedButton.plays} views
                    </div>
                  </div>

                  <p
                    className="text-xl px-4 text-center font-bold"
                    style={{ fontFamily: "Montserrat", fontWeight: 900 }}
                  >
                    {selectedButton.title}
                  </p>
                  <div className="h-16"></div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SExplorer;

class ExploreLink {
  constructor(
    public linkname: string,
    public imageurl: string,
    public title: string,
    public likes: number,
    public plays: number
  ) {}
}
