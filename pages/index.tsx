import type { NextPage } from "next";
import Welcome from "./welcome";
import Dashboard from "./dashboard";
import Resources from "./resources";
import resources from "./resources";
import Footer from "../components/common/Footer";
import styles from "../styles/Home.module.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import QuestionSummarySubpage from "./questionPages/question_summary_subpage";
import Questionnaire from "./[questionnaire]";
import QuestionECSubpage from "./questionPages/question_ec_subpage";
import Progress from "./progress";
import { useSession } from "next-auth/react";
import Signup from "./auth/signup";
import LoadingScreen from "../components/common/loading";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    console.log(session.user);
    router.push({ pathname: "/dashboard" });
    return <LoadingScreen />;
  }
  return <Welcome></Welcome>;
};

export default Home;
