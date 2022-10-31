import CareerTalk from "../../models/curriculum/career_talk_model";
import ExaminerTalk from "../../models/curriculum/examiner_talk_model";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import { decryptString } from "../../presentation/utils/helper_functions";
import axiosInstance, { refreshAuthToken } from "../services/axios_client";
import { retrieveFromLocalStorage } from "../services/local_storage_services";

class CareerTalksRepo {
  static async getCareerTalks(): Promise<CareerTalk[]> {
    let res = await axiosInstance.get(
      `/career_talks`,
      {
        headers: {
          Authorization: `Bearer ${decryptString(
            retrieveFromLocalStorage("access_token") ?? ""
          )}`,
        },
      }
    );
    if (res.status == 200) {
      if (res.data == null) {
        return [];
      }
      // alert(res.data.length);
      let props = res.data.map((e: any) => CareerTalk.fromJson(e));
      return props.sort(
        (a: CareerTalk, b: CareerTalk) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      let refreshed = await refreshAuthToken();
      if (refreshed) {
        let props = await CareerTalksRepo.getCareerTalks();
        return props.sort(
          (a: CareerTalk, b: CareerTalk) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        throw "session expired, relogin required";
      }
    } else {
      throw "unable to get Career Talks, try again later";
    }
  }
  static async addCareerTalk(talk: CareerTalk): Promise<CareerTalk> {
    let res = await axiosInstance.post(
      `/career_talks`,
      talk.toMap(),

      {
        headers: {
          Authorization: `Bearer ${decryptString(
            retrieveFromLocalStorage("access_token") ?? ""
          )}`,
        },
      }
    );
    if (res.status == 201) {
      talk.talkId = res.data._id;
      return talk;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "relogin to continue";
    } else {
      throw "unable to get maintainances, try again later";
    }
  }
  static async updateCareerTalk(talk: CareerTalk) {
    let res = await axiosInstance.patch(
      `/career_talk/${talk.talkId}`,
      talk.toMap(),
      {
        headers: {
          Authorization: `Bearer ${decryptString(
            retrieveFromLocalStorage("access_token") ?? ""
          )}`,
        },
      }
    );
    if (res.status == 200) {
      return true;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "relogin to continue";
    } else {
      throw "unable to get maintainances, try again later";
    }
  }
  static async deleteCareerTalk(id: string) {
    let res = await axiosInstance.delete(
      `/career_talk/${id}`,

      {
        headers: {
          Authorization: `Bearer ${decryptString(
            retrieveFromLocalStorage("access_token") ?? ""
          )}`,
        },
      }
    );
    if (res.status == 200) {
      return true;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "relogin to continue";
    } else {
      throw "unable to delete, try again later";
    }
  }
}

export default CareerTalksRepo;
