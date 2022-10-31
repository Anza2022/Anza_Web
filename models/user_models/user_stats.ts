import VideoLessonModel, {
  InlessonJson,
  LessonJson,
} from "../curriculum/video_lesson_model";

class UserStats {
  constructor(
    public statsId: string,

    public userId: string,
    public lastMpesaPhonenumber: string,
    public favoriteLessonIds: string[],
    public totalVideosWatched: number,
    public totalTestTaken: number,
    public totalMarksScored: number,
    //app state
    public lastWatchedVideo: VideoLessonModel,
    public lastVideoTimeSecs: number
  ) {}

  static fromJson(json: StatsJson): UserStats {
    return new UserStats(
      json._id,
      json.userId,
      json.lastMpesaPhonenumber,
      json.favoriteLessonIds,
      json.totalVideosWatched,
      json.totalTestTaken,
      json.totalMarksScored,
      VideoLessonModel.fromJson(json.lastWatchedVideo),
      json.lastVideoTimeSecs
    );
  }

  toMap() {
    return {
      userId: this.userId,
      lastMpesaPhonenumber: this.lastMpesaPhonenumber,
      favoriteLessonIds: this.favoriteLessonIds,
      totalVideosWatched: this.totalVideosWatched,
      totalTestTaken: this.totalTestTaken,
      totalMarksScored: this.totalMarksScored,
      lastWatchedVideo: this.lastWatchedVideo.toStatsMap(),
      lastVideoTimeSecs: this.lastVideoTimeSecs,
    };
  }
}

export default UserStats;

interface StatsJson {
  _id: string;
  userId: string;
  lastMpesaPhonenumber: string;
  favoriteLessonIds: string[];
  totalVideosWatched: number;
  totalTestTaken: number;
  totalMarksScored: number;
  lastWatchedVideo: LessonJson;
  lastVideoTimeSecs: number;
}
