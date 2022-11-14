/* eslint-disable @next/next/no-img-element */
import React from "react";
import meru from "../../../assets/images/meru.png";
import alliance from "../../../assets/images/alliance.png";
import huawei from "../../../assets/images/huaweilogo.png";
import deliote from "../../../assets/images/delloite.png";
import riara from "../../../assets/images/riara.png";
import sigurd from "../../../assets/images/sigurd.png";

const PartnerShipsComponent = () => {
  let pimages = [alliance.src, deliote.src, riara.src];
  return (
    <div className="w-full flex screen-h flex-col pt-10 bg-gray-200 dark:bg-darksec ">
      <p
        className="text-center text-2xl font-black  md:text-3xl mb-2"
        style={{ fontWeight: 900, fontFamily: "Montserrat" }}
      >
        Trusted by schools and partners of all sizes
      </p>
      <div className="flex flex-wrap mx-4 md:mx-4 justify-center items-center">
        {" "}
        {pimages.map((e) => (
          <div
            key={e}
            className="mx-2 my-4 w-96 md:w-[170px]  flex justify-center   "
          >
            {" "}
            <img
              src={e}
              className="object-fill w-[170px] "
              alt="logo not found"
            />
          </div>
        ))}{" "}
        <div className=" mb-5  md:ml-7    ">
          {" "}
          <img
            src={sigurd.src}
            className="object-fill  h-28  "
            alt="logo not found"
          />
        </div>
      </div>
    </div>
  );
};

export default PartnerShipsComponent;
