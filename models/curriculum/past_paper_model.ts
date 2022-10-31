class PastPaperModel {
  constructor(
    public paperId: string,
    public title: string,
    public paperUrl: string,
    public markingSchemeUrl: string,
    public classLevel: string,
    public subjectType: string,
    public paperNumber: string,
    public schoolName: string,
    public teacherName: string,
    public createdAt: string,
    public updatedAt: string,
    public year: number,
    public ownerId: string,
    public term: string
  ) {}

  static fromJson(json: PaperJson): PastPaperModel {
    return new PastPaperModel(
      json._id,
      json.title,
      json.paperUrl,
      json.markingSchemeUrl,
      json.classLevel,
      json.subjectType,
      json.paperNumber,
      json.schoolName,
      json.teacherName,
      json.createdAt,
      json.updatedAt,
      json.year == null ? 2010 : json.year,
      json.ownerId == null ? "" : json.ownerId,
      json.term == null ? "" : json.term
    );
  }

  toMap() {
    return {
      title: this.title,
      paperUrl: this.paperUrl,
      markingSchemeUrl: this.markingSchemeUrl,
      classLevel: this.classLevel,
      subjectType: this.subjectType,
      paperNumber: this.paperNumber,
      schoolName: this.schoolName,
      teacherName: this.teacherName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      year: this.year,
      ownerId: this.ownerId,
      term: this.term,
    };
  }
}

export default PastPaperModel;

interface PaperJson {
  _id: string;
  title: string;
  paperUrl: string;
  markingSchemeUrl: string;
  classLevel: string;
  subjectType: string;
  paperNumber: string;
  schoolName: string;
  teacherName: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  year: number;
  term: string;
}
