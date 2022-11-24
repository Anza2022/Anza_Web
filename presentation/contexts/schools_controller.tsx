import React, { PropsWithChildren, useState } from "react";
import SchoolModel from "../../models/curriculum/school_model";

export const SchoolsContext =
  React.createContext<SchoolsContextInterface>({
    MYschools: [],
    setMYSchools: () => {},
  });

const SchoolsController = (props: PropsWithChildren<{}>) => {
  const [MYschools, setMYSchools] = useState<SchoolModel[]>([]);
  return (
    <SchoolsContext.Provider
      value={{
        MYschools,
        setMYSchools,
      }}
    >
      {props.children}
    </SchoolsContext.Provider>
  );
};

export default SchoolsController;

interface SchoolsContextInterface {
  MYschools: SchoolModel[];
  setMYSchools: (schools: SchoolModel[]) => void;
}