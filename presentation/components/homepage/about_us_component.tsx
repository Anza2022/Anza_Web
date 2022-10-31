import learnany from "../../../assets/images/learn-any-icon.png";
import gamifiedicon from "../../../assets/images/gamified-icon.png";
import instructoricon from "../../../assets/images/instructor-icon.png";

const AboutUsComponent = () => {
  return (
    <div className="py-10 mt-10   w-full bg-gray-100 dark:bg-darksec scroll-behavior: smooth">
      <p
        className="text-3xl md:text-4xl text-center font-black flex  justify-center"
        style={{ fontFamily: "Montserrat", fontWeight: 900 }}
      >
        Why Choose Anza <span className="ml-2 hidden md:block">Academy</span>:
      </p>
      <div className="flex flex-wrap justify-around w-full">
        <div className="flex flex-col w-80 md:w-96 space-y-4 py-10">
          <div className="flex justify-center">
            <img src={learnany.src} alt="image not found" className="" />
          </div>

          <p
            className="text-center font-semibold text-xl md:text-3xl text-main"
            style={{ fontFamily: "Montserrat", fontWeight: 900 }}
          >
          Flexible 
          </p>
          <p className="text-center  md:text-lg"   style={{ fontFamily: "Overpass", fontWeight: 500 }}>
          Set your goals, make your time table, then ​access your lesson anytime and anywhere.
          </p>
        </div>
        <div className="flex flex-col w-80 md:w-96 space-y-4 py-10">
          <div className="flex justify-center">
            <img src= {instructoricon.src} alt="image not found" className="" />
          </div>

          <p
            className="text-center font-semibold text-xl md:text-3xl text-main " 
            style={{ fontFamily: "Montserrat", fontWeight: 900 }}
          >
           Career Guidance
          </p>
          <p className="text-center md:text-lg"   style={{ fontFamily: "Overpass", fontWeight: 500 }}>
          You have a dream. But do you have a ​mentor?
Anza has you covered. Clear and precise ​talks from career experts.
          </p>
        </div>
        <div className="flex flex-col w-80 md:w-96 space-y-4 py-10">
          <div className="flex justify-center">
            <img src={gamifiedicon.src} alt="image not found" className="" />
          </div>

          <p
            className="text-center font-semibold text-xl md:text-3xl text-main"
            style={{ fontFamily: "Montserrat", fontWeight: 900 }}
          >
         Fun & Tests
          </p>
          <p className="text-center  md:text-lg"   style={{ fontFamily: "Overpass", fontWeight: 500 }}>
          What's better than playing tests like a game.
No phobia, just a better memory.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
