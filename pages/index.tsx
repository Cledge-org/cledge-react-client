import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Welcome from "./welcome";
import Footer from "../components/common/Footer";
import styles from "../styles/Home.module.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import QuestionSummarySubpage from "./questionPages/question_summary_subpage";
import Questionnaire from "./questionnaire";
import Progress from "./progress"
import { useSession } from "next-auth/react";
import Signup from "./auth/signup";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>;
  }
  return (
    // <Welcome>
    // </Welcome>
    <Questionnaire></Questionnaire>
    // <Signup></Signup>
    // <Progress></Progress>
  );
};

export default Home;
