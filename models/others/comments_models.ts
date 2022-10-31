class CommentModel {
  constructor(
    public commentId: string,
    public videoId: string,
    public userName: string,
    public comment: string,
    public createdAt: string,
    public userId: string,
    public isReply: boolean,
    public totalReplies: number,
    public likes: number,
    public dislikes: number
  ) {}

  static fromJson(json: CommentJson): CommentModel {
    return new CommentModel(
      json._id,
      json.videoId,
      json.userName,
      json.comment,
      json.createdAt,
      json.userId,
      json.isReply == null ? false : json.isReply,
      json.totalReplies == null ? 0 : json.totalReplies,
      json.likes == null ? 5 : json.likes,
      json.dislikes == null ? 0 : json.dislikes
    );
  }

  toMap() {
    return {
      videoId: this.videoId,
      userName: this.userName,
      comment: this.comment,
      createdAt: this.createdAt,
      userId: this.userId,
      isReply: this.isReply,
      totalReplies: this.totalReplies,
      likes: this.likes,
      dislikes: this.dislikes,
    };
  }
}

export default CommentModel;

interface CommentJson {
  _id: string;
  videoId: string;
  userName: string;
  comment: string;
  createdAt: string;
  userId: string;
  isReply: boolean;
  totalReplies: number;
  likes: number;
  dislikes: number;
}
