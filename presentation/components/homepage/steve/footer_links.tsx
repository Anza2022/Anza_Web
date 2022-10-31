/* eslint-disable @next/next/no-img-element */
import React from "react";

import googleplay from "../../../../assets/images/googleplay.png";
import appstore from "../../../../assets/images/appstore.png";
const FooterLinks = () => {
  return (
    <div className="flex w-full flex-wrap justify-around h-96 bg-gray-500 bg-opacity-80">
      <div className="flex flex-col w-52 pl-2">
        <p className="text-2xl font-black text-green-500 mb-2">Academics</p>
        {[
          "Curriculum",
          "Home Tution",
          "Maths",
          "physics",
          "Chemistry",
          "Biology",
        ].map((e, i) => (
          <div key={i} className="text-black py-1 text-lg cursor-pointer ">
            {e}
          </div>
        ))}
      </div>
      <div className="flex flex-col w-60">
        <p className="text-2xl font-black text-green-500 mb-2">
          Career and Skills
        </p>
        {["Holiday  apprenticeship", "Career guide", "Career blog"].map(
          (e, i) => (
            <div key={i} className="text-black py-1 text-lg cursor-pointer ">
              {e}
            </div>
          )
        )}
      </div>
      <div className="flex flex-col w-60">
        <p className="text-2xl font-black text-green-500 mb-2">Accessibility</p>
        {["The ANZA APP"].map((e, i) => (
          <div key={i} className="text-black py-1 text-lg cursor-pointer ">
            {e}
          </div>
        ))}{" "}
        <img src={googleplay.src} className="w-52 cursor-pointer" />
        <img src={appstore.src} className="w-52 cursor-pointer" />
      </div>
      <div className="flex flex-col w-52">
        <p className="text-2xl font-black text-green-500 mb-2">Classes</p>
        {["Form 1", "Form 2", "Form 3", "Form 4"].map((e, i) => (
          <div key={i} className="text-black py-1 text-lg cursor-pointer ">
            {e}
          </div>
        ))}
      </div>
      <div className="flex flex-col w-52">
        <p className="text-2xl font-black text-green-500 mb-2">Support</p>
        {["Faqs", "Contact Us"].map((e, i) => (
          <div key={i} className="text-black py-1 text-lg cursor-pointer ">
            {e}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
