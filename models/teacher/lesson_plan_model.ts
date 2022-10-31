class LessonPlanModel {
  constructor(
    public id: string,
    public title: string,
    public fileId: string,
    public classLevel: string,
    public subjectType: string,
    public chapter: string,
    public chapterNumber: number,
    public topic: string,
    public topicNumber: number,
    public createdAt: string,
    public updatedAt: string,
    public term: string
  ) {}
  static fromJson(json: LessonPlanJson): LessonPlanModel {
    return new LessonPlanModel(
      json._id,
      json.title,
      json.fileId,
      json.classLevel,
      json.subjectType,
      json.chapter,
      json.chapterNumber,
      json.topic,
      json.topicNumber,
      json.createdAt,
      json.updatedAt,
      json.term
    );
  }

  toMap() {
    return {
      title: this.title,
      fileId: this.fileId,
      classLevel: this.classLevel,
      subjectType: this.subjectType,
      chapter: this.chapter,
      chapterNumber: this.chapterNumber,
      topic: this.topic,
      topicNumber: this.topicNumber,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      term: this.term,
    };
  }
}

export default LessonPlanModel;

interface LessonPlanJson {
  _id: string;
  title: string;
  fileId: string;
  classLevel: string;
  subjectType: string;
  chapter: string;
  chapterNumber: number;
  topic: string;
  topicNumber: number;
  createdAt: string;
  updatedAt: string;
  term: string;
}
