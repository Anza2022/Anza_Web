class ReferalBonusModel {
  constructor(
    public referalModelId: string,
    public userId: string,
    public bonusCode: string,
    public invitedBy: string,
    public amountEarned: number,
    public withdrawnAmout: number,
    public referredUsersIds: string[]
  ) {}

  static fromJson(json: BonusJson) {
    return new ReferalBonusModel(
      json._id,
      json.userId,
      json.bonusCode,
      json.invitedBy,
      json.amountEarned,
      json.withdrawnAmout,
      json.referredUsersIds
    );
  }

  toMap() {
    return {
      userId: this.userId,
      myBonusCode: this.bonusCode,
      invitedBy: this.invitedBy,
      totalAmountEarned: this.amountEarned,
      withdrawnAmout: this.withdrawnAmout,
      referredUsersIds: this.referredUsersIds,
    };
  }
  public get availableAmount(): number {
    return this.amountEarned - this.withdrawnAmout;
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
  withdrawnAmout: number;
  referredUsersIds: string[];
}
