import { useAnimation, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import useOnScreen from "../../hooks/use_one_screen_hook";

const AppStatsComponent = () => {
  let statsData = [
    new OneStat("Students", "12,000"),
    new OneStat("Teachers", "135"),
    new OneStat("Institutions", "14"),
  ];

  // number displayed by component
  const [count, setCount] = useState(0);
  const [animating, setAnimating] = useState(true);

  const rmanagercontrols = useAnimation();
  const rootRef: any = useRef();
  const onScreen = useOnScreen(rootRef, "550px");

  function getRandomInt() {
    return Math.floor(Math.random() * 100000 + 1000);
  }

  useEffect(() => {
    if (onScreen) {
      rmanagercontrols.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      });

      let intervalId = setInterval(() => {
        setCount(getRandomInt());
      }, 50);

      setTimeout(() => {
        clearInterval(intervalId);
        setAnimating(false);
      }, 3000);
    }
  }, [onScreen, rmanagercontrols]);

  return (
    <div
      className=" flex flex-col w-full py-6 pb-12 bg-gray-100 "
      style={{ fontFamily: "Montserrat" }}
    >
      <p className="text-4xl font-black text-center text-main dark:text-white mb-3">
        Enjoy With Other
      </p>
      <div className="  flex flex-wrap justify-around  w-full items-center  ">
        {statsData.map((e) => (
          <motion.div
            ref={rootRef}
            initial={{
              x: -100,
              opacity: 0,
            }}
            animate={rmanagercontrols}
            key={e.title}
            className="w-80 bg-white rounded-3xl h-52 flex  cursor-pointer hover:shadow-2xl flex-col justify-center space-y-7 my-3  items-center shadow-xl   dark:bg-black dark:bg-opacity-70  "
          >
            <div className="flex flex-col items-center">
              <p className="font-bold text-lg">More than</p>
              <p className="text-6xl font-black  text-main  dark:text-indigo-600">
                {animating ? count : e.value}
              </p>
            </div>
            <p className="text-3xl font-bold ">{e.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppStatsComponent;

class OneStat {
  constructor(public title: string, public value: string) {}
}
