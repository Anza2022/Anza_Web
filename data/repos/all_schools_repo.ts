import SchoolModel from "../../models/curriculum/school_model";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import { decryptString } from "../../presentation/utils/helper_functions";
import axiosInstance from "../services/axios_client";
import { retrieveFromLocalStorage } from "../services/local_storage_services";

class AllSchoolsRepo {
  static async addNewSchool(school: SchoolModel): Promise<SchoolModel> {
    let res = await axiosInstance.post(
      `/schools`,
      school.toMap(),
      {
        headers: {
          Authorization: `Bearer ${decryptString(
            retrieveFromLocalStorage("access_token") ?? ""
          )}`,
        },
      }
    );
    if (res.status == 201) {
      school.schoolId = res.data._id;
      return school;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "relogin to continue";
    } else {
      throw "unable to get maintainances, try again later";
    }
  }
  static async getAllSchools(): Promise<SchoolModel[]> {
    let res = await axiosInstance.get(`/all_schools`);
    if (res.status == 200) {
      if (res.data == null) {
        return [];
      }
      let allschools = res.data.map((e: any) => SchoolModel.fromJson(e));
      return allschools;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "token expired";
    } else {
      throw "unable to get stats, try again later";
    }
    return [];
  }

  
}

export default AllSchoolsRepo;
