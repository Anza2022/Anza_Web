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
import AboutLanding from "../presentation/components/homepage/steve/about_landing";
import SlandingView from "../presentation/components/homepage/steve/slanding_view";
import Stransform from "../presentation/components/homepage/steve/stransform";
import TopicalQuizComponent from "../presentation/components/homepage/steve/topical_quiz_component";
import TopLesssonsComponent from "../presentation/components/homepage/steve/top_lessons";
import TestimonialsComponent from "../presentation/components/homepage/testmonials_component";
import { NavigationContext } from "../presentation/contexts/navigation_state_controller";
import AppLayout from "../presentation/layouts/app_layout";
import Superhero from "../presentation/components/homepage/steve/super_hero";
import Flexaa from "../presentation/components/homepage/steve/flex";
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
          content="Past papers, KCSE, revision papers, form 1, form 2 form 4, free revision past papers, revision papers with answers, kcse past papers with answers pdf, free revision papers with answers. Tuition, private tuition centers in Nairobi, tuition centers near me, tuition centers in south c, tutors in nairobi, kcse, tuition centers in nairobi,online tutors in kenya, physics and maths tutor, physics and maths tutor, chemistry, physics past papers. Career guidance and counselling, career guidance for highschool students, career guidance in kenya,list of career chioces for highschool students, how do I choose a career path for students KCSE revision materials, Form 1,2,3,4 revision papers, free past papers and marking schemes,"
        />
        <meta
          name="keywords"
          content="Past papers, KCSE, revision papers, form 1, form 2 form 4, free revision past papers, revision papers with answers, kcse past papers with answers pdf, free revision papers with answers. Tuition, private tuition centers in Nairobi, tuition centers near me, tuition centers in south c, tutors in nairobi, kcse, tuition centers in nairobi,online tutors in kenya, physics and maths tutor, physics and maths tutor, chemistry, physics past papers. Career guidance and counselling, career guidance for highschool students, career guidance in kenya,list of career chioces for highschool students, how do I choose a career path for students KCSE revision materials, Form 1,2,3,4 revision papers, free past papers and marking schemes,"
        />
        <link rel="icon" href="./favicon.ico" />
        <link rel="login" href="http://anzaacademy.com/login" />
        <link rel="signup" href="http://anzaacademy.com/register" />
      </Head>
            <SlandingView />
      {/* <AboutLanding /> */}
      <Flexaa></Flexaa>
      {/* <Superhero></Superhero> */}
      <AboutUsComponent />
      <TopicalQuizComponent />
       {/* <InformedDecisions /> */}
      <FaqsComponent /> 
     {/* <AppStatsComponent />  */}
      <AppFooter />
    </AppLayout>
  );
};

export default Home;
