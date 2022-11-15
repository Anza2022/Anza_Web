/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../../../presentation/layouts/dashboard_layout";
import { showToast } from "../../../../presentation/utils/helper_functions";
import blossom from "../../../../assets/images/setbooks/blossoms.png";
import fathernations from "../../../../assets/images/setbooks/fatherofnations.png";
import silentsong from "../../../../assets/images/setbooks/A-Silent-song-and-Other-Stories-by-Godwin-Siundu-nuriakenya.png";
import nguujadi from "../../../../assets/images/setbooks/nguu-z-jadi-nuriakenya.png";
import mapumzikoyamacheo from "../../../../assets/images/setbooks/mapumzikoyamacheo.png";
import parlimantowls from "../../../../assets/images/setbooks/parlimant-of-owls-nuriakenya-cover-600x840.png";
import samaritan from "../../../../assets/images/setbooks/samaritan.png";
import floatingworld from "../../../../assets/images/setbooks/An-Artist-of-the-Floating-World.png";
import dolls_house from "../../../../assets/images/setbooks/dolls_house.png";
import dolls_thumbnail from "../../../../assets/images/setbooks/dolls.png";
import kigogo from "../../../../assets/images/setbooks/kigogo.jpg";
import { NavigationContext } from "../../../../presentation/contexts/navigation_state_controller";
import SetBooksRepo from "../../../../data/repos/setbook_repo";
import { VideoLessonContext } from "../../../../presentation/contexts/video_lessons_controller";
import LoadingComponent from "../../../../presentation/components/others/loading_component";
import playbutton from "../../../../assets/icons/play.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import { LoggedInUserContext } from "../../../../presentation/contexts/loggedin_user_controller";


const SetbooksVideosPage = () => {
  const router = useRouter();

  let books = [
    {
      name: "Blossoms of the Savannah",
      image: blossom.src,
    },
    {
      name: "Father of Nations",
      image: fathernations.src,
    },
    {
      name: "A Silent song and other stories",
      image: silentsong.src,
    },
  ];
  const { setShowPremiumModal, setSelectedVideoId } =
    useContext(NavigationContext);
const { accountSubscription } = useContext(LoggedInUserContext);
 const SubStatus = accountSubscription[0] != undefined
  ? accountSubscription[0].isSubscriptionActive
    ? "Active"
    : "Ended"
  : "";


  const { setSetbooksEpisodes, setbooksEpisodes } =
    useContext(VideoLessonContext);

  const [loading, setLoading] = useState(false);
  async function getSetbookEpisodes() {
    setLoading(true);

    try {
      let episodes = await SetBooksRepo.getSetbooksEpisodes();
      setSetbooksEpisodes(episodes);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (setbooksEpisodes.length < 1) {
      getSetbookEpisodes();
    }
  }, []);

  const [searchvalue, setSearchvalue] = useState("");
  
  return (
    <DashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec  md:ml-44 relative min-h-screen py-16 w-full items-center ">

        <div className="flex flex-wrap w-full  justify-around">
          {loading && (
            <div className="flex flex-col h-full w-full justify-center items-center">
              <LoadingComponent color="main" loading={loading} />
              <p className="py-1 text-xs">Loading setbooks ...</p>
            </div>
          )}
  

  <div className="flex mb-10 -mt-2">
    <div  id="scroll_me" className="w-full lg:w-3/3">
          <div className='bg-[url("https://anzaacademy.co/anzaapi/view_thumbnail/career/dolls_house.png")] object-cover h-full w-full bg-cover bg-right p-8'>
              <h2 className="text-4xl text-white mt-10 mb-2 pt-8 pb-0 justify-left text-left"          style={{ fontFamily: "Montserrat", fontWeight: 900 }}>A Doll&lsquo;s House</h2>
            <div className="flex justify-around w-[100%]"> 
              <div className="mb-8 w-[77%]  text-white mt-2 text-2xl justify-left text-left"    >
              Nora Helmer once secretly borrowed a large sum of money so that her husband could recuperate from a serious illness. She never told him of this loan and has been secretly paying it back in small installments by saving from her household allowance. Her husband, Torvald, thinks her careless and childlike, and often calls her his doll. When he is appointed bank director, his first act is to relieve a man who was once disgraced for having forged his signature on a document. This man, Nils Krogstad, is the person from whom Nora has borrowed her money. It is then revealed that she forged her father&lsquo;s signature in order to get the money. 
              </div>

              <div
                className="bg-  text-white cursor-pointer rounded-lg  p-0 font-black  text-base   px-6  flex  items-center "
              >
{" "}

             </div>
                      </div>                      
              <p className="animate-pulse mb-0 mt-2 pt-0 text-gray-800 mt-0 text-xl justify-left text-left">
              <button     className="px-4 py-2 bg-main text-white  rounded-md">
                Watch Now
              </button>
              </p>
          </div>
      </div>
  

</div>


<div className="ml-[8%] text-2xl mt-10 -mb-4 text-main dark:text-white">
              More Setbooks
          </div>

<div className="holder mx-auto w-[95%] w-12/12 m-5 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
{!loading &&
            setbooksEpisodes.map((e, i) => (           
<div className="each mb-10 m-3 bg-gray-300 relative cursor-pointer p-1  hover:shadow-md hover:shadow-main transition-all duration-300 group transform duration-500  md:hover:-translate-y-1 md:hover:scale-105"  
    key={i}
    onClick={() => {
      MySwal.fire({
        scrollbarPadding: false,
        heightAuto: false,
        html: (
          <div className="m-0 flex flex-col cursor-pointer">
            <div className="mt-5 flex justify-between text-sm text-white mb-5">
              <div
                className="flex px-4 py-1  cursor-pointer rounded-xl"
              >
              </div>
              <div
                className="flex px-4 py-1  cursor-pointer rounded-xl"
              >
              </div>
              <div
                              onClick={() => {
                                MySwal.clickConfirm();
                              }}
                className="flex px-4 py-1 bg-red-600 cursor-pointer rounded-xl items-center justify-center"
              >
                Close
              </div>
            </div>

            <h2 className="py-2 text-main font-bold ">{e.title}</h2>

            <p className="py-2 font-bold ">{e.description}</p>

            <div className="mt-5 flex justify-between text-sm text-white">
              <div
                onClick={() => {
                  showToast("Coming soon", "success");
                  MySwal.clickConfirm();}}
                className="animate-bounce flex px-4 py-2 bg-main cursor-pointer rounded-md items-center justify-center"
              >
Add to Favourite.  


              </div>
              <div
          onClick={() => {
if(SubStatus == "Ended"){
if (i == 0) {
MySwal.clickConfirm();
setSelectedVideoId(e.fileName);
router.push("/dashboard/videos/setbooks/view_book");
} else {
MySwal.clickConfirm();
setShowPremiumModal(true);
}
}else if(SubStatus == "Active"){
  MySwal.clickConfirm();
setSelectedVideoId(e.fileName);
router.push("/dashboard/videos/setbooks/view_book");
}
          }}
                className="animate-bounce flex px-4 py-3 bg-main cursor-pointer items-center justify-center rounded-md"
              >
                        Watch Now
              </div>
            </div>
          </div>
        ),
        cancelButtonText: "Close",
        confirmButtonText: "Share",
        denyButtonText: "Join Class",
        confirmButtonColor: "#008080",
        // width: "200px",
        focusConfirm: false,
        focusCancel: false,
        focusDeny: false,
        customClass: {
          // htmlContainer: "kenswal",
          confirmButton: "bg-pink-500",
        },
        showConfirmButton: false,
        buttonsStyling: true,
        showCloseButton: false,
      });
    }}

     >  
  <div className="relative flex flex-col  group transform duration-500 ">
  <div className="relative">
    <a className="absolute inset-0 z-10 text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
      <h1  className="tracking-wider" >
        <img style={{"transition" : "5s ease"}} src = {playbutton.src}  />
        </h1>
      </a>
    <a className="relative group-hover:opacity-100 group-hover:blur-sm">
        {/* <img className="w-full"  src={`https://anzaacademy.co/anzaapi/view_thumbnail/career/${e.thumbnailUrl}`} alt="" /> */}
        <img className="w-full"  src=
        {
        e.title == "blossoms" ? blossom.src
         :
         e.title == "Father of Nations" ?  dolls_thumbnail.src
         :
         e.title == "A Silent song and other stories" ?  silentsong.src
         :
         e.title == "Nguu za Jadi" ?  nguujadi.src
         :
         e.title == "Kigogo" ?  kigogo.src
         :
         e.title == "A Doll's House" ?  dolls_thumbnail.src
         : ""
        }
  alt={e.title} />  
    </a>
  </div>

  <div className="info-box text-xs flex p-1 font-semibold text-gray-500 justify-between bg-gray-300">
    <span className="mr-1 p-1 px-2 text-main font-bold">{e.views} Views</span>
    <span className="mr-1 p-1 px-2 font-bold  ">{e.likes} Likes</span>
  </div>
</div>
</div>
))}
</div>


          <div className="w-[180px] md:w-[220px] my-3 "></div>
          <div className="w-[180px] md:w-[220px] my-3 "></div>
          <div className="w-[180px] md:w-[220px] my-3 "></div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SetbooksVideosPage;
