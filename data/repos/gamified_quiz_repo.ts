import GamifiedQuizTest, {
  OneQuiz,
} from "../../models/curriculum/gamified_quizes_model";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import { decryptString } from "../../presentation/utils/helper_functions";
import axiosInstance, { refreshAuthToken } from "../services/axios_client";
import { retrieveFromLocalStorage } from "../services/local_storage_services";

class GamifiedQuizRepo {
  static async getQuizes(): Promise<GamifiedQuizTest[]> {
    let res = await axiosInstance.get(
      `/gamified_quizes`,

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
      let props = res.data.map((e: any) => GamifiedQuizTest.fromJson(e));
      return props.sort(
        (a: GamifiedQuizTest, b: GamifiedQuizTest) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "session expired, relogin required";
    } else {
      throw "unable to get quizes, try again later";
    }
  }
  static async getTeacherQuizes(userId: string): Promise<GamifiedQuizTest[]> {
    let res = await axiosInstance.get(
      `/teacher/gamified_quizes/${userId}`,

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
      let props = res.data.map((e: any) => GamifiedQuizTest.fromJson(e));
      return props.sort(
        (a: GamifiedQuizTest, b: GamifiedQuizTest) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "session expired, relogin required";
    } else {
      throw "unable to get quizes, try again later";
    }
  }
  static async addnewGamifiedQuiz(
    test: GamifiedQuizTest
  ): Promise<GamifiedQuizTest> {
    let res = await axiosInstance.post(`/gamified_quizes`, test.toMap(), {
      headers: {
        Authorization: `Bearer ${decryptString(
          retrieveFromLocalStorage("access_token") ?? ""
        )}`,
      },
    });
    if (res.status == 201) {
      test.testId = res.data._id;
      return test;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "relogin to continue";
    } else {
      throw "unable to get maintainances, try again later";
    }
  }
  static async addQuestionToGamifiedQuiz(
    testid: string,
    quiz: OneQuiz
  ): Promise<boolean> {
    let res = await axiosInstance.post(
      `/update_test/add_new_question/${testid}`,
      quiz.toMap(),
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
      throw "unable to get maintainances, try again later";
    }
  }
  static async UpdateOneQuestionToGamifiedQuiz(
    testid: string,
    quiz: OneQuiz
  ): Promise<boolean> {
    let res = await axiosInstance.post(
      `/update_test/update_one_question/${testid}`,
      quiz.toMap(),
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
      throw "unable to get maintainances, try again later";
    }
  }
  static async updateGamifiedQuiz(test: GamifiedQuizTest) {
    let res = await axiosInstance.patch(
      `/gamified_quiz/${test.testId}`,
      test.toMap(),
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
      throw "unable to get maintainances, try again later";
    }
  }
  static async deleteGamifiedQuiz(id: string) {
    let res = await axiosInstance.delete(
      `/gamified_quiz/${id}`,

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
      throw "unable to get maintainances, try again later";
    }
  }
  static async deleteOneQuestionInTest(testid: string, title: string) {
    let res = await axiosInstance.delete(
      `/update_test/delete_question/${testid}/${title}`,

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
      throw "unable to get maintainances, try again later";
    }
  }
  static async likeGamifiedTest(testid: string): Promise<boolean> {
    let res = await axiosInstance.get(
      `/like/gamified_quizes/${testid}`,

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
      throw "session expired, relogin required";
    } else {
      throw "unable to get quizes, try again later";
    }
  }
  static async unlikeGamifiedTest(testid: string): Promise<boolean> {
    let res = await axiosInstance.get(`/unlike/gamified_quizes/${testid}`, {
      headers: {
        Authorization: `Bearer ${decryptString(
          retrieveFromLocalStorage("access_token") ?? ""
        )}`,
      },
    });
    if (res.status == 200) {
      return true;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "session expired, relogin required";
    } else {
      throw "unable to get quizes, try again later";
    }
  }
  static async updateTotalPlays(
    testid: string,
    isPass: boolean
  ): Promise<boolean> {
    let res = await axiosInstance.get(
      `/quiz_test/add_play/${testid}/${isPass}`,

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
      throw "session expired, relogin required";
    } else {
      throw "unable to get quizes, try again later";
    }
  }
  static async rateGamifiedTest(
    testid: string,
    rate: number
  ): Promise<boolean> {
    let res = await axiosInstance.get(
      `/rate/gamified_quizes/${testid}/${rate}`,

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
      throw "session expired, relogin required";
    } else {
      throw "unable to get quizes, try again later";
    }
  }
}

export default GamifiedQuizRepo;
