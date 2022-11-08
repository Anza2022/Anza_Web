import axios from "axios";
import {
  decryptString,
  encryptString,
} from "../../presentation/utils/helper_functions";
import {
  retrieveFromLocalStorage,
  saveInLocalStorage,
} from "./local_storage_services";

const axiosInstance = axios.create({
  baseURL: "https://anzaacademy.co/anzaapi/",
  //baseURL: "http://127.0.0.1:8080/anzaapi", //telkom router
  timeout: 15000,
  headers: {},
});

axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  //get auth token
  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // parse json to objects
    //check for  response
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // check if its 401 and refresh token then resend the request again
    //save new auth tokens
    console.log(error["message"]);

    return Promise.reject(error);
  }
);

export async function refreshAuthToken(): Promise<boolean> {
  let res = await axiosInstance.get("/auth/refresh_token", {
    headers: {
      Authorization: `Bearer ${decryptString(
        retrieveFromLocalStorage("refresh_token") ?? ""
      )}`,
    },
  });
  if (res.status == 200) {
    saveInLocalStorage("access_token", encryptString(res.data["access_token"]));
    saveInLocalStorage(
      "refresh_token",
      encryptString(res.data["refresh_token"])
    );
    return true;
  } else {
    return false;
  }
}

export default axiosInstance;
