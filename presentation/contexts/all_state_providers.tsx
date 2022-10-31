import Head from "next/head";
import React, { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import AppDataController from "./app_data_context";
import { AppThemeProvider } from "./app_theme_controller";
import CareerTalksController from "./career_talks_controller";
import ExaminerTalksController from "./examiner_talks_controller";
import GamifiedQuizesController from "./gamified_quizes_controller";
import LiveClassesController from "./live_classes_controller";
import LoggedinUserController from "./loggedin_user_controller";
import NavigationStateController from "./navigation_state_controller";
import NotificationsController from "./notifications_controller";
import PastPapersController from "./past_papers_controller";
import TeachersAccountController from "./teachers_account_context";
import VideoLessonsController from "./video_lessons_controller";

const AllStateProviders = (props: PropsWithChildren<{}>) => {
  return (
    <VideoLessonsController>
      <Head>
        <link
          rel="preload"
          href="/fonts/Circular Std Font.otf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <NavigationStateController>
        <AppThemeProvider>
          <AppDataController>
            <GamifiedQuizesController>
              <VideoLessonsController>
                <ExaminerTalksController>
                  <CareerTalksController>
                    <PastPapersController>
                      <LoggedinUserController>
                        {/* teachers account */}
                        <TeachersAccountController>
                          <NotificationsController>
                            <LiveClassesController>
                              <div>
                                <Toaster position="bottom-center" />
                              </div>{" "}
                              {props.children}
                            </LiveClassesController>
                          </NotificationsController>
                        </TeachersAccountController>
                      </LoggedinUserController>
                    </PastPapersController>
                  </CareerTalksController>
                </ExaminerTalksController>
              </VideoLessonsController>
            </GamifiedQuizesController>
          </AppDataController>
        </AppThemeProvider>
      </NavigationStateController>
    </VideoLessonsController>
  );
};

export default AllStateProviders;
