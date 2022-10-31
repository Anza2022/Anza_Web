import React from "react";
import { showToast } from "../../../utils/helper_functions";
import children from "../../../../assets/images/children.jpeg";

const SkoolStories = () => {
  let posts: NewsPost[] = [
    new NewsPost(
      "Koshens Visits Buruburu",
      "Buruburu Girls",
      "",
      "Montez Eravo",
      "its been over a century since 'the unsinkable'  ship met it ill fate ...",
      "New"
    ),
    new NewsPost(
      "Koshens Visits Buruburu",
      "Buruburu Girls",
      "",
      "Montez Eravo",
      "its been over a century since 'the unsinkable'  ship met it ill fate ...",
      "Trending"
    ),
    new NewsPost(
      "Koshens Visits Buruburu",
      "Buruburu Girls",
      "",
      "Montez Eravo",
      "its been over a century since 'the unsinkable'  ship met it ill fate ...",
      "Popular"
    ),
    new NewsPost(
      "Koshens Visits Buruburu",
      "Buruburu Girls",
      "",
      "Montez Eravo",
      "its been over a century since 'the unsinkable'  ship met it ill fate ...",
      "Popular"
    ),
  ];
  return (
    <div className="flex flex-col w-full h-screen bg-white">
      <p
        className="text-5xl text-center py-5"
        style={{
          fontFamily: "Montserrat",
          fontWeight: "bolder",
        }}
      >
        Skool Storiz
      </p>

      <div className="flex flex-wrap w-full justify-around">
        {posts.map((e, i) => (
          <div key={i} className="flex flex-col w-60 bg-main rounded-xl">
            <div className="h-28 relative">
              <img src={children.src} alt="image notfound" className="" />
              <div className="w-24 h-8 absolute right-0 top-2 flex justify-center items-center bg-purple-600 font-bold text-white">
                <p>{e.tag}</p>
              </div>
            </div>

            <p className="px-2 font-bold text-purple-700">{e.title}</p>
            <p className="px-2 font-bold text-purple-800">By: {e.writer}</p>
            <p className="px-2 font-bold text-purple-700"> {e.school}</p>

            <p className="p-3 text-center text-lg">{e.news}</p>
            <div className="h-4"></div>

            <p
              onClick={() => showToast("comming soon", "success")}
              className="cursor-pointer text-xl py-4 self-center"
            >
              Read More
            </p>
          </div>
        ))}
      </div>

      <div className="flex w-full justify-center mt-10">
        <div
          className="flex px-12 py-3  text-3xl rounded-full bg-green-500 text-white font-black cursor-pointer"
          onClick={() => showToast("comming soon", "success")}
        >
          Read More
        </div>
      </div>
    </div>
  );
};

export default SkoolStories;

class NewsPost {
  constructor(
    public title: string,
    public school: string,

    public photolink: string,
    public writer: string,
    public news: string,
    public tag: string
  ) {}
}
