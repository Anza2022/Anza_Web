class AccountSubscription {
  constructor(
    public subscriptionId: string,
    public userId: string,
    public currentSubscriptionPlan: string,
    public accountLockDate: string,
    public resubscriptions: number,
    public subscriptionStartDate: string,
    public subscriptionEndDate: string,
    public isRefererPaid: boolean
  ) {}

  static fromJson(json: SubscriptionJson) {
    return new AccountSubscription(
      json._id,
      json.userId,
      json.currentSubscriptionPlan,
      json.accountLockDate,
      json.resubscriptions,
      json.subscriptionStartDate,
      json.subscriptionEndDate,
      json.isRefererPaid
    );
  }

  toMap() {
    return {
      userId: this.userId,
      currentSubscriptionPlan: this.currentSubscriptionPlan,
      accountLockDate: this.accountLockDate,
      resubscriptions: this.resubscriptions,
      subscriptionStartDate: this.subscriptionStartDate,
      subscriptionEndDate: this.subscriptionEndDate,
      isRefererPaid: this.isRefererPaid,
    };
  }

  //todo add issubscriptionactive getter
  get isSubscriptionActive(): boolean {
    return new Date().getTime() <= new Date(this.subscriptionEndDate).getTime();
  }
}

export default AccountSubscription;

interface SubscriptionJson {
  _id: string;
  userId: string;
  currentSubscriptionPlan: string;
  accountLockDate: string;
  resubscriptions: number;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  isRefererPaid: boolean;
}
