import NotificationModel from "../../models/others/notification_model";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import { decryptString } from "../../presentation/utils/helper_functions";
import axiosInstance, { refreshAuthToken } from "../services/axios_client";
import { retrieveFromLocalStorage } from "../services/local_storage_services";

class NotificationRepo {
  static async getUserNotifcations(
    userId: string
  ): Promise<NotificationModel[]> {
    let res = await axiosInstance.get(
      `/user_notifications/${userId}`,

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
      let props = res.data.map((e: any) => NotificationModel.fromJson(e));
      return props.sort(
        (a: NotificationModel, b: NotificationModel) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      let refreshed = await refreshAuthToken();
      if (refreshed) {
        let props = await NotificationRepo.getUserNotifcations(userId);
        return props.sort(
          (a: NotificationModel, b: NotificationModel) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        throw "session expired, relogin required";
      }
    } else {
      throw "unable to get notifications, try again later";
    }
  }

  static async updateUserNotification(
    notification: NotificationModel
  ): Promise<boolean> {
    let res = await axiosInstance.patch(
      `/notification/${notification.notificationId}`,
      notification.toMap(),

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
      let refreshed = await refreshAuthToken();
      if (refreshed) {
        let res = await NotificationRepo.updateUserNotification(notification);
        return true;
      } else {
        throw "session expired, relogin required";
      }
    } else {
      throw "unable to get notifications, try again later";
    }
  }
}

export default NotificationRepo;
