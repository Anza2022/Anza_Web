class SchemeOfWorkModel {
  constructor(
    public id: string,
    public title: string,
    public fileId: string,
    public subjectType: string,
    public classLevel: string,
    public createdAt: string,
    public updatedAt: string,
    public term: string
  ) {}

  static fromJson(json: SchemeJson): SchemeOfWorkModel {
    return new SchemeOfWorkModel(
      json._id,
      json.title,
      json.fileId,
      json.subjectType,
      json.classLevel,
      json.createdAt,
      json.updatedAt,
      json.term
    );
  }

  toMap() {
    return {
      title: this.title,
      fileId: this.fileId,
      subjectType: this.subjectType,
      classLevel: this.classLevel,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      term: this.term,
    };
  }
}

export default SchemeOfWorkModel;

interface SchemeJson {
  _id: string;
  title: string;
  fileId: string;
  subjectType: string;
  classLevel: string;
  createdAt: string;
  updatedAt: string;
  term: string;
}
