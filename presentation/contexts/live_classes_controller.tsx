import React, { PropsWithChildren, useState } from "react";
import GamifiedQuizTest from "../../models/curriculum/gamified_quizes_model";
import LiveClassModel from "../../models/curriculum/live_class_model";

export const LiveClassesContext =
  React.createContext<LiveClassesContextInterface>({
    liveclasses: [],
    setLiveclasses: () => {},
    teacherClasses: [],
    setTeacherClasses: () => {},
  });

const LiveClassesController = (props: PropsWithChildren<{}>) => {
  const [liveclasses, setLiveclasses] = useState<LiveClassModel[]>([]);
  const [teacherClasses, setTeacherClasses] = useState<LiveClassModel[]>([]);

  return (
    <LiveClassesContext.Provider
      value={{
        liveclasses,
        setLiveclasses,
        teacherClasses,
        setTeacherClasses,
      }}
    >
      {props.children}
    </LiveClassesContext.Provider>
  );
};

export default LiveClassesController;

interface LiveClassesContextInterface {
  liveclasses: LiveClassModel[];
  setLiveclasses: (l: LiveClassModel[]) => void;
  teacherClasses: LiveClassModel[];
  setTeacherClasses: (c: LiveClassModel[]) => void;
}
