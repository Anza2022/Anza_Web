import React, { PropsWithChildren, useState } from "react";
import GamifiedQuizTest from "../../models/curriculum/gamified_quizes_model";
import PastPaperModel from "../../models/curriculum/past_paper_model";
import LessonPlanModel from "../../models/teacher/lesson_plan_model";
import SchemeOfWorkModel from "../../models/teacher/schemes_of_work_model";

export const TeachersAccountContext =
  React.createContext<VideoLessonContextInterface>({
    myPastPapers: [],
    setMyPastPapers: () => {},
    schemesOfWork: [],
    setSchemesOfWork: () => {},
    lessonPlans: [],
    setLessonPlans: () => {},
    myQuizzes: [],
    setMyQuizzes: () => {},
  });

const TeachersAccountController = (props: PropsWithChildren<{}>) => {
  const [pastPapers, setPastPapers] = useState<PastPaperModel[]>([]);
  const [schemesOfWork, setSchemesOfWork] = useState<SchemeOfWorkModel[]>([]);
  const [lessonPlans, setLessonPlans] = useState<LessonPlanModel[]>([]);
  const [myQuizzes, setMyQuizzes] = useState<GamifiedQuizTest[]>([]);
  return (
    <TeachersAccountContext.Provider
      value={{
        myPastPapers: pastPapers,
        setMyPastPapers: setPastPapers,
        schemesOfWork,
        setSchemesOfWork,
        lessonPlans,
        setLessonPlans,
        myQuizzes,
        setMyQuizzes,
      }}
    >
      {props.children}
    </TeachersAccountContext.Provider>
  );
};

export default TeachersAccountController;

interface VideoLessonContextInterface {
  myPastPapers: PastPaperModel[];
  setMyPastPapers: (papers: PastPaperModel[]) => void;
  schemesOfWork: SchemeOfWorkModel[];
  setSchemesOfWork: (schemes: SchemeOfWorkModel[]) => void;
  lessonPlans: LessonPlanModel[];
  myQuizzes: GamifiedQuizTest[];
  setLessonPlans: (plans: LessonPlanModel[]) => void;
  setMyQuizzes: (plans: GamifiedQuizTest[]) => void;
}
