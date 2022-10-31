import SetbookEpisode from "../../models/curriculum/setbook_episode_model";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import { decryptString } from "../../presentation/utils/helper_functions";
import axiosInstance from "../services/axios_client";
import { retrieveFromLocalStorage } from "../services/local_storage_services";

class SetBooksRepo {
  static async getSetbooksEpisodes(): Promise<SetbookEpisode[]> {
    let res = await axiosInstance.get(
      `/setbook_episodes`,

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

      let episodes = res.data.map((e: any) => SetbookEpisode.fromJson(e));
      return episodes;

      //   return props.sort(
      //     (a: ExaminerTalk, b: ExaminerTalk) =>
      //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      //   );
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "session expired, relogin required";
    } else {
      throw "unable to get setbook episodes, try again later";
    }
  }
  static async addSetbookEpisode(
    episode: SetbookEpisode
  ): Promise<SetbookEpisode> {
    let res = await axiosInstance.post(
      `/setbook_episodes`,
      episode.toMap(),

      {
        headers: {
          Authorization: `Bearer ${decryptString(
            retrieveFromLocalStorage("access_token") ?? ""
          )}`,
        },
      }
    );
    if (res.status == 201) {
      episode.id = res.data._id;
      return episode;
    } else if (res.status == apiErrorCode) {
      throw res.data["message"];
    } else if (res.status == tokenExpiredErrorCode) {
      throw "forbiden: relogin to continue";
    } else {
      throw "unable to  add setbook episode , try again later";
    }
  }
  static async updateSetbookEpisode(episode: SetbookEpisode): Promise<boolean> {
    let res = await axiosInstance.patch(
      `/setbook_episode/${episode.id}`,
      episode.toMap(),
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
  static async deleteSetbookEpisode(id: string): Promise<boolean> {
    let res = await axiosInstance.delete(
      `/setbook_episode/${id}`,

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
  static async getEpisodeFilesOnTheServer(): Promise<string[]> {
    let res = await axiosInstance.get(
      `/setbook_files/all`,

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
      throw "unable to get episode files, try again later";
    }
  }
}

export default SetBooksRepo;
