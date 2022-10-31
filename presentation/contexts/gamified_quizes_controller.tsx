import React, { PropsWithChildren, useState } from "react";
import GamifiedQuizTest from "../../models/curriculum/gamified_quizes_model";

export const GamifiedQuestionsContext =
  React.createContext<GamifiedQuizesContextInterface>({
    testQuizes: [],
    setTestQuizes: () => {},
    selectedTestId: "",
    setSelectedTestId: () => {},
  });

const GamifiedQuizesController = (props: PropsWithChildren<{}>) => {
  const [testQuizes, setTestQuizes] = useState<GamifiedQuizTest[]>([]);
  const [selectedTestId, setSelectedTestId] = useState("");
  return (
    <GamifiedQuestionsContext.Provider
      value={{
        testQuizes,
        setTestQuizes,
        selectedTestId,
        setSelectedTestId,
      }}
    >
      {props.children}
    </GamifiedQuestionsContext.Provider>
  );
};

export default GamifiedQuizesController;

interface GamifiedQuizesContextInterface {
  testQuizes: GamifiedQuizTest[];
  setTestQuizes: (tests: GamifiedQuizTest[]) => void;
  selectedTestId: string;
  setSelectedTestId: (v: string) => void;
}
