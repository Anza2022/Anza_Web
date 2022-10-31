import CommentModel from "../../models/others/comments_models";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import { decryptString } from "../../presentation/utils/helper_functions";
import axiosInstance, { refreshAuthToken } from "../services/axios_client";
import { retrieveFromLocalStorage } from "../services/local_storage_services";

class CommentsRepo {
  static async getVideoLessonComments(
    videoId: string
  ): Promise<CommentModel[]> {
    let res = await axiosInstance.get(
      `/comments/${videoId}`,

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
      let props = res.data.map((e: any) => CommentModel.fromJson(e));
      return props.sort(
        (a: CommentModel, b: CommentModel) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      let refreshed = await refreshAuthToken();
      if (refreshed) {
        let props = await CommentsRepo.getVideoLessonComments(videoId);
        return props.sort(
          (a: CommentModel, b: CommentModel) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        throw "session expired, relogin required";
      }
    } else {
      throw "unable to get Career Talks, try again later";
    }
  }
  static async addVideoComment(c: CommentModel): Promise<CommentModel> {
    let res = await axiosInstance.post(
      `/comments`,
      c.toMap(),

      {
        headers: {
          Authorization: `Bearer ${decryptString(
            retrieveFromLocalStorage("access_token") ?? ""
          )}`,
        },
      }
    );
    if (res.status == 201) {
      // alert(res.data.length);
      c.commentId = res.data._id;
      return c;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      let refreshed = await refreshAuthToken();
      if (refreshed) {
        return await CommentsRepo.addVideoComment(c);
      } else {
        throw "session expired, relogin required";
      }
    } else {
      throw "unable to save comment, try again later";
    }
  }

  static updateVideoComment(c: CommentModel) {}

  static deleteVideoComment(id: string) {}

  static async addCommentLike(id: string): Promise<boolean> {
    let res = await axiosInstance.get(
      `/like_comment/${id}`,

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
      throw "unable to delete lesson";
    }
  }
  static async addCommentDisLike(id: string): Promise<boolean> {
    let res = await axiosInstance.get(
      `/dislike_comment/${id}`,

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
      throw "unable to delete lesson";
    }
  }
}

export default CommentsRepo;
