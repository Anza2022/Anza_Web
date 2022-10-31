class CareerTalk {
  constructor(
    public talkId: string,
    public title: string,
    public videoUrl: string,
    public thumbnailUrl: string,
    public totalViews: number,
    public createdAt: string,
    public updatedAt: string,
    public likes: number,
    public category: string,
    public guestName: string,
    public description: string
  ) {}

  static fromJson(json: CareerJson): CareerTalk {
    return new CareerTalk(
      json._id,
      json.title,
      json.videoUrl,
      json.thumbnailUrl,
      json.totalViews,
      json.createdAt,
      json.updatedAt,
      json.likes,
      json.category,
      json.guestName,
      json.description != undefined ? json.description : ""
    );
  }

  toMap() {
    return {
      title: this.title,
      videoUrl: this.videoUrl,
      thumbnailUrl: this.thumbnailUrl,
      totalViews: this.totalViews,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      likes: this.likes,
      category: this.category,
      guestName: this.guestName,
      description: this.description,
    };
  }
}

export default CareerTalk;

interface CareerJson {
  _id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  totalViews: number;
  createdAt: string;
  updatedAt: string;
  category: string;
  guestName: string;
  likes: number;
  description: string;
}
