class GamifiedQuizTest {
  constructor(
    public testId: string,
    public subjectType: string,
    public classLevel: string,
    public title: string,
    public passPercentage: number,
    public createdAt: string,
    public updatedAt: string,
    public totalPlays: number,
    public totalPasses: number,
    public likes: number,
    public rating: number,
    public ownerId: string,
    public teacherName: string,
    public schoolName: string,
    public thumbnailUrl: string,
    public questions: OneQuiz[],
    public tags: string[], //can be topics
    public isPublished: boolean,
    public taggedVideoLesson: string
  ) {}

  static fromJson(json: GamifiedQuizesJson): GamifiedQuizTest {
    let _quizes = json.questions.map((e) => OneQuiz.fromJson(e));
    return new GamifiedQuizTest(
      json._id,
      json.subjectType,
      json.classLevel,
      json.title,
      json.passPercentage,
      json.createdAt,
      json.updatedAt,
      json.totalPlays,
      json.totalPasses,
      json.likes,
      json.rating,
      json.ownerId,
      json.teacherName,
      json.schoolName,
      json.thumbnailUrl,
      _quizes,
      json.tags,
      json.isPublished == undefined ? true : json.isPublished,
      json.taggedVideoLesson == undefined ? "" : json.taggedVideoLesson
    );
  }

  toMap() {
    return {
      subjectType: this.subjectType,
      classLevel: this.classLevel,
      title: this.title,
      passPercentage: this.passPercentage,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      totalPlays: this.totalPlays,
      totalPasses: this.totalPasses,
      likes: this.likes,
      rating: this.rating,
      ownerId: this.ownerId,
      teacherName: this.teacherName,
      schoolName: this.schoolName,
      thumbnailUrl: this.thumbnailUrl,
      questions: this.questions.map((e) => e.toMap()),
      tags: this.tags,
      isPublished: this.isPublished,
      taggedVideoLesson: this.taggedVideoLesson,
    };
  }

  //todo do a getter for points

  public get totalPoints(): number {
    let points = 0;
    for (let i = 0; i < this.questions.length; i++) {
      points += this.questions[i].points;
    }
    return points;
  }
}

export default GamifiedQuizTest;

interface GamifiedQuizesJson {
  _id: string;
  title: string;
  passPercentage: number;
  questions: QuizJson[];
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  teacherName: string;
  schoolName: string;
  classLevel: string;
  subjectType: string;
  thumbnailUrl: string;
  totalPlays: number;
  totalPasses: number;
  likes: number;
  rating: number;
  tags: string[];
  isPublished: boolean;
  taggedVideoLesson: string;
}

export class OneQuiz {
  constructor(
    public quizId: string,
    public category: string, //multiple choice, checkbox choice, poll
    public question: string,
    public imageUrl: string,
    public answerOptions: string[],
    public answer: string,
    public answerExplanation: string,
    public points: number,
    public timerSeconds: number,
    public questionNumber: number,
    public questionType: string, //text, image or text+image
    public answerType: string, //text or image
    public explanationType: string,
    public questionImage: string
  ) {}

  static fromJson(json: QuizJson): OneQuiz {
    return new OneQuiz(
      json.quizId == undefined ? "" : json.quizId,
      json.category,
      json.question,
      json.imageUrl,
      json.answerOptions,
      json.answer,
      json.answerExplanation,
      json.points,
      json.timerSeconds,
      json.questionNumber,
      json.questionType == undefined ? "text" : json.questionType,
      json.answerType == undefined ? "text" : json.answerType,
      json.explanationType == undefined ? "text" : json.explanationType,
      json.questionImage == undefined ? "" : json.questionImage
    );
  }

  toMap() {
    return {
      quizId: this.quizId,
      category: this.category,
      question: this.question,
      imageUrl: this.imageUrl,
      answerOptions: this.answerOptions,
      answer: this.answer,
      answerExplanation: this.answerExplanation,
      points: this.points,
      timerSeconds: this.timerSeconds,
      questionNumber: this.questionNumber,
      questionType: this.questionType,
      answerType: this.answerType,
      explanationType: this.explanationType,
      questionImage: this.questionImage,
    };
  }
}

interface QuizJson {
  quizId: string;
  category: string;
  question: string;
  imageUrl: string;
  answerOptions: string[];
  answer: string;
  answerExplanation: string;
  points: number;
  timerSeconds: number;
  questionNumber: number;
  questionType: string;
  answerType: string;
  explanationType: string;
  questionImage: string;
}
