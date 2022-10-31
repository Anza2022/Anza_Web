import React, { PropsWithChildren, useState } from "react";
import SchoolModel from "../../models/curriculum/school_model";

export const AppDataContext = React.createContext<AppDataContextInterface>({
  schools: [],
  setSchools: () => {},
});

const AppDataController = (props: PropsWithChildren<{}>) => {
  const [schools, setSchools] = useState<SchoolModel[]>([]);
  return (
    <AppDataContext.Provider
      value={{
        schools,
        setSchools,
      }}
    >
      {props.children}
    </AppDataContext.Provider>
  );
};

export default AppDataController;

interface AppDataContextInterface {
  schools: SchoolModel[];
  setSchools: (schools: SchoolModel[]) => void;
}
