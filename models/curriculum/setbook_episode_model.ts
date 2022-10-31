class SetbookEpisode {
  constructor(
    public id: string,
    public title: string,
    public book: string,
    public episodeNumber: number,
    public fileName: string,
    public createdAt: string,
    public updatedAt: string,
    public likes: number,
    public views: number,
    public description: string
  ) {}

  static fromJson(json: EpisodeJson): SetbookEpisode {
    return new SetbookEpisode(
      json._id,
      json.title,
      json.book,
      json.episodeNumber,
      json.fileName,
      json.createdAt,
      json.updatedAt,
      json.likes !== undefined ? json.likes : 2,
      json.views !== undefined ? json.likes : 2,
      json.description !== undefined ? json.description : ""
    );
  }
  toMap() {
    return {
      title: this.title,
      book: this.book,
      episodeNumber: this.episodeNumber,
      fileName: this.fileName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      likes: this.likes,
      views: this.views,
      description: this.description,
    };
  }
}

export default SetbookEpisode;

interface EpisodeJson {
  _id: string;
  title: string;
  book: string;
  episodeNumber: number;
  fileName: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  views: number;
  description: string;
}
