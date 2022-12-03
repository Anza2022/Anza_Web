class ReferalBonusModel {
  constructor(
    public referalModelId: string,
    public userId: string,
    public bonusCode: string,
    public invitedBy: string,
    public amountEarned: number,
    public withdrawnAmount: number,
    public referredUsersIds: string[]
  ) {}

  static fromJson(json: BonusJson) {
    return new ReferalBonusModel(
      json._id,
      json.userId,
      json.bonusCode,
      json.invitedBy,
      json.amountEarned,
      json.withdrawnAmount,
      json.referredUsersIds
    );
  }

  toMap() {
    return {
      userId: this.userId,
      myBonusCode: this.bonusCode,
      invitedBy: this.invitedBy,
      totalAmountEarned: this.amountEarned,
      withdrawnAmout: this.withdrawnAmount,
      referredUsersIds: this.referredUsersIds,
    };
  }
  public get availableAmount(): number {
    return this.amountEarned - this.withdrawnAmount;
  }
}

export default ReferalBonusModel;

interface BonusJson {
  _id: string;
  userId: string;
  bonusCode: string;
  invitedBy: string;
  amountEarned: number;
  availableAmount: number;
  withdrawnAmount: number;
  referredUsersIds: string[];
}
