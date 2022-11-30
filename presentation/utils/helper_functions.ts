import toast from "react-hot-toast";
import moment from "moment";
const CryptoJS = require("crypto-js");
import { v4 as uuidv4 } from "uuid";

function showToast(text: string, type: string) {
  if (type == "success") {
    toast.success(text, { className: "text-[14px]", duration: 5000 });
  } else if ((type = "error")) {
    toast.error(text, { className: "text-[14px]", duration: 5000 });
  }
}

function isBrowser() {
  return typeof window !== "undefined";
}

function getCurrentDate(): string {
  return new Date().toISOString().split("T")[0];
}
function getCurrentTime(): string {
  return new Date(new Date().getTime())
    .toISOString()
    .split("T")[1]
    .split(".")[0];
}

function addMonthsToDate(no: number): string {
  return new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 31 * no)
    .toISOString()
    .split("T")[0];
}

function formatStringToMoney(v: number) {
  return new Intl.NumberFormat().format(v);
}
function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}



const getCoords = async () => {
  const pos: GeolocationPosition = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  return {
    long: pos.coords.longitude,
    lat: pos.coords.latitude,
  };
};

function encryptString(value: string): string {
  var ciphertext = CryptoJS.AES.encrypt(value, "rmanagersecretkey").toString();

  return ciphertext;
}
function decryptString(value: string): string {
  var bytes = CryptoJS.AES.decrypt(value, "rmanagersecretkey");
  var originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText;
}

function formatDateString(e: string): string {
  return moment(e).format("LL");
}
function getTimeAgo(e: string): string {
  return moment(e).fromNow();
}
function generateUniqueId(): string {
  return uuidv4();
}

function getRemainingMinutesAndSeconds(milisecs: number): string {
  var minutes = Math.floor((milisecs % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((milisecs % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");
  return `${minutes} :${seconds}`;
}
function getRemainigTimeToStableVersion(): string {
  let milisecs = new Date("2022-09-01").valueOf() - new Date().valueOf();
  var days = Math.floor(
    (milisecs % (1000 * 60 * 60 * 60 * 24)) / (1000 * 60 * 60 * 24)
  );
  var hours = Math.floor((milisecs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    .toString()
    .padStart(2, "0");
  var minutes = Math.floor((milisecs % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, "0");
  var seconds = Math.floor((milisecs % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");
  return `${days} : ${hours} : ${minutes} : ${seconds} `;
  // return `${days} ${
  //   days == 1 ? "day" : "days"
  // } ${hours} hrs ${minutes} mins ${seconds} seconds`;
}
function getSubscriptionLockdateRemainingTime(lockdate: string): string {
  let milisecs = new Date(lockdate).valueOf() - new Date().valueOf();
  var days = Math.floor(
    (milisecs % (1000 * 60 * 60 * 60 * 24)) / (1000 * 60 * 60 * 24)
  );
  var hours = Math.floor((milisecs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    .toString()
    .padStart(2, "0");
  var minutes = Math.floor((milisecs % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, "0");
  var seconds = Math.floor((milisecs % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");
  return `${days} ${
    days == 1 ? "day" : "days"
  } ${hours} : ${minutes} : ${seconds}`;
}
export {
  getCoords,
  showToast,
  isBrowser,
  getCurrentDate,
  formatStringToMoney,
  validateEmail,
  getCurrentTime,
  addMonthsToDate,
  encryptString,
  decryptString,
  formatDateString,
  getRemainingMinutesAndSeconds,
  getRemainigTimeToStableVersion,
  getSubscriptionLockdateRemainingTime,
  getTimeAgo,
  generateUniqueId,
};
