import VideoLessonModel, {
  LessonNotes,
} from "../../models/curriculum/video_lesson_model";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import { decryptString } from "../../presentation/utils/helper_functions";
import axiosInstance, { refreshAuthToken } from "../services/axios_client";
import { retrieveFromLocalStorage } from "../services/local_storage_services";

class VideoLessonRepo {
  async getFormVideos() {}
  static async getAllVideoLessons(): Promise<VideoLessonModel[]> {
    let res = await axiosInstance.get(
      `/lessons`,

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
      let props = res.data.map((e: any) => VideoLessonModel.fromJson(e));
      return props.sort((a: VideoLessonModel, b: VideoLessonModel) => {
        if (a.chapterNumber - b.chapterNumber != 0) {
          return a.chapterNumber - b.chapterNumber;
        } else {
          if (a.topicPriority - b.topicPriority != 0) {
            return a.topicPriority - b.topicPriority;
          } else {
            if (a.videoPriority - b.videoPriority != 0) {
              return a.videoPriority - b.videoPriority;
            } else {
              return 1;
            }
          }
        }
      });
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      let refreshed = await refreshAuthToken();
      if (refreshed) {
        let props = await VideoLessonRepo.getAllVideoLessons();
        return props.sort(
          (a: VideoLessonModel, b: VideoLessonModel) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        throw "session expired, relogin required";
      }
    } else {
      throw "unable to get lessons, try again later";
    }
  }
  static async getLessonFilesOnTheServer(): Promise<string[]> {
    let res = await axiosInstance.get(
      `/lesson_files/all`,

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
      let files = res.data.files.map((e: any) => e.toString());
      return files;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else {
      throw "unable to get lessons, try again later";
    }
  }
  static async addNewVideoLesson(
    lesson: VideoLessonModel
  ): Promise<VideoLessonModel> {
    let res = await axiosInstance.post(
      `/lessons`,
      lesson.toMap(),

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
      lesson.videoId = res.data._id;
      return lesson;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      let refreshed = await refreshAuthToken();
      if (refreshed) {
        return await VideoLessonRepo.addNewVideoLesson(lesson);
      } else {
        throw "session expired, relogin required";
      }
    } else {
      throw "unable to save lesson, try again later";
    }
  }
  static async updateVideoLesson(lesson: VideoLessonModel): Promise<boolean> {
    let res = await axiosInstance.patch(
      `/lesson/${lesson.videoId}`,
      lesson.toMap(),

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
  static async deleteVideoLesson(id: string): Promise<boolean> {
    let res = await axiosInstance.delete(
      `/lesson/${id}`,

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
  static async checkIfLessonFileExist(filename: string): Promise<boolean> {
    let res = await axiosInstance.get(
      `uploads/exists/${filename}`,

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

  //todo lesson notes
  static async getLessonNotes(lessonId: string): Promise<LessonNotes[]> {
    let res = await axiosInstance.get(
      `/lesson_note/${lessonId}`,

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
      let props = res.data.map((e: any) => LessonNotes.fromJson(e));
      return props;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      let refreshed = await refreshAuthToken();
      if (refreshed) {
        let props = await VideoLessonRepo.getLessonNotes(lessonId);
        return props;
      } else {
        throw "session expired, relogin required";
      }
    } else {
      throw "unable to get lesson notes, try again later";
    }
  }
  static async addLessonNotes(notes: LessonNotes): Promise<LessonNotes> {
    let res = await axiosInstance.post(
      `/lesson_notes`,
      notes.toMap(),

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
      notes.notesId = res.data._id;
      return notes;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      let refreshed = await refreshAuthToken();
      if (refreshed) {
        return await VideoLessonRepo.addLessonNotes(notes);
      } else {
        throw "session expired, relogin required";
      }
    } else {
      throw "unable to save lesson, try again later";
    }
  }
  static async updateLessonNotes(notes: LessonNotes): Promise<boolean> {
    let res = await axiosInstance.patch(
      `/lesson_note/${notes.notesId}`,
      notes.toMap(),

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
  static async deleteLessonNotes(id: string): Promise<boolean> {
    let res = await axiosInstance.delete(
      `/lesson_note/${id}`,

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

  //stats
  static async addVideoLike(id: string): Promise<boolean> {
    let res = await axiosInstance.get(
      `/video_lesson/add_like/${id}`,

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
  static async addVideoDisLike(id: string): Promise<boolean> {
    let res = await axiosInstance.get(
      `/video_lesson/add_dislike/${id}`,

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
  static async addVideoView(id: string): Promise<boolean> {
    let res = await axiosInstance.get(
      `/video_lesson/add_view/${id}`,

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

export default VideoLessonRepo;
