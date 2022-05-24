import React from "react";
import { GetServerSidePropsContext } from "next";
import { getQuestionProgress } from "./api/get-question-progress";
import ProgressPage from "../main-pages/ProgressPage/ProgressPage";
//profile progress/ question summary page
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const questionProgress = await getQuestionProgress();
    let userProgressJSON = JSON.parse(JSON.stringify(questionProgress));
    return {
      props: {
        ...userProgressJSON,
      },
    };
  } catch (err) {
    console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};
const Progress = ({ questionData }) => {
  return <ProgressPage questionData={questionData} />;
};
export default Progress;
