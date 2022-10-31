import AppStatsModel, {
  AppDataModel,
} from "../../models/appdata/app_stats_model";
import FaqModel from "../../models/appdata/faq_model";
import TestmonialModel from "../../models/appdata/testimonial_model";
import SchoolModel from "../../models/curriculum/school_model";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import { decryptString } from "../../presentation/utils/helper_functions";
import axiosInstance from "../services/axios_client";
import { retrieveFromLocalStorage } from "../services/local_storage_services";

class AppDataRepo {
  static async getAppData(): Promise<AppDataModel> {
    let res = await axiosInstance.get(`/app/data`);
    if (res.status == 200) {
      let alltestmonials = res.data.testmonials.map((e: any) =>
        TestmonialModel.fromJson(e)
      );
      let allfaqs = res.data.faqs.map((e: any) => TestmonialModel.fromJson(e));
      let allstats = AppStatsModel.fromJson(res.data.stats);
      let allschools = res.data.schools.map((e: any) =>
        SchoolModel.fromJson(e)
      );
      return new AppDataModel(alltestmonials, allstats, allfaqs, allschools);
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "token expired";
    } else {
      throw "unable to get stats, try again later";
    }
    // return new AppDataModel([], new AppStatsModel(1, 1, 1), []);
  }
  static async getTestmonials(): Promise<TestmonialModel[]> {
    let res = await axiosInstance.get(`/app/testmonials`);
    if (res.status == 200) {
      if (res.data == null) {
        return [];
      }
      let alltestmonials = res.data.map((e: any) =>
        TestmonialModel.fromJson(e)
      );
      return alltestmonials;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "token expired";
    } else {
      throw "unable to get stats, try again later";
    }
    // return new AppDataModel([], new AppStatsModel(1, 1, 1), []);
  }
  static async getFaqs(): Promise<FaqModel[]> {
    let res = await axiosInstance.get(`/app/faqs`);
    if (res.status == 200) {
      if (res.data == null) {
        return [];
      }
      let allfaqs = res.data.map((e: any) => FaqModel.fromJson(e));
      return allfaqs;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "token expired";
    } else {
      throw "unable to get stats, try again later";
    }
    // return new AppDataModel([], new AppStatsModel(1, 1, 1), []);
  }

  static async addFaq(faq: FaqModel): Promise<FaqModel> {
    let res = await axiosInstance.post(
      `/app/faqs`,
      faq.toMap(),

      {
        headers: {
          Authorization: `Bearer ${decryptString(
            retrieveFromLocalStorage("access_token") ?? ""
          )}`,
        },
      }
    );
    if (res.status == 201) {
      faq.id = res.data._id;
      return faq;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "relogin to continue";
    } else {
      throw "unable to get maintainances, try again later";
    }
  }
  static async addTestmonial(
    testmonial: TestmonialModel
  ): Promise<TestmonialModel> {
    let res = await axiosInstance.post(
      `/app/testmonials`,
      testmonial.toMap(),

      {
        headers: {
          Authorization: `Bearer ${decryptString(
            retrieveFromLocalStorage("access_token") ?? ""
          )}`,
        },
      }
    );
    if (res.status == 201) {
      testmonial.id = res.data._id;
      return testmonial;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "relogin to continue";
    } else {
      throw "unable to get maintainances, try again later";
    }
  }
}
export default AppDataRepo;
