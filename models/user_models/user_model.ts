class UserModel {
  constructor(
    public userId: string,
    public accountType: string,
    public schoolName: string,
    public classLevel: string,
    public userName: string,
    public email: string,
    public phoneNumber: string,
    public password: string,
    public profilePicUrl: string,
    public isAdmin: boolean,
    public adminType: string,
    public isSuperAdmin: boolean,
    public isPhoneNumberVerified: boolean,
    public isEmailVerified: boolean,
    public isFirstTimeLogin: boolean,
    public isGoogleSignup: boolean,
    public isLoggedIn: boolean,
    public createdAt: string,
    public updatedAt: string,
    public tscid: string,
    public primarySubject: string,
    public secondarySubject: string
  ) {}

  static fromJson(json: UserJson): UserModel {
    return new UserModel(
      json._id,
      json.accountType,
      json.schoolName,
      json.classLevel,
      json.userName,
      json.email,
      json.phoneNumber,
      json.password,
      json.profilePicUrl,
      json.isAdmin,
      json.adminType,
      json.isSuperAdmin,
      json.isPhoneNumberVerified,
      json.isEmailVerified,
      json.isFirstTimeLogin,
      json.isGoogleSignup,
      json.isLoggedIn,
      json.createdAt,
      json.updatedAt,
      json.tscid,
      json.primarySubject,
      json.secondarySubject
    );
  }

  toMap() {
    return {
      accountType: this.accountType,
      schoolName: this.schoolName,
      classLevel: this.classLevel,
      userName: this.userName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password,
      profilePicUrl: this.profilePicUrl,
      isAdmin: this.isAdmin,
      adminType: this.adminType,
      isSuperAdmin: this.isSuperAdmin,
      isPhoneNumberVerified: this.isPhoneNumberVerified,
      isEmailVerified: this.isEmailVerified,
      isFirstTimeLogin: this.isFirstTimeLogin,
      isGoogleSignup: this.isGoogleSignup,
      isLoggedIn: this.isLoggedIn,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tscid: this.tscid,
      primarySubject: this.primarySubject,
      secondarySubject: this.secondarySubject,
    };
  }
}

export default UserModel;

interface UserJson {
  _id: string;
  accountType: string;
  schoolName: string;
  classLevel: string;
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  profilePicUrl: string;
  isAdmin: boolean;
  adminType: string;
  isSuperAdmin: boolean;
  isPhoneNumberVerified: boolean;
  isEmailVerified: boolean;
  isFirstTimeLogin: boolean;
  isGoogleSignup: boolean;
  isLoggedIn: boolean;
  createdAt: string;
  updatedAt: string;
  tscid: string;
  primarySubject: string;
  secondarySubject: string;
}
