import React, { PropsWithChildren, useState } from "react";
import MkurugenziEpisode from "../../models/curriculum/mkurugenzi_episode_model";
import SetbookEpisode from "../../models/curriculum/setbook_episode_model";
import VideoLessonModel from "../../models/curriculum/video_lesson_model";

export const VideoLessonContext =
  React.createContext<VideoLessonContextInterface>({
    lessons: [],
    setLessons: () => {},
    mkuruLessons: [],
    setMkuruLessons: () => {},
    setbooksEpisodes: [],
    setSetbooksEpisodes: () => {},
    selectedLessonId: "",
    setSelectedLessonId: () => {},
  });

const VideoLessonsController = (props: PropsWithChildren<{}>) => {
  const [lessons, setLessons] = useState<VideoLessonModel[]>([]);
  const [setbooksEpisodes, setSetbooksEpisodes] = useState<SetbookEpisode[]>(
    []
  );
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [mkuruLessons, setMkuruLessons] = useState<MkurugenziEpisode[]>([]);

  return (
    <VideoLessonContext.Provider
      value={{
        lessons,
        setLessons,
        selectedLessonId,
        setSelectedLessonId,
        mkuruLessons,
        setMkuruLessons,
        setbooksEpisodes,
        setSetbooksEpisodes,
      }}
    >
      {props.children}
    </VideoLessonContext.Provider>
  );
};

export default VideoLessonsController;

interface VideoLessonContextInterface {
  lessons: VideoLessonModel[];
  setLessons: (lessons: VideoLessonModel[]) => void;
  mkuruLessons: MkurugenziEpisode[];
  setMkuruLessons: (lessons: MkurugenziEpisode[]) => void;
  setbooksEpisodes: SetbookEpisode[];
  setSetbooksEpisodes: (episodes: SetbookEpisode[]) => void;
  selectedLessonId: string;
  setSelectedLessonId: (v: string) => void;
}

// new MLesson(
//   "Wangari Maathai (The Legacy Of A Forester)",
//   "https://www.youtube.com/embed/p8p0QpdkSUk?rel=0&res=0&showinfo=0&modestbranding=1&autoplay=1",
//   "p8p0QpdkSUk",
//   " In this Episode, I tell the story of Professor Wangari Maathai. The Nobel Peace Price winner who was willing to lay down her own life for the sake of Kenya's Forests."
// ),
// new MLesson(
//   "The Senegalese Captain Marvel of The Rwandan Genocide",
//   "https://www.youtube.com/embed/T26LTo2tOVM?res=0&showinfo=0&autoplay=1",
//   "T26LTo2tOVM",
//   " I tell the story of the Rwandan Genocide through the eyes of a brave Senegalese Soldier by the name Capt. Mbaye Diagne"
// ),
// new MLesson(
//   "Ellen Johnson & The Women Of Liberia",
//   "https://www.youtube.com/embed/p0Awsbx0eV8?res=0&showinfo=0&autoplay=1",
//   "p0Awsbx0eV8",
//   "In this Episode, I tell the story of Ellen Johnson, The First African Female to be elected president in the war torn country of Liberia and the women of Liberia who fought for peace. "
// ),
// new MLesson(
//   "Youngest African President Ever",
//   "https://www.youtube.com/embed/Q4lT2XkQwho?res=0&showinfo=0&autoplay=1",
//   "Q4lT2XkQwho",
//   " In this Episode, I tell the story of Valentine Essegragbo Melvin Strasser. The youngest African president who assumed office at the tender age of 25 years 3 days."
// ),
