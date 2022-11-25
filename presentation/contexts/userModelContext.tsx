import React, { PropsWithChildren, useState } from "react";
import UserModel from "../../models/user_models/user_model";

export const userModelContext = React.createContext<userModelContextInterface>({
    userContext: [],
  SetUserContext: () => {},
});

const userModelController = (props: PropsWithChildren<{}>) => {
  const [userContext, SetUserContext] = useState<UserModel[]>([]);
  return (
    <userModelContext.Provider
      value={{
        userContext,
        SetUserContext,
      }}
    >
      {props.children}
    </userModelContext.Provider>
  );
};

export default userModelController;

interface userModelContextInterface {
  userContext: UserModel[];
  SetUserContext: (userContext: UserModel[]) => void;
}
