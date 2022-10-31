class UserFeedback {
  constructor(
    public feedbackId: string,
    public userName: string,
    public email: string,
    public phoneNumber: string,
    public message: string,
    public createdAt: string,
    public isReceived: string
  ) {}

  static fromJson(json: FeedbackJson): UserFeedback {
    return new UserFeedback(
      json._id,
      json.userName,
      json.email,
      json.phoneNumber,
      json.message,
      json.createdAt,
      json.isReceived
    );
  }

  toMap() {
    return {
      userName: this.userName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      message: this.message,
      createdAt: this.createdAt,
      isReceived: this.isReceived,
    };
  }
}

export default UserFeedback;

interface FeedbackJson {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  message: string;
  createdAt: string;
  isReceived: string;
}
