import PastPaperModel from "../../models/curriculum/past_paper_model";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import { decryptString } from "../../presentation/utils/helper_functions";
import axiosInstance, { refreshAuthToken } from "../services/axios_client";
import { retrieveFromLocalStorage } from "../services/local_storage_services";

class PastPaperRepo {
  static async getPastPapers(): Promise<PastPaperModel[]> {
    let res = await axiosInstance.get(
      `/past_papers`,
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
      let props = res.data.map((e: any) => PastPaperModel.fromJson(e));
      return props.sort(
        (a: PastPaperModel, b: PastPaperModel) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      let refreshed = await refreshAuthToken();
      if (refreshed) {
        let props = await PastPaperRepo.getPastPapers();
        return props.sort(
          (a: PastPaperModel, b: PastPaperModel) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        throw "session expired, relogin required";
      }
    } else {
      throw "unable to get past papers, try again later";
    }
  }
  static async getClassLevelPastPapers(
    form: string
  ): Promise<PastPaperModel[]> {
    let res = await axiosInstance.get(
      `/form_past_papers/${form}`,

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
      let props = res.data.map((e: any) => PastPaperModel.fromJson(e));
      return props.sort(
        (a: PastPaperModel, b: PastPaperModel) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "session expired, relogin required";
    } else {
      throw "unable to get past papers, try again later";
    }
  }
  static async addnewPastPaper(paper: PastPaperModel): Promise<PastPaperModel> {
    let res = await axiosInstance.post(
      `/past_papers`,
      paper.toMap(),

      {
        headers: {
          Authorization: `Bearer ${decryptString(
            retrieveFromLocalStorage("access_token") ?? ""
          )}`,
        },
      }
    );
    if (res.status == 201) {
      paper.paperId = res.data._id;
      return paper;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "relogin to continue";
    } else {
      throw "unable to add past paper, try again later";
    }
  }
  static async updatePastPaper(paper: PastPaperModel) {
    let res = await axiosInstance.patch(
      `/past_paper/${paper.paperId}`,
      paper.toMap(),
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
      throw "unable to update past paper, try again later";
    }
  }
  static async deletePastPaper(id: string) {
    let res = await axiosInstance.delete(
      `/past_paper/${id}`,

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
      throw "unable to  delete past paper, try again later";
    }
  }

  //for teachers

  static async getTeacherPastPapers(
    teacherId: string
  ): Promise<PastPaperModel[]> {
    let res = await axiosInstance.get(
      `/teacher/past_papers/${teacherId}`,

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
      let props = res.data.map((e: any) => PastPaperModel.fromJson(e));
      return props.sort(
        (a: PastPaperModel, b: PastPaperModel) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      let refreshed = await refreshAuthToken();
      if (refreshed) {
        let props = await PastPaperRepo.getPastPapers();
        return props.sort(
          (a: PastPaperModel, b: PastPaperModel) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        throw "session expired, relogin required";
      }
    } else {
      throw "unable to get past papers, try again later";
    }
  }
}

export default PastPaperRepo;
