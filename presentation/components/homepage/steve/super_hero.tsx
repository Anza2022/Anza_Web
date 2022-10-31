import router from "next/router";

const Superhero = () => {
  return (
      <div  className="flex flex-wrap justify-around w-full h-screen scroll-behavior: smooth">

      <div  id="scroll_me" className="w-full lg:w-3/3">
          <div className='bg-[url("https://api.thesigurd.com/anzaapi/view_thumbnail/career/spider.png")] object-cover h-full w-full bg-cover bg-right p-14'>
              <h2 className="w-[98%] md:ml-20 text-4xl text-white mt-16 mb-10 pt-16 pb-10 justify-center text-center"          style={{ fontFamily: "Montserrat", fontWeight: 900 }}>WE MAKE ACADEMIC SUPERHEROES</h2>
              <p className="mb-8 text-yellow-500 mt-2 text-3xl justify-center text-center"         style={{ fontFamily: "Montserrat", fontWeight: 900 }}>
MEET YOUR ACADEMIC STRUGGLE AS THE BIGGER PERSON.
              </p>
              <p className="mb-0 mt-10 pt-10 text-gray-800 mt-0 text-xl justify-center text-center">
              <button      onClick={() => router.push("/signup")} className="px-4 py-2 bg-main text-white  rounded-md">Sign Up Now</button>
              </p>
          </div>
      </div>

      </div>
  );
};

export default Superhero;
