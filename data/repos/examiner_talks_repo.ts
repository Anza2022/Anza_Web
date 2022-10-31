import ExaminerTalk from "../../models/curriculum/examiner_talk_model";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import { decryptString } from "../../presentation/utils/helper_functions";
import axiosInstance, { refreshAuthToken } from "../services/axios_client";
import { retrieveFromLocalStorage } from "../services/local_storage_services";

class ExaminerTalksRepo {
  static async getExaminerTalks(): Promise<ExaminerTalk[]> {
    let res = await axiosInstance.get(
      `/examiner_talks`,

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

      let props = res.data.map((e: any) => ExaminerTalk.fromJson(e));

      return props.sort(
        (a: ExaminerTalk, b: ExaminerTalk) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      let refreshed = await refreshAuthToken();
      if (refreshed) {
        let props = await ExaminerTalksRepo.getExaminerTalks();
        return props.sort(
          (a: ExaminerTalk, b: ExaminerTalk) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        throw "session expired, relogin required";
      }
    } else {
      throw "unable to get maintainances, try again later";
    }
  }
  static async addExaminerTalk(talk: ExaminerTalk): Promise<ExaminerTalk> {
    let res = await axiosInstance.post(
      `/examiner_talks`,
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
      throw "forbiden: relogin to continue";
    } else {
      throw "unable to get maintainances, try again later";
    }
  }
  static async updateExaminerTalk(talk: ExaminerTalk): Promise<boolean> {
    let res = await axiosInstance.patch(
      `/examiner_talk/${talk.talkId}`,
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
  static async deleteExaminerTalk(id: string): Promise<boolean> {
    let res = await axiosInstance.delete(
      `/examiner_talk/${id}`,

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
}

export default ExaminerTalksRepo;
