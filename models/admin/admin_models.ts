class AdminStatsModel {
  constructor(
    public totalUsers: number,
    public students: number,
    public teachers: number,
    public institution: number,
    public activeSubscriptions: number,
    public totalVideos: number,
    public form1Videos: number,
    public form2Videos: number,
    public form3Videos: number,
    public form4Videos: number,
    public totalPapers: number,
    public form1Papers: number,
    public form2Papers: number,
    public form3Papers: number,
    public form4Papers: number,
    public totalQuizzes: number,
    public form1Quizes: number,
    public form2Quizzes: number,
    public form3Quizzes: number,
    public form4Quizes: number,
    public examinerTalks: number,
    public careerTalks: number,
    public fasihiEnglish: number,
    public fasihiKiswahili: number
  ) {}
  static fromJson(json: StatsJson): AdminStatsModel {
    return new AdminStatsModel(
      json.totalUsers,
      json.students,
      json.teachers,
      json.institution,
      json.activeSubscriptions,
      json.totalVideos,
      json.form1Videos,
      json.form2Videos,
      json.form3Videos,
      json.form4Videos,
      json.totalPapers,
      json.form1Papers,
      json.form2Papers,
      json.form3Papers,
      json.form4Papers,
      json.totalQuizzes,
      json.form1Quizes,
      json.form2Papers,
      json.form3Quizzes,
      json.form4Quizes,
      json.examinerTalks,
      json.careerTalks,
      json.fasihiEnglish,
      json.fasihiKiswahili
    );
  }
}

export default AdminStatsModel;

interface StatsJson {
  totalUsers: number;
  students: number;
  teachers: number;
  institution: number;
  activeSubscriptions: number;
  totalVideos: number;
  form1Videos: number;
  form2Videos: number;
  form3Videos: number;
  form4Videos: number;
  totalPapers: number;
  form1Papers: number;
  form2Papers: number;
  form3Papers: number;
  form4Papers: number;
  totalQuizzes: number;
  form1Quizes: number;
  form2Quizzes: number;
  form3Quizzes: number;
  form4Quizes: number;
  examinerTalks: number;
  careerTalks: number;
  fasihiEnglish: number;
  fasihiKiswahili: number;
}
