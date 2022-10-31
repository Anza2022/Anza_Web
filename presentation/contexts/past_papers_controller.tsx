import React, { PropsWithChildren, useState } from "react";
import PastPaperModel from "../../models/curriculum/past_paper_model";

export const PastPapersContext =
  React.createContext<VideoLessonContextInterface>({
    pastPapers: [],
    setPastPapers: () => {},
    selectedPaperId: "",
    setSelectedPaperId: () => {},
  });

const PastPapersController = (props: PropsWithChildren<{}>) => {
  const [pastPapers, setPastPapers] = useState<PastPaperModel[]>([]);
  const [selectedPaperId, setSelectedPaperId] = useState("");
  return (
    <PastPapersContext.Provider
      value={{
        pastPapers,
        setPastPapers,
        selectedPaperId,
        setSelectedPaperId,
      }}
    >
      {props.children}
    </PastPapersContext.Provider>
  );
};

export default PastPapersController;

interface VideoLessonContextInterface {
  pastPapers: PastPaperModel[];
  setPastPapers: (papers: PastPaperModel[]) => void;
  selectedPaperId: string;
  setSelectedPaperId: (v: string) => void;
}
