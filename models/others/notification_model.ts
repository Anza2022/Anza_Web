class NotificationModel {
  constructor(
    public notificationId: string,
    public userId: string,
    public notificationType: string,
    public message: string,
    public isRead: boolean,
    public createdAt: string,
    public updatedAt: string
  ) {}

  static fromJson(json: NotificationJson): NotificationModel {
    return new NotificationModel(
      json._id,
      json.userId,
      json.notificationType,
      json.message,
      json.isRead,
      json.createdAt,
      json.updatedAt
    );
  }

  toMap() {
    return {
      userId: this.userId,
      notificationType: this.notificationType,
      message: this.message,
      isRead: this.isRead,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export default NotificationModel;

interface NotificationJson {
  _id: string;
  userId: string;
  notificationType: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
