import React, { PropsWithChildren, useEffect, useState } from "react";
import AdminRepo from "../../data/repos/admin_repo";
import AdminStatsModel from "../../models/admin/admin_models";
import LoadingComponent from "../../presentation/components/others/loading_component";
import AdminDashboardLayout from "../../presentation/layouts/admin_dashboard_layout";
import { showToast } from "../../presentation/utils/helper_functions";

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStatsModel[]>([]);

  const [loading, setLoading] = useState(false);

  const getStats = async () => {
    try {
      setLoading(true);
      let res = await AdminRepo.getAdminStats();
      setStats(res);
    } catch (e) {
      showToast(`${e}`, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getStats();
  }, []);

  return (
    <AdminDashboardLayout>
      <div className="flex-1 flex flex-col bg-gray-200  dark:bg-darksec md:ml-52 relative min-h-screen py-16 w-full items-center mx-4">
        <div className="flex h-12 items-center justify-center bg-white dark:bg-darkmain pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black py-3 text-lg md:text-2xl">
 ADMIN STATISTICS
          </div>
        </div>

        {loading ? (
          <div className="flex h-96 w-full justify-center items-center">
            <LoadingComponent loading={loading} color="main" />
          </div>
        ) : (
          <div className="flex flex-wrap w-full  py-0 justify-around md:justify-start">
            <UsersStats stats={stats[0]} />
            <VideoLessonStats stats={stats[0]} />
            <PastPapersStats stats={stats[0]} />
            <GemifiedQuizesStats stats={stats[0]} />
            <OtherContentStats stats={stats[0]} />

            <div className="flex w-[310px] md:w-[400px] flex-col  rounded-2xl my-2"></div>
            <div className="flex w-[310px] md:w-[400px] flex-col  rounded-2xl my-2"></div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;

const UsersStats = (props: PropsWithChildren<{ stats: AdminStatsModel }>) => {
  return (
    <div className="flex w-[330px]   flex-col bg-white dark:bg-darkmain rounded-md p-2 m-2">
      <p className="text-center p-2 bg-main font-black text-lg">USERS</p>
      <hr className="bg-main h-[2px]" />
      <div className="flex justify-between w-full p-2">
        <p>Total Users</p>
        <p>{props.stats == undefined ? 0 : props.stats.totalUsers}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-2">
        <p>Students</p>
        <p>{props.stats == undefined ? 0 : props.stats.students}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-2">
        <p>Teachers</p>
        <p>{props.stats == undefined ? 0 : props.stats.teachers}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-2">
        <p>Schools</p>
        <p>{props.stats == undefined ? 0 : props.stats.institution}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-2">
        <p>Active Subscriptions</p>
        <p>{props.stats == undefined ? 0 : props.stats.activeSubscriptions}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
    </div>
  );
};

const VideoLessonStats = (
  props: PropsWithChildren<{ stats: AdminStatsModel }>
) => {
  return (
    <div className="flex w-[330px]   flex-col bg-white dark:bg-darkmain  rounded-md p-2 m-2">
      <p className="text-center p-2 bg-main font-black text-lg">VIDEO LESSONS STATS</p>
      <hr className="bg-main h-[2px]" />
      <div className="flex justify-between w-full p-2">
        <p>Total Videos</p>
        <p>{props.stats == undefined ? 0 : props.stats.totalVideos}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-2">
        <p>Form 1 Videos</p>
        <p>{props.stats == undefined ? 0 : props.stats.form1Videos}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-2">
        <p>Form 2 Videos</p>
        <p>{props.stats == undefined ? 0 : props.stats.form2Videos}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-2">
        <p>Form 3 Videos</p>
        <p>{props.stats == undefined ? 0 : props.stats.form3Videos}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-2">
        <p>Form 4 Videos</p>
        <p>{props.stats == undefined ? 0 : props.stats.form4Videos}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
    </div>
  );
};
const PastPapersStats = (
  props: PropsWithChildren<{ stats: AdminStatsModel }>
) => {
  return (
    <div className="flex w-[330px]  flex-col bg-white dark:bg-darkmain  rounded-md p-2 m-2">
      <p className="text-center p-2 bg-main font-black text-lg">PAST PAPERS STATS</p>
      <hr className="bg-main h-[2px]" />
      <div className="flex justify-between w-full p-2">
        <p>Total Papers</p>
        <p>{props.stats == undefined ? 0 : props.stats.totalPapers}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-2">
        <p>Form 1 Papers</p>
        <p>{props.stats == undefined ? 0 : props.stats.form1Papers}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-2">
        <p>Form 2 Papers</p>
        <p>{props.stats == undefined ? 0 : props.stats.form1Papers}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-2">
        <p>Form 3 Papers</p>
        <p>{props.stats == undefined ? 0 : props.stats.form3Papers}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-2">
        <p>Form 4 Papers</p>
        <p>{props.stats == undefined ? 0 : props.stats.form4Papers}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
    </div>
  );
};
const OtherContentStats = (
  props: PropsWithChildren<{ stats: AdminStatsModel }>
) => {
  return (
    <div className="flex w-[330px]  flex-col bg-white dark:bg-darkmain  rounded-md p-2 m-2">
      <p className="text-center p-2 bg-main font-black text-lg">OTHER CONTENT STATS</p>
      <hr className="bg-main h-[2px]" />
      <div className="flex justify-between w-full p-1">
        <p>Examiner Talks Videos</p>
        <p>{props.stats == undefined ? 0 : props.stats.examinerTalks}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-1">
        <p>Career Talks Videos</p>
        <p>{props.stats == undefined ? 0 : props.stats.careerTalks}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-1">
        <p>Setbook Videos</p>
        <p>
          {props.stats == undefined
            ? 0
            : props.stats.fasihiEnglish + props.stats.fasihiKiswahili}
        </p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-1">
        <p>Mkurugenzi Videos</p>
        <p>0</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-1">
        <p>Schemes Of Work</p>
        <p>0</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-1">
        <p>Lesson Plans</p>
        <p>0</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
    </div>
  );
};
const GemifiedQuizesStats = (
  props: PropsWithChildren<{ stats: AdminStatsModel }>
) => {
  return (
    <div className="flex w-[330px]  flex-col bg-white dark:bg-darkmain  rounded-md p-2 m-2">
      <p className="text-center p-2 bg-main font-black text-lg">
        GAMIFIED QUESTIONS STATS
      </p>
      <hr className="bg-main h-[2px]" />
      <div className="flex justify-between w-full p-1">
        <p>Total Quizes</p>
        <p>{props.stats == undefined ? 0 : props.stats.totalQuizzes}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-1">
        <p>Form 1 Questions</p>
        <p>{props.stats == undefined ? 0 : props.stats.form1Quizes}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-1">
        <p>Form 2 Questions</p>
        <p>{props.stats == undefined ? 0 : props.stats.form2Quizzes}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-1">
        <p>Form 3 Questions</p>
        <p>{props.stats == undefined ? 0 : props.stats.form3Quizzes}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
      <div className="flex justify-between w-full p-1">
        <p>Form 4 Questions</p>
        <p>{props.stats == undefined ? 0 : props.stats.form4Quizes}</p>
      </div>
      <hr className="bg-gray-400 h-[1px]" />
    </div>
  );
};
