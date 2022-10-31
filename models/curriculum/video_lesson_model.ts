class VideoLessonModel {
  constructor(
    public videoId: string,
    public title: string,
    public videoUrl: string,
    public thumbnailUrl: string,
    public topicName: string,
    public classLevel: string,
    public subjectType: string,
    public teacherName: string,
    public totalViews: number,
    public topicPriority: number,
    public videoPriority: number,
    public createdAt: string,
    public updatedAt: string,
    public commentsOff: boolean,
    public isPublished: boolean,
    public teacherSchool: string,
    public notesId: string,
    public lessonQuizes: InLessonQuiz[],
    public lessonBrief: string,
    public chapter: string,
    public chapterNumber: number,
    public likes: number,
    public disLikes: number,
    public videoLength: string,
    public isPractical: boolean,
    public vidCipherId: string
  ) {}

  static fromJson(json: LessonJson): VideoLessonModel {
    let quizes =
      json.lessonQuizes.length < 1
        ? []
        : json.lessonQuizes.map((e) => InLessonQuiz.fromJson(e));
    return new VideoLessonModel(
      json._id,
      json.title,
      json.videoUrl,
      json.thumbnailUrl,
      json.topicName,
      json.classLevel,
      json.subjectType,
      json.teacherName,
      json.totalViews,
      json.topicPriority,
      json.videoPriority,
      json.createdAt,
      json.updatedAt,
      json.commentsOff,
      json.isPublished,
      json.teacherSchool,
      json.notesId,
      quizes,
      json.lessonBrief == null ? "N/a" : json.lessonBrief,
      json.chapter == null ? "N/a" : json.chapter,
      json.chapterNumber == null ? 2 : json.chapterNumber,
      json.likes == null ? 3 : json.likes,
      json.disLikes == null ? 0 : json.disLikes,
      json.videoLength == null ? "2:30" : json.videoLength,
      json.isPractical == null ? false : json.isPractical,
      json.vidCipherId == null ? "" : json.vidCipherId
    );
  }

  toMap() {
    return {
      title: this.title,
      videoUrl: this.videoUrl,
      thumbnailUrl: this.thumbnailUrl,
      topicName: this.topicName,
      classLevel: this.classLevel,
      subjectType: this.subjectType,
      teacherName: this.teacherName,
      totalViews: this.totalViews,
      topicPriority: this.topicPriority,
      videoPriority: this.videoPriority,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      commentsOff: this.commentsOff,
      isPublished: this.isPublished,
      teacherSchool: this.teacherSchool,
      notesId: this.notesId,
      lessonQuizes: this.lessonQuizes.map((e) => e.toMap()),
      lessonBrief: this.lessonBrief,
      chapter: this.chapter,
      chapterNumber: this.chapterNumber,
      likes: this.likes,
      disLikes: this.disLikes,
      videoLength: this.videoLength,
      isPractical: this.isPractical,
      vidCipherId: this.vidCipherId,
    };
  }
  toStatsMap() {
    return {
      _id: this.videoId,
      title: this.title,
      videoUrl: this.videoUrl,
      thumbnailUrl: this.thumbnailUrl,
      topicName: this.topicName,
      classLevel: this.classLevel,
      subjectType: this.subjectType,
      teacherName: this.teacherName,
      totalViews: this.totalViews,
      topicPriority: this.topicPriority,
      videoPriority: this.videoPriority,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      commentsOff: this.commentsOff,
      isPublished: this.isPublished,
      teacherSchool: this.teacherSchool,
      notesId: this.notesId,
      lessonQuizes: this.lessonQuizes.map((e) => e.toMap()),
      lessonBrief: this.lessonBrief,
      chapter: this.chapter,
      chapterNumber: this.chapterNumber,
      likes: this.likes,
      disLikes: this.disLikes,
      videoLength: this.videoLength,
      isPractical: this.isPractical,
      vidCipherId: this.vidCipherId,
    };
  }
}

export default VideoLessonModel;

export interface LessonJson {
  _id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  topicName: string;
  classLevel: string;
  subjectType: string;
  teacherName: string;
  totalViews: number;
  topicPriority: number;
  videoPriority: number;
  createdAt: string;
  updatedAt: string;
  commentsOff: boolean;
  isPublished: boolean;
  teacherSchool: string;
  notesId: string;
  lessonQuizes: InlessonJson[];
  lessonBrief: string;
  chapter: string;
  chapterNumber: number;
  likes: number;
  disLikes: number;
  videoLength: string;
  isPractical: boolean;
  vidCipherId: string;
}

export class InLessonQuiz {
  constructor(
    public question: string,
    public correctAnswer: string,
    public answerOptions: string[],
    public time: number
  ) {}

  static fromJson(json: InlessonJson): InLessonQuiz {
    return new InLessonQuiz(
      json.question,
      json.correctAnswer,
      json.answerOptions,
      json.time
    );
  }

  toMap() {
    return {
      question: this.question,
      correctAnswer: this.correctAnswer,
      answerOptions: this.answerOptions,
      time: this.time,
    };
  }
}

export interface InlessonJson {
  question: string;
  correctAnswer: string;
  answerOptions: string[];
  time: number;
}

export class LessonNotes {
  constructor(
    public notesId: string,
    public notes: string,
    public lessonId: string
  ) {}

  static fromJson(json: NotesJson): LessonNotes {
    return new LessonNotes(json._id, json.notes, json.lessonId);
  }

  toMap() {
    return {
      notes: this.notes,
      lessonId: this.lessonId,
    };
  }
}

interface NotesJson {
  _id: string;
  notes: string;
  lessonId: string;
}
