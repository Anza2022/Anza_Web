import { useState } from "react";
import { showToast } from "../../utils/helper_functions";

const ContactUsComponent = () => {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+254");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = () => {
    if (loading) {
      return;
    }
    if (userName == "" || message == "" || phoneNumber.length < 5) {
      showToast("fill all the fields", "error");
    } else {
      showToast("message sent", "success");
    }
  };
  return (
    <div className="   w-full  flex flex-col mb-20">
      <p className="text-2xl md:text-4xl text-center text-main font-black tracking-tight  mb-12">
        We`d Love to Hear From You
      </p>
      <div className="flex flex-wrap w-full justify-around">
        <div className="flex flex-col bg-white p-2 w-80  md:w-[430px] md:p-4 rounded-xl shadow-2xl h-64">
          <p className="font-bold text-2xl text-main">Contact Information</p>
          <div className="mt-5 flex justify-between w-80">
            <p>Email</p>
            <p>hi@anzaacademy.com</p>
          </div>
          <div className="mt-5 flex justify-between">
            <p>Phone Number</p>
            <p>+254704285929</p>
          </div>
          <div className="mt-5 flex justify-between">
            <p>Location</p>
            <p>Kiambu ,Kasarani</p>
          </div>
        </div>
        <div className="flex flex-col  mx-4 bg-white p-2 md:p-4  mt-10 md:mt-0 rounded-xl ">
          <p className="font-black text-main text-2xl text-center">
            Send a Message
          </p>
          <div className="flex  w-full flex-wrap justify-around">
            <div className="flex flex-col mt-5 md:mr-5">
              <label htmlFor="username " className="font-bold">
                Full Name
              </label>
              <input
                type="text"
                id="username"
                className=" w-[300px] md:w-[420px]  outline-none ring-1 ring-main  rounded-md h-10 p-2 bg-gray-50 focus:ring-2 "
                value={userName}
                placeholder="enter your name  "
                autoCorrect="off"
                autoCapitalize="off"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-5 md:ml-5">
              <label htmlFor="phonenumber " className="font-bold">
                Phone Number
              </label>
              <input
                type="text"
                id="phonenumber"
                className=" w-[300px] md:w-[420px]  outline-none ring-1 ring-main  rounded-md h-10 p-2 bg-gray-50 focus:ring-2 "
                value={phoneNumber}
                placeholder="enter phone number "
                autoCorrect="off"
                autoCapitalize="off"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col mt-5 justify-center items-center">
            <label
              htmlFor="msg"
              className="text-left  w-full  ml-2 md:ml-0 font-bold "
            >
              Message
            </label>
            <textarea
              name="msg"
              id="msg"
              minLength={5}
              rows={4}
              className=" w-[300px] md:w-full outline-none p-2 ring-1 hover:ring-2 ring-main rounded-xl "
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <div
            onClick={sendMessage}
            className="self-center w-64 md:w-80 mb-10 flex justify-center items-center cursor-pointer bg-main rounded-xl text-white font-black text-xl p-3 mt-5"
          >
            Send Message
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsComponent;
