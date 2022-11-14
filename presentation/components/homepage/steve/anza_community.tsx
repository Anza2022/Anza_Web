import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import man from "../../../../assets/images/manblob.png";
import schoolimg from "../../../../assets/images/schoolimg.png";
import mkuruu from "../../../../assets/images/mkuruu.png";
import slideImage from "../../../../assets/images/Careeer_Holder.png";
import router from "next/router";
import ViewMkurugenziLesson from "../../../../pages/dashboard/videos/mkurugenzi/view_video";
import playbutton from "../../../../assets/icons/play.png";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { showToast } from "../../../utils/helper_functions";

const MySwal = withReactContent(Swal);
const AnzaCommunity = () => {
  return (
    <div className="flex flex-col mb-10 mt-0 pb-10 pt-20 w-full bg-white dark:bg-darksec  items-center">
      <p
        className="text-4xl text-center mt-0"
        style={{
          fontFamily: "Montserrat",
          fontWeight: "bolder",
        }}
      >
Career Guidance.
      </p>

      <p className="text-main text-xl mt-10 md:mt-4  pl-5 pr-5 dark:text-white mb-0 text-center"    style={{ fontFamily: "Overpass", fontWeight: 600 }}>
      Academic career guidance is one of the most important guidance that students need to nurture their future. 
  </p>


      <div className="flex">
  <div className="md:flex">
    <div className="p-12 md:w-[60%]">
 <p className="mt-5 md:mt-10 mb-4 text-xl text-slate-500 leading-loose text-center"         style={{ fontFamily: "Overpass", fontWeight: 900 }}>
 We give students exposure to a variety  of careers with in-depth and unbiased advice and guidance from people excelling in their career areas.
 </p>

 <a  className="block mt-0 text-lg  text-xl text-black dark:text-white hover:cursor-pointer text-center leading-loose"         style={{ fontFamily: "Overpass", fontWeight: 900 }}> 
The correct guidance by an expert career guidance counselor will help the students to understand and choose their career options as per their knowledge, skills, interest, and capability.
 </a>

<div className="flex items-center justify-center">
       <a href="https://forms.gle/VDc38qnqAjm6tSRP8" target="_blank"><button              
       className="bg-main mt-12 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md"    style={{ fontFamily: "Overpass", fontWeight: 900 }}> 
Become a career partner
</button>
</a>
</div>


    </div>

    <div className="md:shrink-20 hidden md:block -mt-10">
   
    <div className=" duration-700 ease-in-out" data-carousel-item>
         
            <img className="h-full w-full object-cover md:h-full"   src={slideImage.src} alt="slideImage"/>
        </div>
    </div>
    

  </div>
</div>













    </div>
  );
};

export default AnzaCommunity;
