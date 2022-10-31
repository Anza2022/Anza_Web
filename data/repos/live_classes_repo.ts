import LiveClassModel from "../../models/curriculum/live_class_model";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import { decryptString } from "../../presentation/utils/helper_functions";
import axiosInstance from "../services/axios_client";
import { retrieveFromLocalStorage } from "../services/local_storage_services";

class LiveClassesRepo {
  static async getLiveClasses(): Promise<LiveClassModel[]> {
    let res = await axiosInstance.get(
      `/live_classes`,

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

      let classes = res.data.map((e: any) => LiveClassModel.fromJson(e));
      return classes;

      //   return props.sort(
      //     (a: ExaminerTalk, b: ExaminerTalk) =>
      //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      //   );
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "session expired, relogin required";
    } else {
      throw "unable to get live classes, try again later";
    }
  }
  static async getTeacherLiveClasses(id: string): Promise<LiveClassModel[]> {
    let res = await axiosInstance.get(
      `/teacher/live_classes/${id}`,

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

      let classes = res.data.map((e: any) => LiveClassModel.fromJson(e));
      return classes;

      //   return props.sort(
      //     (a: ExaminerTalk, b: ExaminerTalk) =>
      //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      //   );
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "session expired, relogin required";
    } else {
      throw "unable to get teacher live classes, try again later";
    }
  }
  static async addLiveClass(
    liveclass: LiveClassModel
  ): Promise<LiveClassModel> {
    let res = await axiosInstance.post(
      `/live_classes`,
      liveclass.toMap(),

      {
        headers: {
          Authorization: `Bearer ${decryptString(
            retrieveFromLocalStorage("access_token") ?? ""
          )}`,
        },
      }
    );
    if (res.status == 201) {
      liveclass.id = res.data._id;
      return liveclass;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "forbiden: relogin to continue";
    } else {
      throw "unable to  add live class, try again later";
    }
  }
  static async updateLiveClass(liveclass: LiveClassModel): Promise<boolean> {
    let res = await axiosInstance.patch(
      `/live_class/${liveclass.id}`,
      liveclass.toMap(),
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
      throw "unable to update, try again later";
    }
  }
  static async deleteLiveClass(id: string): Promise<boolean> {
    let res = await axiosInstance.delete(
      `/live_class/${id}`,

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
      throw "unable to delete , try again later";
    }
  }
}

export default LiveClassesRepo;
