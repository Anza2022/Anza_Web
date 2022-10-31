import React, { PropsWithChildren, useState } from "react";
import AccountSubscription from "../../models/user_models/account_subscription";
import ReferalBonusModel from "../../models/user_models/referal_bonus_model";
import UserModel from "../../models/user_models/user_model";
import UserStats from "../../models/user_models/user_stats";

export const LoggedInUserContext =
  React.createContext<NotificationsContextInterface>({
    user: [],
    setUser: () => {},
    bonusData: [],
    setBonusData: () => {},
    accountSubscription: [],
    setAccountSubscription: () => {},
    userStats: [],
    setUserStats: () => {},
    setIsLoggedIn: () => {},
    isLoggedIn: false,
    setIsFirstTimeLogin: () => {},
    isFirstTimeLogin: false,
    setIsEditing: () => {},
    isEditing: false,
    isProfileComplete: () => false,
  });

const LoggedinUserController = (props: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<UserModel[]>([]);
  //todo add user stats, account subscription, bonus data

  const [bonusData, setBonusData] = useState<ReferalBonusModel[]>([]);
  const [accountSubscription, setAccountSubscription] = useState<
    AccountSubscription[]
  >([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userStats, setUserStats] = useState<UserStats[]>([]);
  const [isFirstTimeLogin, setIsFirstTimeLogin] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const isProfileComplete = (): boolean => {
    return user[0].userName !== "" && user[0].email !== "" ? true : false;
  };

  return (
    <LoggedInUserContext.Provider
      value={{
        user,
        setUser,
        bonusData,
        setBonusData,
        accountSubscription,
        setAccountSubscription,
        userStats,
        setUserStats,
        setIsLoggedIn,
        isLoggedIn,
        setIsFirstTimeLogin,
        isFirstTimeLogin,
        isEditing,
        setIsEditing,
        isProfileComplete,
      }}
    >
      {props.children}
    </LoggedInUserContext.Provider>
  );
};

export default LoggedinUserController;

interface NotificationsContextInterface {
  user: UserModel[];
  setUser: (user: UserModel[]) => void;
  bonusData: ReferalBonusModel[];
  setBonusData: (bonus: ReferalBonusModel[]) => void;
  accountSubscription: AccountSubscription[];
  setAccountSubscription: (sub: AccountSubscription[]) => void;
  userStats: UserStats[];
  setUserStats: (stats: UserStats[]) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (log: boolean) => void;
  isFirstTimeLogin: boolean;
  setIsFirstTimeLogin: (log: boolean) => void;
  isEditing: boolean;
  setIsEditing: (log: boolean) => void;
  isProfileComplete: () => boolean;
}
