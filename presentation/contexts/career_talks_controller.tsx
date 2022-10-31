import React, { PropsWithChildren, useState } from "react";
import CareerTalk from "../../models/curriculum/career_talk_model";
import ExaminerTalk from "../../models/curriculum/examiner_talk_model";

export const CareerTalksContext =
  React.createContext<CareerTalkContextInterface>({
    talks: [],
    setTalks: () => {},
    selectedTalkId: "",
    setSelectedTalkId: () => {},
  });

const CareerTalksController = (props: PropsWithChildren<{}>) => {
  const [talks, setTalks] = useState<CareerTalk[]>([]);
  const [selectedTalkId, setSelectedTalkId] = useState("");
  return (
    <CareerTalksContext.Provider
      value={{
        talks,
        setTalks,
        selectedTalkId,
        setSelectedTalkId,
      }}
    >
      {props.children}
    </CareerTalksContext.Provider>
  );
};

export default CareerTalksController;

interface CareerTalkContextInterface {
  talks: CareerTalk[];
  setTalks: (tests: CareerTalk[]) => void;
  selectedTalkId: string;
  setSelectedTalkId: (v: string) => void;
}
