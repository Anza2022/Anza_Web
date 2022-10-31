import UserStats from "../../models/user_models/user_stats";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import { decryptString } from "../../presentation/utils/helper_functions";
import axiosInstance from "../services/axios_client";
import { retrieveFromLocalStorage } from "../services/local_storage_services";

class UserStatsRepo {
  //videos watched
  static async updateUserStats(stats: UserStats): Promise<boolean> {
    let res = await axiosInstance.patch(
      `/user_stats/${stats.statsId}`,
      stats.toMap(),

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
      throw "token is expired";
    } else {
      throw "unable to update lesson";
    }
  }
}

export default UserStatsRepo;
