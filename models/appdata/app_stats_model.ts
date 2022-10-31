import SchoolModel from "../curriculum/school_model";
import FaqModel from "./faq_model";
import TestmonialModel from "./testimonial_model";

class AppStatsModel {
  constructor(
    public totalTeachers: number,
    public totalStudents: number,
    public totalLessons: number
  ) {}
  static fromJson(json: AppStatsJson): AppStatsModel {
    return new AppStatsModel(
      json.totalTeachers,
      json.totalStudents,
      json.totalLessons
    );
  }
}

export default AppStatsModel;

interface AppStatsJson {
  totalTeachers: number;
  totalStudents: number;
  totalLessons: number;
}

export class AppDataModel {
  constructor(
    public testmonials: TestmonialModel[],
    public stats: AppStatsModel,
    public faqs: FaqModel[],
    public schools: SchoolModel[]
  ) {}
}
