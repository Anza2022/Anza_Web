class TestmonialModel {
  constructor(
    public id: string,
    public clientName: string,
    public message: string,
    public occupation: string,
    public imageUrl: string,
    public category: string,
    public date: string,
    public number: number
  ) {}
  static fromJson(json: TestmonialJson): TestmonialModel {
    return new TestmonialModel(
      json._id,
      json.clientName,
      json.message,
      json.occupation,
      json.imageUrl,
      json.category,
      json.category,
      json.number
    );
  }

  toMap() {
    return {
      clientName: this.clientName,
      message: this.message,
      occupation: this.occupation,
      imageUrl: this.imageUrl,
      category: this.category,
      date: this.date,
      number: this.number,
    };
  }
}

export default TestmonialModel;

interface TestmonialJson {
  _id: string;
  clientName: string;
  message: string;
  occupation: string;
  imageUrl: string;
  category: string;
  date: string;
  number: number;
}
