import React from "react";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { getQuestionProgress } from "./api/questions/get-question-progress";
import ApplicationProfilePage from "../main-pages/ApplicationProfilePage/ApplicationProfilePage";
import { getQuestionResponses } from "src/pages/api/user/get-question-responses";
//profile progress/ question summary page
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = getSession(ctx);
    const questionProgress = await getQuestionProgress();
    const questionResponses = await getQuestionResponses((await session).user.uid)
    let userProgressJSON = JSON.parse(JSON.stringify(questionProgress));
    let questionJSON = JSON.parse(JSON.stringify(questionResponses));
    return {
      props: {
        ...userProgressJSON,
        questionResponses: questionJSON
      },
    };
  } catch (err) {
    //console.log(err);
    ctx.res.end();
    return { props: {} as never };
  }
};
const Progress = ({ questionData, questionResponses }) => {
  return <ApplicationProfilePage questionData={questionData} questionResponses={questionResponses} />;
};
Progress.requireAuth = true;
export default Progress;
