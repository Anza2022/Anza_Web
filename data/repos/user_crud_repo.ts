import { isBrowser } from "framer-motion";
import AccountSubscription from "../../models/user_models/account_subscription";
import ReferalBonusModel from "../../models/user_models/referal_bonus_model";
import UserModel from "../../models/user_models/user_model";
import UserStats from "../../models/user_models/user_stats";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import {
  decryptString,
  encryptString,
} from "../../presentation/utils/helper_functions";
import axiosInstance, { refreshAuthToken } from "../services/axios_client";
import {
  retrieveFromLocalStorage,
  saveInLocalStorage,
} from "../services/local_storage_services";

class UserCrudRepo {
  //   static async refreshUser(userId: string){
  //     let res = await axiosInstance.get(`/user/${userId}`, {
  //       headers: {
  //         Authorization: `Bearer ${decryptString(
  //           retrieveFromLocalStorage("access_token")
  //         )}`,
  //       },
  //     });
  //     if (res.status == 200) {
  //       let data = res.data;
  //       let user = UserModel.fromJson(data.userData);
  //       let bonus = ReferalBonus.fromJson(data.bonusData);
  //       saveInLocalStorage("userProfile", encryptString(user.userId));
  //       return [user, bonus];
  //     } else if (res.status == apiErrorCode) {
  //       throw res.data["message"];
  //     } else if (res.status == tokenExpiredErrorCode) {
  //       let refreshed = await refreshAuthToken();
  //       if (refreshed) {
  //         await UserRepo.refreshUser(userId);
  //       } else {
  //         throw "session expired, relogin required";
  //       }
  //     } else {
  //       throw "unable to login user try again later";
  //     }
  //   }

  static async updateUser(updatedUser: UserModel): Promise<boolean> {
    let res = await axiosInstance.patch(
      `https://8c70-102-217-158-14.in.ngrok.io/updateuser/${updatedUser.userId}`,
      updatedUser.toMap()
    );
    if (res.status == 200) {
      return true;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "token expired, please relogin";
    } else {
      throw "unable to update user";
    }
  }

  static async getAllUsers(): Promise<UserModel[]> {
    let res = await axiosInstance.get(
      `https://8c70-102-217-158-14.in.ngrok.io/getusers`,
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
      console.log(res.data.data)
      let allschools = res.data.map((e: any) => UserModel.fromJson(e));
      return allschools;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "Token expired";
    } else {
      throw "Unable to get users, try again later";
    }
  }



  static async refreshUser(): Promise<
    [UserModel, ReferalBonusModel, AccountSubscription, UserStats]
  > {
    if (isBrowser && retrieveFromLocalStorage("id") !== null) {
      let localid = retrieveFromLocalStorage("id");
      if (localid != null) {
        let id = decryptString(localid);

        try {
          let res = await axiosInstance.get(`/refresh_user/${id}`);
          if (res.status == 200) {
            let data = res.data;
            let user = UserModel.fromJson(data.userData);
            let bonus = ReferalBonusModel.fromJson(data.bonusData);
            let subscription = AccountSubscription.fromJson(
              data.subscriptionData
            );
            let stats = UserStats.fromJson(data.userStats);

            saveInLocalStorage(
              "access_token",
              encryptString(res.data["access_token"])
            );
            saveInLocalStorage(
              "refresh_token",
              encryptString(res.data["refresh_token"])
            );
            saveInLocalStorage("id", encryptString(user.userId));
            return [user, bonus, subscription, stats];
          } else if (res.status == apiErrorCode) {
            throw res.data["message"];
          } else {
            throw "unable to login user try again later";
          }
        } catch (e) {
          throw e;
        }
      } else {
        throw "user not saved";
      }
    } else {
      throw "user not saved";
    }
  }
  static async loginUser(creditials: {
    phoneNumber: string;
    password: string;
  }): Promise<[UserModel, ReferalBonusModel, AccountSubscription, UserStats]> {
    try {
      let res = await axiosInstance.post("/auth/login", creditials);
      if (res.status == 200) {
        let data = res.data;
        let user = UserModel.fromJson(data.userData);
        let bonus = ReferalBonusModel.fromJson(data.bonusData);
        let subscription = AccountSubscription.fromJson(data.subscriptionData);
        let stats = UserStats.fromJson(data.userStats);

        saveInLocalStorage(
          "access_token",
          encryptString(res.data["access_token"])
        );
        saveInLocalStorage(
          "refresh_token",
          encryptString(res.data["refresh_token"])
        );
        saveInLocalStorage("id", encryptString(user.userId));
        return [user, bonus, subscription, stats];
      } else if (res.status == apiErrorCode) {
        throw res.data["message"];
      } else {
        throw "unable to login user try again later";
      }
    } catch (e) {
      throw e;
    }
  }
  //   static async loginUserWithGoogle(creditials: {
  //     email: string;
  //     token: string;
  //   }): Promise<[UserModel, ReferalBonus]> {
  //     try {
  //       let res = await axiosInstance.post("/auth/google/login", creditials);
  //       if (res.status == 200) {
  //         let data = res.data;
  //         let user = UserModel.fromJson(data.userData);
  //         let bonus = ReferalBonus.fromJson(data.bonusData);
  //         //todo save auth tokens
  //         //save user profile to local storage
  //         saveInLocalStorage("userProfile", encryptString(user.userId));
  //         saveInLocalStorage(
  //           "access_token",
  //           encryptString(res.data["access_token"])
  //         );
  //         saveInLocalStorage(
  //           "refresh_token",
  //           encryptString(res.data["refresh_token"])
  //         );
  //         return [user, bonus];
  //       } else if (res.status == apiErrorCode) {
  //         throw res.data["message"];
  //       } else {
  //         throw "unable to login user try again later";
  //       }
  //     } catch (e) {
  //       throw e;
  //     }
  //   }
  static async registerUser(
    user: UserModel,
    invitecode: string
  ): Promise<[UserModel, ReferalBonusModel, AccountSubscription]> {
    try {
      let res = await axiosInstance.post(
        `/auth/register?invitecode=${invitecode}`,
        user.toMap()
      );
      console.log(res);
      if (res.status == 201) {
        let data = res.data;
        let user = UserModel.fromJson(data.userData);
        let bonus = ReferalBonusModel.fromJson(data.bonusData);
         let subscription = AccountSubscription.fromJson(data.subscriptionData);
        //  console.log(subscription);
        //  console.log("heyyyyy subscription");
        //  console.log(data.userStats);
        //  console.log("userStats");
        //  let stats = UserStats.fromJson(data.userStats);
        //  console.log(stats);
        //  console.log("heyyyyy stats");
        saveInLocalStorage(
          "access_token",
          encryptString(res.data["access_token"])
        );
        saveInLocalStorage(
          "refresh_token",
          encryptString(res.data["refresh_token"])
        );
        saveInLocalStorage("id", encryptString(user.userId));
        return [user, bonus, subscription];

      }
       else if (res.status == apiErrorCode) {
        throw res.data["message"];
      } else {
        throw "unable to register user try again later";
      }
    } catch (e) {
      throw e;
    }
  }

// forgot
  static async resetPassword(
    email: string,
  ): Promise<[""]> {
    try {
      let res = await axiosInstance.post(
        `https://auth.anzaacademy.co/forgotpassword?email=${email}`,
      );
      if (res.status == 200) {
        console.log(res.data['message']);
        let meme= res.data['message'];
        return meme;
      } else if (res.status == apiErrorCode) {
        throw res.data["message"];
      } else {
        throw "unable to send email reset for this user";
      }
    } catch (e) {
      throw e;
    }
  }


// resetpwd
  static async changePassword(
    newpassword: string,
    resettoken?: string,
  ): Promise<[]> {
    try {
      let url =`https://auth.anzaacademy.co/resetpassword/${resettoken}?newpassword=${newpassword}`;
      let res = await axiosInstance.post(url);
      if (res.status == 200) {
        console.log(res.data['message']);
        let meme= res.data['message'];
        return meme;
      } else if (res.status == apiErrorCode) {
        throw res.data["message"];
      } else {
        throw "unable to reset this users password";
      }
    } catch (e) {
      throw e;
    }
  }

// reset pwd via profile
  static async changePasswordViaProfile(
    id: string,
    creditials: {
      oldPassword: string;
      newPassword: string;
    }  ): Promise<boolean> {
      try {
        let res = await axiosInstance.post(
          `/auth/change_password/${id}`,
          creditials
        );
        if (res.status == 200) {
          console.log(res.data);
          return true;
        } else if (res.status == apiErrorCode) {
          throw res.data["message"];
        } else {
          throw "Unable to reset this users password";
        }
      } catch (e) {
        throw e;
      }
    }

}

export default UserCrudRepo;
