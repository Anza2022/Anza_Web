import AdminStatsModel from "../../models/admin/admin_models";
import AccountSubscription from "../../models/user_models/account_subscription";
import ReferalBonusModel from "../../models/user_models/referal_bonus_model";
import UserModel from "../../models/user_models/user_model";
import UserStats from "../../models/user_models/user_stats";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import { decryptString } from "../../presentation/utils/helper_functions";
import axiosInstance, { refreshAuthToken } from "../services/axios_client";
import { retrieveFromLocalStorage } from "../services/local_storage_services";

class AdminRepo {
  static async getAdminStats(): Promise<AdminStatsModel[]> {
    let res = await axiosInstance.get(
      `/admin/stats`,

      {
        headers: {
          Authorization: `Bearer ${decryptString(
            retrieveFromLocalStorage("access_token") ?? ""
          )}`,
        },
      }
    );
    if (res.status == 200) {
      if (res.data.stats == null) {
        return [];
      }

      let props = AdminStatsModel.fromJson(res.data.stats);
      return [props];
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "token expired";
    } else {
      throw "unable to get stats, try again later";
    }
  }

  static async searchUser(
    phonenumber: string
  ): Promise<[UserModel, AccountSubscription, UserStats]> {
    try {
      let res = await axiosInstance.get(`/admin/search_user/${phonenumber}`);
      if (res.status == 200) {
        let data = res.data;
        let user = UserModel.fromJson(data.userData);
        let subscription = AccountSubscription.fromJson(data.subscriptionData);
        let stats = UserStats.fromJson(data.userStats);
        return [user, subscription, stats];
      } else if (res.status == apiErrorCode) {
        throw res.data["message"];
      } else {
        throw "unable to login user try again later";
      }
    } catch (e) {
      throw e;
    }
  }
}

export default AdminRepo;
