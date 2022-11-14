import React, { useContext, useState } from "react";
import AdminDashboardLayout from "../../../presentation/layouts/admin_dashboard_layout";
import Dropzone, {
  IDropzoneProps,
  ILayoutProps,
} from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { useRouter } from "next/router";
import {
  classOptions,
  subjectOptions,
} from "../../../presentation/utils/constants";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  getCurrentDate,
  isBrowser,
  showToast,
} from "../../../presentation/utils/helper_functions";
import axios from "axios";
import LoadingComponent from "../../../presentation/components/others/loading_component";
import VideoLessonModel from "../../../models/curriculum/video_lesson_model";
import VideoLessonRepo from "../../../data/repos/video_lessons_repo";
import { VideoLessonContext } from "../../../presentation/contexts/video_lessons_controller";
const AddVideoLesson = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [subjectType, setSubjectType] = useState("");
  const [topicName, setTopicName] = useState("");
  const [teacherName, setTeacherName] = useState("Anza");
  const [teacherSchool, setTeacherSchool] = useState("Anza");
  const [totalViews, setTotalViews] = useState(5);
  const [topicPriority, setTopicPriority] = useState(0);
  const [videoPriority, setVideoPriority] = useState(0);
  const [commentsOff, setCommentsOff] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [chapter, setChapter] = useState("");
  const [chapterNumber, setChapterNumber] = useState(0);

  //notes editor
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const onContentStateChange = (contentState: EditorState) => {
    seteditorState(contentState);
  };

  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [savingLesson, setSavingLesson] = useState(false);

  const handleVideoUpload = async (e: any) => {
    if (e.target.files[0] != null) {
      try {
        setUploadingVideo(true);
        const formData = new FormData();

        // Update the formData object
        formData.append("lesson", e.target.files[0], e.target.files[0].name);
        formData.append("type", "lesson");

        // let res = await axios.post(
        //   "http://localhost:8080/anzaapi/upload_video/lesson",
        //   formData
        // );
        let res = await axios.post(
          "https://anzaacademy.co/anzaapi/upload_video/lesson",
          formData
        );
        setUploadingVideo(false);
        setVideoUrl(res.data.url);
        showToast("video upload success", "success");
      } catch (e) {
        showToast(`${e}`, "error");
      }
    }
  };
  const handleThumbnailUpload = async (e: any) => {
    if (e.target.files[0] != null) {
      try {
        setUploadingThumbnail(true);
        const formData = new FormData();

        // Update the formData object
        formData.append("photo", e.target.files[0], e.target.files[0].name);
        formData.append("type", "lesson");

        // let res = await axios.post(
        //   "http://localhost:8080/anzaapi/upload_thumbnail/lesson",
        //   formData
        // );
        let res = await axios.post(
          "https://api.thesigurd.com/anzaapi/upload_thumbnail/lesson",
          formData
        );
        setUploadingThumbnail(false);
        setThumbnailUrl(res.data.url);
      } catch (e) {
        showToast(`${e}`, "error");
      }
    }
  };

  const handleSaveLesson = async () => {
    if (title === "") {
      showToast("enter lesson title", "error");
      return;
    }
    if (classLevel === "") {
      showToast("select class Level ", "error");
      return;
    }
    if (subjectType === "") {
      showToast("select subject type ", "error");
      return;
    }
    if (topicName === "") {
      showToast("enter topic name", "error");
      return;
    }
    if (topicPriority === 0) {
      showToast("enter topic number", "error");
      return;
    }
    if (videoPriority === 0) {
      showToast("enter video number", "error");
      return;
    }
    // if (videoUrl === "") {
    //   showToast("Upload the Video mp4", "error");
    //   return;
    // }
    // if (thumbnailUrl === "") {
    //   showToast("Upload the Thumbnail png", "error");
    //   return;
    // }

    let newLesson = new VideoLessonModel(
      "",
      title,
      subjectType == "mathematics"
        ? "https://api.thesigurd.com/anzaapi/view_video/lesson/The Cosine Rule.mp4"
        : subjectType == "chemistry"
        ? "https://api.thesigurd.com/anzaapi/view_video/lesson/main  thrid comp.mp4"
        : subjectType == "physics"
        ? "https://api.thesigurd.com/anzaapi/view_video/lesson/POTENTIAL Energy.mp4"
        : "https://api.thesigurd.com/anzaapi/view_video/lesson/The Cosine Rule.mp4",
      subjectType == "mathematics"
        ? "https://api.thesigurd.com/anzaapi/view_thumbnail/lesson/The Cosine Rule.png"
        : subjectType == "chemistry"
        ? "https://api.thesigurd.com/anzaapi/view_thumbnail/lesson/main  thrid comp.png"
        : subjectType == "physics"
        ? "https://api.thesigurd.com/anzaapi/view_thumbnail/lesson/POTENTIAL Energy.png"
        : "https://api.thesigurd.com/anzaapi/view_thumbnail/lesson/The Cosine Rule.png",

      topicName,
      classLevel,
      subjectType,
      teacherName,
      totalViews,
      topicPriority,
      videoPriority,
      getCurrentDate(),
      getCurrentDate(),
      commentsOff,
      isPublished,
      teacherSchool, //teacher school
      "", //notes id
      [], //lesson quizes
      "", //brief
      chapter,
      chapterNumber,
      1,
      0,
      "2:2",
      false,
      ""
    );

    try {
      setSavingLesson(true);

      let res = await VideoLessonRepo.addNewVideoLesson(newLesson);
      router.push("/admin/videos");
      showToast("lesson saved successfully", "success");
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setSavingLesson(false);
    }
  };

  const handleCancelProcess = () => {
    router.push("/admin/videos");

    try {
      if (videoUrl != "") {
        //todo send request to delete the video on the server
      }
      if (thumbnailUrl != "") {
        //todo send request to delete the thumbnail on the server
      }
    } catch (e) {
      showToast(`${e}`, "error");
    }
  };
  const { lessons } = useContext(VideoLessonContext);
  const getChapters = (): string[] => {
    return Array.from(
      new Set(
        lessons
          .filter(
            (e) =>
              e.subjectType.toLowerCase() == subjectType.toLowerCase() &&
              e.classLevel.toLowerCase() == classLevel.toLowerCase()
          )
          .map((e) => e.chapter.toLowerCase())
      )
    );
  };
  const getTopics = (): string[] => {
    return Array.from(
      new Set(
        lessons
          .filter(
            (e) =>
              e.subjectType.toLowerCase() == subjectType.toLowerCase() &&
              e.classLevel.toLowerCase() == classLevel.toLowerCase() &&
              e.chapter.toLowerCase() === chapter.toLowerCase()
          )
          .map((e) => e.topicName.toLowerCase())
      )
    );
  };

  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200 dark:bg-darksec min-h-screen py-16 md:ml-52 w-full ">
        <div className="flex h-10 items-center justify-center bg-white  dark:bg-darkmain pl-5  md:pl-10">
          <div className="flex text-main font-black text-xl">
            ADD NEW VIDEO LESSON
          </div>
        </div>
        {/* lesson details input */}
        <div className="flex flex-col  items-center w-full">
          <div className="flex flex-wrap w-full">
            <div className="flex flex-col m-2">
              <label htmlFor="title">Class Level</label>
              <select
                name="classlevel"
                id="classlevel "
                value={classLevel}
                onChange={(v) => setClassLevel(v.target.value.toLowerCase())}
                className="px-3 py-1.5 w-72  outline-none bg-white rounded-xl dark:bg-darkmain "
              >
                <option value="">Select Form</option>
                {classOptions.map((e) => (
                  <option key={e} value={e.toLowerCase()}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="title">Subject Type Level</label>
              <select
                name="subject"
                id="subject "
                value={subjectType}
                onChange={(v) => setSubjectType(v.target.value)}
                className="px-3 py-1.5 w-72  outline-none bg-white rounded-xl  dark:bg-darkmain"
              >
                <option value="">Select Subject</option>

                {subjectOptions.map((e) => (
                  <option key={e} value={e.toLowerCase()}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="chapterName">
                Chapter/Topic
                <span
                  className={`text-green-500 ${
                    getChapters().length > 0 ? "" : "hidden"
                  }`}
                >
                  opt
                </span>{" "}
              </label>
              <input
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
                list="allchapters"
                id="chapterName"
                name="chapterName"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
              />
              <datalist id="allchapters">
                {getChapters().map((e) => (
                  <option key={e} value={e} />
                ))}
              </datalist>
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topicName">
                Subtopic
                <span
                  className={`text-green-500 ${
                    getTopics().length > 0 ? "" : "hidden"
                  }`}
                >
                  opt
                </span>{" "}
              </label>
              <input
                className="outline-none bg-white rounded-xl px-3 py-1.5   w-72 dark:bg-darkmain"
                list="alltopics"
                id="topicName"
                name="topicName"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
              />
              <datalist id="alltopics">
                {getTopics().map((e) => (
                  <option key={e} value={e} />
                ))}
              </datalist>
            </div>

            <div className="flex flex-col m-2">
              <label htmlFor="title">Lesson Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Teacher Name</label>
              <input
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topic"> Institution</label>
              <input
                value={teacherSchool}
                onChange={(e) => setTeacherSchool(e.target.value)}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
              />
            </div>
          </div>
          <div className="flex flex-wrap w-full mt-5">
            <div className="flex flex-col m-2">
              <label htmlFor="chapternumber"> Chapter Number</label>
              <input
                value={chapterNumber}
                onChange={(e) => setChapterNumber(parseInt(e.target.value))}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72  dark:bg-darkmain"
                type="number"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topicPriority"> Topic Number</label>
              <input
                value={topicPriority}
                onChange={(e) => setTopicPriority(parseInt(e.target.value))}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
                type="number"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topicPriority"> Video Number</label>
              <input
                value={videoPriority}
                onChange={(e) => setVideoPriority(parseInt(e.target.value))}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
                type="number"
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="topicPriority">Total Views</label>
              <input
                value={totalViews}
                onChange={(e) => setTotalViews(parseInt(e.target.value))}
                className="outline-none bg-white rounded-xl px-3 py-1.5 w-72 dark:bg-darkmain"
                type="number"
              />
            </div>
            <div className="flex space-x-2 m-3 items-center w-72">
              <input
                // checked={true}
                className=" w-5 h-6 rounded-xl "
                type="checkbox"
              />
              <p className="text-lg">Turn Comments Off</p>
            </div>
            <div className="flex space-x-2 m-3 items-center w-72">
              <input className=" w-5 h-6 rounded-xl " type="checkbox" />
              <p className="text-lg">Is Published</p>
            </div>
          </div>
          <div className="flex flex-col w-full mt-5">
            {/* <p className="pl-5 my-2 text-3xl font-bold text-green-600">
              Upload Lesson Files
            </p>
            <div className="w-full flex flex-wrap justify-around">
              <div className="w-96 text-3xl">
                {videoUrl == "" ? (
                  uploadingVideo ? (
                    <div className="bg-main p-2.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl flex justify-center items-center">
                      {" "}
                      <LoadingComponent loading={uploadingVideo} />
                      <p className="text-sm">Uploading Video ...</p>
                      <p className="ml-2 text-xs">please wait</p>
                    </div>
                  ) : (
                    <label
                      htmlFor="video"
                      className="bg-main p-1.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl"
                    >
                      Upload Video
                    </label>
                  )
                ) : (
                  <p className="text-sm">{videoUrl}</p>
                )}
                <input
                  type="file"
                  id="video"
                  accept="video/mp4, video/*"
                  className="hidden "
                  onChange={handleVideoUpload}
                />
              </div>
              <div className="w-96 text-3xl">
                {thumbnailUrl == "" ? (
                  uploadingThumbnail ? (
                    <div className="bg-main p-2.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl flex justify-center items-center">
                      {" "}
                      <LoadingComponent loading={uploadingThumbnail} />
                      <p className="text-sm">Uploading Thumbnail ...</p>
                      <p className="ml-2 text-xs">please wait</p>
                    </div>
                  ) : (
                    <label
                      htmlFor="thumbnail"
                      className="bg-main p-1.5 px-4 cursor-pointer text-white text-lg font-bold rounded-xl"
                    >
                      Upload Thumbnail
                    </label>
                  )
                ) : (
                  <p className="text-sm">{thumbnailUrl}</p>
                )}
                <input
                  type="file"
                  id="thumbnail"
                  accept="image/png"
                  className="hidden "
                  onChange={handleThumbnailUpload}
                />
              </div>
            </div> */}
            <div className="h-24"></div>
            {/* <div className="flex w-full flex-col m-5">
              <p className="text-main font-bold text-2xl">Lesson Notes</p>
              {true ? (
                <div className="bg-white rounded-lg min-h-80">
                  <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onContentStateChange}
                  />
                </div>
              ) : (
                <div></div>
              )}
            </div> */}

            <div className="w-full mt-5 flex flex-wrap justify-around">
              <div
                onClick={handleSaveLesson}
                className="px-8 py-2  my-2 rounded-xl bg-main text-white shadow-xl cursor-pointer flex items-center"
              >
                <LoadingComponent loading={savingLesson} color="white" />
                <p>
                  {" "}
                  {savingLesson ? "saving lesson ..." : "Save Video Lesson"}
                </p>
                {savingLesson ? (
                  <p className="text-xs">please wait</p>
                ) : (
                  <p></p>
                )}
              </div>
              <div
                onClick={handleCancelProcess}
                className="px-8 py-2 rounded-xl my-2 bg-red-600 text-white shadow-xl cursor-pointer"
              >
                Cancel Process
              </div>
            </div>
            <div>
              todos: add lesson quizes in specific minutes, lesson notes
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AddVideoLesson;
