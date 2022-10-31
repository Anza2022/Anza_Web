import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { FaBeer } from "react-icons/fa";
import AboutUsComponent from "../presentation/components/homepage/about_us_component";
import AppFooter from "../presentation/components/homepage/app/app_footer";
import ContactUsComponent from "../presentation/components/homepage/contact_us_component";
import InformedDecisions from "../presentation/components/homepage/decisions";
import FaqsComponent from "../presentation/components/homepage/faq_components";
import GettingstartedComponent from "../presentation/components/homepage/getstarted";
import LandingViewComponent from "../presentation/components/homepage/landing_view_component";
import PartnerShipsComponent from "../presentation/components/homepage/partnerships";
import AppStatsComponent from "../presentation/components/homepage/statistics";
import AnzaCommunity from "../presentation/components/homepage/steve/anza_community";
import Dtestimonials from "../presentation/components/homepage/steve/d-testimonials";
import Stestmonials from "../presentation/components/homepage/steve/s-testmonials";
import SExplorer from "../presentation/components/homepage/steve/sexplorer";
import SGetStarted from "../presentation/components/homepage/steve/sget_started";
import SkoolStories from "../presentation/components/homepage/steve/skool_stories";
import SlandingView from "../presentation/components/homepage/steve/slanding_view";
import Stransform from "../presentation/components/homepage/steve/stransform";
import TopicalQuizComponent from "../presentation/components/homepage/steve/topical_quiz_component";
import TopLesssonsComponent from "../presentation/components/homepage/steve/top_lessons";
import TestimonialsComponent from "../presentation/components/homepage/testmonials_component";
import { NavigationContext } from "../presentation/contexts/navigation_state_controller";
import AppLayout from "../presentation/layouts/app_layout";
import AboutLanding from "../presentation/components/homepage/steve/about_landing";
const Home: NextPage = () => {
  const { selectedVideoId, setSelectedVideoId } = useContext(NavigationContext);
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/forgot");
    router.prefetch("/about");
    router.prefetch("/login");
    router.prefetch("/signup");
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>Anza -Learn At Ease</title>
        <meta
          name="google-site-verification"
          content="4zc23UEaCWVK1KWKc68O_YBh2MmniUruxlhS-kdgf0c"
        />
        <meta
          name="description"
          content="we make learning and teaching process simple for both students and teachers "
        />
        <meta
          name="keywords"
          content="Improve performance,  anza, anzaacademy, anza academy, anza academy kenya, anza academy, e-learning , e-learning kenya,kenya e-learning , kenya online learning, online learning,past-papers, live tutions , questions, quizzes, online learning kenya, video lessons, exam generator, Cbc ,kenya cbc, cbc kenya, High school, kenya curriculum, Learning , Anza, Academy, Login Anza, best e-learning in kenya,"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="login" href="http://anzaacademy.com/login" />
        <link rel="signup" href="http://anzaacademy.com/register" />
      </Head>

      <AboutLanding />
      
      {/* <SlandingView /> */}

      <Stransform />
      <TopLesssonsComponent />
      <AnzaCommunity />
      <PartnerShipsComponent />
      {/* <TopicalQuizComponent /> */}
      {/* <TestimonialsComponent /> */}
     {/* < Dtestimonials/> */}
      
      <GettingstartedComponent />
      {/* <AboutUsComponent /> */}
      {/* <SGetStarted /> */}
      {/* <InformedDecisions /> */}
      {/* <Stestmonials /> */}
      {/* <SkoolStories /> */}

      {/* <FaqsComponent /> */}
      {/* <AppStatsComponent /> */}

      <AppFooter />
    </AppLayout>
  );
};

export default Home;
