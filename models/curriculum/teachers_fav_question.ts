class TeacherFavQuestion {
  constructor(
    public questionId: string,
    public teacherId: string,
    public subjectType: string,
    public classLevel: string,
    public question: string,
    public totalMarks: number,
    public createdAt: string
  ) {}

  static fromJson(json: TeacherFavJson): TeacherFavQuestion {
    return new TeacherFavQuestion(
      json._id,
      json.teacherId,
      json.subjectType,
      json.classLevel,
      json.question,
      json.totalMarks,
      json.createdAt
    );
  }

  toMap() {
    return {
      teacherId: this.teacherId,
      subjectType: this.subjectType,
      classLevel: this.classLevel,
      question: this.question,
      totalMarks: this.totalMarks,
      createdAt: this.createdAt,
    };
  }
}

export default TeacherFavQuestion;

interface TeacherFavJson {
  _id: string;
  teacherId: string;
  subjectType: string;
  classLevel: string;
  question: string;
  totalMarks: number;
  createdAt: string;
}
