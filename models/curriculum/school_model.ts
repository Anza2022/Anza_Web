class SchoolModel {
  constructor(
    public schoolId: string,
    public schoolName: string,
    public schoolEmail: string,
    public phoneNumber: string,
    public isAuthorisedByAdmin: boolean,
    public createdAt: string
  ) {}

  static fromJson(json: SchoolJson): SchoolModel {
    return new SchoolModel(
      json._id,
      json.schoolName,
      json.schoolEmail,
      json.phoneNumber,
      json.isAuthorisedByAdmin,
      json.createdAt
    );
  }

  toMap() {
    return {
      schoolName: this.schoolName,
      schoolEmail: this.schoolEmail,
      phoneNumber: this.phoneNumber,
      isAuthorisedByAdmin: this.isAuthorisedByAdmin,
      createdAt: this.createdAt,
    };
  }
}

export default SchoolModel;

interface SchoolJson {
  _id: string;
  schoolName: string;
  schoolEmail: string;
  phoneNumber: string;
  isAuthorisedByAdmin: boolean;
  createdAt: string;
}
