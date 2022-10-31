import LessonPlanModel from "../../models/teacher/lesson_plan_model";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import { decryptString } from "../../presentation/utils/helper_functions";
import axiosInstance from "../services/axios_client";
import { retrieveFromLocalStorage } from "../services/local_storage_services";

class LessonPlanRepo {
  static async getLessonPlans(): Promise<LessonPlanModel[]> {
    let res = await axiosInstance.get(
      `/teacher/lesson_plans`,

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

      let plans = res.data.map((e: any) => LessonPlanModel.fromJson(e));
      return plans;

      //   return props.sort(
      //     (a: ExaminerTalk, b: ExaminerTalk) =>
      //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      //   );
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "session expired, relogin required";
    } else {
      throw "unable to get lesson plans, try again later";
    }
  }
  static async addLessonPlan(plan: LessonPlanModel): Promise<LessonPlanModel> {
    let res = await axiosInstance.post(
      `/teacher/lesson_plans`,
      plan.toMap(),

      {
        headers: {
          Authorization: `Bearer ${decryptString(
            retrieveFromLocalStorage("access_token") ?? ""
          )}`,
        },
      }
    );
    if (res.status == 201) {
      plan.id = res.data._id;
      return plan;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "forbiden: relogin to continue";
    } else {
      throw "unable to add lesson plan, try again later";
    }
  }
  static async updateLessonPlan(plan: LessonPlanModel): Promise<boolean> {
    let res = await axiosInstance.patch(
      `/teacher/lesson_plan/${plan.id}`,
      plan.toMap(),
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
  static async deleteLessonPlan(id: string): Promise<boolean> {
    let res = await axiosInstance.delete(
      `/teacher/lesson_plan/${id}`,

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

export default LessonPlanRepo;
