class ExaminerTalk {
  constructor(
    public talkId: string,
    public title: string,
    public videoUrl: string,
    public thumbnailUrl: string,
    public createdAt: string,
    public updatedAt: string,
    public totalViews: number,
    public likes: number,
    public subjectType: string,
    public examinerSchool: string,
    public examinerName: string,
    public examinerDescription: string
  ) {}
  static fromJson(json: ExaminerJson): ExaminerTalk {
    return new ExaminerTalk(
      json._id,
      json.title,
      json.videoUrl,
      json.thumbnailUrl,
      json.createdAt,
      json.updatedAt,
      json.totalViews,
      json.likes,
      json.subjectType,
      json.examinerSchool,
      json.examinerName,
      json.examinerDescription
    );
  }

  toMap() {
    return {
      title: this.title,
      videoUrl: this.videoUrl,
      thumbnailUrl: this.thumbnailUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      totalViews: this.totalViews,
      likes: this.likes,
      subjectType: this.subjectType,
      examinerSchool: this.examinerSchool,
      examinerName: this.examinerName,
      examinerDescription: this.examinerDescription,
    };
  }
}

export default ExaminerTalk;

interface ExaminerJson {
  _id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  totalViews: number;
  likes: number;
  subjectType: string;
  examinerName: string;
  examinerSchool: string;
  examinerDescription: string;
}
