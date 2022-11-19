import router from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import believe from "../../../../assets/images/believe.png";
import mwalimu from "../../../../assets/images/mwalimu.png";
import math from "../../../../assets/images/math.png";
import student_ from "../../../../assets/images/fam.png";

const Flexa = () => {
  return (
<div>
{/* <div className="bg-white  pt-20 pb-20 mt-0  dark:bg-darksec" >
      <p className=" pt-10 pb-10  mt-32 md:mt-10  text-center pl-10 pr-10 dark:text-main text-black"
      >
<p  className="text-4xl md:text-5xl  md:leading-loose  mb-10 md:mb-5"    style={{ fontFamily: "Montserrat", fontWeight: 500 }} > Study like a star! </p>
<p className="   pl-10 pr-10 mb-10 text-2xl  md:text-2xl dark:text-white"   style={{ fontFamily: "Overpass", fontWeight: 900 }}>
 Set your academic ​goals and let us help you achieve them. We are consistently making ​sure that you not only soar but you become exceptional as you soar ​higher.
  </p>
  </p>
</div> */}


<div className="bg-white  pt-10   -mb-10 dark:bg-darksec" >
      <p className=" pb-10  mt-10 md:mt-5  text-center md:pl-10 md:pr-10 dark:text-main "
      >
              <p className="pb-4 text-center mb-5 pl-10 pr-10 dark:text-main text-black"
      >
<p  className="text-3xl md:text-3xl"    style={{ fontFamily: "Montserrat", fontWeight: 500 }} > Study like a star! </p>
<p className="   pl-10 pr-10  text-2xl  md:text-2xl dark:text-white"   style={{ fontFamily: "Overpass", fontWeight: 500 }}>
 Set your academic ​goals and let us help you achieve them. We are consistently making ​sure that you not only soar but you become exceptional as you soar ​higher.
  </p>
  </p>

<p  className="text-3xl md:text-3xl mb-2"   style={{ fontFamily: "Montserrat", fontWeight: 900 }} > Classes and Personalized tuition </p>
<p className="pl-10 pr-10 mb-5 text-2xl  md:text-2xl dark:text-white"   style={{ fontFamily: "Overpass", fontWeight: 500 }}>
Anza bridges the gap between private tuition centers and conventional centers of education. We have made home revision and tuition easily accessible affordably. Our lessons are very simplified and interesting while Our TSC certified tutors are always ready to walk your son/daughter through any tough lesson when they need personalized academic attention.
</p> 


<p  className="text-3xl md:text-3xl mb-2 mt-8 "       style={{ fontFamily: "Montserrat", fontWeight: 900 }} > Past papers</p>
<p className="pl-10 pr-10 mb-7 text-2xl  md:text-2xl dark:text-white"   style={{ fontFamily: "Overpass", fontWeight: 500 }}>
Past papers are a key element in your revision experience. Anza Academy offers form 1, Form 2, form 3 all the way to form 4 notes and free KCSE revision papers with verified answers. Anza furnishes students with past papers in any subject of your choice.
</p>

<p  className="text-3xl md:text-3xl "       style={{ fontFamily: "Montserrat", fontWeight: 900 }} > Career Guidance</p>
<p className="pl-10 pr-10 mb-4 text-2xl  md:text-2xl dark:text-white"   style={{ fontFamily: "Overpass", fontWeight: 500 }}>
We offer free career guidance and counselling to your student by exposing them to professional with experience and expertise in their career fields. We stand out as a sole provider of post high school guidance on choosing your son’s or daughter’s careers based on insights by trusted professionals in their fields. 
  </p>
  </p>
</div>

<div  id="scroll_me" className="w-full lg:w-3/3 bg-white pt-0 pb-10 dark:bg-darksec" >
<div className="flex justify-center w-full  px-2 mt-0">
<p className="mt-0 text-2xl  md:mr-2"  style={{ fontFamily: "Overpass", fontWeight: 900  }}>
 Read more    
            </p>
              <div
                onClick={() => {
                  MySwal.fire({
                    scrollbarPadding: false,
                    heightAuto: true,
                
                    html: (
                      <div className="m-0 flex flex-col w-full   text-left mt-0">
                        <div className="mt-5 mb-2 flex justify-right text-sm text-white">
                          <div
                            onClick={() => {
                              MySwal.clickConfirm();
                            }}
                            className="flex px-4 py-1 bg-red-600 cursor-pointer rounded-xl"
                          >
                            Close
                          </div>
                        </div>
<div className="flex flex-col overflow-y-scroll scroll-touch
                      p-3 overflow-x-hidden dark:text-main mb-12">
                        <p className="py-2 font-normal leading-8 ">
Anza is a team of collaborative young people who indulge in making your learning easy. We unanimously agree that reading, passing exams and getting those flying colors is not as easy as everyone makes it look. We embark on a journey to make your learning fun, collaborative and most importantly, interactive in a forward oriented manner. Our main focus is making your academic dream a reality that you wont just relish in future but cherish in the present. Anza is an academic present created to be unboxed by all caliber of students. It is your present.
<br/>
<br/>
We believe it’s time to believe in yourself once more.
</p>
<div className="flex justify-center items-center ">
  <img src={believe.src} alt="Believe"  className="h-[60%] :w-[60%] md:h-[40%] md:w-[40%]" />
</div>

<p className="py-2 font-normal leading-8 ">
<br/><br/>
<strong>Anza Kujiamini.</strong>
<br/><br/>
We are making our interactive tools yours so as to equip you with the best form of learning there is.
Make our tools part of your learning routine to bolster your performance.
We are here to make our success yours 
Start, Anza Nasi
Anza is a world of interactive and fun filled learning episodes in which you are the star. It is a platform filled with AI tools that optimize your learning experience. Our goal-oriented curriculum coverage interface is a tool embedded in the futuristic learning setting. We are consistently making sure that you not only soar but soar higher.

</p>
<div className="flex justify-center items-center ">
<img src={mwalimu.src} alt="Mwalimu" className="h-[60%] :w-[60%] md:h-[40%] md:w-[40%]" />
</div>
<p className="py-2 font-normal leading-8 ">
We invite you to own tools that make your learning simplified and easily accessible. At Anza we have incorporated tools that achieve what convectional teaching would never achieve. We have embraced the omission of the physicality then making your learning tools reachable by just a click of a button. Our search bar brings up results in seconds as a result of our site optimization. The team at Anza views learning not only as a necessity of societal advancement but a basic necessity in the daily existence of a Student. Effective and consistent interaction with learning materials at the tap of a button is a key incorporation in our EdTech spaces. Anza team seeks to tackle challenges faced by regular students a thing of the past by morphing into an important and reliable tool of modern tutoring and teaching. 
Anza instinctively tackles the challenge of monotonous learning by introducing a new concept into the TechEd landscape, the Gamified Quizzes. I must agree that this definitely sounds like it, yes Education is a game and you’ve got to win. As the chess player shouts in ultimate exhilaration, ‘CHECKMATE!’ so must you, against your exam papers. I must agree that I am quite convinced to go back to school on this very account of an ideas of playing to win, aren’t you? 
<br/>
To tackle the issue of poor network connectivity in remote areas, the Anza platform is optimized to adopt a player that corresponds your broadbands strength. This ensures that irrespective of the internet speed in your area, you can quite comfortably stream our animated video completely hustle free.
<br/>
When I talk of animated videos, you probably thought I’m indulging the likes of Moana, but I’m bringing into focus what animated videos could do for your son, daughter or Student. Engaging animation in your child’s academic lifestyle is a key motivator and a performance booster as a Student’s mind shall easily register easily as compared to static book page images. At Anza, we have created high quality interactive videos that detail scientific, mathematical and linguistic phenomena in a way that is not yet explored in the continent. For instance, our scientific videos covering the scientific spheres are not just limited to science but stretch to set foot in the land of reason. Animated videos are known to bring ideas and phenomena to life. In addition to this I’m sure you agree with me that they are universally accepted by learners and young adults. 
<br/>
The cost of education is too high and it should be worth the price. Anza packages start from as low as 2000 per term to 6,800 per year. This ensures that every student affords the packages we offer. This includes a support package of diligent and continued customer service.   
<br/>
 Let’s talk about Math. I’m sure a lot of y’all sucked at this subject- if not at some point, right?
 
 </p>
<div className="flex justify-center items-center ">
<img src={math.src} alt="math" className="h-[60%] :w-[60%] md:h-[40%] md:w-[40%]" />
</div>
<p className="py-2 font-normal leading-8 ">
  
   We are here to make the  battle with crunching numbers easier.  We have a dedicated team of instructors, tutors, quality assurance officers and mentors known to be the best in this field.  This team has in turn developed a catalogue of content in regards to mathematics. Our instructional videos detail step by step how to tackle math problem to make them a problem no more. Can you imagine math being explained in a video? I bet you can’t. At Anza, we decide to pursue the unimaginable by making math movies. Watch them and experience wins on the academic battle field.
Too much of the fancy stuff on Anza. Let’s dive deep into the technical nitty gritty that I have taken a pleasure in noting. Once you have purchased a subscription that enables to make our tools yours, you shall find an array of lessons waiting for you to exploit them. These lessons cover different subjects synced to your liking. One click opens up a world of information comparable to the Rick’s gun portal on the rick and Morty series. Once you enter this universe of information, the lesson that you wish to explore is of your liking. Lemme introduce quite a fancy feature that the program hosts. The cache memory which is a high-speed memory layer that has been incorporated in our site ensures that you don’t need bookmarks to review, revisit and most importantly refer to our dedicated marking scheme, ah! I almost didn’t talk about this quite interesting and important tool in your learning. So yes, here we are. The Anza platform hosts dedicated marking schemes that have been proofread and confirmed by our math panelists. It is an essential tool in making sure that you get it right, any way what could go wrong when you have everything right? The marking schemes span in every subject that Anza has covered. This is to ensure that you confirm your effort as you read. These marking schemes make you your own teacher. How cool is that! 
<br/>
This article could not be more practical without talking about practical lessons on the site. We are well aware of how much this sect scares our students. How about we Anza to change that. Explainer videos have made it quite easy to grasp the concept of practical lessons that span across three sciences. We not only equip you with the tools, but we also equip your learning experience with the required academic furnishing according to the measures of the curriculum. Buying a subscription of our service gives you a recurrent experience of sophistication in simplicity, what a Da Vinci reference!
<br/>
We all are aware of the term, practice making perfect. This where or topical tests come in. this are tests that have been set to cover everything on your tests, and I mean everything. They are arranged in a sequential order to help you plan tackling them in an organized way. These tests will not only sharpen you but will also put you in front of other students in your class. Trust me, tackling these tests shall put you on the forefront of limitless academic performance where only you, can pass down the baton of excellence and performance to your siblings or coveting classmates.

</p>
<div className="flex justify-center items-center ">
<img src={student_.src} alt="math" className="h-[60%] :w-[60%] md:h-[40%] md:w-[40%]" />
</div>
<p className="py-2 font-normal leading-8 ">
Hey, let me bring your attention to how much Anza can unify your studying experience with your pals, parents, tutors, peers or even siblings. Having a family account ensures that you can even study together if they are of the same grade or form. It is a modern-day platform to nature academic harmony in your family.
Past papers are a key element in your revision experience. They are the secret ingredient that flavors the academic broth. Having your Anza subscription simplifies and even eradicates your hunt for these papers. We have dedicated a whole team to bring to you the best that you need. 
<br/>
Set books are one part of our learning that require more than just reading. They evoke imagination and they seek opinion of the learner the most diverse of ways. Our team has put the best foot forward to create visuals that build your imagination in the most subtle and effective of ways. Anza has sourced the best talent there is to make this easier for you.
<br/>
Its your turn now to shine in academic excellence.
<br/>
<br/>
Learn at ease!								

                        </p>
                        </div>

                        <div className="flex justify-right text-sm text-white">
                        <button 
     onClick={() => 
      {
      router.push("/signup")
     MySwal.clickConfirm();
    }}
  className="ml-5 px-8 py-2 bg-main text-white rounded-lg "     style={{ fontFamily: "Overpass", fontWeight: 700 }}>
Anza Nasi
</button>

<div
                            onClick={() => {
                              MySwal.clickConfirm();
                            }}
                            className="ml-5 flex px-5 py-1 bg-red-600 cursor-pointer pt-2 rounded-xl"
                          >
                            Close
                          </div>

                        </div>
                      </div>                    ),
                    width: '1000px',
                    cancelButtonText: "Close",
                    confirmButtonText: "Share",
                    denyButtonText: "Join Class",
                    confirmButtonColor: "#008080",
                    // width: "200px",

                    focusConfirm: false,
                    focusCancel: false,
                    focusDeny: false,
                    customClass: {
                      htmlContainer: "kenswal",
                      confirmButton: "bg-pink-500",
                    },
                    showConfirmButton: false,
                    buttonsStyling: true,

                    showCloseButton: false,
                  });
                }}
                className=""
              >

                <p    className="px-4 py-1 ml-4 bg-main text-white  rounded-md cursor-pointer "     style={{ fontFamily: "Overpass", fontWeight: 700 }}>Click Here</p>
              </div>
            </div>


          
      </div>

      <div className="flex  bg-gray-200  pt-20 pb-20 content-center dark:bg-darksec">
<p className="text-black   mt-5 pl-10 pr-10 mb-10 text-3xl dark:text-white  text-center justify-center leading-loose content-center"   style={{ fontFamily: "Overpass", fontWeight: 400 }}>

Own a technology that makes your learning ​simplified and easily accessible.


At Anza, we have incorporated study tools that achieve ​what convectional teaching would never achieve.

We have embraced the omission of the physicality of bulk learning ​tools to make your learning smooth and effective.
  </p>
</div>


</div>
  );
};

export default Flexa;
