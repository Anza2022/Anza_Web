class FaqModel {
  constructor(
    public id: string,
    public question: string,
    public answer: string,
    public number: number
  ) {}
  static fromJson(json: FaqJson): FaqModel {
    return new FaqModel(json._id, json.question, json.answer, json.number);
  }

  toMap() {
    return {
      question: this.question,
      answer: this.answer,
      number: this.number,
    };
  }
}

export default FaqModel;

interface FaqJson {
  _id: string;
  question: string;
  answer: string;
  number: number;
}
