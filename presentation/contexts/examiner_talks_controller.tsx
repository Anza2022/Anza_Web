import React, { PropsWithChildren, useState } from "react";
import ExaminerTalk from "../../models/curriculum/examiner_talk_model";

export const ExaminerTalksContext =
  React.createContext<ExaminerTalkContextInterface>({
    talks: [],
    setTalks: () => {},
    selectedTalkId: "",
    setSelectedTalkId: () => {},
  });

const ExaminerTalksController = (props: PropsWithChildren<{}>) => {
  const [talks, setTalks] = useState<ExaminerTalk[]>([
    new ExaminerTalk(
      "demo1",
      "Biology Paper 3 examiner talk",
      "https://flutter.github.io/assets-for-api-docs/assets/videos/bee.mp4",
      "https://picsum.photos/200/300?random=1",
      "2022-02-09",
      "2022-02-09",
      50,
      50,
      "biology",
      "Alliance High school",
      "Mr Charles Maina",
      "Teacher charles have 12 years exprience  teaching Biology"
    ),
    new ExaminerTalk(
      "demo1",
      "Mathematics Paper 1 examiner talk",
      "https://flutter.github.io/assets-for-api-docs/assets/videos/bee.mp4",
      // "https://api.darasa.co.ke/kikwetuapi/videoclasses/thumbnail/darasaclassplaceholder.jpg",
      "https://blurha.sh/assets/images/img1.jpg",
      "2022-02-09",
      "2022-02-09",
      50,
      50,
      "mathematics",
      "Alliance High school",
      "Mr Charles Maina",
      "Teacher charles have 12 years exprience  teaching Biology"
    ),
    new ExaminerTalk(
      "demo1",
      "Biology Paper 2 examiner talk",
      "https://flutter.github.io/assets-for-api-docs/assets/videos/bee.mp4",
      // "https://api.darasa.co.ke/kikwetuapi/videoclasses/thumbnail/darasaclassplaceholder.jpg",
      "https://blurha.sh/assets/images/img1.jpg",
      "2022-02-09",
      "2022-02-09",
      50,
      50,
      "biology",
      "Alliance High school",
      "Mr Charles Maina",
      "Teacher charles have 12 years exprience  teaching Biology"
    ),
  ]);
  const [selectedTalkId, setSelectedTalkId] = useState("");
  return (
    <ExaminerTalksContext.Provider
      value={{
        talks,
        setTalks,
        selectedTalkId,
        setSelectedTalkId,
      }}
    >
      {props.children}
    </ExaminerTalksContext.Provider>
  );
};

export default ExaminerTalksController;

interface ExaminerTalkContextInterface {
  talks: ExaminerTalk[];
  setTalks: (tests: ExaminerTalk[]) => void;
  selectedTalkId: string;
  setSelectedTalkId: (v: string) => void;
}
