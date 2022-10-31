class LiveClassModel {
  constructor(
    public id: string,
    public title: string,
    public dayDate: string,
    public dayTime: string,
    public duration: number,
    public price: number,
    public createdAt: string,
    public updatedAt: string,
    public isVerified: boolean,
    public ownerId: string,
    public teacherName: string,
    public teacherSchool: string,
    public bbbUrl: string,
    public studentsIds: string[]
  ) {}

  static fromJson(json: ClassJson): LiveClassModel {
    return new LiveClassModel(
      json._id,
      json.title,
      json.dayDate,
      json.dayTime,
      json.duration,
      json.price,
      json.createdAt,
      json.updatedAt,
      json.isVerified,
      json.ownerId,
      json.teacherName,
      json.teacherSchool,
      json.bbbUrl,
      json.studentsIds
    );
  }
  toMap() {
    return {
      title: this.title,
      dayDate: this.dayDate,
      dayTime: this.dayTime,
      duration: this.duration,
      price: this.price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isVerified: this.isVerified,
      ownerId: this.ownerId,
      teacherName: this.teacherName,
      teacherSchool: this.teacherSchool,
      bbbUrl: this.bbbUrl,
      studentsIds: this.studentsIds,
    };
  }
}

export default LiveClassModel;

interface ClassJson {
  _id: string;
  title: string;
  dayDate: string;
  dayTime: string;
  bbbUrl: string;
  duration: number;
  price: number;
  studentsIds: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  teacherName: string;
  teacherSchool: string;
}
