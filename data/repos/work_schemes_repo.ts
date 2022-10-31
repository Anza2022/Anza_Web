import SchemeOfWorkModel from "../../models/teacher/schemes_of_work_model";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import { decryptString } from "../../presentation/utils/helper_functions";
import axiosInstance from "../services/axios_client";
import { retrieveFromLocalStorage } from "../services/local_storage_services";

class WorkSchemesRepo {
  static async getSchemesOfWork(): Promise<SchemeOfWorkModel[]> {
    let res = await axiosInstance.get(
      `/teacher/workschemes`,

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

      let schemes = res.data.map((e: any) => SchemeOfWorkModel.fromJson(e));
      return schemes;

      //   return props.sort(
      //     (a: ExaminerTalk, b: ExaminerTalk) =>
      //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      //   );
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "session expired, relogin required";
    } else {
      throw "unable to get schemes of work, try again later";
    }
  }
  static async addSchemesOfWork(
    scheme: SchemeOfWorkModel
  ): Promise<SchemeOfWorkModel> {
    let res = await axiosInstance.post(
      `/teacher/workschemes`,
      scheme.toMap(),

      {
        headers: {
          Authorization: `Bearer ${decryptString(
            retrieveFromLocalStorage("access_token") ?? ""
          )}`,
        },
      }
    );
    if (res.status == 201) {
      scheme.id = res.data._id;
      return scheme;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "forbiden: relogin to continue";
    } else {
      throw "unable to add schemes of work, try again later";
    }
  }
  static async updateWorkScheme(scheme: SchemeOfWorkModel): Promise<boolean> {
    let res = await axiosInstance.patch(
      `/teacher/workscheme/${scheme.id}`,
      scheme.toMap(),
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
  static async deleteWorkScheme(id: string): Promise<boolean> {
    let res = await axiosInstance.delete(
      `/teacher/workscheme/${id}`,

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

export default WorkSchemesRepo;
