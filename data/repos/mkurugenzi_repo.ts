import MkurugenziEpisode from "../../models/curriculum/mkurugenzi_episode_model";
import {
  apiErrorCode,
  tokenExpiredErrorCode,
} from "../../presentation/utils/constants";
import { decryptString } from "../../presentation/utils/helper_functions";
import axiosInstance from "../services/axios_client";
import { retrieveFromLocalStorage } from "../services/local_storage_services";

class MkurugenziRepo {
  static async getMkurugenziEpisodes(): Promise<MkurugenziEpisode[]> {
    let res = await axiosInstance.get(
      `/mkurugenzi_episodes`,

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

      let episodes = res.data.map((e: any) => MkurugenziEpisode.fromJson(e));
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
      throw "unable to get mkurugenzi episodes, try again later";
    }
  }
  static async addMkurugenziEpisode(
    episode: MkurugenziEpisode
  ): Promise<MkurugenziEpisode> {
    let res = await axiosInstance.post(
      `/mkurugenzi_episodes`,
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
      throw "unable to  add mkurugenzi episode , try again later";
    }
  }
  static async updateMkurugenziEpisode(
    episode: MkurugenziEpisode
  ): Promise<boolean> {
    let res = await axiosInstance.patch(
      `/mkurugenzi_episode/${episode.id}`,
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
  static async deleteMkurugenziEpisode(id: string): Promise<boolean> {
    let res = await axiosInstance.delete(
      `/mkurugenzi_episode/${id}`,

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
      `/mkurugenzi_files/all`,

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
  //thumbnail view url --/anzaapi/view_thumbnail/mkurugenzi/:id
  //file view url -- /anzaapi/mkurugenzi/view_episode/:id
}

export default MkurugenziRepo;
